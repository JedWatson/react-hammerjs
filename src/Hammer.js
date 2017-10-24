import PropTypes from 'prop-types';
import React from 'react';

// require('hammerjs') when in a browser. This is safe because Hammer is only
// invoked in componentDidMount, which is not executed on the server.
const Hammer = typeof window !== 'undefined' ? require('hammerjs') : undefined;

var privateProps = {
	children: true,
	direction: true,
	options: true,
	recognizeWith: true,
	vertical: true,
};

/**
 * Hammer Component
 * ================
 */

const handlerToEvent = {
	action: 'tap press',
	onDoubleTap: 'doubletap',
	onPan: 'pan',
	onPanCancel: 'pancancel',
	onPanEnd: 'panend',
	onPanStart: 'panstart',
	onPinch: 'pinch',
	onPinchCancel: 'pinchcancel',
	onPinchEnd: 'pinchend',
	onPinchIn: 'pinchin',
	onPinchOut: 'pinchout',
	onPinchStart: 'pinchstart',
	onPress: 'press',
	onPressUp: 'pressup',
	onRotate: 'rotate',
	onRotateCancel: 'rotatecancel',
	onRotateEnd: 'rotateend',
	onRotateMove: 'rotatemove',
	onRotateStart: 'rotatestart',
	onSwipe: 'swipe',
	onSwipeRight: 'swiperight',
	onSwipeLeft: 'swipeleft',
	onSwipeUp: 'swipeup',
	onSwipeDown: 'swipedown',
	onTap: 'tap',
};

Object.keys(handlerToEvent).forEach(function(i) {
	privateProps[i] = true;
});

function updateHammer(hammer, props) {
	if (props.hasOwnProperty('vertical')) {
		console.warn('vertical is deprecated, please use `direction` instead');
	}

	var directionProp = props.direction;
	if (directionProp || props.hasOwnProperty('vertical')) {
		var direction = directionProp
			? directionProp
			: props.vertical ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL';
		hammer.get('pan').set({ direction: Hammer[direction] });
		hammer.get('swipe').set({ direction: Hammer[direction] });
	}

	if (props.options) {
		Object.keys(props.options).forEach(function(option) {
			if (option === 'recognizers') {
				Object.keys(props.options.recognizers).forEach(function(gesture) {
					var recognizer = hammer.get(gesture);
					recognizer.set(props.options.recognizers[gesture]);
					if (props.options.recognizers[gesture].requireFailure) {
						recognizer.requireFailure(
							props.options.recognizers[gesture].requireFailure
						);
					}
				}, this);
			} else {
				var key = option;
				var optionObj = {};
				optionObj[key] = props.options[option];
				hammer.set(optionObj);
			}
		}, this);
	}

	if (props.recognizeWith) {
		Object.keys(props.recognizeWith).forEach(function(gesture) {
			var recognizer = hammer.get(gesture);
			recognizer.recognizeWith(props.recognizeWith[gesture]);
		}, this);
	}

	Object.keys(props).forEach(function(p) {
		var e = handlerToEvent[p];
		if (e) {
			hammer.off(e);
			hammer.on(e, props[p]);
		}
	});
}

export default class HammerComponent extends React.Component {
	static displayName = 'Hammer';

	static propTypes = {
		className: PropTypes.string,
	};

	componentDidMount() {
		this.hammer = new Hammer(this.domElement);
		updateHammer(this.hammer, this.props);
	}

	componentDidUpdate() {
		if (this.hammer) {
			updateHammer(this.hammer, this.props);
		}
	}

	componentWillUnmount() {
		if (this.hammer) {
			this.hammer.stop();
			this.hammer.destroy();
		}
		this.hammer = null;
	}

	render() {
		var props = {};

		Object.keys(this.props).forEach(function(i) {
			if (!privateProps[i]) {
				props[i] = this.props[i];
			}
		}, this);

		var self = this;
		props.ref = function(domElement) {
			if (self.props.ref) {
				self.props.ref(domElement);
			}
			self.domElement = domElement;
		};

		// Reuse the child provided
		// This makes it flexible to use whatever element is wanted (div, ul, etc)
		return React.cloneElement(React.Children.only(this.props.children), props);
	}
}

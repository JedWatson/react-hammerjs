var React = require('react');
var ReactDOM = require('react-dom');

// require('hammerjs') when in a browser. This is safe because Hammer is only
// invoked in componentDidMount, which is not executed on the server.
var Hammer = (typeof window !== 'undefined') ? require('hammerjs') : undefined;

var privateProps = {
	children: true,
	action: true,
	onTap: true,
	onDoubleTap: true,
	onPan: true,
	onPanStart: true,
	onPanEnd: true,
	onPanCancel: true,
	onSwipe: true,
	onPress: true,
	onPressUp: true,
	onPinch: true,
	onPinchIn: true,
	onPinchOut: true,
	onPinchStart: true,
	onPinchEnd: true,
	onPinchCancel: true,
	onRotate: true
};

/**
 * Hammer Component
 * ================
 */

var handlerToEvent = {
	action: 'tap press',
	onTap: 'tap',
	onDoubleTap: 'doubletap',
	onPanStart: 'panstart',
	onPan: 'pan',
	onPanEnd: 'panend',
	onPanCancel: 'pancancel',
	onSwipe: 'swipe',
	onPress: 'press',
	onPressUp: 'pressup',
	onPinch: 'pinch',
	onPinchIn: 'pinchin',
	onPinchOut: 'pinchout',
	onPinchStart: 'pinchstart',
	onPinchEnd: 'pinchend',
	onRotate: 'rotate'
};
function updateHammer(hammer, props) {
	if (props.vertical) {
		hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});
		hammer.get('swipe').set({direction: Hammer.DIRECTION_ALL});
	} else {
		hammer.get('pan').set({direction: Hammer.DIRECTION_HORIZONTAL});
		hammer.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL});
	}

	if (props.options) {
		Object.keys(props.options).forEach(function (option) {
			if (option === 'recognizers') {
				Object.keys(props.options.recognizers).forEach(function (gesture) {
					var recognizer = hammer.get(gesture);
					recognizer.set(props.options.recognizers[gesture]);
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
		Object.keys(props.recognizeWith).forEach(function (gesture) {
			var recognizer = hammer.get(gesture);
			recognizer.recognizeWith(props.recognizeWith[gesture]);
		}, this);
	}

	Object.keys(props).forEach(function (p) {
		var e = handlerToEvent[p];
		if (e) {
			hammer.off(e);
			hammer.on(e, props[p]);
		}
	});
}

var HammerComponent = React.createClass({

	displayName: 'Hammer',

	propTypes: {
		className: React.PropTypes.string
	},

	componentDidMount: function () {
		this.hammer = new Hammer(ReactDOM.findDOMNode(this));
		updateHammer(this.hammer, this.props);
	},

	componentDidUpdate: function () {
		if (this.hammer) {
			updateHammer(this.hammer, this.props);
		}
	},

	componentWillUnmount: function () {
		if (this.hammer) {
			this.hammer.stop();
			this.hammer.destroy();
		}
		this.hammer = null;
	},

	render: function () {
		var props = {};

		Object.keys(this.props).forEach(function (i) {
			if (!privateProps[i]) {
				props[i] = this.props[i];
			}
		}, this);

		// Reuse the child provided
		// This makes it flexible to use whatever element is wanted (div, ul, etc)
		return React.cloneElement(React.Children.only(this.props.children), props);
	}
});

module.exports = HammerComponent;

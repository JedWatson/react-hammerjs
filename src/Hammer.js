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
	onSwipe: true,
	onPress: true,
	onPressUp: true,
	onPinch: true,
	onRotate: true
};

/**
 * Hammer Component
 * ================
 */

var HammerComponent = React.createClass({

	displayName: 'Hammer',

	propTypes: {
		className: React.PropTypes.string
	},

	componentDidMount: function () {
		this.hammer = new Hammer(ReactDOM.findDOMNode(this));

		if (this.props.options) {
			Object.keys(this.props.options).forEach(function (option) {
				if (option === 'recognizers') {
					Object.keys(this.props.options.recognizers).forEach(function (gesture) {
						var recognizer = this.hammer.get(gesture);
						recognizer.set(this.props.options.recognizers[gesture]);
					}, this);
				} else {
					var key = option;
					var optionObj = {};
					optionObj[key] = this.props.options[option];
					this.hammer.set(optionObj);
				}
			}, this);
		}

		if (this.props.vertical) {
			this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
			this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
		}

		if (this.props.action) this.hammer.on('tap press', this.props.action);
		if (this.props.onTap) this.hammer.on('tap', this.props.onTap);
		if (this.props.onDoubleTap) this.hammer.on('doubletap', this.props.onDoubleTap);
		if (this.props.onPan) this.hammer.on('pan', this.props.onPan);
		if (this.props.onSwipe) this.hammer.on('swipe', this.props.onSwipe);
		if (this.props.onPress) this.hammer.on('press', this.props.onPress);
		if (this.props.onPressUp) this.hammer.on('pressup', this.props.onPressUp);
		if (this.props.onPinch) this.hammer.on('pinch', this.props.onPinch);
		if (this.props.onRotate) this.hammer.on('rotate', this.props.onRotate);
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

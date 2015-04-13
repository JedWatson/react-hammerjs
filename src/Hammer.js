var React = require('react'),
	Hammer = require('hammerjs');

var privateProps = {
	component: true,
	children: true,
	action: true,
	onTap: true,
	onDoubleTap: true,
	onPan: true,
	onSwipe: true,
	onPress: true,
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
		component: React.PropTypes.any,
		className: React.PropTypes.string
	},
	
	getDefaultProps: function() {
		return {
			component: 'span'
		};
	},
	
	componentDidMount: function() {
		this.hammer = new Hammer(this.getDOMNode());

		if (this.props.options) {
			Object.keys(this.props.options).forEach(function(option) {
				if (option === 'recognizers') {
					Object.keys(this.props.options.recognizers).forEach(function(gesture) {
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

		if (this.props.action)          this.hammer.on('tap press', this.props.action);
		if (this.props.onTap)           this.hammer.on('tap', this.props.onTap);
		if (this.props.onDoubleTap)     this.hammer.on('doubletap', this.props.onDoubleTap);
		if (this.props.onPan)           this.hammer.on('pan', this.props.onPan);
		if (this.props.onSwipe)         this.hammer.on('swipe', this.props.onSwipe);
		if (this.props.onPress)         this.hammer.on('press', this.props.onPress);
		if (this.props.onPinch)         this.hammer.on('pinch', this.props.onPinch);
		if (this.props.onRotate)        this.hammer.on('rotate', this.props.onRotate);
	},
	
	componentWillUnmount: function() {
		if (this.hammer) {
		    this.hammer.stop();
		    this.hammer.destroy();
		}
		this.hammer = null;
	},
	
	render: function() {
		
		var props = {};
		
		Object.keys(this.props).forEach(function(i) {
			if (!privateProps[i]) {
				props[i] = this.props[i];
			}
		}, this);

		return React.createElement(this.props.component, props, this.props.children);
	}
	
});

module.exports = HammerComponent;

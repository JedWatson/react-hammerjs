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
		if (this.props.action)		this.hammer.on('tap press', 	                                             this.props.action);
		if (this.props.onTap)		this.hammer.on('tap',			                                     this.props.onTap);
		if (this.props.onDoubleTap)	this.hammer.on('doubletap',		                                     this.props.onDoubleTap);
		if (this.props.onPan)		this.hammer.on('pan panmove panend pancancel panleft panright panup pandow', this.props.onPan);
		if (this.props.onSwipe)		this.hammer.on('swipe',		               				     this.props.onSwipe);
		if (this.props.onPress)		this.hammer.on('press',							     this.props.onPress);
		if (this.props.onPinch)		this.hammer.on('pinch',						      	     this.props.onPinch);
		if (this.props.onRotate)	this.hammer.on('rotate',	          				     this.props.onRotate);
	},
	
	componentWillUnmount: function() {
		this.hammer.stop();
		this.hammer.destroy();
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

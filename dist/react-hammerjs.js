(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Hammer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null),
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"hammerjs":undefined}]},{},[1])(1)
});
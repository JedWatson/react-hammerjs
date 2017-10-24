'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// require('hammerjs') when in a browser. This is safe because Hammer is only
// invoked in componentDidMount, which is not executed on the server.
var Hammer = typeof window !== 'undefined' ? require('hammerjs') : undefined;

var privateProps = {
	children: true,
	direction: true,
	options: true,
	recognizeWith: true,
	vertical: true
};

/**
 * Hammer Component
 * ================
 */

var handlerToEvent = {
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
	onTap: 'tap'
};

Object.keys(handlerToEvent).forEach(function (i) {
	privateProps[i] = true;
});

function updateHammer(hammer, props) {
	if (props.hasOwnProperty('vertical')) {
		console.warn('vertical is deprecated, please use `direction` instead');
	}

	var directionProp = props.direction;
	if (directionProp || props.hasOwnProperty('vertical')) {
		var direction = directionProp ? directionProp : props.vertical ? 'DIRECTION_ALL' : 'DIRECTION_HORIZONTAL';
		hammer.get('pan').set({ direction: Hammer[direction] });
		hammer.get('swipe').set({ direction: Hammer[direction] });
	}

	if (props.options) {
		Object.keys(props.options).forEach(function (option) {
			if (option === 'recognizers') {
				Object.keys(props.options.recognizers).forEach(function (gesture) {
					var recognizer = hammer.get(gesture);
					recognizer.set(props.options.recognizers[gesture]);
					if (props.options.recognizers[gesture].requireFailure) {
						recognizer.requireFailure(props.options.recognizers[gesture].requireFailure);
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

var HammerComponent = function (_React$Component) {
	_inherits(HammerComponent, _React$Component);

	function HammerComponent() {
		_classCallCheck(this, HammerComponent);

		return _possibleConstructorReturn(this, (HammerComponent.__proto__ || Object.getPrototypeOf(HammerComponent)).apply(this, arguments));
	}

	_createClass(HammerComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.hammer = new Hammer(this.domElement);
			updateHammer(this.hammer, this.props);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.hammer) {
				updateHammer(this.hammer, this.props);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.hammer) {
				this.hammer.stop();
				this.hammer.destroy();
			}
			this.hammer = null;
		}
	}, {
		key: 'render',
		value: function render() {
			var props = {};

			Object.keys(this.props).forEach(function (i) {
				if (!privateProps[i]) {
					props[i] = this.props[i];
				}
			}, this);

			var self = this;
			props.ref = function (domElement) {
				if (self.props.ref) {
					self.props.ref(domElement);
				}
				self.domElement = domElement;
			};

			// Reuse the child provided
			// This makes it flexible to use whatever element is wanted (div, ul, etc)
			return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), props);
		}
	}]);

	return HammerComponent;
}(_react2.default.Component);

HammerComponent.displayName = 'Hammer';
HammerComponent.propTypes = {
	className: _propTypes2.default.string
};
exports.default = HammerComponent;
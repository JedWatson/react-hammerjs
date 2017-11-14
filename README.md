React-HammerJS
==============

[ReactJS](http://facebook.github.io/react/) / [HammerJS](http://hammerjs.github.io) integration. Support touch events in your React app.

If you're looking for native tap event handling in ReactJS, check out my [react-tappable](https://github.com/JedWatson/react-tappable) package.


## Installation

The easiest way to use React-HammerJS is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

You can also use the standalone build by including `dist/hammer.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-hammerjs --save
```


## Usage

React-HammerJS wraps a React component, binding Hammer events to it so it can fire the handlers specified.

## Properties

### Event Listener properties
* `onTap`
* `onDoubleTap`
* `onPan`
* `onPanCancel`
* `onPanEnd`
* `onPanStart`
* `onPinch`
* `onPinchCancel`
* `onPinchEnd`
* `onPinchIn`
* `onPinchOut`
* `onPinchStart`
* `onPress`
* `onPressUp`
* `onRotate`
* `onRotateCancel`
* `onRotateEnd`
* `onRotateMove`
* `onRotateStart`
* `onSwipe`
* `action` - like the `onTap` event handler but will also be fired `onPress`.

### Behavior properties
* `direction` - (string) `'DIRECTION_ALL'` | `'DIRECTION_HORIZONTAL'` | `'DIRECTION_VERTICAL'`.  Used to restrict the `pan` and `swipe` direction. These string values may also work: `'DIRECTION_NONE'` |`'DIRECTION_LEFT'` | `'DIRECTION_RIGHT'` | `'DIRECTION_UP'` | `'DIRECTION_DOWN'`.

* `options` - can be used to configure the Hammer manager. These properties will be merged with the default ones.

### Example

```js
var Hammer = require('react-hammerjs');

// Default options
<Hammer onTap={handleTap} onSwipe={handleSwipe}><div>Tap Me</div></Hammer>

// Custom options
var options = {
    touchAction:'compute',
    recognizers: {
        tap: {
            time: 600,
            threshold: 100
        }
    }
};

<Hammer onTap={handleTap} options={options}><div>Tap Me</div></Hammer>
```

# Disabled Events

As a default, the `pinch` and `rotate` events are disabled in hammer.js, as they would make actions on an element "blocking". You may enable these events using the options object which is a attribute on the react `<Hammer>` element.

For example, to activate the `pinch` event on a `canvas` element:

```js
<Hammer
    onPinch={handlePinch}
    options={{
       recognizers: {
          pinch: { enable: true }
       }
    }}>
    <canvas></canvas>
</Hammer>
```

Disabled events are detailed in the hammer.js api documentation:
- http://hammerjs.github.io/recognizer-rotate/
- http://hammerjs.github.io/recognizer-pinch/

# License

MIT Licensed. Copyright (c) Jed Watson 2017.

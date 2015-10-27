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

The following events are supported:

* `onTap`
* `onDoubleTap`
* `onPan`
* `onPanStart`
* `onPanEnd`
* `onSwipe`
* `onPress`
* `onPressUp`
* `onPinch`
* `onPinchIn`
* `onPinchOut`
* `onRotate`

You can also provide an `action` property which is like the `onTap` event handler but will also be fired `onPress`.

If you provide the prop `vertical={true}` the `pan` and `swipe` events will support vertical gestures.

The `options` property can be used to configure the Hammer manager. These properties will be merged with the default ones.

### Example

```
var Hammer = require('react-hammerjs');

// Default options
<Hammer onTap={handleTap} onSwipe={handleSwipe}><div>Tap Me</div></Hammer>

// Custom options
var options = {
    touchAction:true,
    recognizers: {
        tap: {
            time: 600,
            threshold: 100
        }
    }
};

<Hammer onTap={handleTap} options={options}><div>Tap Me</div></Hammer>
```


# License

MIT Licensed. Copyright (c) Jed Watson 2015.

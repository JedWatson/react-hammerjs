React-HammerJS
==============

[ReactJS](http://facebook.github.io/react/) / [HammerJS](http://hammerjs.github.io) integration. Support touch events in your React app.


## Installation

The easiest way to use React-HammerJS is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

You can also use the standalone build by including `dist/hammer.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-hammerjs --save
```


## Usage

React-HammerJS generates a React component (default `<span>`) which then has Hammer events bound to it so it can fire the handlers specified.

## Properties

The `component` prop can be used to change the component rendered, which will have the touch events bound to it. It may be a string (any valid DOM tag) or a React component that implements the `getDOMNode()` method.

The following events are supported:

* `onTap`
* `onDoubleTap`
* `onPan`
* `onSwipe`
* `onPress`
* `onPinch`
* `onRotate`

You can also provide an `action` property which is like the `onTap` event handler but will also be fired `onPress`.


### Example

```
var Hammer = require('react-hammerjs');

<Hammer onTap={handleTap}>Tap Me</Hammer>
```

# skatejs/renderer-preact

SkateJS renderer for [Preact](https://github.com/developit/preact).

## Install

```sh
npm install skatejs preact @skatejs/renderer-preact
```

## Usage

This assumes knowledge of SkateJS.

```js
/** @jsx h */

import { h } from 'preact';
import { withComponent } from 'skatejs';
import withPreact from '@skatejs/renderer-preact';

class MyComponent extends withComponent(withPreact()) {
  renderCallback() {
    return <div>Hello, <slot />!</div>;
  }
}
```

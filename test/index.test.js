/** @jsx h */

import { h } from 'preact';
import withRenderer from '../src';

class MyElement extends withRenderer() {
  renderCallback({ name }) {
    return h('div', null, 'Hello, ', name, '!');
  }
}
customElements.define('my-element', MyElement);

describe('@skatejs/renderer-preact', () => {
  it('renders', () => {
    const el = new MyElement();
    expect(el.innerHTML).toEqual('');
    el.rendererCallback(el, el.renderCallback.bind(el, { name: 'World' }));
    expect(el.innerHTML).toEqual('<div>Hello, World!</div>');
    el.rendererCallback(el, el.renderCallback.bind(el, { name: 'Bob' }));
    expect(el.innerHTML).toEqual('<div>Hello, Bob!</div>');
  });
});

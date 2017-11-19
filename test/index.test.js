/** @jsx h */

import { Component, h } from 'preact';
import withRenderer from '../src';

class MyElement extends withRenderer() {
  render({ name }) {
    return <div>Hello, {name}!</div>;
  }
}
customElements.define('my-element', MyElement);

test('renders', () => {
  const testContent = (text) =>`<div>Hello, ${text}!</div>`;
  const el = new MyElement();

  expect(el.innerHTML).toEqual('');

  el.renderer(el, el.render.bind(el, { name: 'World' }));

  expect(el.innerHTML).toEqual(testContent('World'));

  el.renderer(el, el.render.bind(el, { name: 'Bob' }));

  expect(el.innerHTML).toEqual(testContent('Bob'));
});

test('wrappers', () => {
  class PreactComponent extends Component {
    render() {
      return <div>Hello, {this.props.children}!</div>;
    }
  }

  class PreactComponentWrapper extends withRenderer() {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
    render() {
      return <PreactComponent {...this.props} />;
    }
  }

  customElements.define('preact-component-wrapper', PreactComponentWrapper);

  const el = new PreactComponentWrapper();
  const { shadowRoot } = el;
  el.renderer(shadowRoot, el.render.bind(el));

  expect(shadowRoot.innerHTML).toEqual(
    '<div>Hello, <slot></slot>!</div>'
  );
});

test('wrappers cleanup', () => {
  const didMountSpy = jest.fn()
  const willUnmountSpy = jest.fn()
  class PreactComponent extends Component {
    render() {
      return <div>Hello, {this.props.children}!</div>;
    }
    componentDidMount(){
      didMountSpy()
    }
    componentWillUnmount() {
      willUnmountSpy()
    }
  }

  class PreactComponentWrapper extends withRenderer() {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
    render() {
      return <PreactComponent {...this.props} />;
    }
  }

  customElements.define('preact-component-wrapper', PreactComponentWrapper);

  const root = document.createElement('div');
  let el = new PreactComponentWrapper();
  root.appendChild(el);
  const { shadowRoot } = el;
  el.renderer(shadowRoot, el.render.bind(el));

  expect(didMountSpy).toHaveBeenCalled();

  root.removeChild(el);

  expect(willUnmountSpy).toHaveBeenCalled();
});

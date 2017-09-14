import { render } from 'preact';

export const withRenderer = Base => {
  const ElClass = (Base || HTMLElement);
  return class extends ElClass {
    rendererCallback(renderRoot, renderCallback) {
      this._preactDom = render(
        renderCallback(),
        renderRoot,
        this._preactDom || renderRoot.children[0]
      );
    }
  };
}

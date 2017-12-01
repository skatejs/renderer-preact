// Type definitions for @skatejs/renderer-preact@0.1.0
// Project: https://github.com/skatejs/renderer-preact
// TypeScript Version: 2.5

// UMD library
export as namespace rendererPreact;

import { ComponentProps } from 'preact';
// @TODO: Uncoment when after https://github.com/skatejs/skatejs/pull/1231 is merged
// import { Renderer } from 'skatejs'

// @TODO: remove after  https://github.com/skatejs/skatejs/pull/1231 is merged
interface Renderer<P, O> {
  renderCallback?(props?: P): O;

  // called after render
  renderedCallback?(): void;

  rendererCallback(shadowRoot: Element, renderCallback: () => O): void;
}

type Maybe<T> = T | null | undefined;
type Constructor<T> = new (...args: any[]) => T;
type CElement = Constructor<HTMLElement>;

// fixed preact types cause preact TS PR's adoption is super slow
export interface StatelessComponent<Props> {
  (props: Props, children?: JSX.Element[]): JSX.Element;
}
export type SFC<P> = StatelessComponent<P>;

declare class PreactRenderedComponent<P> extends HTMLElement implements Renderer<P, Maybe<JSX.Element>> {
  props: P & ComponentProps<any>;
  renderCallback(props?: P): Maybe<JSX.Element>;
  rendererCallback(shadowRoot: Element, renderCallback: () => JSX.Element): void;
}

type WithPreact = new <P>(...args: any[]) => PreactRenderedComponent<P>;

// API

export default function withPreact<T extends CElement = CElement>(Base?: T): WithPreact;

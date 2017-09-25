import { h } from 'preact'
import { withComponent, define } from 'skatejs'
import withPreact from '@skatejs/renderer-preact'

const Component = withComponent(withPreact())

class MyComponent extends Component<{}> {
  static readonly is = 'x-hello'
  renderCallback() {
    return (
      <div>
        Hello, <slot />!
      </div>
    )
  }
}

// remove any when new skate TS are merged
export default define(MyComponent as any)

# vue-size-observer

Resize observer for Vue - A vue component to observe the element size changing that implements by resize-observer-polyfill and inspired from [rc-resize-observer](https://www.npmjs.com/package/rc-resize-observer).


## Usage
[CodeSandBox demo](https://codesandbox.io/s/vue-resize-observer-vzk4g) or run example in Terminal with npm:

```bash
npm install
npm run serve
```

Code example:
```js
import ResizeObserver from 'vue-size-observer';

export default {
  render() {
    return (
      <ResizeObserver
        onResize={() => {
          console.log('resized!');
        }}
      >
        <textarea />
      </ResizeObserver>,
    )
  }
}
```

## API

### Props
|name|type|default|description|
|:-|:-|:-|:-|
|disabled|boolean|`false`|Disable current observer instance|

### Event
|name|type|default|description|
|:-|:-|:-|:-|
|resize|({ width, height, offsetWidth, offsetHeight })=>void|\--|Trigger resize listener function when child node resized|

## license
MIT
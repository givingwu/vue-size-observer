<template>
  <div id="app">
    <h1 style="text-align: center">vue-size-observer</h1>
    <form>
      <div>
        <label>Observe size enabled:</label>
        <input type="checkbox" v-model="enabled" />
      </div>
      <div>
        <label>Toggle element:</label>
        <input type="checkbox" v-model="toggle" />
      </div>
      <div>
        <label>Adjust width:</label>
        <input type="range" value="600" min="300" max="1300" v-model="width" />
      </div>
    </form>

    <ResizeObserver :disabled="!enabled" @resize="handleResize">
      <FunctionalProps v-if="toggle" v-bind="test" :style="{ width: computedWidth }">{{text}}</FunctionalProps>

      <div style="border: 1px dashed pink" v-else :style="{ width: computedWidth }">{{text}}</div>
    </ResizeObserver>
  </div>
</template>

<script>
import FunctionalProps from './components/FunctionalProps.jsx'
import ResizeObserver from '../src/index'

export default {
  name: 'App',

  data() {
    return {
      toggle: true,
      text: '',
      enabled: true,
      width: 300,
      test: {
        msg:
          'Hello Guys, This is a props access testing in Vue functional component.',
        attr: 'Test 4 attr',
        attrs: {
          attrsMsg: 'Test 4 attrs.attr'
        }
      }
    }
  },

  components: {
    FunctionalProps,
    ResizeObserver
  },

  computed: {
    computedWidth() {
      return typeof +this.width === 'number' ? this.width + 'px' : this.width
    }
  },

  methods: {
    handleResize(rect) {
      console.log('resize', rect.width)
      this.text = `The width is ${rect.width} px.`
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

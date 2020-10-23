import ResizeObserver from 'resize-observer-polyfill'

export default {
  name: 'ResizeObserver',

  abstract: true,

  props: {
    disabled: Boolean
  },

  mounted() {
    this.onUpdated()
  },

  updated() {
    this.onUpdated()
  },

  created() {
    this.width = 0
    this.height = 0
  },

  beforeDestroy() {
    this.destroyObserver()
  },

  methods: {
    onResize(entries) {
      const target = entries[0].target
      const { width, height } = target.getBoundingClientRect()
      const { offsetWidth, offsetHeight } = target

      /**
       * Resize observer trigger when content size changed.
       * In most case we just care about element size,
       * let's use `boundary` instead of `contentRect` here to avoid shaking.
       */
      const fixedWidth = Math.floor(width)
      const fixedHeight = Math.floor(height)

      if (this.width !== fixedWidth || this.height !== fixedHeight) {
        this.width = fixedWidth
        this.height = fixedHeight

        // Call the parent event listener `onResize` programmatically
        const onResize = this.$listeners['resize']

        if (onResize && typeof onResize === 'function') {
          onResize({
            width: fixedWidth,
            height: fixedHeight,
            offsetWidth,
            offsetHeight
          })
        }
      }
    },

    onUpdated() {
      const { disabled } = this

      // Unregister if disabled
      if (disabled) {
        this.destroyObserver()
        return
      }

      // Unregister if element changed
      const element = this.getDefaultSlotElement()

      if (!(element instanceof HTMLElement)) {
        throw new TypeError()
      }

      const elementChanged = element !== this.currentElement

      if (elementChanged) {
        this.destroyObserver()
        this.currentElement = element
      }

      if (!this.__ro__ && element) {
        this.__ro__ = new ResizeObserver(this.onResize)
        this.__ro__.observe(element)
        this.onResize([{ target: element }])
      }
    },

    getDefaultSlotElement() {
      const slot = this.$slots.default[0]
      const element = slot.elm

      return element
    },

    destroyObserver() {
      if (this.__ro__) {
        this.__ro__.disconnect()
        this.__ro__ = null
      }
    }
  },

  render() {
    if (Object.keys(this.$slots).length > 1) {
      console.warn(
        'Find more than one slot node with `$slots` in ResizeObserver. Will only observe and render the default slot.'
      )
    } else if (!this.$slots.default) {
      console.warn(
        '`default` of `this.$slots` is empty. Nothing is in observe.'
      )

      return null
    }

    return this.$slots.default
  }
}

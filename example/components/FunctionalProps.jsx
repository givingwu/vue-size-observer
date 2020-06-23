export default {
  name: 'FunctionalProps',
  functional: true,

  props: {
    msg: String
  },

  created() {
    console.log(this)
  },

  render(h, ctx) {
    const { props, data, slots } = ctx
    const allSlots = slots()
    const defaultSlot = allSlots && allSlots.default
    const { style, msg, attr, attrsMsg } = {
      ...props,
      ...data
    }

    return (
      <div
        class="hello"
        style={{
          ...style,
          backgroundColor: 'pink'
        }}
      >
        <h1>{msg}</h1>
        <h3>{attr}</h3>
        <h6>{attrsMsg}</h6>
        <p>{defaultSlot}</p>

        <ul>
          <li>
            <a
              href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
              target="_blank"
              rel="noopener"
            >
              babel
            </a>
          </li>
          <li>
            <a
              href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
              target="_blank"
              rel="noopener"
            >
              eslint
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

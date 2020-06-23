module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/vue-size-observer/' : '/',
  pages: {
    index: {
      entry: './example/main.js',
      template: './public/index.html',
      title: 'vue-size-observer example'
    }
  }
}

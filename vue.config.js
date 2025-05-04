module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/terminal-portfolio-vue/' : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
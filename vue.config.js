process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  lintOnSave: false,
  devServer: {
    hot: 'only',
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    },
  }
}

module.exports = {
  transpileDependencies: [],
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      usedExports: true,
      sideEffects: false,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            reuseExistingChunk: true
          },
          lightgallery: {
            name: 'chunk-lightgallery',
            test: /[\\/]node_modules[\\/]lightgallery[\\/]/,
            priority: 25,
            reuseExistingChunk: true
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true
          }
        }
      }
    }
  },
  chainWebpack: config => {
    config.optimization.minimize(true)
    
    config.plugin('html').tap(args => {
      args[0].minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      }
      return args
    })
    
    if (process.env.NODE_ENV === 'production') {
      const splitOptions = config.optimization.get('splitChunks')
      config.optimization.splitChunks({
        ...splitOptions,
        cacheGroups: {
          ...splitOptions.cacheGroups,
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
            priority: 30
          }
        }
      })
    }
  },
  css: {
    extract: process.env.NODE_ENV === 'production' ? {
      ignoreOrder: true,
      chunkFilename: 'css/[name].[contenthash:8].css'
    } : false
  }
}

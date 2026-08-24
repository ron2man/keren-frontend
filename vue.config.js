const path = require('path')

module.exports = {
  transpileDependencies: [],
  productionSourceMap: false,
  devServer: {
    // scripts/generate-responsive-images.js writes optimized images into the
    // sibling deploy repo (../kl-architects/public/img) to match the
    // production build's --dest — webpack-dev-server has no knowledge of
    // that directory otherwise, so ResponsiveImage-based images (homepage
    // hero, project thumbnails) would 404 under `npm run serve` without
    // this. This is additive: it doesn't affect how this project's own
    // public/ folder is served.
    contentBase: [path.resolve(__dirname, '../kl-architects/public')]
  },
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
    config.module.rule('images').test(/\.(png|jpe?g|gif|webp)(\?.*)?$/i)

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

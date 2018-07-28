// 'use strict'

// var path = require('path')
// var ExtractTextPlugin = require('mini-css-extract-plugin')
// var webpack = require('webpack')

// function join(dest) {
//   return path.resolve(__dirname, dest)
// }

// function web(dest) {
//   return join('web/static/' + dest)
// }

// var config = (module.exports = {
//   entry: {
//     application: [web('css/application.sass'), web('js/application.js')]
//   },

//   output: {
//     path: join('priv/static'),
//     filename: 'js/application.js'
//   },

//   resolve: {
//     extensions: ['', '.js', '.sass'],
//     modulesDirectories: ['node_modules']
//   },

//   module: {
//     noParse: /vendor\/phoenix/,
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel',
//         query: {
//           cacheDirectory: true,
//           plugins: ['transform-decorators-legacy'],
//           presets: ['react', 'es2015', 'stage-2', 'stage-0']
//         }
//       },
//       {
//         test: /\.sass$/,
//         use: [
//           // ExtractTextPlugin.loader,
//           // {
//           //   loader: "css-loader",
//           //   options: {
//           //     'style',
//           //     'css!sass?indentedSyntax&includePaths[]=' +
//           //       __dirname +
//           //       '/node_modules'
//           //   }
//           // },
//           // "sass-loader"
//           ExtractTextPlugin.loader,
//           {
//             loader: 'css-loader',
//             options: {
//               modules: true,
//               sourceMap: true,
//               importLoader: 2
//             }
//           },
//           'sass-loader'
//         ]
//       }
//     ]
//   },

//   plugins: [new ExtractTextPlugin('css/application.css')],
//   mode: 'none'
// })

// if (process.env.NODE_ENV === 'production') {
//   config.plugins.push(
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.UglifyJsPlugin({ minimize: true })
//   )
// }

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, options) => ({
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  entry: './priv/static/js/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../priv/static/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '../css/app.css' }),
    new CopyWebpackPlugin([{ from: 'priv/static/', to: '../' }])
  ]
})

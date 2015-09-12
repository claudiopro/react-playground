var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browserNoActivityTimeout: 30000,

    browsers: process.env.CONTINUOUS_INTEGRATION ?
    [
      'PhantomJS'
    ] : [
      'PhantomJS'
      , 'Chrome'
    ],

    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true',

    frameworks: [ 'mocha', 'sinon', 'chai' ],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'dots', 'coverage' ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ],
        postLoaders: [{ //delays coverage til after tests are run, fixing transpiled source coverage error
          test: /\.js$/,
          exclude: /(__test__|node_modules|bower_components)\//,
          loader: 'istanbul-instrumenter'
        }]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },

    webpackServer: {
      noInfo: true
    },

    coverageReporter: {
      type: 'cobertura',
      dir: 'coverage/'
    }

  });
};

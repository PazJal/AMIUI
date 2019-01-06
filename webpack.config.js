const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});
} else if(process.env.NODE_ENV === 'development'){
  require('dotenv').config({path: '.env.development'});
}

module.exports = (env) => {
  const isProduction = (env === 'production');
  return {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname,'public','dist'),
      filename: 'bundle.js'
    },
    mode: 'none',
    module: {
      rules: [
        {
          //Runs babel for all JS files except node_modules
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader:"sass-loader",
              options:{
                sourceMap : true
              }
            }
          ]
        }
      ]
    },
    // optimization: {
    //   minimizer: [
    //     new UglifyJsPlugin({
    //       cache: true,
    //       parallel: true,
    //       sourceMap: true // set to true if you want JS source maps
    //     }),
    //     new OptimizeCSSAssetsPlugin({})
    //   ]
    // },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      })
    ],
    devtool:isProduction ? 'source-map' : 'cheap-eval-source-map',
    devServer:{
      contentBase: path.join(__dirname,'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};
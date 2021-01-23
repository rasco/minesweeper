const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');

function isProd() {
    return process.env.NODE_ENV == 'production';
}

const plugins = [
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css',
    }),
    new HtmlWebpackPlugin({
        chunks: ['bundle'],
        filename: 'index.html',
        template: 'src/index.template.html',
        scriptLoading: 'defer',
    }),
    new CleanObsoleteChunks(),
];

module.exports = {
    entry: {
        bundle: "./src/index.jsx",
    },
    mode: isProd() ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].[chunkhash].js",
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                  path.resolve(__dirname, "src")
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.js$/, 
                include: [
                  path.resolve(__dirname, "src")
                ],
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
              test: /\.(sa|sc|c)ss$/  ,
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
              test: /\.(svg|eot|woff|woff2|ttf)$/,
              use: ['file-loader']
            }
        ]
    },
    resolve: {
        modules: [
          "node_modules",
          path.resolve(__dirname, "src")
        ],
        extensions: ['.js', '.jsx', '.scss']
    }, 
    plugins: plugins
};

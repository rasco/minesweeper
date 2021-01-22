const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const TerserJSPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');

// const SITE_NAME = 'imig.es'

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function isProd() {
    return process.env.NODE_ENV == 'production';
}

const plugins = [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name][contenthash].css',
      // chunkFilename: '[id].css',
    }),
//     new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
//         'API_URL': JSON.stringify( API_URL ),
//         'DL_URL': JSON.stringify( DL_URL ),
//         'SOCKET_URL': JSON.stringify( SOCKET_URL )
//     }
//     }),
    new HtmlWebpackPlugin({
        chunks: ['bundle'],
        filename: 'index.html',
        template: 'src/index.template.html',
        scriptLoading: 'defer',
    }),
    new CleanObsoleteChunks(),
];

// if (isProd()) {
//     plugins.push(new BabelMinifyWebpackPlugin())
// }

// if ( !isProd() ) {
//     plugins.push(new BundleAnalyzerPlugin({
//         openAnalyzer: false
//     }))
// }

module.exports = {
    entry: {
        bundle: "./src/index.jsx",
    },
    mode: isProd() ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].[chunkhash].js",
        chunkFilename: '[name].[chunkhash].bundle.js',
        // publicPath: '/'
    },
    // optimization: {
    //     minimizer: [new TerserJSPlugin({
    //         parallel: true,
    //     }), new OptimizeCSSAssetsPlugin({})],
    // },
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
                test: /\.(s*)css$/, 
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it uses publicPath in webpackOptions.output
                      publicPath: '../',
                      hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader',
                  {
                      loader: 'sass-loader',
                      options: {
                          includePaths: [path.resolve(__dirname, "src")]
                      }
                  }
                ],
            },
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

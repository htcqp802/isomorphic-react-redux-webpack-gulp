import path from 'path';
import extend from 'extend';
import AssetsPlugin from 'assets-webpack-plugin';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const DEBUG = process.env.NODE_ENV === 'dev';
const VERBOSE = process.argv.indexOf('--verbose') > 0;
const INTL_REQUIRE_DESCRIPTIONS = true;
const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];
const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG,
};


const config = {
    context: path.resolve(__dirname, '../src'),
    output: {
        path: path.resolve(__dirname, '../build/public/assets/'),
        publicPath: '/assets/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, '../src')
            ],
            query: {
                cacheDirectory: DEBUG,
                babelrc: false,
                presets: [
                    'react',
                    'es2015',
                    'stage-0'
                ],
                "plugins": [
                    "transform-decorators-legacy"
                ]
            },
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css', 'less')
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
            loader: 'url-loader',
            query: {
                name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
                limit: 10000
            },
        }]
    },
    resolve: {
        root: path.resolve(__dirname, '../src'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    },
    cache: DEBUG,
    debug: DEBUG,
    stats: {
        colors: true,
        reasons: DEBUG,
        hash: VERBOSE,
        version: VERBOSE,
        timings: true,
        chunks: VERBOSE,
        chunkModules: VERBOSE,
        cached: VERBOSE,
        cachedAssets: VERBOSE,
    }
};


const clientConfig = extend(true, {}, config, {
    entry: './client.js',
    output: {
        filename: DEBUG ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
        chunkFilename: DEBUG ? '[name].[id].js?[chunkhash]' : '[name].[id].[chunkhash].js',
    },

    target: 'web',

    plugins: [

        new webpack.DefinePlugin({...GLOBALS,
            'process.env.BROWSER': true
        }),
        new ExtractTextPlugin(DEBUG ? '[name].css?[chunkhash]' : '[name].[chunkhash].css'),

        new AssetsPlugin({
            path: path.resolve(__dirname, '../build'),
            filename: 'assets.js',
            processOutput: x => {
                return `module.exports = ${JSON.stringify(x)};`
            },
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),

        ...DEBUG ? [] : [
            new webpack.optimize.DedupePlugin(),

            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: VERBOSE,
                },
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
        ],
    ],

    devtool: DEBUG ? 'source-map' : false,
});

const serverConfig = extend(true, {}, config, {
    entry: './server.js',

    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'server.js',
        chunkFilename: 'server.[name].js',
        libraryTarget: 'commonjs2',
    },

    target: 'node',

    externals: [
        /^\.\/assets$/,
        /^[@a-z][a-z\/\.\-0-9]*$/i,
    ],

    plugins: [
        new webpack.DefinePlugin({...GLOBALS,
            'process.env.BROWSER': false
        }),
        new ExtractTextPlugin(DEBUG ? '[name].css?[chunkhash]' : '[name].[chunkhash].css', {
            disable: true
        }),
        new webpack.BannerPlugin('require("source-map-support").install();', {
            raw: true,
            entryOnly: false
        }),
    ],

    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },

    devtool: 'source-map',
});

export default [serverConfig, clientConfig]
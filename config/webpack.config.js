
const path = require('path');
const fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

console.log(resolveApp('./config'));

const appSrc = resolveApp('src');

const theme = require('./theme');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                enforce: 'pre',
                exclude: theme.excludeModule,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ],
                include: appSrc
            },
            {
                test: theme.cssRegex,
                exclude: theme.cssModuleRegex,
                use: [
                    {
                        loader: require.resolve('style-loader'),
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 默认使用 webpackOptions.output中的publicPath
                            // publicPath:'../'
                        }
                    },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            sourceMap: theme.cssShouldUseSourceMap,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            config: {
                                // postcss 设置移到postcss.config.js  配置
                                path: resolveApp('./config')
                            },
                            sourceMap: theme.postcssShouldUseSourceMap,
                        },
                    }
                ],

                // getStyleLoaders({
                //   importLoaders: 1,
                //   sourceMap: isEnvProduction && shouldUseSourceMap,
                // }),
                sideEffects: true,
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
    ],
    devServer: {}
};

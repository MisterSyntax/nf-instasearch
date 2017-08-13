const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: [
        './index.js','./css/main.css'
    ],
    output: {
        path: path.join(__dirname, './dist/assets'),
        filename: 'bundle.js',
        publicPath: 'assets'
    },
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: {
            index: 'index.html'
        },
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["env"]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        { loader: 'postcss-loader' }
                    ]
                })
            }
        ],
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    },
    plugins: [
        new ExtractTextPlugin('main.css')
    ]
};
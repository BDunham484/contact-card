const path = require('path');
//import html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
//import GenerateSW class of Workbox plugin
const WorkboxPlugin = require('workbox-webpack-plugin');

//create new instance of HtmlWebpackPlugin class
// plugins: [
//     new HtmlWebpackPlugin({
//         template: './index.html',
//         title: 'Webpack Plugin',
//     })
// ]

module.exports = {
    mode: 'development',
    entry: "./src/js/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Webpack Plugin',
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}
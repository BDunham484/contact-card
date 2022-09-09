const path = require('path');
//import html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
//import GenerateSW class of Workbox plugin
// const WorkboxPlugin = require('workbox-webpack-plugin');
//import InjectManifest class of Workbod plugin
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

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
        // new WorkboxPlugin.GenerateSW({
        //     //do not pre-cache images
        //     exclude: [/\.(?:png|jpg|jpeg|svg)$/],
        //     //define runtime caching rules
        //     runtimeCaching: [{
        //         //match any request that ends with.png, .jpg, .jpeg, or .svg 
        //         urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        //         //apply a cache-first strategy
        //         handler: 'CacheFirst',
        //         options: {
        //             //user a custom cache name
        //             cacheName: 'images',
        //             //onl cache 1 image
        //             expiration: {
        //                 maxEntries: 1,
        //             },
        //         },
        //     }],
        // })
        new InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'service-worker.js',
        }),
        new WebpackPwaManifest({
            name: 'Contact Cards Application',
            short_name: 'Contact Cards',
            description: 'Keep track of contacts!',
            backgroud_color: '#7eb4e2',
            theme_color: '#7eb4e2',
            start_url: './',
            publicPath: './',
            icons: [
                {
                    src: path.resolve('src/images/icon-manifest.png'),
                    sizes: [96,128,192,256,384,512],
                    destination: path.join('assets', 'icons'),

                },
                {
                    src: path.resolve('src/images/icon-manifest.png'),
                    size: '1024x1024',
                    destination: path.join('assets', 'icons'),
                    purpose: 'maskable'
                }
            ],
        })
    ]
}
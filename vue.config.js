'use strict';// ES6的模块自动采用严格模式，不管你有没有在模块头部加上"use strict"
const path = require('path');
const themeConfig = require('./src/themeConfig.js');

function resolve(dir) {
    return path.join(__dirname, dir);
}


// https://cli.vuejs.org/zh/config/#vue-config-js
module.exports = {
    pluginOptions: {
        i18n: {
            locale: 'zh-CN',
            fallbackLocale: 'zh-CN',
            localeDir: 'locales',
            enableInSFC: false
        }
    },
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        open: false,
        port: process.env.port || process.env.npm_config_port || 8080, // 自定义修改8080端口
        proxy: {
            // 与Axios.defaults.baseURL的值一至
            // https://blog.csdn.net/idomyway/article/details/94358986
            // https://blog.csdn.net/Liu_yunzhao/article/details/90520028
            '/h': {
                target: 'http://localhost:8000',
                // 是否启用websockets
                ws: true,
                // secure: false, // https协议才设置
                changeOrigin: true, // 开启代理,本地创建一个虚拟服务器允许跨域
                pathRewrite: {
                    '^/h/': '/', // rewrite path
                }
            }
        }
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: themeConfig.title,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
            // https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                        chunks: 'all',
                        cacheGroups: {
                            libs: {
                                name: 'chunk-libs',
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: 'initial' // only package third parties that are initially dependent
                            },
                            elementUI: {
                                name: 'chunk-elementUI', // split elementUI into a single package
                                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                            },
                            commons: {
                                name: 'chunk-commons',
                                test: resolve('src/components'), // can customize your rules
                                minChunks: 3, //  minimum common number
                                priority: 5,
                                reuseExistingChunk: true
                            }
                        }
                    })
                    config.optimization.runtimeChunk('single')
                }
            )
    }
}

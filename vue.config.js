// https://cli.vuejs.org/zh/config/#vue-config-js
module.exports = {
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false
        }
    },
    devServer: {
        open: false,
        //port: 8000, // 自定义修改8080端口
        proxy: {
            // 与Axios.defaults.baseURL的值一至
            // https://blog.csdn.net/idomyway/article/details/94358986
            // https://blog.csdn.net/Liu_yunzhao/article/details/90520028
            '/home': {
                target: 'http://localhost:8000',
                // 是否启用websockets
                ws: true,
                // secure: false, // https协议才设置
                changeOrigin: true,
                pathRewrite: {
                    '^/home/': '/', // rewrite path
                }
            }
        }
    }
}

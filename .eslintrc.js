/**
 * 解决console报错问题
 groovy/lang/GroovyShell
 * @return
 * @Description TODO
 * @author claer woytu.com
 * @date 2019/4/29 11:18
 */
module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}

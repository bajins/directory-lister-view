/**
 groovy/lang/GroovyShell
 * @return
 * @Description 获取当前路径
 * @author claer woytu.com
 * @date 2019/4/29 13:28
 */
const getCurrAbsPath = () => {
    let a = {},
        rExtractUri = /((?:http|https|file):\/\/.*?\/[^:]+)(?::\d+)?:\d+/;
        // expose = +new Date(),
        // isLtIE8 = ('' + doc.querySelector).indexOf('[native code]') === -1;


    // FF,Chrome
    if (document.currentScript) {
        return document.currentScript.src;
    }

    let stack;
    try {
        a.b();
    } catch (e) {
        stack = e.fileName || e.sourceURL || e.stack || e.stacktrace;
    }
    // IE10
    if (stack) {
        let absPath = rExtractUri.exec(stack)[1];
        if (absPath) {
            return absPath;
        }
    }

    // IE5-9
    // for (let scripts = doc.scripts, i = scripts.length - 1, script; script = scripts[i--];) {
    //     if (script.className != expose && script.readyState === 'interactive') {
    //         script.className = expose;
    //         // if less than ie 8, must get abs path by getAttribute(src, 4)
    //         return isLtIE8 ? script.getAttribute('src', 4) : script.src;
    //     }
    // }
}

/**
groovy/lang/GroovyShell
 * @return
 * @Description 获取绝对路径
 * @author claer woytu.com
 * @date 2019/4/29 13:31
 */
const getPath = () => {
    let jsPath = document.currentScript ? document.currentScript.src : function () {
        let js = document.scripts,
            last = js.length - 1,
            src;
        for (let i = last; i > 0; i--) {
            if (js[i].readyState === 'interactive') {
                src = js[i].src;
                break;
            }
        }
        return src || js[last].src;
    }();
    return jsPath.substring(jsPath.lastIndexOf('/') + 1, jsPath.length);
}

/**
 * export default 服从 ES6 的规范,补充：default 其实是别名
 * module.exports 服从CommonJS 规范
 * 一般导出一个属性或者对象用 export default
 * 一般导出模块或者说文件使用 module.exports
 *
 * import from 服从ES6规范,在编译器生效
 * require 服从ES5 规范，在运行期生效
 * 目前 vue 编译都是依赖label 插件，最终都转化为ES5
 *
 * @return 将方法、变量暴露出去
 * @Description
 * @author claer woytu.com
 * @date 2019/4/29 11:58
 */
export default {
    getCurrAbsPath,
    getPath
}
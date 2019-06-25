import util from "./util.js"

const isDebugEnabled = process.env.NODE_ENV != "production";
const isInfoEnabled = true;
const isErrorEnabled = true;
const isWarnEnabled = true;
const isTraceEnabled = true;

// JS获取当前文件所在的文件夹全路径
// let js = document.scripts;
// js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);

let loggerName = "[" + util.getCurrAbsPath() + "]";

console.log(
    "%cisDebugEnabled=%c" + `${isDebugEnabled}` +
    ",%cisInfoEnabled=%c" + `${isInfoEnabled}` +
    ",%cisErrorEnabled=%c " + `${isErrorEnabled}` +
    ",%cisWarnEnabled=%c" + `${isWarnEnabled}` +
    ",%cisTraceEnabled=%c" + `${isTraceEnabled}`
    , 'color:#2db7f5;', 'color:red;'
    , 'color:#2db7f5;', 'color:red;'
    , 'color:red;', 'color:red;'
    , 'background:#aaa;color:#bada55;', 'color:red;'
    , 'color:#2db7f5;', 'color:red;'
);

/**
 * 对日志参数解析
 * 格式为：
 *     logger.info("页面{}，点击第{}行", "App.vue", index);
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/6/25 18:04
 */
const getParam = (...log) => {
    let params = log[0];
    let parentString = params[0].toString();
    // 正则表达式，如须匹配大小写则去掉i
    let re = eval("/" + "{}" + "/ig");
    // 匹配正则
    let ps = parentString.match(re);

    // 参数个数大于1，并且匹配的个数大于0
    if (params.length > 1 && ps != null) {
        // 移除第一个元素并返回该元素
        params.shift();
        for (let i = 0; i < ps.length; i++) {
            parentString = parentString.replace("{}", params[i]);
        }
        // 把替换后的字符串与参数未替换完的拼接起来
        parentString = parentString + params.slice(ps.length).toString();
        return parentString;
    }
    return params.toString();
}

const debug = (...log) => {
    if (isDebugEnabled) {
        console.log("%c " + loggerName + " %c " + getParam(log), 'color:red;', 'font-size:15px;color:red;');
    }
};

const info = (...log) => {
    if (isInfoEnabled) {
        console.info(loggerName + getParam(log));
    }
};

const error = (...log) => {
    if (isErrorEnabled) {
        console.error(loggerName + getParam(log));
    }
};
const warn = (...log) => {
    if (isWarnEnabled) {
        console.warn(loggerName + getParam(log));
    }
};
const trace = (...log) => {
    if (isTraceEnabled) {
        console.trace(loggerName + getParam(log));
    }
};

/**
 groovy/lang/GroovyShell
 * @return
 * @Description  将方法、变量暴露出去
 * @author claer woytu.com
 * @date 2019/4/29 11:55
 */
export default {
    debug,
    info,
    error,
    warn,
    trace
};
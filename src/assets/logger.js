import util from "./util.js"
const isDebugEnabled = process.env.NODE_ENV !== "production";
const isInfoEnabled = true;
const isErrorEnabled = true;

// JS获取当前文件所在的文件夹全路径
// let js = document.scripts;
// js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);

let loggerName = util.getCurrAbsPath();

console.log(
    "isDebugEnabled,isInfoEnabled,isErrorEnabled=>",
    `${isDebugEnabled},${isInfoEnabled},${isErrorEnabled}`
);

const debug = log => {
    if (isDebugEnabled) {
        console.warn("[", loggerName, "]", log);
    }
};

const info = log => {
    if (isInfoEnabled) {
        console.log("[", loggerName, "]", log);
    }
};

const error = log => {
    if (isErrorEnabled) {
        console.error("[", loggerName, "]", log);
    }
};

// const logger = {
//     debug,
//     info,
//     error
// };

/**
 groovy/lang/GroovyShell
 * @param name 文件名称
 * @return
 * @Description 传入当前文件名
 * @author claer woytu.com
 * @date 2019/4/29 11:54
 */
// const getLogger = name => {
//     if (name) {
//         loggerName = name;
//     }
//     return logger;
// };

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
    // getLogger
};
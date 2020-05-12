// 1. 手动实现apply
// 使函数被传入的thisArg被调用，那么函数的this就指向调用者
Function.prototype.apply = function (thisArg, args) {
    // 给context添加一个方法 指向this
    thisArg.fn = this || window;
    let result = args ? thisArg.fn(...args) : thisArg.fn();
    delete thisArg.fn; // 用完丢掉
    return result;
}

// 2. 手动实现call
// 通过arguments获取参数列表
Function.prototype.call = function (thisArg) {
    // 给context添加一个方法 指向this
    thisArg.fn = this || window;
    let args = [...arguments].slice(1);
    let result = thisArg.fn(...args);
    delete thisArg.fn; // 用完丢掉
    return result;
}

// 3. 手动实现bind
Function.prototype.bind = function (thisArg) {
    thisArg.fn = this || window;
    const f = thisArg.fn;
    delete thisArg.fn;
    let args = [...arguments].slice(1);
    return function () {
        let arg = args.concat(...arguments);
        f(arg);
    }
}

// 防抖
const debounce = (func, time) => {
    if (Function.prototype.toString.call(func) !== '[object Function]') {
        return;
    }
    let timeout;
    return function() {
        if(timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(this, arguments);
        }, time);
    }
}

// 节流
const throttle = (func, time) => {
    if (Function.prototype.toString.call(func) !== '[object Function]') {
        return;
    }
    let timeout;
    return function() {
        if(!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.call(this, arguments);
            }, time);
        }
    }
}

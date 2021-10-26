// 1. 手动实现apply   参数是数组
// 使函数被传入的thisArg被调用，那么函数的this就指向调用者
Function.prototype.apply = function (thisArg, args) {
    // 给context添加一个方法 指向this
    thisArg.fn = this || window;
    let result = args ? thisArg.fn(...args) : thisArg.fn();
    delete thisArg.fn; // 用完丢掉
    return result;
}

// 2. 手动实现call   参数是一个一个
// 通过arguments获取参数列表
Function.prototype.call = function (thisArg) {
    // 给context添加一个方法 指向this
    thisArg.fn = this || window;
    let args = [...arguments].slice(1);
    let result = thisArg.fn(...args);
    delete thisArg.fn; // 用完丢掉
    return result;
}

// 3. 手动实现bind  参数是一个一个的
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

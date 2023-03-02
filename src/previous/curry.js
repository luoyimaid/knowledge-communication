// function progressCurrying(fn) {
//     let args = [];

//     return function () {
//         if (!arguments.length) {
//             return fn.apply(this, args);
//         }
//         else {
//             [].push.apply(args, [].slice.apply(arguments));
//             return arguments.callee;
//         }
//     };
// }

// const curry = (fn) =>
//     judge = (...args) => //
//         args.length >= fn.length
//             ? fn(...args)
//             : (...arg) => judge(...args, ...arg)

// function currying (fn) {
//     var _args = [];
//     return function () {
//         if (!arguments.length) {
//         return fn.apply(this, _args);
//         } else {
//         _args = [].slice.apply(arguments);
//         return arguments.callee;
//         }
//     }
//     }

function curry() {
    let fn = arguments[0];
    let args = Array.prototype.slice.call(arguments, 1);

    return function _format() {
        let _arg = Array.prototype.slice.call(arguments);
        _arg = _arg.concat(args);

        if (_arg.length < fn.length) {
            // return _format;
            return curry.apply(null, ([fn]).concat(_arg));
        }

        return fn.apply(null, _arg);
    };
}

let sum = curry(function (a, b, c) {
    return [...arguments].reduce((prev, curr) => prev + curr, 0);
});

console.log(sum(100)(200)(300));



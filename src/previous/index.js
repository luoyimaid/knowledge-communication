// /**
// *  函数防抖
// *  事件被触发一定时间后再执行回调，如果在这段时间内再次被触发，则重新计算时间
// *  @param {fn: function, delay: number}
// *  @returns function
// */

// const debounce = (fn, delay) => {
//     let timer = null;
//     return (...args) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.apply(this, args);
//         }, delay);
//     }
// };

// /**
// *  函数节流
// *  事件在一定时间内只触发一次，如果多次触发，只生效一次
// *  @param {fn: function, delay: number}
// *  @returns function
// */
// const throttle = (fn, time) => {
//     let timer = null;
//     return (...args) => {
//         if (!timer) {
//             timer = setTimeout(() => {
//                 timer = null;
//                 fn.call(this, args);
//             }, time);
//         }
//     }
// };

// /**
// *  深拷贝
// *  不只是对对象的引用
// *  @param obj: object
// *  @returns object
// */
// const deepClone = obj => {
//     let result = {};
//     if (obj === null || typeof obj !== 'object') {
//         return obj;
//     }
//     if (Object.prototype.toString.call(obj) === '[object Array]') {
//         result = [];
//     }
//     for(let key in obj) {
//         if (typeof obj[key] === 'object') {
//             result[key] = deepClone(obj[key]);
//         } else {
//             result[key] = obj[key];
//         }
//     }
//     return result;
// };

// const obj = {
//     a: {
//         b: '1'
//     },
//     c: '2'
// };
// const obj2 = deepClone(obj);
// obj2.d = '3';
// console.log(obj);
// console.log(obj2);

// // 用setTimeout实现setInterval
// const mySetInterval = (fn, time) => {
//     (function inner() {
//         const timer = setTimeout(() => {
//             fn();
//             clearInterval(timer);
//             inner();
//         }, time);
//     })();
// };
// let i = 10;
// mySetInterval(() => {
//     if (i > 0) console.log(i);
//     i--;
// }, 1000);

// // 用setinterval实现settimeout
// const mySetTimeout = (fn, time) => {
//     const timer = setInterval(() => {
//         clearInterval(timer);
//         fn();
//     }, time);
// };
// mySetTimeout(() => {
//     console.log(i);
// }, 6000);

// const arr = new Array(8);
// for(let i=0; i < arr.length; i++) {
//     arr[i] = new Array(i);
//     for (let j=0; j < i+1; j++) {
//         if (i===0 || j===0 || i===j) {
//             arr[i][j] = 1;
//         } else {
//             arr[i][j] = arr[i-1][j-1] + arr[i-1][j];
//         }
//     }
// }
// console.log(arr);


const tree = {
    value: '1',
    left: {
        value: '2',
        left: {
            value: '3',
        },
        right: {
            value: '4',
            left: {
                value: '5',
            },
            right: {
                value: '6',
            },
        },
    },
    right: {
        value: '7',
        left: {
            value: '8',
        },
        right: {
            value: '9',
        },
    },
};

let result = [];
let dfs = function (node) {
    if (node) {
        result.push(node.value);
        dfs(node.left);
        dfs(node.right);
    }
};

dfs(tree);
console.log(result);
// 高阶函数：可以接收另外一个函数作为参数或者返回值的函数
// 数组中的高阶函数
// 
// 1. map：接收两个参数，一个是回调函数，一个是this（可选）, 对原数组没有影响
// map都会用，那怎么样去实现一个map方法呢？
Array.prototype.map = function(callbackFn, thisArg) {
    // 处理this异常
    if(this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    if(Object.prototype.toString.call(callbackFn) !== '[object Function]') {
        throw new TypeError("callbackFn is not a function");
    }

    let o = Object(this);
    let t = thisArg;

    let length = o.length;
    let array = new Array(length);

    for(let k = 0; k < length; k++) {
        if(k in o) {
            let value = o[k];
            // 依次传入this, 当前项，索引，整个数组
            let mappedValue = callbackFn.call(t, value, k, o);
            array[k] = mappedValue;
        }
    }
    return array;
};

let array = [1, 2, 3, 4, 5];
let mapArray = array.map((item, index) => {
    console.log(item, index);
    return item * index;
});

console.log(mapArray);

// 2. reduce: 计算数组元素的总和，接收两个参数，一个是回调函数，一个是初始值，
// 回调中默认三个参数，依次为积累值，当前值，当前索引，整个数组

Array.prototype.reduce = function(callbackFn, currentValue) {
    // 处理this异常
    if(this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    // 处理回调异常
    if(Object.prototype.toString.call(callbackFn) !== '[object Function]') {
        throw new TypeError("`${callbackFn}` is not a function");
    }
    let o = Object(this);
    let accumulator = currentValue;
    let k = 0;
    if(accumulator === undefined) {
        for(; k < o.length; k++) {
            // 查找原型链
            if(k in o) {
                accumulator = o[k];
                k++;
                break;
            }
            // 数组循环完还没有出逻辑，说明数组是空数组
            throw new Error('empty array');
        }
    }
    for(; k < o.length; k++) {
        if(k in o) {
            accumulator = callbackFn.call(undefined, accumulator, o[k], k, o);
        }
    }
    return accumulator;
}
let reduceArray = array.reduce((preNum, curNum) => {
    return preNum + curNum;
});
console.log(reduceArray);

// 3. filter: filter返回一个新的数组，数组里包含参数里所有被保留的项
// 这个方法只接收一个参数，就是数组的当前项,回调函数返回一个布尔类型，来决定当前参数的去留
Array.prototype.filter = function(callbackFn, thisArg) {
    // 处理this异常
    if(this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    // 处理回调异常
    if(Object.prototype.toString.call(callbackFn) !== '[object Function]') {
        throw new TypeError("`${callbackFn}` is not a function");
    }
    let o = Object(this);

    // 新数组
    let length = 0;
    let array = [];
    for(let i = 0; i < o.length; i++) {
        if(i in o) {
            if(callbackFn.call(thisArg, o[i], i, o)) {
                array[length++] = o[i];
            }
        }
    }
    return array;
}
let filterArray = array.filter(item => item % 2);
console.log(filterArray);

// --------------------------------
// 数组去重
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];

// 通过set方法去重：set的成员值都是唯一的，但是不包括空对象，所以用来去重的话不会去重空对象
const uneque = (arr) => {
    return [...new Set(arr)]
}
// 通过splice方法去重：splice可以改变原数组，去掉数组的元素，第二个参数表示从第一个参数开始向后去除几个元素
// 这种方法需要双重循环，遍历目标元素后面的所有元素，找到相同元素并去除
const uneque = (arr) => {
    if (!Array.isArray(arr)) {
        console.log('not a array');
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length; j++) {
            if(arr[i] === arr[j]) {
                arr.splice(j, 1);
            }
        }
    }
    return arr;
}
// 通过indexof方法去重, 新声明一个数组元素，遍历arr，array里不存在遍历的当前元素时，给array添加这个元素
const uneque = (arr) => {
    if (!Array.isArray(arr)) {
        console.log('not a array');
        return;
    }
    let array = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {  
            array.push(arr[i]);
        }
    }
    return array;
}
// 通过sort方法去去重，先排序，然后新定义一个数组，初始值为排序后的第一项，然后从第二项开始遍历arr
// 将不重复的值放到array里,这种方法不会去除NAN
const uneque = (arr) => {
    if (!Array.isArray(arr)) {
        console.log('not a array');
        return;
    }
    arr = arr.sort((a, b) => {
        return a - b;
    });
    let array = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {  
            array.push(arr[i]);
        }
    }
    return array;
}
// 通过includes方法去重，includes是用来检测数组里是否含有某个值
const uneque = (arr) => {
    if (!Array.isArray(arr)) {
        console.log('not a array');
        return;
    }
    let array = [];
    for (let i = 0; i < arr.length; i++) {
        if (!array.includes(arr[i])) {  
            array.push(arr[i]);
        }
    }
    return array;
}
uneque(arr);
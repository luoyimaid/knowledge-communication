### 1. apply/call/bind
```
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
```

### 2. 防抖&节流
```
// 实现函数节流：间隔时间执行（比如间隔一秒执行一次）
function throttle(func, time) {
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
// 实现函数防抖：一段时间内只执行一次，这段时间内再次被触发时重新计算时间
function debounce(func, time) {
    let timeout;
    return function () {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(this, arguments);
        }, time);
    }
}
```

### 3. setTimeout & setInterval互相实现
```
// 用settimeout实现setinterval
const mySetInterval = (callback, time) => {
	(function inner() {
		const timer = setTimeout(() => {
			callback();
			clearInterval(timer);
			inner();
		},time);
	})()
};
mySetInterval(() => {
	if(i>0) console.log(i);
	i--;
}, 50);
// 用setinterval实现settimeout
const mySetTimeout = (callback, time) => {
    const timer = setInterval(() => {
        clearInterval(timer);
        callback();
    }, time)
}
```

### 4. promise
```
const PENDING = 'pending';
const REJECTED = 'rejected';
const FULFILLED = 'fulfilled';
function myPromise (executor) {
    // 绑定this，设置初始值
    let self = this;
    self.value = null;
    self.error = null;
    self.status = PENDING;
    self.onRejected = [];
    self.onFulfilled = [];
    // 添加resolve方法，延时回调
    const resolve = (value) => {
        if (self.status !== PENDING) return;
        setTimeout(() => {
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilled.forEach(callback => {
                callback(self.value);
            });
        },200);
    }
    // 添加reject方法，延时回调
    const reject = (error) => {
        if (self.status !== PENDING) return;
        setTimeout(() => {
            self.status = REJECTED;
            self.error = error;
            self.onRejected.forEach(callback => {
                callback(self.value);
            });        
        },200);
    }
    // 把成功和失败回调传给目标方法
    executor(resolve, reject);
}
myPromise.prototype.then = (onFulfilled, onRejected) => {
    let self = this;
    let bridgePromise;
    // 成功回调不传给它一个默认函数
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
    // 对于失败回调直接抛错
    onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };

    // 如果x是一个promise，那么久拆解这个promise，直到返回值不为promise；
    // 如果不是一个promise，直接resolve即可
    function resolvePromise(bridgePromise, x, resolve, reject) {
        //如果x是一个promise
        if (x instanceof MyPromise) {
            // 拆解这个 promise ，直到返回值不为 promise 为止
            if (x.status === PENDING) {
                x.then(y => {
                    resolvePromise(bridgePromise, y, resolve, reject);
                }, error => {
                    reject(error);
                });
            } else {
                x.then(resolve, reject);
            }
        } else {
            // 非 Promise 的话直接 resolve 即可
            resolve(x);
        }
    }
    if (this.status === PENDING) {
        this.onRejected = onRejected;
        this.onFulfilled = onFulfilled;
    } else if (this.status === FULFILLED) {
        return bridgePromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    x = onFulfilled(self.value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            }, 200);
        });
    } else {
        return bridgePromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    x = onRejected(self.value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                } 
            });
        });   
    }
}
myPromise.prototype.finally = callback => {
    return this.then(value => {
        myPromise.resolve(callback()).then(() => {
            return value;
        });
    }, err => {
        myPromise.reject(callback()).then(() => {
            return err;
        });
    });
}
myPromise.all = function (promise) {
    let result = [];
    let length = promise.length;

    if (length === 0) {
        resolve(result);
        return;
    }

    for (let i = 0; i < length; i++) {
        myPromise.resolve(promise[i]).then(data => {
            ((data, i) => {
                result[i] = data;
                if (i === length - 1) {
                    resolve(result);
                }
            })(data, i);
        }).catch(err => {
            reject(err);
        });
    }
}
```

### 5. 排序
```
// 冒泡排序
// i 遍历外层数组，j 遍历内层数组，判断每一对相邻元素，如果是正序，那么第一个比第二个大时，则交换元素
// 时间复杂度: 最好的情况：O(n);最坏的情况：O(n2);空间复杂度：O(1)，稳定性：稳定
const bubbleSort = arr => {
    let i = arr.length - 1;
    while (i) {
        let temp = 0;
        let target = 0;
        for(let j = 0; j < i; j++) {
            if(arr[j] > arr[j+1]) {
                temp = j;
                target = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = target;
            }
        }
        i = temp;
    }
    return arr;
}
bubbleSort(arr);

// 快速排序：使用分治法来把一个串分为两个子串,然后递归排到最小原子再返回
// 时间复杂度：O(n logn); 空间复杂度：O(log n); 稳定性：不稳定
let quickSort = arr => {
    console.time('2.快速排序耗时');
    if(arr.length <= 1) {
        return arr;
    }
    let prov = arr.splice(parseInt(arr.length / 2), 1)[0];
    let left = [];
    let right = [];
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] <= prov) {left.push(arr[i]);}
        else {right.push(arr[i]);}
    }
    console.time('2.快速排序耗时');
    return quickSort(left).concat([prov], quickSort(right));
}
quickSort(arr);

// 选择排序：从未排序的的数组中找到最小的元素，放在未排序的起始位置
// 时间复杂度：O(n^2); 空间复杂度：O(1); 稳定性：不稳定
const selectSort = arr => {
    console.time('2.选择排序耗时');
    let minIndex = 0;
    let temp;
    for(let i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        for(let j = i + 1; j < arr.length; j ++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // 寻找最小的数&保存最小数的索引
            }
        }
        // 把最小的数放在未排序第一位
        temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
    console.time('2.选择排序耗时');
    return arr;
}
selectSort(arr);
// 插入排序: 默认第一个元素已经排序，然后从第二个元素开始取元素,i指向无序的数组，j指向有序的数组
// 在已经排序的序列中从后向前查找，如果已经排序的这个元素大于新元素，那已排序的序列从该元素开始就都向后移动一位
// 时间复杂度：最好情况：O(n),最坏情况：o(n2)，稳定性：稳定; 空间复杂度：O(1)
const insertSort = arr => {
    for(let i = 1; i < arr.length; i++) {
        let j = i - 1;
        let key = arr[i];
        while(j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
    return arr;
}
insertSort(arr);
```

### 6. deepClone
```
const deepClone = obj => {
    let result = {};
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const typeObj = Object.prototype.toString.call(obj);
    if (typeObj === '[object Array]') {
        result = [];
    }
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            result[key] = deepClone(obj[key]);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}
```

### 7. map & filter & reduce
```
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

    let length = o.length >>> 0;
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
```

### 8. 数组去重
```
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
```

### 9. 继承
```
// <!--class 继承-->
class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}
class Child extends Parent {
  constructor(value) {
    super(value)
  }
}
let child = new Child(1)
child.getValue() // 1
child instanceof Parent // true

// <!--组合继承-->
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}
function Child(value) {
  Parent.call(this, value)
}
Child.prototype = new Parent()

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```

### 10. 发布订阅
```
// 发布-订阅模式
class Observer {
    constructor (fn) {
        this.unpdate = fn;
    }
}
class Subject {
    constructor () {
        this.observer = [];
    }
    // 往观察者队列里添加观察者
    addObserver (observer) {
        this.observer.push(observer);
    }
    // 通知观察者
    notify() {
        this.observer.forEach((observer) => {
            observer.update();
        });
    }
}
let subject = new Subject();
const update = () => {
    console.log('监听被观察者');
}
let observer = new Observer(update);
subject.addObserver(observer);
```

### 11. 函数科里化
```
// 函数科里化
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}

add(1)(2)(3)                // 6
add(1, 2, 3)(4)             // 10
add(1)(2)(3)(4)(5)          // 15
add(2, 6)(1) 
```
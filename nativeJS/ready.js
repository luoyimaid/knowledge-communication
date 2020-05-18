// 短轮训
// http 短轮询是server收到请求不管是否有数据到达都直接响应http请求，
// 服务端响应完成，就会关闭这个TCP连接；
// 如果浏览器收到的数据为空，则隔一段时间，浏览器又会发送相同的http请求到server以获取数据响应
const xhr = new XMLHttpRequest();
const id = setInterval(() => {
    xhr.open('GET', 'https://www.baidu.com');
    xhr.addEventListener('load', function(e) {
        if (xhr.status === 200) {
            // 处理数据
            console.log(xhr.response);
            clearInterval(id);
        }
    });
}, 200);

let i = 10;

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

// 创建对象
// 1. 字面量
let obj = {};
// 2. new Object
let obj = new Object();
// 3. 构造函数
let a = function (name) {
    ///
}
let obj = new a();
// 4. object.create
let obj = Object.create();

// 自己实现instanceof: 判断实例是否属于某一个构造函数
function _instanceof (leftvalue, rightvalue) {
    let rightproto = rightvalue.prototype;
    leftvalue = leftvalue.__proto__;
    while(true) {
        if(leftvalue === null) return false;
        if(leftvalue === rightproto) return true;
        leftvalue = leftvalue.__proto__;
    }
}
let left = new Object({});
_instanceof(left, Object);

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
function run1 () {
    console.log('点击执行函数防抖');
}
function run2 () {
    console.log('点击执行函数节流');
}
// document.onclick = debounce(run, 1000);
document.onmousemove = throttle(run2, 200);

let arr = [3,2,5,8,4,7,6,9];


let a;
const b = new Promise((resolve, reject) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
}).then(() => {
  console.log('promise3');
}).then(() => {
  console.log('promise4');
});

a = new Promise(async (resolve, reject) => {
  console.log(a);
  await b;
  console.log(a);
  console.log('after1');
  await a;
  resolve(true);
  console.log('after2');
}).then(() => {
    console.log('after3');
});
console.log('end');

// promise1
// undefined
// end
// promise2
// promise3
// promise4
// Promise {<pending>}
// after1

function Foo() {
    getName = function(){ 
        console.log(1);
    };
    return this;
}
Foo.getName = function() {  console.log(2); };
Foo.prototype.getName = function(){  console.log(3); };
var getName = function() {console.log(4); };
function getName(){ console.log(5); }

Foo.getName(); // 2
getName(); // 4
Foo().getName(); // undefined
getName(); // 1
new (Foo.getName)(); // 2
(new Foo()).getName(); // 3

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
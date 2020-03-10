**ES6生成器**：是一种新的函数类型，不符合一单开始就运行到结束的常规函数特性

#### 1. 生成器的基础1：打破完整运行
 - ES6中指示暂停点的语法是yield，礼貌的表达了一种合作式的控制
 - 生成器的格式：`function *foo(){}`
 - 生成器就是一类特殊的函数，可以一次或者多次启动或停止，并不一定要完成

> 一个简单的例子
```
var x = 1;
function *foo() {
    x++;
    yield;
    console.log('x: ', x);
}
function bar(){
    x++;
}
// 构造一个迭代器it来控制生成器
var it = foo();
it.next();   // 启动生成器
console.log(x);   // 2
bar();
cosole.log(x);    // 3
it.next()   // x: 3
```
- `it.next()`指示生成器`*foo(...)`从当前位置开始继续运行，停在下一个yield处或者生成器结束
- `next()`的调用结果是一个对象，有一个value属性，持有从 *foo()返回的值。即yield会导致生成器在执行过程中发送一个值，有点类似于return
#### 1.1 输入和输出
 - 生成器是特殊的函数，也具有函数的特性，即也可以传参（输入）和具有返回值（输出）
 1. 迭代消息的传递：生成器具有一个内建消息输入输出的能力
 > 一个简单的例子
 ```
 function *foo(x) {
     var y = x * (yield);
     return y;
 }
 var it = foo(6);
 // 第一个next总是启动生成器
 it.next();
 var res = it.next(7);
 res.value;     // 42
 ``` 
 2. 通过yield和next建立双向消息传递
 > 一个简单的例子
 ```
 function *foo(x) {
     var y = x * (yield 'hello');    // yield一个值
     return y;
 }
 var it = foo(6);
 var res = it.next();
 res.value;     // 'hello'
 res = it.next(7);
 res.value;     // 42
 ```
 #### 1.2 多个迭代器
 - 每次构建一个迭代器，实际上就隐式的构建了一个生成器的实例，所以迭代器控制的是生成器的实例
 1. 多个迭代器可以同时运行，甚至彼此交互
 > 一个小示例
 ```
 function *foo(){
     var x = yield 2;
     z++;
     var y = yield(x * z);
     console.log(x,y,z);
 }
 var z = 1;
 // 
 var it1 = foo();
 var it2 = foo();
 // 
 var val1 = it1.next().value;   // 2
 var val2 = it2.next().value;   // 2
 // 
 val1 = it1.next(val2 * 10).value;     // 40,  此时x:20,z:2
 val2 = it2.next(val1 * 5).value;   // 600, 此时x:200,z:3
 //
 it1.next(val2 / 2);    // 20, 300, 3
 it2.next(val1 / 4);    // 200, 10, 3
 ```
 2. 两个生成器方法交替执行：
 旨在理解多个生成器再共享作用域上的并发运行
 > 一个简单的示例（其实不简单）
 ```
 function *foo() {
     a++;
     yield;
     b = b * a;
     // yield b就是yield发出时的值
     a = (yield b) + 3;
 }
 //
 function *bar() {
     b--;
     yield;
     a = (yield 8) + b;
     b = a * (yield 2);
 }
 // 构建一个辅助函数，用于控制迭代器
 function step(gen) {
     var it = gen();
     var last;
     //
     return function() {
         // 不管yield出来的是什么，下次都原样的传回去 
         last = it.next(last).value;
     }
 }
 //
 var a = 1;
 var b = 2;
 //
 var s1 = step(foo);
 var s2 = step(bar);
 //
 s2();  //执行b--,此时b=1
 s2();  //yield 8  
 s1();  //a++ ,结果a=2
 s2();  //a=8+b; yield 2;结果a=9
 s1();  //b=b*a; yield b;结果b=9
 s1();  //a=b+3;结果a=12
 s2();  //b=a*2;结果b=18
 ```
 ------
 
 #### 2. 生成器的基础2：生成器与迭代器
 - 迭代器是一个定义良好的接口，用于从一个生产者一步步得到一系列值。迭代器的接口，即是想要从生产者得到下一个值得时候调用next()
 > 一个标准的数字序列生成器的迭代器接口
```
// something是一个标准的迭代器对象
var something = (function(){
    var nextval;
    return {
        // for...of循环需要，构建一个iterable
        [Symbol.iterator]: function() {
            return this;
        },
        // 一个标准的迭代器接口
        next: function() {
            if(nextval === undefined) {
                nextval = 1;
            } else {
                nextval = (nextval * 3) + 6;
            }
            return {
                done: false,
                value: nextval
            }
        }
    }
})();
// 通过for...of...原生循环语法自动迭代标准迭代器
// for...of...循环向something请求迭代器，它期望something是一个iterable，所以寻找并调用它的Symbol.iterator方法
for(var v of something) {
    console.log(v); // 1, 9, 33, 105, 321, 969
    if(v > 500) {
        break;
    }
}
// 手工for循环,结果同上
for(
    var ret;
    (ret = something.next()) && !ret.done;
) {
    console.log(v); // 1, 9, 33, 105, 321, 969
    if(v > 500) {
        break;
    }
}
```
- `[ ... ]`语法：计算机属性名，指定一个表达式，并用这个表达式的结果作为属性的名称
- `Symbol.iterator`是ES6预定义的一个特殊的symbol值之一
> 科普**iterable**
>> 1. iterable: **指一个包含可以在其值上迭代的迭代器对象**  
>>2. 从iterable中提取迭代器的方法：**iterable必须支持一个函数，即专门的ES6符号值`Symbol.iterator`，通常每次调用时，会返回一个全新的迭代器**

##### 1. 生成器&迭代器
-   生成器本身并不是iterable，执行一个生成器的时候，就得到了一个迭代器
-   生成器会在每个yield处暂停，函数的状态（作用域）会被保持，所以就意味着不需要闭包在调用之间保持变量状态
> 通过生成器实现前面的something无限序列数字生产者
```
function *something() {
    var nextval;
    // 如果没有break等终止语句，有可能阻塞或锁住浏览器UI
    while(true) {
        if(nextval === undefined) {
            nextval = 1;
        } else {
            nextval = (nextval * 3) + 6;
        }
        // 通过yield使得while..true..语句任意使用
        yield nextval;
    }
}
// for..of..循环的异常结束，会向生成器的迭代器发送一个信号使其终止，一般是由break, return或者未捕获到异常引起，不会使生成器的迭代器实例一直处于挂起状态
for(var v of something()) {
    console.log(v); // 1, 9, 33, 105, 321, 969
    if(v > 500) {
        break;
    }
}
```
- 上述代码中something是生成器，而不是iterable，所以需要调用一个something()来构造一个生产者供for..of..迭代
- 生成器的迭代器也是一个iterable
##### 2. 停止生成器
- 若要使迭代器手工发送终止信号，可以通过调用return(...)来实现这一点

```
function *something() {
    // 如果需要清理资源的话，比如数据库连接等，使用try..finally语句则会非常有用
    try {
        var nextval;
        while(true) {
            if(nextval === undefined) {
                nextval = 1;
            } else {
                nextval = (nextval * 3) + 6;
            }
            // 
            yield nextval;
        }
    }
    // 清理语句
    finally {
        console.log('cleaning up');
    }
}
// 虽然for..of循环内部的break语句会触发finally语句，但是也可以通过外部return来手动终止生成器的迭代器实例
var it = something();
for(var v of it) {
    console.log(v);
    if(v > 500) {
        console.log(
            // 立即终止生成器，完成生成器的迭代器
            it.return('end').value
        );
    }
}
```
------

> #### 从第三节开始，便深入生成器在异步编码中的用法，开始了它的真正常用场景
------

#### 3. 异步迭代生成器

> 通过生成器来表达异步流程控制
```
function foo(x, y) {
    ajax(
        "http://www.baidu.com?x=" + x + "&y=" + y,
        function(error, data) {
            if(error) {
                // 向*main()抛出一个错误
                it.throw(error);
            } else {
                // 用收到的data恢复*main()
                it.throw(data);
            }
        }
    );
}
function *main() {
    try {
        // 这里的yield是用于进行流程控制实现阻塞或者暂停，yield的暂停也可以使得生成捕获错误
        var ret = yield foo(11, 31);
        console.log(ret);
    } catch (err) {
        console.log(err);
    }
}
var it = main();
it.next();
it.next(data);
```
- 在生成器内部有了看似完全同步的代码，但是在foo内的运行完全可以异步
- 从本质上而言，上述代码实际上是把异步操作部分抽离了出去，使得我们可以以同步顺序的形式追踪流程控制

#### 4. 生成器&promise
- 生成器&promise的结合会碰撞出怎样的火花呢
```
// 假设foo方法是支持promise的
function foo(x, y) {
    return request("http://www.baidu.com?x=" + x + "&y=" + y,);
}
// 同上个Demo，这里的生成器没有改变
function *main() {
    try {
        // 这里的yield是用于进行流程控制实现阻塞或者暂停，yield的暂停也可以使得生成捕获错误
        var ret = yield foo(11, 31);
        console.log(ret);
    } catch (err) {
        console.log(err);
    }
}
// 实现接收&连接yield出来的promise
var it = main();
var val = it.next().value;
//等待promise val的决议
val.then(
    function (data) {
        it.next(data);
    },
    function (error) {
        it.throw(error);
    }
);
```
- 上述代码里，我们默认生成器中只有一个需要支持的promise，所以这么写是OK的，那如果有多个操作需要promise支持呢？并且不可能每写一个生成器，就写一个promise链
- 所以我们这里可以自己去实现一个工具类库run()，使得不同的生成器通过调用run方法遍可以运行`promise-yielding`生成器
```
function run(gen) {
    var args = [].slice.call(arguments, 1);
    var it;
    // 在当前上下文中初始化生成器
    it = gen.apply(this, args);
    // 返回一个promise用于生成器完成
    return Promise.resolve().then(function handleNext(value) {
        // 运行下一个yield出的值
        var next = it.next(value);
        return (function handleResult(next) {
            // 如果生成器运行完毕
            if(next.done) {
                return next.value;
            } else {
                // 成功就恢复异步循环，把决议值发回生成器，如果value是被拒绝的promise，就把错误传回生成器，进行错误处理
                return Promise.resolve(next.value).then(handleNext, function handleError(error){
                    return Promise.resolve(it.throw(error)).then(handleResult);
                });
            }
        })(next);
    });
}
```
```
// 使用封装好的工具类之后，就不需要手动promise了
function *main() {
    ///
}
run(main);
```
> 科普async&await
>> 1. 其实就是把前面推导出来的生成器+promise模式写进规范，不再需要声明生成器函数了，而是被async函数取代，不再yield promise，而是用await等待它的决议
>> 2. 一个简单的示例,作用同上
```
// foo方法同上
async function main() {
    try {
        var text = await foo(11, 31);
        console.log(text);
    } catch (error) {
        console.error(error);
    }
}
main();
```
##### * 生成器中的promise并发
- 生成器中的promise并发执行，最完美的解决方法便是使用promise的并发能力，并且将异步的细节尽可能的抽离出来，不然就失去了一开始就使用生成器的理由
```
function bar(url1, url2) {
    Promise.all([request(url1), request(url2)]);
}
function *foo() {
    var result = yield bar('url1', 'url2');
    var r1 = result[0];
    var r2 = result[1];
    var r3 = yield request('url3?v=' + r1 + ',' + r2);
    console.log(r3);
}
// 使用前面定义的工具类run
run(foo);
```

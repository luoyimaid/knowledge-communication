> 这个问题的本质有两个：原型对象是什么？原型链是如何形成的？

#### 1. 原型对象
    ★ 绝大部分函数都有一个`prototype`的属性,这个属性是原型对象用来创建新的对象实例
    ★ 所有新创建的对象都会共享原型对象，也可以随意访问原型对象的属性
```
<!--example-->
let person = {
    name: "Messi",
    age: 29,
    profession: "football player"
  };
console.log(person.hasOwnProperty("name")); //true
console.log(person.hasOwnProperty("hasOwnProperty")); //false
console.log(Object.prototype.hasOwnProperty("hasOwnProperty")); //true
```
- 由以上可知，`hasOwnProperty`并不存在于`person`对象中，但`person`对象是`object`原型对象的实例，所以可以访问`object`的`hasOwnProperty`方法
- **person是靠原型链找到object里的方法的**

#### 2. 原型链
    ★ 每个对象都有 __proto__ 属性，此属性指向该对象的构造函数的原型。
    ★ 对象可以通过 __proto__与上游的构造函数的原型对象连接起来，而上游的原型对象也有一个__proto__，这样就形成了原型链。
![图片](https://img-blog.csdn.net/20171212152915566?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbWFpZF8wNA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
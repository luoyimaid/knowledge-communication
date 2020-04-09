---
title: react virtual DOM 
date: 2020-04-10 01:24:23
tags: react相关
---

#### ⭐ virtual DOM 是什么？
- virtual DOM实际上是浏览器端通过JS实现的一套DOM API（为了解决频繁的数据更新引来的性能问题）
- 基于react进行开发时，所有的DOM树都是通过virtual DOM构造的，react的所有工作都是基于virtual DOM来完成的
- react 在virtualDOM上实现了diff算法，数据更新时，会通过diff来寻找更新节点，只对变化的部分进行浏览器的DOM更新
- 因为virtual DOM只是一个JS 对象，而且面对原生DOM进行操作的只是数据变更的节点，所以能够达到提高性能的目的

构建一个简易的virtual DOM，只需要具备一个DOM标签所需要的基本元素即可
```
// eg
let reactDOM = {
    tagName: 'div',
    properties: {
        style: {}
    },
    children: [],
    key: 1
}
```
------
#### ⭐ virtual DOM的节点类型
- virtual DOM中的节点称为react DOM，分为reactElement，reactFragment，reactText
- 其中reactElement又分为reactComponentElement，reactDomElement
- 可以用代码描述
```
reactNode = reactElement | reactFragment | reactText;
reactElement = reactComponentElement | reactDomElement;
reactDomElement = {
    type: String,
    props: {
        children: reactNodeList,
        style: String,
        etc
    },
    key: String | Boolean | Number | null,
    ref: String | null
};
reactComponentElement<Tprops> = {
    type: ReactClass<Tprops>,
    peops: Tprops,
    key: String | Boolean | Number | null,
    ref: String | null
};
reactFragment = Array<reactNode | reactEmpty>;
reactText = String | Number;
reactNodeList = reactNode | reactEmpty;
reactEmpty = null | undefined | Boolean;
```
------
#### ⭐ **怎么样可以实现一个virtual DOM呢？分为以下几步**
1. 创建react元素；
2. 初始化组件入口；
3. 创建文本组件
4. 创建DOM标签组件
5. 自定义组件
6. 最后在有数据或者DOM更新时，使用diff算法去寻找变更的virtual DOM更新到真实DOM中（这里的diff算法稍后再说）
------
    接下来伪代码简要概述实现过程
#### 1. 创建react元素: 通过JSX创建的虚拟元素最终都会被编译成调用react的creatElement方法
- creatElement只是做了简单的参数修正，返回一个reactElement(虚拟元素)实例
```
reactElement.creatElement = function() {
    // a. 初始化参数
    let propName, props, key, ref, self, source;
    // b. 如果config存在，提取里面的内容
    if(config) {
        // 提取config的内容，config.ref, config.key等
        // 复制config里面的内容到props（id, className）
    }
    // c. 处理children，全部挂载到props的children属性上
    let childrenLength = arguments.length - 2;
    if(childrenLength === 1) {
        // 如果只有一个参数，直接赋值
    } else if(childrenLength > 1) {
        // 合并处理
        let childrenArray = Array(childrenLength);
        props.children = childrenArray;
    }
    // d. 返回一个reactElement实例对象
    return reactElement(type, key, ref, self, source, reactCurrentOwner.current, props);
}
```

#### 2. 初始化组件入口: 当react组件初始化时，会调用初始化函数instantiateReactComponent
- instantiateReactComponent这个函数通过判断node类型来区分不同的组件入口
```
function instantiateReactComponent(node, compositeType) {
    let instance;
    if(node === null || node === false) {
        // node为空时，初始化空组件
    }
    if(typeof node === 'object') {
        // node是对象时，是DOM标签组件/自定义组件
        if(typeof Element.type === 'string') {
            // element类型为字符串时，初始化DOM标签组件
        } else {
            // 初始化自定义组件
        }
    }
    if (typeof node === 'string' || typeof node === 'number') {
        // 初始化文本组件
    }
    // 其他类型不做处理
    return instance;
}
```

#### 3. 创建文本组件：创建组件 -- 判断创建方式 -- 更新文本内容
- 通过createElement来创建的文本组件，会被带上标签和domID，否则直接返回文本内容
```
// 1. 通过createElement来创建的文本组件，会被带上标签和domID，否则直接返回文本内容
let ReactDOMTextComponent = function (next) {
    // 先保存当前的文本字符
    // 再给文本字符添加属性
}
// 2. 给ReactDOMTextComponent的原型添加mountComponent方法，判断创建方式
Object.assign(ReactDOMTextComponent.prototype, {
    mountComponent: function(transaction, nativeParent, nativeContainerInfo, context) {
        // 如果使用createElement来创建文本标签，该文本会带上标签和domId
        if(transaction.useCreatElement) {
            // 开始标签 -- 创建文本节点 -- 结束标签
            return '带标签的文本';
        } else {
            // 静态页面直接返回文本
            if(transaction.renderToStaticMarkup) {
                return ' ';
            }
            return '注释掉标签的文本内容'
        }
    }
});
// 3. 更新文本内容
reveiveComponent = function(nextComponent, transaction) {
    if(nextText !== this.currentElement) {
        // replace
    }
}
```

#### 4. 创建DOM标签组件: reactDOMComponent针对virtual DOM标签的处理主要分为以下两个部分：
    1. 属性的更新（包括样式更新，属性更新，事件处理等）
    2. 子节点的更新（包括更新内容，更新子节点，diff实现）
（源码实现有点多，大概节奏如上，还没来得及梳理...）

#### 5. 自定义组件: 
    reactCompositeComponent自定义组件实现了一整套的react生命周期和setState机制
    即自定义组件是在生命周期的环境中进行的更新属性，内容和子节点的操作，与reactDOMComponent类似

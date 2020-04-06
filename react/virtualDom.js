// virtual DOM实际上是浏览器端通过JS实现的一套DOM API（为了解决频繁的数据更新引来的性能问题）
// 基于react进行开发时，所有的DOM树都是通过virtual DOM构造的，react的所有工作都是基于virtual DOM来完成的
// react 在virtualDOm上实现了diff算法，数据更新时，会通过diff来寻找更新节点，只对变化的部分进行浏览器的DOM更新

// 因为virtual DOM只是一个JS 对象，而且面对原生DOM进行操作的只是数据变更的节点，所以能够达到提高性能的目的

// 构建一个简易的virtual DOM，只需要具备一个DOM标签所需要的基本元素即可
// eg
let reactDOM = {
    tagName: 'div',
    properties: {
        style: {}
    },
    children: [],
    key: 1
}
// virtual DOM中的节点称为react DOM，分为reactElement，reactFragment，reactText
// 其中reactElement又分为reactComponentElement，reactDomElement
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
reactComponentElement = {
    type: ReactClass,
    peops: Tprops,
    key: String | Boolean | Number | null,
    ref: String | null
};

// 实现一个virtual DOM
// 1. 创建react元素
// 2. 初始化组件入口
// 3. 创建文本组件
// 4. 创建DOM标签组件
// 5. 自定义组件
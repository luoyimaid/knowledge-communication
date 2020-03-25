#### 1. mixin：抽象公共方法
##### ⭐ 为什么使用mixin
    mixin，是将一个模块混入另外一个模块/类中。引入mixin，是为了创造一种类似多重继承的效果。
##### ⭐自己封装一个mixin方法
    对于广义的mixin方法，就是用赋值的方法将mixin对象里的方法都挂载到原对象中，来实现对对象的混入
    
```
const mixin = (obj, mixins) => {
    const newObj = obj;
    newObj.prototype = Object.creat(obj.prototype);
    for(let prop in mixins) {
        if(mixins.hasOwnProperty(prop)) {
            newObj.prototype[prop] = mixins[props];
        }
    }
    return newObj;
}
const bigMixin = {
    fly: () => {
        console.log('I can fly');
    }
}
const big = () => {
    console.log('new big');
}
const FlyBig = mixin(big, bigMixin);
const flyBig = new FlyBig();    // new big
flyBig.fly();   // I can fly
```
    通俗来讲，上述代码的作用是把任意多个源对象自身的可枚举属性复制给目标对象，再返回给目标对象。上述过程就像是在复制对象
##### ⭐ react中使用mixin
react在使用creatClass构建组件时提供了mixin属性。
```
react.creatClass = {
    mixin: []
    render() {
        return (
            <div>foo</div>
        )
    }
}
```
    在creatClass 对象参数中传入数组mixins，里面封装了我们需要的模块，mixins数组也可以增加多个mixin,并且其中的每一个mixin方法都有重合，对于普通方法和生命周期方法是有所区分的
    
    在不同的mixin里实现两个名字一样的普通方法，讲道理后一个是可以覆盖前一个方法的，但是在react中会报错，因为在react中是不允许存在重名普通方法的maxin
- creatClass实现的mixin为react组件实现了两件事
    1. 工具方法：mixin的基本功能
    2. 生命周期继承：props与state合并，比如有很多mixin来定义componentdidmount这个生命周期钩子，那么react会非常智能的把它们合并起来执行
##### ⭐ mixin的问题
1. 破坏了原有组件的封装：mixin方法会混入新的方法，给原有的组件带来新的特性，会需要很多不可见的状态需要去维护
2. 命名冲突：mixin是平面结构，不能在两个mixin里面使用同一个方法
3. 增加复杂性：mixin也有自己的生命周期方法

#### 2. 高阶组件 -- 取代mixin
高阶组件有两种实现方式：

    1. 属性代理：高阶组件通过被包裹的react组件来操作props
    2. 反向继承：高阶组件继承于被包裹的react组件
##### 1. 属性代理
```
const myContainer = (wrappedComponent) => {
    class extends Component {
        render() {
            return <wrappedComponent {...this.props} />
        }
    }
}
//
class myComponent extends Component {
    ///
}
export default myContainer(myComponent);
```
    当使用组件代理实现高阶组件时，执行生命周期的过程类似于堆栈调用
    高阶组件可以做到对组件的控制，包括props，通过refs使用引用，抽象state等
- 控制props

    我们应该尽可能的对高阶组件的props重命名以免混淆。对于原组件来说，只要套用这个高阶组件，我们的新组件中就会多一个text的prop
```
const myContainer = (wrappedComponent) => {
    class extends Component {
        render() {
            const newProps = {
                text: newText
            }
            return <wrappedComponent {...this.props} {...this.newProps} />
        }
    }
}
```
- 通过refs使用引用

    当wrappedComponent被渲染时，refs回调就会被执行，这样的话就会拿到wrappedComponent实例的引用，也会更方便的调用实例的方法
```
const myContainer = (wrappedComponent) => {
    class extends Component {
        proc(wrappedComponentTnstance) {
            wrappedComponentTnstance.method()
        }
        render() {
            const props = Object.assign({}, this.props, {
                this.refs.bind(this)
            });
            return <wrappedComponent {...this.props} />
        }
    }
}
```
- 抽象state

    通过wrappedComponent提供的props和回调抽象state，将原组件抽象成展示组件，分离内部状态
```
const myContainer = (wrappedComponent) => {
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                name: ''
            }
            this.onNameChange = this.onNameChange.bind(this);
        }
        onNameChange(event) {
            this.setState({
                name: event.target.value
            });
        }
        render() {
            const newProps = {
                name: {
                    value: this.state.name,
                    onChange: this.onNameChange
                }
            }
            return <wrappedComponent {...this.props} {...this.newProps} />
        }
    }
}
```
- 高阶组件与mixin的区别

    高阶组件符合函数式编程思想，对于原组件来说，并不会感知到高阶组件的存在
##### 2. 反向继承

#### 3. 组合式组件开发实践
1. 组件再分离
2. 逻辑再抽象

我们平时开发中就遵循这种逻辑，将组件拆分成最细化的原子组件，通过拆分组合的方式实现一个个功能组件，然后再基于高阶组件完成组件逻辑上的抽象


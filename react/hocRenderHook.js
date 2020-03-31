// 前两天刚看了HOC相关内容，所以今天就来对比分析HOC  render props  hook三种模式的区别
// 伪代码实现
// ps:hook是2020新出的一种模式,因为不太了解，所以会着重注释说明

// HOC：高阶组件
// 1. 创建一个方法，该方法接收一个组件作为参数，&除了组件，还可以接收其他参数
// 2. 基于该组件，可以返回一个不同的组件
// 优点：不影响组件内结构，降低耦合度
// 缺点：如果高阶组件和当前组件内数据定义相同，那么props会被覆盖
    // 解决：尽可能的对高阶组件的props重命名以免混淆，这样当前组件内就会多一个高阶组件的props
    // 但是这样的话，就会引入更多的props，比较难调试
const myContainer = (wrappedComponent, selectData) => {
    class extends Component {
        constructor() {
            super(props);
            this.state = selectData(data, props);
        }
        render() {
            return <wrappedComponent {...this.props} {...this.state.data} />
        }
    }
}
//
class myComponent extends Component {
    ///
}
export default myContainer(myComponent);

// render props: 把当前组件的state作为props传递给调用组件，由调用组件决定渲染
// 1. 接收一个外部传来的props属性
// 2. 将内部state作为props传递给调用组件
// 缺点：
    // 1. 显而易见，无法在return外访问数据
    // 2. 页面层级一多，容易形成嵌套地域...
class MyContainer extends Component {
    constructor() {
        super(props);
        this.state = {
            x: 0,
            y: 0
        }
    }
    render() {
        return <div>
            {this.props.render(this.state)}
        </div>
    }
}
// 调用
class myComponent extends Component {
    ///
    render() {
        <MyContainer render={container => (
            <p>{container.x} {container.y}</p>
        )} />
    }
}

// react hook：https://zh-hans.reactjs.org/docs/hooks-intro.html
// hook: react 16.8的新特性，可以在不编写class的情况下使用state，生命周期等react特性
// 特殊的钩子函数，是一些可以在函数组件里“钩入” React state 及生命周期等特性的函数
// 在无需修改组件结构的情况下复用状态逻辑
// 动机：解决上述模式的缺点，为共享状态逻辑添加更简单的原生方法
// hook与class平级，可以在非 class 的情况下可以使用更多的 React 特性，避免了class的一些缺点
// hook在class内部不起作用，但是可以用hook来代替class
// 优点：
    // 可以在return之外使用,也不会去嵌套使用
    // 避免了class组件的一些冗余的生命周期操作，并且可以把相关逻辑写在一起，分离不相关的逻辑
import React, {useState, useEffect} from 'react';
export const Example = (props) => {
    // 在函数组件中添加state的hook,等价于class组件中的this.setState
    const [count, setCount] = useState(0);
    const [isOnline, setIsOnline] = useState(null);
    // effect hook is Similar to componentDidMount and componentDidUpdate
    // useEffect可以实现关注点分离，把不相关的逻辑分离到不同的useEffect中
    // useEffect默认处理清除更新逻辑，在调用新的effect之前对前一个effect进行清理
    // 对于不需要清除的effect(即不需要componentWillUnmount)
        // useEffect默认每次渲染后都会执行
        // 每次渲染都会生成新的effect，来替换之前的effect
        // 使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕
    // 对于需要清除的effect
        // 可以返回一个函数，在组件卸载时调用,执行清除操作
    useEffect(() => {
        // 相当于componentDidMount and componentDidUpdate的实现
        document.title = `You clicked ${count} times`;
    }, [count]); // count：可选参数，旨在只有count改变时才会更新
    useEffect(() => {
        // 获取状态的方法 handler方法
        // 类似于componentDidMount，去订阅状态
        return () => {
            // 相当于componentWillUnmount，卸载组件
        }
    });
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
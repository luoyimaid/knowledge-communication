react组件间通信有四种通信方式：

    1. 父组件向子组件通信
    2. 子组件向父组件通信
    3. 无嵌套关系组件通信
    4. 跨级组件通信
    
- ##### 父组件向子组件通信


    父组件向子组件通信是我们经常见到的一种通信方式，通常是通过props向子组件传递需要的信息
```
// 子组件
class listItem extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <li>{this.props.value}</li>
        );
    }
}
//
// 父组件
import listItem from 子组件
class listItem extends Component {
    constructor(props) {
        super(props);
        this.state.list = [....];
    }
    render () {
        return (
            {
                list.map((item, index) => {
                    <listItem value={item.text}></listItem>
                })
            }
        );
    }
}
```
- ##### 子组件向父组件通信


    在父组件中设置接收函数和接收数据的state，同时在父组件通过props将函数名传回给子组件。其实就是子组件传入父组件的方法在子组件中调用
```
// 子组件
class listItem extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
        // 这里的方法就是父组件传入子组件的方法
            <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange}></input>
            <span>{this.props.value}</span>
        );
    }
}
//
// 父组件
import listItem from 子组件
class listItem extends Component {
    constructor(props) {
        super(props);
        // 这里的list是父组件的父组件传来的数据
        this.state.list = this.props.list.map(item => ({
            text: item.text,
            checked: item.checked || false
        }));
    }
    onItemChange (item) {
        const {list} = this.state;
        this.setState({
            list: list.map(prevItem => ({
                text: prevItem.text,
                checked: prevItem.text === item.text ? !prevItem.checked : prevItem.checked
            }))
        })
    }
    render () {
        return (
            {
                this.state.list.map((item, index) => {
                    <listItem value={item.text} checked={item.checked} onChange={this.onItemChange.bind(this, item)}></listItem>
                })
            }
        );
    }
}
```
    setState一般与回调函数成对出现，这是因为回调函数是转换内部状态时的函数系统

- ##### 跨级组件通信


    可以使用context实现跨级组件通信，是因为如果父组件定义了childContext，那么从这一层开始的子组件都可以拿到定义的context
    
    但是这样会使代码变得混乱，不知道context是从哪里传过来的，因为context可以看作是一个全局变量
    
    但是在一些比如真正意义的且不会更改的全局变量的情况下，使用context是比较合理的

- ##### 没有嵌套关系的组件通信


    没有嵌套关系的组件通信，只能通过一些影响全局的机制来实现，比如自定义事件机制
    
    但是我们在处理自定义事件时必须注意，组件挂载完成时再订阅事件，组件卸载时取消事件订阅
    
    但是一般不推荐这种通信方式，我们可以通过redux来实现数据通信，后面再谈
    
    

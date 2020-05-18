import React from 'react';
import './index.css';

export default class Head extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '罗怡',
            count: 0
        }
        // this默认是undefined，所以这里需要绑定this,修改函数的this指向
        // 需要写在初始化里而不是执行的时候绑定的原因是：写在这里只执行一次，不然每次执行时都会重新绑定
        // react性能优化的一个点
        this.clickHandler = this.clickHandler.bind(this);
    }
    // 这样写方法的时候，this是指向全局的，严格模式下为undefined，所以需要先进行this绑定
    clickHandler() {
        // 虽然写了三次，只执行了一次(传入对象会被合并)，执行结果是1
        // this.setState({
        //     name: '李四',
        //     count: this.state.count + 1
        // } );
        // this.setState({
        //     name: '李四',
        //     count: this.state.count + 1
        // });
        // this.setState({
        //     name: '李四',
        //     count: this.state.count + 1
        // });

        // 传入函数不会被合并,执行结果是3
        this.setState((prevState, props) => {
            return {
                count: prevState.count + 1
            }
        });
        this.setState((prevState, props) => {
            return {
                count: prevState.count + 1
            }
        });
        this.setState((prevState, props) => {
            return {
                count: prevState.count + 1
            }
        });
        console.log(this.state.count);
    }
    // 匿名函数的this永远指向创建它的实例，在这里就是当前组件，所以不需要绑定this
    clickHandler2 = () => {
        this.setState({
            name: '李四'
        });
    }
    clickHandler3 = (event) => {
        event.preventDefault(); // 阻止默认行为
        event.stopPropagation(); // 阻止冒泡
        // 这里的event不是原生的event，其实是react封装的,原生的event是MouseEvent
        // event.__proto__.constructor 是 SyntheticEvent(组合事件)
        console.log('event:', event);
        console.log('target', event.target);
        console.log('currentTarget', event.currentTarget);

        console.log('event.__proto__.__proto__:', event.__proto__.__proto__);
        console.log('event.__proto__.constructor:', event.__proto__.constructor);

        // event.nativeEvent 是原生的event
        console.log('nativeEvent:', event.nativeEvent);
        console.log('nativeEvent.target', event.nativeEvent.target);
        console.log('nativeEvent.currentTarget', event.nativeEvent.currentTarget);

        // react里的event是自己封装的SyntheticEvent合成事件，但是模拟出了DOM事件的所有能力
        // event.nativeEvent是原生事件, 并且所有的原生事件都被挂在document上
        // react event不同于DOM事件，也不同于vue
    }
    render () {
        const rawHtmlData = {
            __html: '<span>我是富文本<i>斜体</i><b>加粗</b></span>'
        }
        return <div>
            <div onClick={this.clickHandler}>
                {this.state.name}
                {this.state.count}
                <div dangerouslySetInnerHTML={rawHtmlData}></div>
            </div>
            <a href='https://www.baidu.com' onClick={this.clickHandler3}>--------</a>
        </div>;
    }
}
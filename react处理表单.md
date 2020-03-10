> 在web开发中，表单的使用尤其重要。正是因为表单的存在，才使用户能够与web应用进行富交互。在react中，一切数据都是状态，包括表单数据，所以我想深入了解一下react中是怎么处理表单的。
#### 1. 应用表单组件
------
> html中的所有表单组件在react的JSX都有相应的实现，只是在用法上有些区别，有些事因为JSX的语法，有些则是react对状态处理上导致的一些区别
##### 1. 文本框
> 这里的文本框包含input & textarea
```
import React, {Component} from 'react';
class App extends component {
    constructor {
        super(props);
        //
        this.hanleInputeChange = this.hanleInputeChange.bind(this);
        this.hanleTextareaChange = this.hanleTextareaChange.bind(this);
        //
        this.state = {
            inputValue: '',
            textareaValue: ''
        }
    }
    hanleInputeChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }
    hanleTextareaChange(e) {
        this.setState({
            textareaValue: e.target.value
        })
    }
    render() {
        const {inputValue, textareaValue} = this.state;
        return {
            <p>
                单行输入框
                <input type='text' value={inputValue} onChange={this.hanleInputeChange}/>
            </p>
            <p>
                多行输入框
                // html中，textarea的值是通过children来表示的，而由于JSX语法的特性，在标签没有子元素的情况下，可以使用标签字闭合的语法
                <textarea value={textareaValue} onChange={this.hanleTextareaChange}/>
            </p>
        }
    }
}
```
##### 2. 单选框 & 复选框
> input标签中的radio类型表示单选框，checkbox表示复选框，通过一个boolen类型的checked prop来表示是否是选中状态。在JSX中，用法还是同HTML有区别的
```
// 单选框示例
import React, {Component} from 'react';
class App extends component {
    constructor {
        super(props);
        //
        this.handleChange = this.handleChange.bind(this);
        //
        this.state = {
            radioValue: ''
        }
    }
    handleChange(e) {
        this.setState({
            radioValue: e.target.value
        })
    }
    render() {
        const {radioValue} = this.state;
        return {
            <div>
                <p>gender:</p>
                <label>
                    male:
                    <input type='radio' value='male' checked={radioValue === 'male'} onChange={this.hanleInputeChange}/>
                </label>
                <label>
                    female:
                    <input type='radio' value='female' checked={radioValue === 'female'} onChange={this.handleChange}/>
                </label>
            </div>
        }
    }
}
```
```
// 复选框示例
import React, {Component} from 'react';
class App extends component {
    constructor {
        super(props);
        //
        this.handleChange = this.handleChange.bind(this);
        //
        this.state = {
            coffee: []
        }
    }
    handleChange(e) {
        const {checked, value} = e.target;
        let {coffee} = this.state;
        if(checked && coffee.indexOf(value) === -1) {
            coffee.push(value); 
        } else {
            coffee = coffee.filter(i => i !== value);
        }
        this.setState({
            coffee
        })
    }
    render() {
        const {coffee} = this.state;
        return (
            <div>
                <p>选择你喜欢的咖啡:</p>
                <label>
                    <input type='checkbox' value='卡布奇诺' checked={coffee.indexOf('卡布奇诺') !== -1} onChange={this.hanleInputeChange}/>
                    卡布奇诺
                </label>
                <label>
                    <input type='checkbox' value='摩卡' checked={coffee.indexOf('摩卡') !== -1} onChange={this.handleChange}/>
                    摩卡
                </label>
                <label>
                    <input type='checkbox' value='拿铁' checked={coffee.indexOf('拿铁') !== -1} onChange={this.hanleInputeChange}/>
                    拿铁
                </label>    
                <label>
                    <input type='checkbox' value='冰美式' checked={coffee.indexOf('冰美式') !== -1} onChange={this.hanleInputeChange}/>
                    冰美式
                </label> 
            </div>
        );
    }
}
```
> 虽然看着好像代码边复杂了，但是对于HTML里面需要JS手动处理的部分，我们通过react对表单的状态就已经进行了控制，所以会相应的多出来一些处理onchange的代码
##### 5. select组件
> 1. select元素中，也存在单选&多选两种，在JSX语法中，可以通过select标签的`multiple={true}`来实现一个多选下拉框
> 2. select多选框的处理方式与CheckBox一致，编码方式也类似，在设置`multiple={true}`的情况下，value值是一个数组，表示选中的一组值

#### 2. 受控组件&非受控组件
------

##### 1. 受控组件（推荐使用）
- 每当表单的状态发生变化时，都会被写入到组件的state中，这种组件在react中被称为**受控组件**
- 在受控组件中，组件渲染出的状态与他的state & checked prop相对应，react通过这种方式消除了组件的局部状态，使得应用的整个状态更加可控
- **react受控组件更新state流程**
> 1. 通过在初始state中设置表单的默认值
> 2. 当表单的值发生变化时，调用onchange事件处理器
> 3. 事件处理器通过e.target拿到改变后的状态，并更新state
> 4. setstate触发视图的重新渲染，完成表单组件值的更新
- 在react中，数据是单向流动的。表单的数据源于state，并通过props传入，完成了数据的**单向绑定**。而数据改变会触发onchange事件处理器，将更新的表单数据写回到表单的state，完成了数据的**双向绑定**
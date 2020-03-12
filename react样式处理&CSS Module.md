- 本节样式处理的重点在CSS module

#### 1. css基本样式设置
> ##### 1. 行内样式设置
    1. 自定义组件建议支持className，尽量不使用行内样式
    2. 设置行内样式时需要使用对象
```
const style = {
    color: white,
    backgroundImage: `${url(imgUrl)}`,
    // 这里的大写会转换成-webkit-transition
    WebkitTransition: 'all',
    // ms是唯一小写的浏览器前缀
    msTransition: 'all'
}
const component = <component style={style} />
```
> ##### 2. 样式中的像素值
    1. react会自动为与大小有关的样式属性添加px，所以在写行内样式时可以不带单位
> ##### 3. 使用classnames库
```
// classnames类库使得类名操作变得简单
import React, {Component} from 'react';
import classNames from 'classnames';
//
class button extends component {
    render {
        const btnClass = {
            'btn': true,
            'btn_pressed': this.state.isPressed,
            'btn_over': !this.state.isPressed && this.state.isHover
        }
        return <button className={btnClass}>{this.state.label}</button>
    }
}
```

#### 2. CSS module
------
##### 1. CSS模块化目前的两种主流解决方案
✨ `inline style`

    优点：彻底抛弃CSS，使用JS或者json来写样式，给CSS提供同JS同样强大的模块化功能

    缺点：几乎不能利用CSS的本身特性，对于伪元素，媒体查询等CSS特性的处理变得复杂，并且需要依赖框架实现
    
✨   `CSS Module`
   
    依旧使用CSS，但是使用JS来管理样式依赖，最大程度的结合现有CSS生态&JS模块化能力。
    
    发布时依旧编译出单独的JS&CSS文件。
    
    目前，webpack css-loader已经内置了SS Module`功能

##### 2. CSS模块化遇到的问题
> CSS 模块化最重要的是CSS样式的导入和导出，灵活导入以便复用，导出时要能够隐藏内部作用域，以免全局污染

    1. 全局污染：方便重写样式，但所有的样式都全局生效。
    2. 命名混乱：多人开发容易导致命名混乱
    3. 依赖管理不彻底：除了引入JS，还要引入它的CSS，并且less/sass不能对每个组件都编译出单独的CSS，引入所有模块的CSS又比较浪费
    4. 无法共享变量：预编译语言无法提供跨JS&CSS共享变量的能力
    5. 代码压缩不彻底：比如多人开发情况下的超长类名...
##### 3. `CSS Modules`模块化方案
- CSS Module内部通过ICSS来解决样式的导入&导出问题，分别对应:import  &  :export两个伪类
```
:import('path/style.css') {
    //
}
:export {
    //
}
```
- 但是CSS Modules通常用JS来管理CSS的能力，在JS文件中导入

#### 3. CSS module的使用(结合webpack css-loader)
------
##### 1. css modules的启用
```
// webpack.config.js
// 在配置文件里加上modules即为启用，localIndentName是设置命名规则
css?modules&localIndentName=[name]__[local]-[hash:base64:5]
//
// 接下来引入css&转化class名
/* component/button.css */
.nomal{}
.disabled{}
/* component.button.js */
import styles from './button.css';
console.log(styles);
// console出来的style是一个对象，并且是根据localIndentName命名规则自动生成的class名
/* object: {
    nomal: 'button--nomal-abc3536',
    disabled: 'button--disabled-def5867'
} */
//
buttonElement.outerHTML = <button type="submit" class=${styles.nomal}>submit</button>
//最终编译的HTML是这样的
<button type="submit" class='button--nomal-abc3536'>submit</button>
```
- css module通过上述处理，实现了以下几点：
    1. 样式都是局部化的,解决了命名冲突和全局污染问题
    2. class名生成规则配置灵活，可以借此压缩类名
    3. 只需引入组件的JS，就可以搞定组件的JS&CSS

##### 2. 默认样式为局部样式

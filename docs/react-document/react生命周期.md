#### ⭐react生命周期图解
![react生命周期图解](https://b.bdstatic.com/searchbox/icms/searchbox/img/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F.png)


#### ⭐react生命周期分有三个大的阶段
    由于getDefaultProps是通过构造函数进行管理的，所以不在声明周期的三个阶段内，所以只会执行一次

![生命周期的三个大阶段](https://b.bdstatic.com/searchbox/icms/searchbox/img/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%89%E4%B8%AA%E9%98%B6%E6%AE%B5.png)

1. mounting阶段：负责管理生命周期中的getInitialState, componentWillMount, render, componentDidMount
2. recieve_props阶段：负责管理生命周期中的componentWillRecieveProps, shouldComponentUpdate, componentWillUpdate, render, compoenntDidUpdate
3. unmounting阶段：负责管理生命周期中的componentWillUnmount

#### 1. mountComponent阶段：
1. 错误处理方法：performInitialMountWithErrorHandling
2. 初始化挂载方法：performInitialMount
    i. 如果存在componentWillMount，调用，但是不会触发re-render，而是会进行state合并
    ii. 如果不是无状态组件，直接开始渲染
    iii. 得到对应的component类实例
3. 初始化组件，渲染标记，注册事件监听器
    i. 获取当前元素对应的上下文
    ii. 初始化公共类
    iii. 判断组件是否为无状态组件，若是，不会更新队列，只专注于渲染
    iv. 初始化state
    v. 错误处理，挂载出错时调用错误处理方法：performInitialMountWithErrorHandling，否则调用初始化挂载方法：performInitialMount方法初始化挂载
    vi. 最后，如果存在componentDidMount生命周期，调用

#### 2. updateComponent阶段
    componentWillRecieveProps， shouldComponentUpdate， componentWillUpdate中调用setstate不会re-render，只会进行state合并，
    因为此时的state仍然是未更新数据，获取不到最新的state，所以只有render&compoenntDidUpdate中才能获取到更新后的state
1. render渲染组件的方法
    i. 如果需要更新，则继续更新组件，如果不需要，继续渲染，然后拿到更新后的component实例
    ii. 最后使用render递归渲染
2. 组件确定要更新时，调用即将更新的方法：_performComponentUpdate
    i. 如果存在componentDidMount，那就将props, state等保存一份
    ii. 如果存在componentWillUpdate，则调用componentWillUpdate生命周期方法
    iii. 更新props, state,还有容易忽略的context
    iv. 调用render组件重新render
    v. 当组件更新完成之后，如果存在compoenntDidUpdate，则调用
3. 组件更新方法：updateComponent
    i. 如果存在componentWillRecieveProps，调用
    ii. 将新的state合并到更新队列，即nextSate就是最新的state
    iii. 更新队列&shouldComponentUpdate的状态，判断是否需要进行组件更新
    iv. 确定更新，调用即将更新方法_performComponentUpdate，不确定，更新props,state,context等状态

#### 3. unmountComponent阶段
    此时，所有的队列&状态都被重置为null，所以在此处调用setstate不会re-render
1. 如果存在componentWillUnmount，调用
2. 如果组件已经渲染，则对组件进行unmountComponent操作（卸载组件，被渲染组件赋值为null）
3. 执行并重置所有相关参数，更新状态。

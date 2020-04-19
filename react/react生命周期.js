// react声明周期分有三个大的阶段
// 由于getDefaultProps是通过构造函数进行管理的，所以不在声明周期的三个阶段内，所以只会执行一次
// 1. mounting阶段：负责管理生命周期中的getInitialState, componentWillMount, render, componentDidMount
// 2. recieve_props阶段：负责管理生命周期中的componentWillRecieveProps, shouldComponentUpdate, componentWillUpdate, render, compoenntDidUpdate
// 3. unmounting阶段：负责管理生命周期中的componentWillUnmount

// mounting阶段：mountingComponent
    // 1. 错误处理方法：performInitialMountWithErrorHandling
    // 2. 初始化挂载方法：performInitialMount
        // 如果存在componentWillMount，调用，但是不会触发re-render，而是会进行state合并
        // 如果不是无状态组件，直接开始渲染
        // 得到对应的component类实例
    // 3. 

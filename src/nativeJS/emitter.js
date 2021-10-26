class EventEmitter {
    constructor() {
        this._events = Object.create(null)//创建一个新对象来存放所有被监听的事件和处理函数
    }

    on(event, callback) {  //监听event事件，触发时调用callback函数
      let callbacks = this._events[event] || [] //判断event事件是否已有其他事件处理函数，没有则为空数组
        callbacks.push(callback)
        this._events[event] = callbacks
        return this
    }
    
    off(event, callback) {  //停止监听event事件
        let callbacks = this._events[event]

        //如果event事件内存在事件处理函数，就查找其中是否有callback函数并把它过滤掉。
        this._events[event] = callbacks && callbacks.filter(fn => fn !== callback)
    
        return this
    }
    
    emit(...args) { //触发事件，并把参数传给事件的处理函数
        const event = args[0]

        //!!!因为args非数组，所以需要通过空数组来调用数组的slice方法并把this指向args
        // 其含义相当于 arguments.slice(1)，就是取出所有参数，并从下标为1开始，截取所有
        const params = [].slice.call(args, 1)
    
        const callbacks = this._events[event]//获取event事件的全部事件处理函数
        callbacks.forEach(fn => fn.apply(params))//遍历执行全部事件处理函数
        return this
    }
    
    once(event, callback) { //为事件注册单次监听器
        let wrapFanc = (...args) => {//创建一个wrapFanc函数实现单次调用后停止监听
            callback.apply(this.args)//执行wrapFanc
            this.off(event, wrapFanc)//后停止监听事件
        }
        this.on(event, wrapFanc)//注册监听wrapFanc事件
        return this
    }
}
export default EventEmitter //将这个类暴露出去
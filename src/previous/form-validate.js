function initReactive() {
    let data = this.data;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            defineReactive(data, key, throttle(() => {
                const prevRes = this.vRes[key];
                let dirty = true;

                if (!prevRes.dirty && !data[key]) {
                    dirty = false;
                }
                const verifyResult = verifySingle(key, data[key], this.ruleConfig[key]);
                this.vRes[key] = {
                    ...prevRes,
                    ...verifyResult,
                    dirty,
                };
            }));
        }
    }
}

// 监听输入框数据变更，发布订阅
export const defineReactive = (obj, key, listener) => {
    // Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。
    const property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return;
    }
    let val = obj[key];

    const getter = property && property.get;
    const setter = property && property.set;

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            return getter ? getter.call(obj) : val;
        },
        set(newVal) {
            const value = getter ? getter.call(obj) : val;
            // 值没有变，或者新旧值都为 NaN 的时候，什么都不做
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return;
            }
            if (setter) {
                setter.call(obj, newVal);
            }
            else {
                val = newVal;
            }
            // 值变动后，自动调用监听者
            typeof listener === 'function' && listener();
            Array.isArray(listener) && listener.forEach(fn => fn);
        },
    });
};
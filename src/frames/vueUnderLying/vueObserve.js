console.log('进来了');

// 更新视图
function updateView() {
    console.log('更新视图');
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype;
// 创建新对象，原型指向oldArrayProperty， 再扩展新方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'splice', 'slice'].forEach(methodName => {
    arrProto[methodName] = function () {
        updateView();
        oldArrayProperty[methodName].call(this, ...arguments);
    };
});

// 重新定义属性，真正的监听实现
function defineReactive(target, key, value) {
    // 这里实现深度监听
    observe(value);
    // 核心API
    Object.defineProperty(target, key, {
        get: function () {
            return value;
        },
        set: function (newVal) {
            if (value !== newVal) {
                // 深度监听
                observe(newVal);
                value = newVal;
                updateView();
            }
        },
    });
}

// 监听对象属性
function observe(target) {
    if (typeof target !== 'object' || typeof target === null) {
        return target;
    }
    if (Array.isArray(target)) {
        target.__proto__ = arrProto;
    }
    for (key in target) {
        defineReactive(target, key, target[key]);
    }
}

const data = {
    name: '罗怡',
    age: 21,
    info: {
        // 需要深度监听才能实现
        address: '北京',
    },
    num: [1, 2, 3],
};

observe(data);

data.name = '你好';
data.age = 20;

console.log(data.age);

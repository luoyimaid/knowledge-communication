const PENDING = 'pending';
const REJECTED = 'rejected';
const FULFILLED = 'fulfilled';
function myPromise(executor) {
    // 绑定this，设置初始值
    let self = this;
    self.value = null;
    self.error = null;
    self.status = PENDING;
    self.onRejected = [];
    self.onFulfilled = [];
    // 添加resolve方法，延时回调
    const resolve = value => {
        if (self.status !== PENDING) {
            return;
        }
        setTimeout(() => {
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilled.forEach(callback => {
                callback(self.value);
            });
        }, 200);
    };
    // 添加reject方法，延时回调
    const reject = error => {
        if (self.status !== PENDING) {
            return;
        }
        setTimeout(() => {
            self.status = REJECTED;
            self.error = error;
            self.onRejected.forEach(callback => {
                callback(self.value);
            });
        }, 200);
    };
    // 把成功和失败回调传给目标方法
    executor(resolve, reject);
}
myPromise.prototype.then = (onFulfilled, onRejected) => {
    let self = this;
    let bridgePromise;
    // 成功回调不传给它一个默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // 对于失败回调直接抛错
    onRejected = typeof onRejected === 'function' ? onRejected : error => {
        throw error;
    };

    // 如果x是一个promise，那么久拆解这个promise，直到返回值不为promise；
    // 如果不是一个promise，直接resolve即可
    function resolvePromise(bridgePromise, x, resolve, reject) {
        // 如果x是一个promise
        if (x instanceof MyPromise) {
            // 拆解这个 promise ，直到返回值不为 promise 为止
            if (x.status === PENDING) {
                x.then(y => {
                    resolvePromise(bridgePromise, y, resolve, reject);
                }, error => {
                    reject(error);
                });
            }
            else {
                x.then(resolve, reject);
            }
        }
        else {
            // 非 Promise 的话直接 resolve 即可
            resolve(x);
        }
    }
    if (this.status === PENDING) {
        this.onRejected = onRejected;
        this.onFulfilled = onFulfilled;
    }
    else if (this.status === FULFILLED) {
        return bridgePromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    x = onFulfilled(self.value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            }, 200);
        });
    }
    else {
        return bridgePromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    x = onRejected(self.value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
};
myPromise.prototype.finally = callback => {
    return this.then(value => {
        myPromise.resolve(callback()).then(() => {
            return value;
        });
    }, err => {
        myPromise.reject(callback()).then(() => {
            return err;
        });
    });
};
myPromise.all = function (promise) {
    let result = [];
    let length = promise.length;

    if (length === 0) {
        resolve(result);
        return;
    }

    for (let i = 0; i < length; i++) {
        myPromise.resolve(promise[i]).then(data => {
            ((data, i) => {
                result[i] = data;
                if (i === length - 1) {
                    resolve(result);
                }
            })(data, i);
        }).catch(err => {
            reject(err);
        });
    }
};
let obj = {
    a: {
        b: 1,
        c: {
            d: 2
        }
    }
}
const deepClone = obj => {
    let result = {};
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const typeObj = Object.prototype.toString.call(obj);
    if (typeObj === '[object Array]') {
        result = [];
    }
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            result[key] = deepClone(obj[key]);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}
let result = deepClone(obj);
result.a.b = 3;
console.log(obj);
console.log(result);
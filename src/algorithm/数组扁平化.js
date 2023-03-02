/*
 *
 * 数组扁平化
 */

// const flat = arr => {
//     return arr.reduce((pre, cur) => {
//         return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
//     }, []);
// };

const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, 'string', {name: '弹铁蛋同学'}];


const flat = (arr, num) => {
    const result = [];
    const stack = [].concat(arr);

    while (stack.length) {
        const value = stack.pop();
        if (Array.isArray(value) && num) {
            stack.push(...value);
            num--;
        }
        else {
            result.unshift(value);
        }
    }

    return result;
};

console.info(flat(arr, 3));

const a = 12345678;
const b = -12345678;
const c = 1233436.456;

// const numFormat = num => {
//     return num.toLocaleString();
// }

// const numFormat = num => {
//     num = parseFloat(num.toFixed(3));
//     let [a, b] = String.prototype.split.call(num, '.');
//     a = a.replace(/\d(?=(\d{3})+$)/g, '$&,');
//     return `${a}${b ? `.${b}` : ''}`;
// }

const numFormat = num => {
    num = num.toString().split('.');
    let arr = num[0].split('').reverse();
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if(!(i%3) && i) {
            res.push(',');
        }
        res.push(arr[i]);
    }
    res = res.reverse().join('');
    return num[1] ?  `${res}.${num[1]}` : res;
}

console.log(numFormat(a), numFormat(b), numFormat(c));

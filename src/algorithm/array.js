let people = [1, 2, 2, 3, 3, 4, 4, 5];
let limit = 6;

let left = 0;
let right = people.length - 1;
let sum = 0;
while (left < right) {
    if (people[left] + people[right] <= limit) {
        sum ++;
        left ++;
        right --;
    } else {
        right --;
        sum ++;
    }
}

console.log(sum);

const arr1 = [1, 3, 5],  arr2 = [2, 4, 6];
// return 中位数

const middleNum = (arr1, arr2) => {
    let arr = new Array();
    let i = 0, j = 0;

    while (i < arr1.length || j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            arr.push(arr1[i]);
            i++;
        } else {
            arr.push(arr2[j]);
            j++;
        }
    }

    // 奇数的情况
    if (arr.length%2) return Number.parseFloat(arr[arr.length/2]);
    // 偶数的情况
    else return Number.parseFloat((arr[arr.length/2] + arr[arr.length/2 - 1])/2);
}

console.info(middleNum(arr1, arr2));

// 搜索二维矩阵
let matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5;

var searchMatrix = function(matrix, target) {
    let x = 0, y = matrix[0].length - 1;

    while (x < matrix.length && y >=0) {
        if (matrix[x][y] === target) return true;

        if (matrix[x][y] > target) y--;
        if (matrix[x][y] < target) x++;
    }
    return false;
};
console.log(searchMatrix(matrix, target));

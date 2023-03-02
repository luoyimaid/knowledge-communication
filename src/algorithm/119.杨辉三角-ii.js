/*
 * @lc app=leetcode.cn id=119 lang=javascript
 *
 * [119] 杨辉三角 II
 */

// @lc code=start
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
const getRow = function (rowIndex) {
    if (rowIndex === 0) {
        return [1];
    }

    if (rowIndex === 1) {
        return [1, 1];
    }

    let arr = new Array(rowIndex + 1).fill(0);

    for (let i = 0; i < rowIndex + 1; i++) {
        arr[i] = new Array(i + 1).fill(0);
        arr[i][0] = arr[i][i] = 1;
        for (let j = 1; j < i; j++) {
            arr[i][j] = arr[i - 1][j - 1] + arr[i - 1][j];
        }
    }
    return arr[rowIndex];
};
// @lc code=end


/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
const generate = numRows => {
    const arr = [];
    if (numRows <= 1) {
        return [[1]];
    }

    for (let i = 0; i < numRows; i++) {
        const col = new Array(i + 1).fill(1);
        // eslint-disable-next-line no-array-constructor
        for (let j = 1; j < col.length - 1; j++) {
            col[j] = arr[i - 1][j - 1] + arr[i - 1][j];
        }
        arr.push(col);
    }
    return arr;
};
// @lc code=end


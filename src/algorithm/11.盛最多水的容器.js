/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = height => {
    if (!height.length) {
        return 0;
    }
    if (height.length === 1) {
        return 0;
    }

    if (height.length === 2) {
        return Math.min(height[0], height[1]);
    }

    // 暴力循环
    // let result = 0;
    // let square = 0;

    // for (let i = 0; i < height.length - 1; i++) {
    //     if (height[i] > result / (height.length - i - 1)) {
    //         for (let j = 1; j < height.length; j++) {
    //             square = (j - i) * Math.min(height[i], height[j]);
    //             result = result > square ? result : square;
    //         }
    //     }
    // }

    // return result;

    // 双指针破解
    let result = 0;

    let left = 0;
    let right = height.length - 1;

    while (left < right) {
        let square = Math.min(height[left], height[right]) * (right - left);
        result = Math.max(result, square);

        if (height[left] <= height[right]) {
            ++left;
        }
        else {
            --right;
        }
    }

    return result;
};
// @lc code=end

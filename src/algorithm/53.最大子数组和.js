/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
let maxSubArray = function (nums) {
    let pre = 0;
    let curr = nums[0];

    nums.forEach(item => {
        pre = Math.max(pre + item, item);

        curr = Math.max(pre, curr);
    });

    return curr;
};
// @lc code=end


/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = nums => {
    if (!nums.length) {
        return 0;
    }
    let t = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i === 0 || nums[i] !== nums[i - 1]) {
            nums[t++] = nums[i];
        }
    }
    return t;
};
// @lc code=end


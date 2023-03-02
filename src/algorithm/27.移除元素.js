/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = (nums, val) => {
    if (!nums.length) {
        return 0;
    }

    for (let i = 0; i < nums.length; i) {
        if (nums[i] === val) {
            nums.splice(i, 1);
        }
        else {
            i++;
        }
    }

    return nums.length;
};
// @lc code=end


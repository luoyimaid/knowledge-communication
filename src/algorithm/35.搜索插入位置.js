/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = (nums, target) => {
    const len = nums.length;
    let left = 0;
    let right = len - 1;

    while (left <= right) {
        let mid = parseInt(left + (right - left) / 2, 10);

        if (nums[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }

    return left;
};
// @lc code=end


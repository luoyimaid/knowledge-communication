/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
    if (nums.length < 2) {
        return 0;
    }
    if (nums.length === 2) {
        return nums[0] + nums[1] === target ? [0, 1] : 0;
    }

    // eslint-disable-next-line guard-for-in
    for (let i in nums) {
        let temp = target - nums[i];
        if (nums.indexOf(nums[i]) !== nums.lastIndexOf(temp)
            && nums.lastIndexOf(temp) > 0) {
            return [i, nums.lastIndexOf(temp)];
        }
    }
};
// @lc code=end


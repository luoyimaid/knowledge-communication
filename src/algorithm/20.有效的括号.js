/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
let isValid = function (s) {
    if (s.length % 2) {
        return false;
    }
    const pairs = new Map([
        [')', '('],
        [']', '['],
        ['}', '{'],
    ]);

    const stack = [];

    // eslint-disable-next-line guard-for-in
    for (let i in s) {
        if (pairs.has(stack[i])) {
            if (!stack.length || stack[stack.length - 1] !== pairs.get(s[i])) {
                return false;
            }
            stack.pop();
        }
        else {
            stack.push(s[i]);
        }
    }

    return !stack.length;
};
// @lc code=end


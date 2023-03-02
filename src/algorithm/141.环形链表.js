/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = head => {
    if (!head || !head.next) {
        return false;
    }

    let low = head;
    let fast = head.next;

    while (low !== fast) {
        if (!fast || !fast.next) {
            return false;
        }

        low = low.next;
        fast = fast.next.next;
    }

    return true;
};
// @lc code=end


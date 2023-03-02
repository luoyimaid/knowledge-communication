/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
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
 * @return {ListNode}
 */
const detectCycle = head => {
    if (!head || !head.next) {
        return null;
    }

    let low = head;
    let fast = head;

    do {
        if (!fast || !fast.next) {
            return null;
        }
        low = low.next;
        fast = fast.next.next;
    } while (low !== fast);

    let pre = head;

    while (pre !== fast) {
        pre = pre.next;
        fast = fast.next;
    }

    return pre;
};
// @lc code=end


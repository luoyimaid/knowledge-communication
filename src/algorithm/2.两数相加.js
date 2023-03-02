/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
let addTwoNumbers = function (l1, l2) {
    const head = new ListNode(0);
    const result = head;

    const add = (result, l1, l2, boolean) => {
        if (!l1 && !l2) {
            if (boolean) {
                result.next = new ListNode(boolean);
            }
            return;
        }
        if (!l1 && l2) {
            result.next = new ListNode((l2.val + boolean) % 10);
            boolean = Math.floor((l2.val + boolean) / 10, 0);

            result.next = new ListNode((l2.val + boolean) % 10);
            add(result.next, l1, l2.next, boolean);
        }
        if (!l2 && l1) {
            result.next = new ListNode((l1.val + boolean) % 10);
            boolean = Math.floor((l1.val + boolean) / 10, 0);

            result.next = new ListNode((l1.val + boolean) % 10);
            add(result.next, l1.next, l2, boolean);
        }

        if (l1 && l2) {
            result.next = new ListNode((l1.val + l2.val + boolean) % 10);
            boolean = Math.floor((l1.val + l2.val + boolean) / 10, 0);

            add(result.next, l1.next, l2.next, boolean);
        }
    };

    add(result, l1, l2, 0);

    return head.next;
};

// @lc code=end


/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
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
 * @param {ListNode} head
 * @return {ListNode}
 */
const swapPairs = head => {

    if (!head || !head.next) {
        return head;
    }

    let dummyHead = new ListNode(0);
    dummyHead.next = head;

    let temp = dummyHead;

    while (temp.next && temp.next.next) {
        let node1 = temp.next;
        let node2 = temp.next.next;

        temp.next = node2;
        node1.next = node2.next;
        node2.next = node1;
        temp = node1;
    }

    return dummyHead.next;

    // while (slow && fast) {
    //     let node = slow;
    //     node.next = fast.next;
    //     fast.next = slow;

    //     if (node.next && node.next.next) {
    //         slow = node.next;
    //         fast = node.next.next;
    //     }
    // }

};
// @lc code=end


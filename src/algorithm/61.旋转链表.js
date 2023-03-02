/*
 * @lc app=leetcode.cn id=61 lang=javascript
 *
 * [61] 旋转链表
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
 * @param {number} k
 * @return {ListNode}
 */
const rotateRight = (head, k) => {
    if (k === 0 || !head || !head.next) {
        return head;
    }

    let preHead = new ListNode(-1);

    let tail = head;
    let count = 1;

    // 找到尾节点所在位置并计算节点数
    while (tail.next) {
        tail = tail.next;
        count++;
    }

    // 找到尾节点之后判断一下k%count，为0证明走了n*count圈，不变
    if (!(k % count)) {
        return head;
    }

    let prev = head;
    let leftCount = 1;

    // k可能大于节点个数，所以用k对节点数取余取余
    while ((leftCount < count - k % count)) {
        prev = prev.next;
        leftCount++;
    }

    preHead.next = prev.next;
    tail.next = head;
    prev.next = null;

    return preHead.next;
};
// @lc code=end


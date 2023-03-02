// 移除链表元素
const removeElements = (head, val) => {
    const preHead = new ListNode(-1);
    let prev = curr = preHead;
    preHead.next = head;

    while (curr) {
        if (curr.val === val) {
            prev.next = curr.next;
        }
        else {
            prev = curr;
        }
        curr = curr.next;
    }

    return preHead.next;
};

// 中间节点链表反转
const reverseLinkedList = head => {
    let pre = null;
    let cur = head;

    while (cur) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
};

let reverseBetween = function (head, left, right) {
    let perHead = new ListNode(-1);
    perHead.next = head;
    let prev = perHead;
    let rightNode = prev.next;

    // 先找到要反转子串的前一个节点和后一个节点
    for (let i = 0; i < left - 1; i++) {
        prev = prev.next;
    }
    let leftNode = prev.next;
    for (let i = 0; i < right - 1; i++) {
        rightNode = rightNode.next;
    }
    let curr = rightNode.next;
    // 并且标记为空，拆成三个子串
    prev.next = null;
    rightNode.next = null;
    // 链表反转
    reverseLinkedList(leftNode);
    // 拼接三个子串
    prev.next = rightNode;
    leftNode.next = curr;

    return perHead.next;
};

// 合并两个升序链表（三个指针，prev,l1,l2）
let mergeTwoLists = function (l1, l2) {
    const preHead = new ListNode(-1);
    let prev = preHead;

    while (l1 !== null && l2 !== null) {
        if (l1.val < l2.val) {
            prev.next = l1;
            l1 = l1.next;
        }
        else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }

    prev.next = l1 === null ? l2 : l1;

    return preHead.next;
};

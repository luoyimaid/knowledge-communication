// 二叉树的前中后序遍历
const inorderTraversal = root => {
    let res = [];
    const inorder = root => {
        if (!root) {
            return;
        }
        inorder(root.left);
        res.push(root.value);
        inorder(root.right);
    }
    inorder(root);
    return res;
}

// 二叉树的层序遍历
const levelOrder = root => {
    let res = [];
    if (!root) return res;

    const q = [];
    q.push(root);

    while (q.length) {
        // 这里的level指的是一层的节点个数
        const level = q.length;
        res.push([]);
        for (let i = 1; i <= level; ++i) {
            const node = q.shift();
            res[res.length - 1].push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
    return res;
};

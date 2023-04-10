class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr) {
        arr = [...new Set(arr)];
        arr.sort((a, b) => { return a - b });
        this.root = this.buildTree(arr, 0, arr.length - 1);
        this.arr = arr;
    }

    buildTree(arr, start = 0, end = arr.length - 1) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);

        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);

        return node;
    }

    insert(value, root = this.root) {
        if (root == null) {
            root = new Node(value);
            return root;
        }

        if (value < root.val) {
            root.left = this.insert(value, root.left);
        } else if (value > root.val) {
            root.right = this.insert(value, root.right);
        }

        return root;
    }

    delete(value) {
        if (this.root == null) return this.root;

        if (value < this.root.val) {
            this.root.left = this.delete(this.root.left, value);
        } else if (value > this.root.val) {
            this.root.right = this.delete(this.root.right, value);
        } else {
            if (this.root.left == null) return this.root.right;
            if (this.root.right == null) return this.root.left;

            this.root.val = this.minValue(this.root.right);
  
            this.root.right = this.delete(this.root.right, this.root.key);
        }
  
        return this.root;
    }

    minValue(root) {
        let min = root.val;
        while (root.left != null) {
            min = root.left.val;
            root = root.left;
        }
        return min;
    }

    find(value, node = this.root) {
        if (node == null) return null;
        if (value == node.val) return node;

        if (value < node.val) {
            node = this.find(value, node.left)
        } else {
            node = this.find(value, node.right);
        }

        return node;
    }

    levelOrder(arr = [], q = [], root = this.root) {
        if (!root) return;

        arr.push(root.val);
        q.push(root.left);
        q.push(root.right);

        while (q.length > 0) {
            const level = q[0];
            q.shift();
            this.levelOrder(arr, q, level)
        }

        return arr;
    }

    inorder(arr = [], root = this.root) {
        if (!root) return;
      
        if (root.left)
            this.inorder(arr, root.left);
      
        arr.push(root.val);
        
        if (root.right)
            this.inorder(arr, root.right);
        
        return arr;
    }

    preorder(arr = [], root = this.root) {
        if (!root) return;
      
        arr.push(root.val);
      
        if (root.left)
            this.preorder(arr, root.left);
        
        if (root.right)
            this.preorder(arr, root.right);
      
      return arr;
    }

    postorder(arr = [], root = this.root) {
        if (!root) return;

        if (root.left)
            this.postorder(arr, root.left);
      
        if (root.right)
            this.postorder(arr, root.right);
      
        arr.push(root.val);

        return arr;
    }

    height(root = this.root) {
        if (!root) return 0;

        let left = this.height(root.left);
        let right = this.height(root.right);

        return left > right ? left + 1 : right + 1;
    }

    depth(node, root = this.root, depth = 0) {
        if (!root || !node) return;
        if (node === root) return depth;

        return node.val < root.val ? this.depth(node, root.left, depth + 1) : this.depth(node, root.right, depth + 1);
    }

    isBalanced(root = this.root) {
        const left = this.height(root.left);
        const right = this.height(root.right);
        const diff = Math.abs(left - right);

        return diff < 2;
    }

    rebalance(root = this.root) {
        let arr = this.levelOrder([], [], root);
        arr.sort((a, b) => a - b);
        return this.root = this.buildTree(arr);
    }
}

// https://www.theodinproject.com/lessons/javascript-binary-search-trees
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
     return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.val}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root)

console.log('isBalanced(): ', tree.isBalanced());
console.log('Preorder traversal: ', tree.preorder());
console.log('Inorder traversal: ', tree.inorder());
console.log('Postorder traversal: ', tree.postorder());

tree.insert(156);
tree.insert(135);
tree.insert(198);
tree.insert(136);
tree.insert(175);
tree.insert(168);
console.log('isBalanced(): ', tree.isBalanced());
prettyPrint(tree.root);
tree.rebalance();
console.log('isBalanced(): ', tree.isBalanced());
prettyPrint(tree.root);
console.log('Preorder traversal: ', tree.preorder());
console.log('Inorder traversal: ', tree.inorder());
console.log('Postorder traversal: ', tree.postorder());
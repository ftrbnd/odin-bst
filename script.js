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
    }

    buildTree(arr, start, end) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);

        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);

        return node;
    }

    insert(value) {
        if (this.root == null) {
            this.root = new Node(value);
            return this.root;
        }

        if (value < this.root.val) {
            this.root.left = this.insert(this.root.left, value);
        } else {
            this.root.right = this.insert(this.root.right, value);
        }

        return this.root;
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

console.log('finding 2: ', tree.find(2));
console.log('finding 67: ', tree.find(67));
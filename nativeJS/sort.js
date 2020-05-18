// 冒泡排序
// i 遍历外层数组，j 遍历内层数组，判断每一对相邻元素，如果是正序，那么第一个比第二个大时，则交换元素
// 时间复杂度: 最好的情况：O(n);最坏的情况：O(n2);空间复杂度：O(1)，稳定性：稳定
const bubbleSort = arr => {
    let i = arr.length - 1;
    while (i) {
        let temp = 0;
        let target = 0;
        for(let j = 0; j < i; j++) {
            if(arr[j] > arr[j+1]) {
                temp = j;
                target = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = target;
            }
        }
        i = temp;
    }
    return arr;
}
bubbleSort(arr);

// 快速排序：使用分治法来把一个串分为两个子串,然后递归排到最小原子再返回
// 时间复杂度：O(n logn); 空间复杂度：O(log n); 稳定性：不稳定
let quickSort = arr => {
    console.time('2.快速排序耗时');
    if(arr.length <= 1) {
        return arr;
    }
    let prov = arr.splice(parseInt(arr.length / 2), 1)[0];
    let left = [];
    let right = [];
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] <= prov) {left.push(arr[i]);}
        else {right.push(arr[i]);}
    }
    console.time('2.快速排序耗时');
    return quickSort(left).concat([prov], quickSort(right));
}
quickSort(arr);

// 选择排序：从未排序的的数组中找到最小的元素，放在未排序的起始位置
// 时间复杂度：O(n^2); 空间复杂度：O(1); 稳定性：不稳定
const selectSort = arr => {
    console.time('2.选择排序耗时');
    let minIndex = 0;
    let temp;
    for(let i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        for(let j = i + 1; j < arr.length; j ++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // 寻找最小的数&保存最小数的索引
            }
        }
        // 把最小的数放在未排序第一位
        temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
    console.time('2.选择排序耗时');
    return arr;
}
selectSort(arr);
// 插入排序: 默认第一个元素已经排序，然后从第二个元素开始取元素,i指向无序的数组，j指向有序的数组
// 在已经排序的序列中从后向前查找，如果已经排序的这个元素大于新元素，那已排序的序列从该元素开始就都向后移动一位
// 时间复杂度：最好情况：O(n),最坏情况：o(n2)，稳定性：稳定; 空间复杂度：O(1)
const insertSort = arr => {
    for(let i = 1; i < arr.length; i++) {
        let j = i - 1;
        let key = arr[i];
        while(j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j+1] = key;
    }
    return arr;
}
insertSort(arr);

    
    
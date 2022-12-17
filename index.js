//Leetcode 001
var twoSum = function (nums, target) {
    let map = new Map()
    let ans = []
    nums.forEach((element, idx) => {
        if (map.has(target - element)) {
            ans.push(idx)
            ans.push(map.get(target - element))
            return
        }
        else {
            map.set(element, idx)
        }
    });

    return ans;
};

console.log(twoSum([3, 2, 4], 6));

//Leetcode 002
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let arr1 = [], arr2 = []
    getNumber(l1, arr1)
    getNumber(l2, arr2)
    if (arr1.length <= arr2.length) {
        var temp = arr1
        arr1 = arr2
        arr2 = temp
    }
    //arr1 > arr2
    let k = 0
    let newArray = []
    let c = 0
    while (k < arr2.length) {
        if (arr1[k] + arr2[k] + c >= 10) {
            newArray.push(arr1[k] + arr2[k] - 10 + c)
            c = 1
        }
        else {
            newArray.push(arr1[k] + arr2[k] + c)
            c = 0
        }
        k++
    }
    while (k < arr1.length) {
        if (arr1[k] + c == 10) {
            newArray.push(0)
            c = 1
        }
        else {
            newArray.push(arr1[k] + c)
            c = 0
        }
        k++
    }
    if (c == 1) {
        newArray.push(1)
    }
    if (newArray.length == 0) {
        return new ListNode()
    }
    k = 0
    let prev = new ListNode()
    let head = prev
    prev.val = newArray[k]
    k++
    while (k < newArray.length) {
        let node = new ListNode()
        node.val = newArray[k]
        prev.next = node
        prev = node
        k++
    }

    return head
};

var getNumber = function (l, array) {
    if (l == null) {
        return
    }
    array.push(l.val)
    getNumber(l.next, array)
}

// var num = new ListNode(2)
// var num2 = new ListNode(3)
// var num3 = new ListNode(4)
// num.next = num2
// num2.next = num3

// var num4 = new ListNode(1)
// var num5 = new ListNode(3)
// var num6 = new ListNode(5)
// var num7 = new ListNode(7)
// num4.next = num5
// num5.next = num6
// num6.next = num7

// // console.log(addTwoNumbers(num,num4));


//Leetcode 009
var isPalindrome = function (x) {
    if (x < 0) return false
    if (x == 0) return true
    let arr = []
    while (x != 0) {
        arr.push(x % 10)
        x = parseInt(x / 10)
    }
    for (let i = 0; i < parseInt(arr.length / 2); i++) {
        if (arr[i] != arr[arr.length - 1 - i]) {
            return false
        }
    }
    return true
};

// var num = 1214121
// console.log(isPalindrome(num));

//Leetcode 013
var romanToInt = function (s) {
    let map = new Map()
    let key = ['I', 'V', 'X', 'L', 'C', 'D', 'M']
    let value = [1, 5, 10, 50, 100, 500, 1000]
    key.forEach((ele, idx) => {
        map.set(ele, value[idx])
    })
    let ans = 0, flag = 1
    for (let i = 0; i < s.length - 1; i++) {
        if (s.charAt(i) == 'I' && (s.charAt(i + 1) == 'V' || s.charAt(i + 1) == 'X')) {
            flag = -1
        }
        else if (s.charAt(i) == 'X' && (s.charAt(i + 1) == 'L' || s.charAt(i + 1) == 'C')) {
            flag = -1
        }
        else if (s.charAt(i) == 'C' && (s.charAt(i + 1) == 'D' || s.charAt(i + 1) == 'M')) {
            flag = -1
        }
        ans += map.get(s.charAt(i)) * flag
        flag = 1
    }
    ans += map.get(s.charAt(s.length - 1))
    return ans
};


//Leetcode 019
var removeNthFromEnd = function (head, n) {
    let slow = head, fast = head
    while (n > 0) {
        fast = fast.next
        n--
    }
    if (fast == null) {
        return slow.next
    }
    while (fast.next != null) {
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return head
};

//Leetcode 020
var isValid = function (s) {
    let stack = []
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) == '(' || s.charAt(i) == '{' || s.charAt(i) == '[') {
            stack.push(s.charAt(i))
        }
        else if (s.charAt(i) == ')') {
            if (stack.length == 0 || stack[stack.length - 1] != '(') {
                return false
            }
            else {
                stack.pop()
            }
        }
        else if (s.charAt(i) == ']') {
            if (stack.length == 0 || stack[stack.length - 1] != '[') {
                return false
            }
            else {
                stack.pop()
            }
        }
        else if (s.charAt(i) == '}') {
            if (stack.length == 0 || stack[stack.length - 1] != '{') {
                return false
            }
            else {
                stack.pop()
            }
        }
    }
    if (stack.length != 0) return false
    return true
};

// let str = '{[]}'
// console.log(isValid(str));

var mergeTwoLists = function (list1, list2) {
    if (list1 == null) return list2
    if (list2 == null) return list1

    let prev = new ListNode()
    let head = prev
    while (list1 != null && list2 != null) {
        let node = new ListNode()
        if (list1.val <= list2.val) {
            node.val = list1.val
            list1 = list1.next
        }
        else {
            node.val = list2.val
            list2 = list2.next
        }
        prev.next = node
        prev = node
    }
    if (list1 != null) {
        prev.next = list1
    }
    if (list2 != null) {
        prev.next = list2
    }
    return head.next
};

// console.log(mergeTwoLists(num, num4));
//Leetcode 026
var removeDuplicates = function (nums) {
    if (nums.length == 1) return nums
    let slow = 0, fast = 1
    let ans = 1
    while (fast < nums.length) {
        if (nums[slow] != nums[fast]) {
            slow++
            nums[slow] = nums[fast]
            ans++
        }
        fast++
    }
    return ans
};

// let test = [1,1,3,3,5,5,6,7,7,8,8]

// console.log(removeDuplicates(test));
// console.log(test);

//Leetcode 027
var removeElement = function (nums, val) {
    if (nums.length == 0) return 0
    let slow = 0, fast = 0
    while (fast < nums.length) {
        if (nums[slow] == val && nums[fast] != val) {
            let temp = nums[slow]
            nums[slow] = nums[fast]
            nums[fast] = temp
        }
        if (nums[slow] != val) {
            slow++
        }
        fast++

    }
    return slow
};

//Leetcode 035
var searchInsert = function (nums, target) {
    const len = nums.length;
    let left = 0, right = len;
    while (left < right) {
        let mid = parseInt((left + right) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        }
        else if (nums[mid] == target) {
            return mid;
        }
        else {
            right = mid;
        }
    }
    return left;
};


//Leetcode 003
//滑动窗口 右边界只会越来越大
var lengthOfLongestSubstring = function (s) {
    if (s.length == 0) return 0
    let max = 0
    let set = new Set()
    let start = -1
    for (let i = 0; i < s.length; i++) {
        if (i != 0) {
            set.delete(s.charAt(i - 1))
        }
        while (!set.has(s.charAt(start + 1)) && start + 1 < s.length) {
            set.add(s.charAt(start + 1))
            start++
        }
        max = (max > set.size) ? max : set.size
    }
    return max
};

let arr2 = 'dvdf'
console.log(lengthOfLongestSubstring(arr2));


//Leetcode 005
//中心扩展法 
var longestPalindrome = function (s) {
    if (s.length < 2) return s
    let maxlen = 0
    let begin = -1
    for (let i = 0; i < s.length - 1; i++) {
        let oddlen = getLongestNum(s, i, i)
        let evenlen = getLongestNum(s, i, i + 1)
        let max = Math.max(oddlen, evenlen)

        if (max > maxlen) {
            maxlen = max
            begin = i - parseInt((maxlen - 1) / 2)
        }
    }
    return s.substr(begin, maxlen)
}

var getLongestNum = function (s, left, right) {
    while (left >= 0 && right < s.length && s.charAt(left) == s.charAt(right)) {
        left--
        right++
    }
    return right - left - 1
}
let arr24 = 'bbbb'
console.log(longestPalindrome(arr24))

//Leetcode 058
var lengthOfLastWord = function (s) {
    let ans = 0
    let flag = true
    for (let i = s.length - 1; i >= 0; i--) {
        if (s.charCodeAt(i) >= 97 && s.charCodeAt(i) <= 122) {
            flag = false
            ans++
        }
        else if (s.charCodeAt(i) >= 65 && s.charCodeAt(i) <= 90) {
            flag = false
            ans++
        }
        else {
            if (!flag) {
                break
            }
        }
    }
    return ans
};

// let s = "   fly me   to   the moon  "
// console.log(lengthOfLastWord(s));

//Leetcode 066
var plusOne = function (digits) {
    let c = 0
    for (let i = digits.length - 1; i >= 0; i--) {
        if (i == digits.length - 1) {
            if (digits[i] + 1 == 10) {
                digits[i] = 0
                c = 1
            }
            else {
                digits[i] = digits[i] + 1
                c = 0
            }
        }
        else {
            if (digits[i] + c == 10) {
                digits[i] = 0
                c = 1
            }
            else {
                digits[i] = digits[i] + c
                c = 0
            }
        }
    }
    if (c == 1) {
        digits.unshift(1)
    }
    return digits
};

// let di = [5, 2, 4, 0]
// console.log(plusOne(di));


//Leetcode 067
var addBinary = function (a, b) {
    if (a.length < b.length) {
        [a, b] = [b, a]
    }
    //a > b
    let arr1 = a.split('').reverse()
    let arr2 = b.split('').reverse()
    console.log(arr1, arr2);
    let c = 0, i = 0
    for (; i < arr2.length; i++) {
        if (Number(arr1[i]) + Number(arr2[i]) + c > 1) {
            arr1[i] = String(Number(arr1[i]) + Number(arr2[i]) + c - 2)
            c = 1
        }
        else {
            arr1[i] = String(Number(arr1[i]) + Number(arr2[i]) + c)
            c = 0
        }
    }
    while (i < arr1.length) {
        if (Number(arr1[i]) + c > 1) {
            arr1[i] = String(Number(arr1[i]) + c - 2)
            c = 1
        }
        else {
            arr1[i] = String(Number(arr1[i]) + c)
            c = 0
        }
        i++
    }
    if (c == 1) {
        arr1.push('1')
    }
    return arr1.reverse().join('')
};

let a = "110", b = "1011"
console.log(addBinary(a, b));


var climbStairs = function (n) {
    if (n == 1) return 1
    let dp = Array(n + 1)
    dp[0] = 1
    dp[1] = 1
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
};

// console.log(climbStairs(30));

// var deleteDuplicates = function (head) {
//     if (head == null) return head
//     let slow = head, fast = head
//     while (fast != null) {
//         if (fast.val == slow.val) {

//         }
//         else {
//             slow.next = fast
//             slow = fast
//         }
//         fast = fast.next
//     }
//     slow.next = null
//     return head
// };

var merge = function (nums1, m, nums2, n) {
    nums2.forEach((ele, idx) => {
        nums1[m + idx] = ele
    })
    nums1.sort((a, b) => {
        return a - b
    })
};



//Leetcode 171
var titleToNumber = function (columnTitle) {
    let ans = 0
    columnTitle.split('').forEach((ele) => {
        ans = ans * 26 + (ele.charCodeAt(0) - 65 + 1)
    })
    return ans
};

console.log(titleToNumber('ZY'));

var generate = function (numRows) {
    let i = numRows
    let arr = []
    for (let j = 1; j <= numRows; j++) {
        let temparr = new Array(j)
        for (let c = 0; c < j; c++) {
            if (c == 0 || c == j - 1) {
                temparr[c] = 1
            }
            else {
                temparr[c] = arr[j - 2][c] + arr[j - 2][c - 1]
            }
        }
        arr.push(temparr)
    }
    return arr
};

var getRow = function (rowIndex) {
    return generate(rowIndex + 1)[rowIndex]
};

//console.log(generate(1));


//Leetcode 160
var getIntersectionNode = function (headA, headB) {
    let lenA = getLength(headA), lenB = getLength(headB)
    lenA < lenB ? [headA, headB] = [headB, headA] : ''
    //lenA > lenB
    let diff = Math.abs(lenA - lenB)
    console.log(headA, headB);
    while (diff > 0) {
        headA = headA.next
        diff--
    }
    while (headA != null && headB != null) {
        if (headA == headB) {
            return headA
        }
        else {
            headA = headA.next
            headB = headB.next
        }
    }
    return null
};

var getLength = function (head) {
    let ans = 0
    while (head != null) {
        ans++
        head = head.next
    }
    return ans
}


// var num8 = new ListNode(4)
// var num2 = new ListNode(1)
// var num3 = new ListNode(8)
// var num9 = new ListNode(4)
// var num10 = new ListNode(5)

// num8.next = num2
// num2.next = num3
// num3.next = num9
// num9.next = num10

// var num4 = new ListNode(5)
// var num5 = new ListNode(6)
// var num6 = new ListNode(1)

// num4.next = num5
// num5.next = num6
// num6.next = num3

// console.log(getIntersectionNode(num8,num4));

//Leetcode 136
var singleNumber = function (nums) {
    let ans = 0;
    nums.forEach(element => {
        ans = ans ^ element;
    });
    return ans;
};

// Leetcode 141
var hasCycle = function (head) {
    if (head == null || head.next == null) {
        return false
    }
    let slow = head, fast = head.next
    while (fast != null) {
        if (slow != fast) {
            slow = slow.next
            fast = fast.next
            if (fast != null) {
                fast = fast.next
            }
        }
        else {
            return true
        }
    }
    return false
};

//Leetcode 234
var isPalindrome = function (head) {
    if (head.next == null) {
        return true
    }
    let slow = head, fast = head.next
    let otherHalf = null
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next
        fast = fast.next.next
    }
    if (fast.next == null) {
        otherHalf = slow.next
        slow.next = null
    }
    else {
        otherHalf = slow.next.next
        slow.next = null
    }
    console.log(head, otherHalf);
    let reverseHalf = reverseListNode(otherHalf)

    return isSameListNode(head, reverseHalf)
};


var isSameListNode = function (headA, headB) {
    while (headA != null && headB != null) {
        if (headA.val == headB.val) {
            headA = headA.next
            headB = headB.next
        }
        else {
            return false
        }
    }
    return headA == null && headB == null
}
var reverseListNode = function (head) {
    let prev = null
    let cur = head
    while (cur != null) {
        let next = cur.next
        cur.next = prev
        prev = cur
        cur = next
    }
    return prev
}


// var num4 = new ListNode(5)
// var num5 = new ListNode(5)
// var num6 = new ListNode(5)

// num4.next = num5
// // num5.next = num6

// // console.log(isSameListNode(num4, num4));
// console.log(isPalindrome(num4));

//Leetcode 203 
//dummy 是哨兵节点
var removeElements = function (head, val) {
    let dummy = ListNode(0)
    dummy.next = head

    let prev = dummy, cur = head
    while (cur != null) {
        if (cur.val == val) {
            prev.next = cur.next
            cur = cur.next
        }
        else {
            cur = cur.next
            prev = prev.next
        }
    }
    return dummy.next
};

//Leetcode 237
var deleteNode = function (node) {
    if (node.next != null) {
        node.val = node.next.val
        node.next = node.next.next
    }
    else {
        node = null
    }
};


var deleteDuplicates = function (head) {
    let set = new Set()
    let dummy = new ListNode()
    dummy.next = head
    let prev = dummy, cur = head
    while (cur != null) {
        if (!set.has(cur.val)) {
            if (cur.next != null) {
                if (cur.next.val != cur.val) {
                    set.add(cur.val)
                    prev.next = cur
                    prev = cur
                    cur = cur.next
                }
                else {
                    set.add(cur.val)
                    cur = cur.next
                }
            }
            else {
                prev.next = cur
                prev = cur
                cur = cur.next
            }
        }
        else {
            cur = cur.next
        }
    }
    prev.next = cur
    prev = cur
    return dummy.next
};

// var num4 = new ListNode(1)
// var num5 = new ListNode(2)
// var num6 = new ListNode(2)

// num4.next = num5
// num5.next = num6
// console.log(deleteDuplicates(num4));


//Leetcode 086
var partition = function (head, x) {
    let arr1 = [], arr2 = []
    let ans = head
    getArray(head, x, arr1, arr2)
    arr1.push(...arr2)
    for (let i = 0; i < arr1.length; i++) {
        head.val = arr1[i]
        head = head.next
    }
    return ans
};

var getArray = function (head, val, arr1, arr2) {
    while (head != null) {
        if (head.val < val) {
            arr1.push(head.val)
        }
        else {
            arr2.push(head.val)
        }
        head = head.next
    }
}

//Leetcode 024
var swapPairs = function (head) {
    let dummy = new ListNode(-1)
    let start = dummy
    while (head != null) {
        let ans = swapTwo(start, head, head.next)
        if (ans == -1) break
        start = start.next.next
        head = start.next
    }
    return dummy.next
};

var swapTwo = function (prev, node1, node2) {
    if (node1 != null && node2 != null) {
        prev.next = node2
        node1.next = node2.next
        node2.next = node1
        return 0
    }
    else {
        return -1
    }
}

// var num4 = new ListNode(1)
// var num5 = new ListNode(2)
// var num6 = new ListNode(3)
// var num7 = new ListNode(5)

// num4.next = num5
// num5.next = num6
// num6.next = num7

// console.log(swapPairs(num4));

var reverseBetween = function (head, left, right) {
    if (head.next == null) return head

    let dummy = new ListNode(-501)
    dummy.next = head
    let beforeLeft = dummy, exactRight = dummy
    let start = dummy
    while (start != null) {
        if (left - 1 == 0) {
            beforeLeft = start
        }
        left--
        if (right == 0) {
            exactRight = start
            break
        }
        right--
        start = start.next
    }
    let exactLeft = beforeLeft.next
    let afterRight = exactRight.next
    exactRight.next = null
    let reverseAns = reverseListNode(exactLeft)
    beforeLeft.next = reverseAns
    exactLeft.next = afterRight
    return dummy.next
};

// var num4 = new ListNode(1)
// var num5 = new ListNode(2)
// var num6 = new ListNode(3)
// var num7 = new ListNode(5)
// var num10 = new ListNode(8)

// num4.next = num5
// num5.next = num6
// num6.next = num7
// num7.next = num10

// console.log(reverseBetween(num4, 2, 4));

//Leetcode 142
var detectCycle = function (head) {
    let node = hasCycle2(head)
    if (node == null) {
        return null
    }
    let cur = head
    while (cur != node) {
        cur = cur.next
        node = node.next
    }
    return node
};
var hasCycle2 = function (head) {
    if (head == null || head.next == null) {
        return null
    }
    let slow = head, fast = head.next
    while (fast != null) {
        if (slow != fast) {
            slow = slow.next
            fast = fast.next
            if (fast != null) {
                fast = fast.next
            }
        }
        else {
            return slow
        }
    }
    return null
};

//Leetcode 143
var reorderList = function (head) {
    let dummy = new ListNode(0)
    dummy.next = head
    let prev = dummy
    let beforeNode = getMidNode(head)
    let node = reverseListNode(beforeNode.next)
    beforeNode.next = null
    while (head != null && node != null) {
        prev.next = head
        let newhead = head.next
        let newnode = node.next
        head.next = node
        prev = node
        head = newhead
        node = newnode
    }
    if (head != null) {
        prev.next = head
    }
    return dummy.next
};

var getMidNode = function (head) {
    if (head == null) return null
    let slow = head, fast = head.next
    while (fast != null) {
        slow = slow.next
        fast = fast.next
        if (fast != null) {
            fast = fast.next
        }
    }
    return slow
}

var num4 = new ListNode(1)
var num5 = new ListNode(2)
var num6 = new ListNode(3)
var num7 = new ListNode(4)
var num8 = new ListNode(5)

num4.next = num5
num5.next = num6
num6.next = num7
num7.next = num8

// console.log(reorderList(num4));


var oddEvenList = function (head) {
    if (head == null || head.next == null) {
        return head
    }
    let evenDummy = new ListNode(0)
    evenDummy.next = head.next
    let evenprev = evenDummy
    let oddDummy = new ListNode(0)
    oddDummy.next = head
    let oddprev = oddDummy
    let flag = 1
    while (head != null) {
        if (flag % 2 == 0) {
            evenprev.next = head
            evenprev = head
        }
        else {
            oddprev.next = head
            oddprev = head
        }
        flag++
        head = head.next
    }
    oddprev.next = evenDummy.next
    evenprev.next = null
    return oddDummy.next
};

// console.log(oddEvenList(num4));

//Leetcode 1827
var minOperations = function (nums) {
    if (nums.length == 1) return 0
    let ans = 0
    for (let i = 1; i < nums.length; i++) {
        nums[i] = (nums[i] > nums[i - 1] ? nums[i] : nums[i - 1] + 1)
        ans += (nums[i] > nums[i - 1] ? 0 : nums[i - 1] + 1 - nums[i])
    }
    return ans
};

//Leetcode 012
//本人愚蠢的做法
//正确的做法 从大往下扣
var intToRoman = function (num) {
    let map = new Map()
    let newMap = new Map()
    let key = ['I', 'V', 'X', 'L', 'C', 'D', 'M']
    let value = [1, 5, 10, 50, 100, 500, 1000]
    let oneToNine = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX',]
    value.forEach((ele, idx) => {
        map.set(ele, key[idx])
    })
    key.forEach((ele, idx) => {
        newMap.set(ele, value[idx])
    })
    let k = 0
    let ans = ''
    while (num != 0) {
        let temp = num % 10
        if (temp != 0) {
            let exactNum = oneToNine[temp - 1]
            exactNum = exactNum.split('').map(ele =>
                map.get(newMap.get(ele) * Math.pow(10, k))
            ).join('')
            ans = exactNum + ans
        }

        k++

        num = parseInt(num / 10)
    }
    return ans
};

// var intToRoman = function(num) {
//     const valueSymbols = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
//     const roman = [];
//     for (const [value, symbol] of valueSymbols) {
//         while (num >= value) {
//             num -= value;
//             roman.push(symbol);
//         }
//         if (num == 0) {
//             break;
//         }
//     }
//     return roman.join('');
// };


var maxSubArray = function (nums) {
    let max = -10000000
    let dp = new Array(nums.length)
    for (let i = dp.length - 1; i >= 0; i--) {
        if (i == dp.length - 1) {
            dp[i] = nums[i]
        }
        else {
            dp[i] = dp[i + 1] > 0 ? dp[i + 1] + nums[i] : nums[i]
        }
        max = Math.max(dp[i], max)
    }
    return max
};

//console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

//Leetcode 1781
var beautySum = function (s) {
    let count = new Array(27).fill(0)
    // s.split('').forEach(ele => {
    //     count[ele.charCodeAt(0) - 97]++
    // })
    let ans = 0
    for (let i = 0; i < s.length; i++) {
        let temparr = new Array(27).fill(0)
        temparr[s.charCodeAt(i) - 97]++
        for (let j = i + 1; j < s.length; j++) {
            temparr[s.charCodeAt(j) - 97]++
            ans += getBeauty(temparr)
        }
    }
    return ans
};

var getBeauty = function (arr) {
    let max = 0, min = 99
    arr.forEach(ele => {
        if (ele > 0) {
            max = Math.max(max, ele)
            min = Math.min(min, ele)
        }
    })
    return max * min == 0 ? 0 : max - min
}
console.log(beautySum('aabcbaa'));

var checkIfPangram = function (sentence) {
    let arr = new Array(26).fill(0)
    sentence.split('').forEach(ele => {
        arr[ele.charCodeAt(0) - 97]++
    })
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            return false
        }
    }
    return true
};


// * Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
// var inorderTraversal = function (root) {
//     let arr = new Array()
//     dfs(root, arr)
//     return arr
// };

var inorderTraversal = function (root) {
    let stack = new Array()
    let ans = []
    let cur = root
    while (cur != null || stack.length) {
        while (cur != null) {
            stack.push(cur)
            cur = cur.left
        }
        cur = stack.pop()
        ans.push(cur.val)
        cur = cur.right
    }
    return ans
}
// var dfs = function (root, arr) {
//     if (root != null) {
//         dfs(root.left,arr)
//         arr.push(root.val)
//         dfs(root.right,arr)
//     }
// }



// let tnode1 = new TreeNode(1)
// let tnode2 = new TreeNode(2)

// tnode1.right = tnode2


var postorderTraversal = function (root) {
    let stack = []
    let ans = []
    let cur = root, prev = null
    while (cur != null || stack.length) {
        while (cur != null) {
            stack.push(cur)
            cur = cur.left
        }
        cur = stack[stack.length - 1]
        if (cur.right != null && cur.right != prev) {
            cur = cur.right
        }
        else {
            stack.pop()
            ans.push(cur.val)
            prev = cur
            cur = null
        }
    }
    return ans
};
// console.log(postorderTraversal(tnode1));

var levelOrder = function (root) {
    if (root == null) return []
    let queue1 = [root], queue2 = []
    let ans = []
    let temp = []
    while (queue1.length) {
        let node = queue1[0]
        temp.push(node.val)
        if (node.left != null) {
            queue2.push(node.left)
        }
        if (node.right != null) {
            queue2.push(node.right)
        }
        queue1.shift()
        if (queue1.length == 0) {
            queue1 = queue2
            queue2 = []
            ans.push(temp)
            temp = []
        }
    }
    return ans
};

var maxDepth = function (root) {
    return maxDepthdfs(root)
};

var maxDepthdfs = function (root) {
    if (root == null) return 0

    return 1 + Math.max(maxDepthdfs(root.left), maxDepthdfs(root.right))
}

var hasPathSum = function (root, targetSum) {
    return dfs(root, targetSum)
    // if (root == null) {
    //     return false;
    // }
    // if (root.left == null && root.right == null) {
    //     return sum - root.val == 0;
    // }
    // return hasPathSum(root.left, sum - root.val)
    //     || hasPathSum(root.right, sum - root.val);
};

var dfs = function (root, targetSum) {
    if (root.left == null && root.right == null) {
        if (targetSum == root.val) {
            return true
        }
    }
    let flag = false
    if (root.left != null) {
        flag |= dfs(root.left, targetSum - root.val)
    }
    if (root.right != null) {
        flag |= dfs(root.right, targetSum - root.val)
    }
    return flag
}

//Leetcode 100
var isSameTree = function (p, q) {
    if (p == null && q == null) return true
    if (p != null & q != null) {
        return (p.val == q.val) && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
    }
    return false
};

var getLucky = function (s, k) {
    s = s.split('').map(ele => {
        return ele.charCodeAt(0) - 96
    }).join('')
    let ans = 0
    while (k >= 0) {
        ans = 0
        s.split('').forEach(ele => {
            ans += parseInt(ele)
        })
        k--
        s = ans + ''
    }
    return ans
};

var minElements = function (nums, limit, goal) {
    let sum = 0
    nums.forEach(ele => {
        sum += ele
    })
    let diff = Math.abs(goal - sum)
    return diff % limit == 0 ? diff / limit : parseInt(diff / limit) + 1

};

var pathSum = function (root, targetSum) {
    let ans = [], stack = []
    dfsPathSum(root, targetSum, stack, ans)
    return ans
};

var dfsPathSum = function (root, targetSum, stack, ans) {
    if (root == null) {
        return
    }
    if (root.left == null && root.right == null) {
        if (targetSum == root.val) {
            stack.push(root.val)
            ans.push([...stack])//这个很关键
            //直接push stack的话会有问题 push的是stack的地址值
            //后面对stack的改变会引起ans里的变化
            stack.pop()
            return
        }
        else {
            return
        }
    }
    stack.push(root.val)
    dfsPathSum(root.left, targetSum - root.val, stack, ans)
    dfsPathSum(root.right, targetSum - root.val, stack, ans)
    stack.pop()
}

var minDepth = function (root) {
    if (root == null) return 0
    return dfsMinDepth(root)
};

var dfsMinDepth = function (root) {
    if (root == null) {
        return Infinity
    }
    if (root.left == null && root.right == null) {
        return 1
    }
    return 1 + Math.min(dfsMinDepth(root.left, 1), dfsMinDepth(root.right, 1))

}

var sumNumbers = function (root) {
    let ans = [0]
    dfsPathSum(root, 0, ans)
    return ans[0]
};

var dfsSumNumbers = function (root, path, ans) {
    if (root == null) {
        return 0
    }
    if (root.left == null && root.right == null) {
        path = path * 10 + root.val
        ans[0] += path
    }
    path = path * 10 + root.val
    return dfsPathSum(root.left, path, ans) + dfsPathSum(root.right, path, ans)
}

var isSymmetric = function (root) {
    return isSymmetricTwoNode(root.left, root.right)
};

var isSymmetricTwoNode = function (root1, root2) {
    if (root1 == null && root2 == null) {
        return true
    }
    if (root1 == null || root2 == null) {
        return false
    }
    return root1.val == root2.val && isSymmetricTwoNode(root1.left, root2.right) && isSymmetricTwoNode(root1.right, root2.left)
}

var isBalanced = function (root) {
    let flag = [true]
    isBalancedDfs(root, 0, flag)
    return flag[0]
};

var isBalancedDfs = function (root, h, flag) {
    if (root == null) {
        return 0
    }
    let left = isBalancedDfs(root.left, h, flag)
    let right = isBalancedDfs(root.right, h, flag)

    if (Math.abs(left - right) > 1) {
        flag[0] = false
    }

    return Math.max(left, right) + 1
}

var invertTree = function (root) {
    invertTreeDfs(root)
    return root
};

var invertTreeDfs = function (root) {
    if (root == null) {
        return null
    }
    let temp = root.left
    root.left = invertTreeDfs(root.right)
    root.right = invertTreeDfs(temp)
    return root
}

// let tnode1 = new TreeNode(1)
// let tnode2 = new TreeNode(2)
// let tnode3 = new TreeNode(3)

// tnode1.left = tnode2
// tnode1.right = tnode3
// console.log(invertTree(tnode1));


var rightSideView = function (root) {
    if (root == null) return []
    let queue1 = [root], queue2 = []
    let ans = []
    while (queue1.length) {
        let node = queue1.shift()
        if (node.left != null) {
            queue2.push(node.left)
        }
        if (node.right != null) {
            queue2.push(node.right)
        }
        if (queue1.length == 0) {
            ans.push(node.val)
            queue1 = queue2
            queue2 = []
        }
    }
    return ans
};

// var countNodes = function (root) {
//     return countNodesDfs(root,1)
// };

// var countNodesDfs = function (root,num) {
//     if (root == null) return 0
//     let leftnum = countNodesDfs(root.left,num*2)
//     let rightnum = countNodesDfs(root.right,num*2+1)
//     return Math.max(leftnum,rightnum,num)
// }

var getLevel = function (root) {
    let ans = 0
    while (root != null) {
        root = root.left
        ans++
    }
    return ans
}
//根据满二叉树的性质来计算
// 左和右一样高 那么左一定满 右可能不满
// 左比右高 右一定满 左可能不满
var countNodes = function (root) {
    if (root == null) return 0
    let left = getLevel(root.left), right = getLevel(root.right)
    if (left == right) {
        return countNodes(root.right) + (1 << left)
    }
    else {
        return countNodes(root.left) + (1 << right)
    }
}


var canChoose = function (groups, nums) {
    let i = 0
    let flag = new Array(groups.length).fill(false)

    groups.forEach((ele, idx) => {
        let index = nums.indexOf(ele[0], i)
        while (index != -1) {
            let tempflag = true
            for (let j = index; j < index + ele.length; j++) {
                if (j > nums.length) {
                    tempflag = false
                    break
                }
                if (nums[j] != ele[j - index]) {
                    tempflag = false
                    break
                }
            }
            if (tempflag) {
                i = index + ele.length
                flag[idx] = true
                break
            }
            else {
                index = nums.indexOf(ele[0], index + 1)
            }
        }
    })

    return flag.every(ele => ele == true)
};

// console.log(canChoose([[10,-2],[1,2,3,4]], [1,2,3,4,10,-2]));

var binaryTreePaths = function (root) {
    let ans = [], stack = []
    binaryTreePathsDfs(root, stack, ans)
    return ans
};

var binaryTreePathsDfs = function (root, stack, ans) {
    if (root == null) {
        return
    }
    if (root.left == null && root.right == null) {
        stack.push(root.val)
        ans.push(stack.join('->'))
        stack.pop()
    }
    stack.push(root.val)
    binaryTreePathsDfs(root.left, stack, ans)
    binaryTreePathsDfs(root.right, stack, ans)
    stack.pop()
}

var sumOfLeftLeaves = function(root) {
    let ans = [0]
    sumOfLeftLeavesDfs(root,ans,false)
    return ans[0]
};

var sumOfLeftLeavesDfs = function(root,ans,isLeft){
    if(root == null){
        return 
    }
    if(root.left == null && root.right == null && isLeft){
        ans[0] += root.val
    }
    sumOfLeftLeavesDfs(root.left,ans,true)
    sumOfLeftLeavesDfs(root.right,ans,false)
}



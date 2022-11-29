---
title: LeetCode刷题 Day3 链表 | 203.移除链表元素 707.设计链表 206.反转链表
tag:
  - LeetCode
categories:
  - - 算法刷题
    - 代码随想录
article_type: 0
abbrlink: 8fa119fc
date: 2022-11-22
---

- LeetCode 203.移除链表元素
- LeetCode 707.设计链表
- LeetCode 206.反转链表

<!-- more -->

## 203.移除链表元素

> [力扣题目链接](https://leetcode.cn/problems/remove-linked-list-elements/)

给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。

示例 1：
```
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]
```

示例 2：
```
输入：head = [7,7,7,7], val = 7
输出：[]
```

### 思路

在单链表中 删除头结点 和 删除其他结点 的操作方式是不一样（删除其他结点时，都是通过该结点的前一个结点来删除该节点）。

> 设置虚拟头结点来统一删除操作

- 这样删除头结点和中间结点就变得统一起来，不用分情况讨论。

### python代码

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        dummy_head = ListNode(next=head)  # 设置一个虚拟头节点dummy_head，这样删除头结点和中间结点就变得统一起来，不用分情况讨论。
        cur = dummy_head  # 当前指针指向dummy_head（因为删除节点时，必须知道前一个节点的信息）

        while cur and cur.next:  # 比较值得时候需要cur.next.val，所以cur 和 cur.next 必须有意义（不为空）
            while cur.next and cur.next.val == val:  # 只要满足条件，就执行删除操作
                cur.next =  cur.next.next  # 删除cur.next节点

            cur = cur.next  # cur向后移动
        
        return dummy_head.next
```

## 707.设计链表

> [力扣题目链接](https://leetcode.cn/problems/design-linked-list/)

在链表类中实现这些功能：

- get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
- addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
- addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
- addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
- deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。

示例：
```
MyLinkedList linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
linkedList.get(1);            //返回2
linkedList.deleteAtIndex(1);  //现在链表是1-> 3
linkedList.get(1);            //返回3
```

### 思路

实现单向链表，即每个节点仅存储本身的值和后继节点。除此之外，我们还需要一个虚拟头结点作为头结点，和一个 length 参数保存有效节点数。

> 单链表实现

- 初始化一个虚拟头节点，方便链表增删操作
- 实现 addAtHead(val) 和addAtTail(val) 时，可以借助 addAtIndex(index, val) 来实现



### python代码

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class MyLinkedList:
    def __init__(self):  # 初始化链表
        self.dummy_head = ListNode()  # 虚拟头节点，方便链表增删操作
        self.length = 0  # 当前链表的长度，链表长度为n的时候，index为0 ~ (n-1)

    def get(self, index: int) -> int:
        if index < 0 or index >= self.length:  # 先判断index是否有效，有效区间应该为[0, self.length -1]
            return -1

        cur = self.head.next  # 查找时先走到索引为0的结点
        for _ in range(index):  # 当index为0时不进入for循环，所以后面直接返回cur.val
            cur = cur.next
        return cur.val

    def addAtHead(self, val: int) -> None:  
        self.addAtIndex(0, val)  # addAtHead相当于在index=0前添加结点

    def addAtTail(self, val: int) -> None:
        self.addAtIndex(self.length, val)  # addATail相当于在index=length前(最后一个结点后)添加结点

    def addAtIndex(self, index: int, val: int) -> None:
        if index < 0:  # 如果index小于0，则在头部插入节点
            index = 0
        if index <= self.length:  # 插入的合法范围为[0, length]
            cur = self.head
            for _ in range(index):
                cur = cur.next
            cur.next = ListNode(val, cur.next)
            self.length += 1  # 更新size

    def deleteAtIndex(self, index: int) -> None:
        if  0 <= index < self.length:  # 删除的合法范围为[0, length-1]
            cur = self.head
            for _ in range(index):
                cur = cur.next
            cur.next = cur.next.next
            self.length -= 1  # 更新size

# Your MyLinkedList object will be instantiated and called as such:
# obj = MyLinkedList()
# param_1 = obj.get(index)
# obj.addAtHead(val)
# obj.addAtTail(val)
# obj.addAtIndex(index,val)
# obj.deleteAtIndex(index)
```

## 206.反转链表

> [力扣题目链接](https://leetcode.cn/problems/reverse-linked-list/)

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

示例 1：
```
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
```

示例 2：
```
输入：head = []
输出：[]
```

### 思路


>

- 

### python代码

```python

```

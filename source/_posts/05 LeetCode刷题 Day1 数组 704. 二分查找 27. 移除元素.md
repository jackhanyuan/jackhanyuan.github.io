---
title: LeetCode刷题 Day1 数组 | 704. 二分查找 27. 移除元素
tag:
  - LeetCode
categories:
  - [算法刷题, 代码随想录]
article_type: 0
no_word_count: false
no_toc: false
no_date: false
no_declare: false
no_reward: false
no_comments: false
no_share: false
no_footer: false
mathjax: false
abbrlink: d446fd47
date: 2022-11-16
top:
---

- LeetCode 704. 二分查找
- LeetCode 27. 移除元素

<!-- more -->

## 704. 二分查找

> [力扣题目链接](https://leetcode.cn/problems/binary-search/)

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

示例 1：
```
输入：nums = [-1,0,3,5,9,12], target = 9
输出：4
解释：9 出现在 nums 中并且下标为 4
```

示例 2：
```
输入：nums = [-1,0,3,5,9,12], target = 2
输出：-1
解释：2 不存在 nums 中因此返回 -1
```

### 思路

> 使用二分法前提条件：
- 数组为有序数组
- 数组中无重复元素

> 边界问题

首先确定查找的时候是否包括数组左右两边的数字，通常分为以下2种：

- 左闭右闭
  - 查找范围在`[left, right]`区间，初值 `left, right=0, len(nums) - 1`。
  - `while (left <= right)` 要使用 `<=` ，因为左闭右闭时，`left == right`是有意义的。
  - `if (nums[mid] > target)` `right == mid - 1`，因为中间值大于target，那么接下来要查找的范围应该包含中间值左边的那个值，而right赋值为 mid - 1 时，查找范围刚好是[left, mid - 1]。

- 左闭右开
  - 查找范围在`[left, right)`区间，初值 `left, right=0, len(nums)`。
  - `while (left < right)` 要使用 `<` ，因为左闭右开时，`left == right`没有意义。
  - `if (nums[mid] > target)` `right == mid`，因为中间值大于target，那么接下来要查找的范围应该包含中间值左边的那个值，而 right 赋值为 mid 时，查找范围刚好是[left, mid - 1]。

> 值溢出问题

- `mid = left + ((right - left) >> 1)` 与 `mid = (left + right) // 2` 计算结果一致，但当 left 和 right 很大的时候，前者可以防止溢出问题（python中整数对象是变长对象，所以不存在溢出问题），此外位运算速度比除法快。

### python代码

左闭右闭
```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left +((right - left) >> 1)
            print(left, right, mid)
            if nums[mid] == target:
                return mid
            elif nums[mid] > target:
                right = mid - 1
            else:
                left = mid + 1
        return -1 
```

左闭右开
```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums)
        while left < right:
            mid = left +((right - left) >> 1)
            print(left, right, mid)
            if nums[mid] == target:
                return mid
            elif nums[mid] > target:
                right = mid
            else:
                left = mid + 1
        return -1 
```


## 27. 移除元素

> [力扣题目链接](https://leetcode.cn/problems/remove-element/)

给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并原地修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

示例 1：
```
输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2]
解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
```

示例 2：
```
输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3]
解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
```

### 思路

- 数组的元素在内存地址中是连续的，不能单独删除数组中的某个元素，要删除某个元素，后面的只能向前覆盖。
- 暴力法
  - 双层循环
    - 注意：Python 中 `for i in range(length)`中，i每次从迭代器中取数，循环体中改变i的值并不能改变下一次for循环中取到的i值，可以参考[这里](https://blog.csdn.net/zhimou/article/details/105537102)。
- 双指针（快慢指针法）
  - 快指针：寻找新数组的元素 ，新数组就是不含有目标元素的数组。
  - 慢指针：删除了目标值的新数组的下标，慢指针只有在快指针的值不为target的值时才移动。

### python代码

暴力解法 - python调库
```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        for num in nums[::-1]:  # nums[::-1]相当于生成一个新的迭代器，循环体内remove不影响这里num取数
            print(num)
            if num == val:
                nums.remove(num) # 删除操作复杂度O(n)
                print(nums)
        
        return len(nums)
```

暴力解法 - 双循环
```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        length = len(nums)  # length记录新数组的长度
        i = 0
        while i < length:  # 这里不能用for循环，因为for i in range(length)中，i每次从迭代器中取数，循环体中改变i的值并不能改变下一次for循环中取到的i值
            if nums[i] == val: # 判断是否等于val，相等进入第二重循环，不相等变量i加1继续执行第一重循环
                for j in range(i+1, length):
                    nums[j-1] = nums[j] # 从i之后依次向前移一位
                length -= 1  # 逻辑上删除了一个值，数组大小减1
            else:
                i += 1
        
        return length
```

双指针法（快慢指针）
```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        slow, fast = 0, 0
        length = len(nums)
        while fast < length:
            if nums[fast] != val:
                nums[slow] = nums[fast]
                slow += 1
            fast += 1
        return slow
```

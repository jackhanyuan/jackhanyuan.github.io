---
title: LeetCode刷题 Day2 数组 | 977.有序数组的平方 209.长度最小的子数组 59.螺旋矩阵II
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
abbrlink: 931914af
date: 2022-11-19
top:
---

- LeetCode 977.有序数组的平方
- LeetCode 209.长度最小的子数组
- LeetCode 59.螺旋矩阵II

<!-- more -->

## 977.有序数组的平方

> [力扣题目链接](https://leetcode.cn/problems/squares-of-a-sorted-array/)

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例 1：
```
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
```

示例 2：
```
输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
```

### 思路

由于数组有序，负数平方之后可能成为最大数，所以平方后的最大值一定在数组的两端。

> 方法一：从中间向两边：找到正负分界点，然后分别向左向右遍历比较大小。

- 平方的特点是会把负数变成正数，所以一个负数和一个正数平方后的大小要根据绝对值来比较。

> 方法二：从两边向中间：

- 从两边向中间搜索数字是从大到小的，所以需要提前申请好数组空间，然后从后向前写入。

### python代码

找到正负分界点，然后左右遍历比较

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        # 由于nums有序，所以先找到由负转正的位置i
        for i, num in enumerate(nums):
            if num >= 0:
                break
        
        res = []  # 存储新结果
        left, right = i-1, i  # 双指针，left指向绝对值最小的负值，right指向最小的正值
        while left>=0 and right < len(nums):  # 分别向左向右遍历，并比较大小
            if nums[left]**2 < nums[right]**2:
                res.append(nums[left]**2)
                left -= 1
            else:
                res.append(nums[right]**2)
                right += 1
        
        if left < 0:  # 当左边遍历结束后，把右边剩下的加入结果
            while right < len(nums):
                res.append(nums[right]**2)
                right += 1
        else:  # 当右边遍历结束后，把左边剩下的加入结果
            while left >= 0:
                res.append(nums[left]**2)
                left -= 1
        
        return res
```

从两边到中间，双指针

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        i, j = 0, len(nums) - 1  # 起始位置
        res = [-1] * len(nums)  # 存储结果
        k = len(nums) - 1  # 指向res中的位置
        while i <= j:
            if nums[i]**2 > nums[j]**2:
                res[k] = nums[i]**2
                i += 1  # i向右移一位
            else:
                res[k] = nums[j]**2
                j -= 1  # j向左移一位
            k -= 1
        
        return res
```

## 209.长度最小的子数组

> [力扣题目链接](https://leetcode.cn/problems/minimum-size-subarray-sum/)

给定一个含有 n 个正整数的数组和一个正整数 target ，找出该数组中满足其和 ≥ target 的长度最小的连续子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

示例 1：
```
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

示例 2：
```
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
```

### 思路

> 暴力解法

- 连续子数组的长度大小从0至length依次遍历，当和>=target，返回连续子数组大小

> 双指针（可变滑动窗口）

- 窗口的值< target，增大窗口
- 窗口的值>= target，缩小窗口

### python代码

> 暴力解法 - 超时

```python
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        len_window = 1  # 连续子数组的长度
        length = len(nums)
        while len_window <= length: # 假设连续子数组大小从1至length依次遍历
            i, j = 0, len_window  # 指向连续子数组的开始和结尾
            sum_window = sum(nums[0:len_window])  # sum_window 记录长度为len_window的连续子数组的和
            if sum_window >= target:
                return len_window

            while j < length:  # 连续子数组向右滑动
                sum_window = sum_window - nums[i] + nums[j]  # 记录更新后的和
                if sum_window >= target:
                    return len_window
                i += 1
                j += 1 

            len_window += 1
        return 0
```

双指针（可变滑动窗口）
```python
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        i, j = 0, 0  # i和j分别为滑动窗口起始位置和终止位置
        sum_window = 0  # 记录滑动窗口和
        min_window = float("inf")  # 记录最小滑动窗口的大小，初始为无穷大

        while j < len(nums):
            sum_window += nums[j]  # 当窗口和小于target则扩大窗口       
            j += 1

            while sum_window >= target:  # 当窗口和大于等于target则缩小窗口     
                sum_window -= nums[i]
                i += 1
                min_window = min(j-i+1, min_window)   # 更新最小滑动窗口的大小

        return 0 if min_window == float("inf") else min_window
```

## 59.螺旋矩阵II 

> [力扣题目链接](https://leetcode.cn/problems/spiral-matrix-ii/)

给你一个正整数 n ，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

示例 1：
```
输入：n = 3
输出：[[1,2,3],[8,9,4],[7,6,5]]
```

示例 2：
```
输入：n = 1
输出：[[1]]
```

### 思路

> 循环填充

- 过程：填充上行，从左到右；填充右列，从上到下；填充下行，从右到左；填充左列，从下到上。
- 每条边的填充都要坚持循环一致的原则，左闭右开或者左开右闭。

### python代码

```python
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        matrix = [[0] * n for _ in range(n)]
        startx, starty = 0, 0  # 每圈循环的起始位置
        loop = n // 2  # 循环的圈数（每圈循环边长会减2）
        count = 1  # 需要填充的数字
        offset = 1  # 每圈的偏移量，每次循环右边界收缩一位
        
        while loop > 0:
            for j in range(starty, n - offset):  # 填充上面一条边，从左至右，左闭右开
                matrix[startx][j] = count
                count += 1
                print(startx, j)
            j += 1  # j移到下一个位置（最右）
            for i in range(startx, n-offset):  # 填充右边一条边，从上至下，上闭下开
                matrix[i][j] = count
                count += 1
                print(i, j)
            i += 1  # i移到下一个位置（最下）
            for j in range(j, starty, -1):  # 填充下边一条边，从右至左，右闭左开
                matrix[i][j] =count
                count += 1
                print(i, j)
            for i in range(i, startx, -1):  # 填充左边一条边，从下至上，下闭上开
                matrix[i][starty] = count
                count += 1
                print(i, starty)
            
            startx += 1  # 一圈循环结束，更新起始位置、偏移量、剩余循环圈数
            starty += 1
            offset += 1
            loop -= 1
        
        if n % 2 == 1:  # n为奇数时，填充中心点
            print(startx, starty, count)
            matrix[startx][starty] = count

        return matrix
```

---
title: 论文阅读|Learning Rich Features for Image Manipulation Detection(CVPR2018-图像篡改)
tag:
  - 论文阅读
  - 图像篡改
categories:
  - 论文阅读
  -   CV
  - 图像篡改
article_type: 0
no_word_count: false
no_toc: false
no_date: false
no_declare: false
no_reward: false
no_comments: false
no_share: false
no_footer: false
abbrlink: f3d19c30
top:
---

**简介**

网络包含RGB流和噪声流，其中RGB流用于提取RGB图像的特征，以发现篡改的伪像，例如强烈的对比度差异，不自然的篡改边界等，另一个是噪声流，它利用从富隐写分析模型分析的滤波器层（SRM）提取的噪声特征来发现真实区域和篡改区域之间的噪声不一致。然后，通过双线性池化层融合来自两个流的特征根据丰富的特征，根据RGB特征和噪声特征来检测图像篡改区域和篡改的方式。

**噪声流的线索依据**.

为什么要再加入一个噪声流，这是因为采用了局部噪声特征的方法。由于RGB通道不足以解决所有不同的篡改攻击方式，尤其是，经过精心后处理以隐藏拼接边界并减少对比度差异的篡改图像，这种情况对于仅用RGB流而言是较为困难的。当从一个图像（源）中删除一个对象并将其粘贴到另一个图像（目标）中时，源和目标图像之间的噪声特征不匹配。那么如何实现给图像增加噪声呢？作者希望通过Steganalysis Rich Model获得噪声图片。

Steganalysis Rich Model 最早是应用在隐写术（是一种将消息嵌入到数字载体的技术如图像、视频等），SRM功能从30个基本滤波器开始，滤波后在输出附近使用最大值和最小值等非线性操作, 从该过程中获得的特征可以被视为局部噪声描述符。作者在实验中发现，仅使用 SRM 其中的3个滤波器就可以实现不错的性能，而应用所有30个内核并不能显着提高性能，因此使用下面3个滤波器获取像素值与相邻像素的差值估计来实现图片添加噪声的功能。

![img](https://qiniuy.tzle1.com/Fgig0qWQZ5sW6seA2aAi7HXttRft)

下图是分别经过拼接，复制移动和擦除填充后的篡改图像，以及通过SRM层的噪声图，从图中可以清晰的看出加入噪声后篡改区域的噪声与真实区域的较大区别。

![img](https://qiniuy.tzle1.com/Fl8aoktp9XeZw9QrfCOdP2vpYWO3)

**网络结构**

作者采用了一个双流的FasterRCNN 的结构, 分别包括RGB流和噪声流。RGB流输入RGB图像， 噪声流中输入SRM图像。两部分共享相同的 ROI 层，同时执行分类和边界框回归两个操作。作者通过双线性池融合两个流的特征进行分类，RPN利用RGB流的特征进行边界框的回归。

- **RGB Stream**

	RGB流采用的是单个Faster RCNN 网络提取RGB图像特征并用分类和边界框回归，主干使用的是 ResNet 101 网络提取图像特征，ResNet的最后一个卷积层的输出 feature map用于分类篡改类型。RGB流中的RPN网络利用这些特征为边界框回归提供 propose RoI，Loss function 如下：
	$$
	\begin{array}{r}
	L_{R P N}\left(g_{i}, f_{i}\right)=\frac{1}{N_{c l s}} \sum_{i} L_{c l s}\left(g_{i}, g_{i}^{\star}\right) 
	+\lambda \frac{1}{N_{r e g}} \sum_{i} g_{i}^{\star} L_{r e g}\left(f_{i}, f_{i}^{\star}\right)
	\end{array}
	$$


gigi 表示 anchor i 在一个 batch 中是潜在的被篡改区域的概率， g⋆igi⋆ 表示对于 anchor i 的 ground-truth 是 positive，fifi 和 f⋆ifi⋆分别是anchor i 和 ground-truth 的四维边界框坐标。LclsLcls表示RPN网络的交叉熵，LregLreg表示用于平滑提议边界框回归的L1损失。NclsNcls表示在RPN中 batch 的 大小，LregLreg是anchor location的数目。λ用来平衡这个两个损失。

- **Noise Stream**

	噪声流和RGB流的结构采用一样的主干结构 ResNet 101 网络。原图经过SRM层变成噪声图片输入噪声流当中，ResNet 101 网络提取噪声特征。噪声流与 RGB 流共享相同的 ROI 层，提取出的特征仅用于分类。需要注意的是对于边界框回归，作者只使用 RGB 通道，因为作者经过实验，发现RGB 特征在 RPN 网络中的性能优于噪声特征。

- **Bilinear Pooling**

	作者采用双线性池（BilinearPooling）的方法将 RGB 流与噪声流结合起来进行篡改检测。Bilinear Pooling 双线性池 可以很好的结合了双流 cnn 网络中的特征，同时保留空间信息，以提高检测置信度。下面是双线性池的结构。
	
	![img](https://qiniuy.tzle1.com/FnNjLvZdJl6wKxyt-_nhJt6QowdS)
	
	直观上理解，所谓bilinear pooling，就是先把在同一位置上的两个特征双线性融合（相乘）后得到矩阵 ，对所有位置进行sum pooling（也可以是max pooling，但一般采用sum pooling以方便进行矩阵运算）得到矩阵，最后把矩阵展开成一个向量，记为bilinear vector。对进行sqrt操作和L2归一化操作后，就得到融合后的特征。将RGB特征和噪声特征经过双线性池融合的特征用于分类，经过全连接层和 softmax 层获得 RoI regions 的篡改类型。总的损失函数如下：

$$
L_{\text {total }}=L_{R P N}+L_{\text {tamper }}\left(f_{R G B}, f_{N}\right)+L_{b b o x}\left(f_{R G B}\right)
$$

LRPNLRPN是RPN网络中的loss。LtamperLtamper表示最后的交叉熵分类损失；LbboxLbbox表示最后的边界框回归损失；fRGBfRGB和fNfN表示来自RGB和noise stream的RoI features。

---
title: 图像和视频篡改检测Manipulation Detection综述
tag:
  - 论文阅读
  - 图像篡改
categories:
  - [论文阅读, 图像篡改]
article_type: 1
no_word_count: false
no_toc: false
no_date: false
no_declare: true
no_reward: false
no_comments: false
no_share: false
no_footer: false
mathjax: false
abbrlink: 6473c150
date: 2021-10-28
updated: 2022-10-28 21:25:08
top:
---
- 数字图像篡改操作取证(Tamper )
	- Copy-move操作取证技术
	- Inpainting操作取证技术
	- Splicing操作取证技术
- 数字图像处理操作取证(Manipulation)
	- JPEG重压缩取证技术
	- 增强操作取证技术
	- 几何操作取证技术
	- 操作链取证技术
- 视频编辑篡改检测
	- 数字视频再编辑篡改技术
	- 数字视频被动取证检测技术

<!-- more -->

## 数字图像篡改操作取证(**Tamper** )

### Copy-move操作取证技术

图像复制粘贴篡改（copy-move）是数字图像篡改中比较常用的一种手段。它把单个图像中的部分区域复制并粘贴到同一图像中不交叠的其它区域，从而增加或覆盖掉某些物体。为了使篡改后的图像能够以假乱真，在复制过程中，复制区域可能会经历旋转、缩放等几何变换，并且合成图像可能经历加噪、模糊、压缩等后期处理，这进一步加大了篡改检测的难度。现有的图像复制篡改检测方法可以粗略的分为**基于图像块的方法**、**基于关键点的方法**和**基于深度学习的方法**。

#### 基于图像块的方法

Fridrich等人[1]首次定义了复制粘贴篡改，并提出了**基于块匹配**的检测方法，将图像分割成固定大小且相互重叠的子块，并使用DCT量化系数作为图像块的特征描述。该算法对图像块的所有DCT系数都进行统计计算，所以算法的复杂度很高。

后来，多位学者分别**提出了DWT变换、FWT变换等用于描述图像块的特征**。Bashar等人[2]提出了两个鲁棒的特征，分别基于DWT变换和KPCA，并将这些特征向量构成一个矩阵。Cozzolino等人[3]提出了CHT作为图像的特征。该方法将图像中的每一个像素点都进行处理，提取到每一个像素点的特征。为了减少计算量，使用了快速的近似最近邻搜索算法对密集区域处进行高效的计算。

除了频率域的特征提取，**基于空间域**的特征提取也有很多经典的算法，其中将矩阵特征作为图像的特征进行处理就是经常使用的方法。Mahdian和Saic[4]较早提出了一种**基于模糊矩阵**的方法，并使用了主成分分析减少特征的维数，最后利用k-d树对多维的数据块进行相似性分析，从而对篡改区域进行定位。Ryu等人[5]则将**Zernike矩阵**作为图像块的特征，并在**图像块匹配时使用了局部敏感哈希算法**加速匹配过程，最终根据匹配块寻找篡改区域。

除了使用矩阵特征以外，也有研究者利用图像本身的一些**纹理亮度信息作为图像的特征**。Davarzani等人[6]采用多分辨率局部二值模式（MLBP）作为图像块的特征信息。为了获得精确的匹配信息，还使用了**RANSAC算法**去除掉错误的匹配。

基于图像块的检测算法虽然能达到一定的效果，但是随着图像复制粘贴篡改的多样化，以及实际图像复制篡改过程中经历更多几何变换如旋转、缩放等，基于图像块的检测方法的鲁棒性会降低。此外，基于图像块的方法需要大量的计算，难以在实际中进行应用。为了提高检测效率，增强对抗几何变换的鲁棒性，基于关键点匹配的检测方法成了新的研究热点。

#### 基于关键点的方法

基于关键点的检测方法计算效率高且有较强的鲁棒性，适用于实际情况下的多类型图像复制粘贴篡改检测，因此研究者也致力于用基于关键点的检测方法来解决各种图像复制粘贴篡改检测的问题。

**该类方法首先从整幅图像中提取关键点，然后对其进行特征描述提取和匹配过程，最后通过得到关键点匹配进行后续处理从而定位复制粘贴篡改区域。**

Huang等人[7]**采用SIFT作为图像关键点检测与特征描述**的方法，并使用**Best Bin First算法**来寻找相似的特征向量，进而确定匹配关键点的位置。此后很多学者也提出了基于SIFT特征的检测方法，Pan和Lyu[8]使用了**RANSAC算法**来计算复制粘贴区域之间的仿射变换关系。Amerini等人[9]基于2NN准则提出了**新的匹配方法G2NN**以应对多重复制粘贴的情形。除了SIFT以外，研究者还提出了其它一系列的优秀算法。Xu等人[10]**使用SURF作为提取图像关键点特征的方法**。相比SIFT，SURF运算比较简单，计算效率更高。此外，Yang等人[11]**采用了SIFT和KAZE的融合**作为提取关键点特征的方法。

针对复杂的复制粘贴篡改检测以及定位的精确度的问题，有研究者提出了更为系统的检测框架。Ardizzone等人[12]利用**提取的SIFT特征点来构建Delaunay 划分，然后利用每个三角形块的颜色信息和角度信息作为三角形区域的特征向量进行匹配**。Li等人[13]首先使用 **SLIC算法对图像进行分割成一系列的超像素块**，根据分割块内关键点匹配对的数量处理匹配块，提升了处理的效率。Zandi等人[14]通过自适应迭代的方法，根据每个迭代周期的结果迭代地调整关键点的分布还有匹配过程以及仿射变换矩阵计算。Li等人[15]通过降低关键点提取时的阈值，使得小区域、平滑区域可以提取足量的关键点，并且提出了一种**新的层次匹配策略来解决大量关键点匹配问题**。和基于块匹配的检测方法相比，基于关键点匹配的方法避免了全局搜索，大大提高了检测效率，且对几何变换具有更好的鲁棒性。

#### 基于深度学习的方法

随着深度学习尤其是卷积神经网络的发展，研究者开始尝试使用深度学习的方法进行图像复制粘贴篡改的检测。Wu等人[16]设计了**端到端的BusterNet**，采取双分支结构，对图像操作和图像相似性进行检测，具有一定的效果，可以同时识别源区域和目标区域。Chen等人[17]提出一种**串行分支网络模型**，包含**相似性检测网络CMSDNet和源与目标鉴别网络STRDNet**。STRDNet研究CMSDNet获得的相似块的分类问题，相对于BusterNet的分支更加简单且准确率更高。

Barni等人[18]提出了多分支网络DisTool对图像复制篡改进行检测并识别源区域和目标区域，分别为两个Siamese组成的4-Twins Net分支和一个Siamese分支。该网络在真实的测试场景中也表现良好。Zhong等人[19]提出了**基于Dense-InceptionNet**的检测方案，充分使用了多尺度的信息和稠密特征链接，设计了**金字塔特征提取器，特征相关匹配和层次后处理模块**。**该算法对几何变换操作和JPEG压缩都有一定的鲁棒性**。

### Inpainting操作取证技术

图像修复(inpainting)技术是数字图像篡改中比较常用的一种手段，它的核心思想是根据图像受损区域周围的已知像素信息通过插值相邻像素对未知区域进行修复[20]。目前，传统的图像inpainting算法可以分成两类：**基于块的方法和基于扩散的方法。**

- 基于块的方法主要是通过搜索图像已知区域的图像块，寻找合适的候选块对受损区域进行填补以达到修复的目的；

- 基于扩散的方法通常是通过求解偏微分方程或者依据扩散系统将图像信息从边界传播扩散到未知区域进行修复。


当恶意篡改者使用图像inpainting技术进行篡改并将这类图像应用于司法、科学等领域时，将会造成不可预料的严重影响。现有的针对图像inpainting的**检测方法**大致可以分为两类：**基于传统手工特征的方法和基于深度学习的方法。**

#### 基于传统手工特征的方法

最初，Wu等人[21]在2008年提出了一种**基于零连通特征和模糊隶属度**的检测方法。首先对图像中的块进行零连通标记，筛选可疑区域，然后通过计算模糊隶属度识别可疑区域内的修复块，并通过割集实现最终的修复篡改区域的定位。

2013年，Bacchuwar等人[22]提出了一种可以同时检测图像修复和图像复制-粘贴两种篡改的方法。该方法**利用图像的亮度分量，对可疑区域中的块进行中值匹配**，引入“跳跃块”，从而有序检测篡改区域。它相较于文献[21]加速了修复区域的定位，但仍需要人工选择区域。

为减少最佳匹配块的搜索时间，Chang等人[23]通过检测关键值进行相似度检测，提出了一种**基于权值变换的搜索算法**，包括可疑区域检测和篡改区域识别两个阶段。Liang等人[24]首先**采用中心像素映射搜索**可疑块对，在装载因子和搜索范围方面加速了对可疑块的搜索，使用最大零连通性区域标记和片段拼接检测技术实现篡改区域的定位。

申林川等人[25]对已有的图像修复检测方法进行改进，**利用一种hash映射函数将图片三维的颜色信息转换成一维的hash值映射至哈希表**，再结合相似向量滤波和基于质心的篡改区域定位技术，实现篡改区域最终的准确定位。

另外，JPEG是目前网络中使用最广泛的图像格式。Zhao等人[26]针对JPEG图像展开研究，**通过计算和分割不同质量因子下的修复图像和再保存JPEG图像的绝对差值之和检测出被篡改的区域**，不需要任何手动操作。

Liu等人[27]也聚焦于JPEG图像，**提出了一种大规模特征挖掘的经验方法，包含边缘密度和联合密度特征**，采用集成学习，有效地检测了包括图像修复在内的复合攻击下的图像篡改，特别是在重压缩质量低于原始JPEG图像质量的情况下，显著提高了检测精度。

Li等人[28]针对**基于扩散的修复方法进行区域检测，发现修复区域和未修复区域图像沿垂直于梯度方向的拉普拉斯变换是不同的**。基于此，根据通道内和通道间的局部变化方差构造了一个特征集。最后，设计了两个有效的后处理操作来进一步细化定位结果。但该方法鲁棒性较差，特别是对经过JPEG压缩后处理的图像取证性能显著下降。

刘婷婷等人[29]**提出了一种梯度域导向滤波增强的图像扩散修复检测算法**。该算法对输入图像的各个颜色通道分别进行梯度域导向滤波增强，从多角度捕捉图像修复带来的影响，以实现图像扩散修复区域的定位。

基于传统手工特征的图像inpainting检测算法在一些方面存在一定的局限性，比如**需要手动选择区域、只针对特定的图像inpainting技术、鲁棒性较差**等。近年来为提高检测效率，增强算法对抗几何变换的鲁棒性，基于深度学习的图像inpainting检测算法也在不断发展。

#### 基于深度学习的方法

随着深度学习的发展，研究人员开始尝试使用深度学习方法实现图像修复检测。

2018年，Zhu等人[30]提出了一种基于深度神经网络的图像inpainting篡改检测技术，通过神经网络自动提取篡改痕迹，实现图像像素级的预测并对修复区域进行定位。**该框架在编码器-解码器的全卷积网络结构基础上还引入了特征金字塔网络对特征图进行信息补充**，填充图像的语义信息，且具有一定的泛化性。进一步地，Zhu等人[31]提出了新的网络框架，并构建了类标签矩阵，设计了加权交叉熵解决图像像素不平衡的问题。该方法考虑了JPEG压缩和缩放等后处理操作，具有一定的鲁棒性。

Wang等人[32]在2019年提出了一种**基于Faster R-CNN网络的图像inpainting篡改检测方法**，并**自制**了在两种深度学习图像修复算法下的**数据集**，实现了修复区域的边界框定位。但该方法只能得到标记有置信度分数的边界框，无法得到修复篡改区域的真实区域，定位精度有待进一步提高。

Lu等人[33]提出了一种**基于LSTM-CNN的图像目标去除方法**，利用CNN搜索异常相似块，提高了搜索的速度和准确性，利用LSTM网络消除虚警补丁对检测结果的影响，降低虚警率。

Li等人[34]探究发现在像素域中修复图像块和未修复图像块的转移概率值相似，而在残差域中表现出明显的差异，修复图像块包含较少的高频分量。因此，作者**设计了HP-FCN网络，利用高通滤波模块对输入图像进行预处理，将其残差图输送到基于CNN的特征提取模块中，再通过上采样模块采样到输入图像大小，最终得到像素预测的定位图。**该算法对深度学习下的修复数据集进行定位检测，且进一步考虑了随机修复和现实情况下的真实数据集，在准确率上都取得了较好的效果，具有一定的鲁棒性。

为了提高已有算法对不可见图像修复方法的检测性能，Wu等人[35]提出了一种新型的**端到端图像修复检测网络IID-Net，其中NAS算法用于设计适当的网络架构，并结合新提出的注意模块来进一步优化潜在特征。**该算法在特定深度修复方法上训练的取证模型对其他修复方法具有良好的通用性检测能力。作者还基于10种不同的修复方法构建了一个**包含10K张图片的不同修复测试数据集**，每种修复方法提供1000张图片，作为一个公共可访问的数据集，用于修复检测方法的标准化比较。

### Splicing操作取证技术

**图像拼接(splicing)**伪造不同于复制-粘贴伪造，它是将一个或多个源图像的区域复制粘贴到目标图像上得到篡改图像。图像拼接伪造检测与定位可以看作是一个全局二值分类问题，通过比较不同图像区域之间的特征来检测定位篡改区域。现有的图像拼接伪造检测方法大致可以归纳为四类：**基于模糊类型不一致性的方法**，**基于噪声水平不一致性的方法**，**基于光照不一致性的方法**和**基于深度学习的方法**。

#### 基于模糊类型不一致性的方法

2011年，Kakar等人[36]提出了一种**利用运动模糊差异性检测图像拼接**的新方法。通过对图像梯度的运动模糊水平的估计，检测拼接区域和原始区域之间的不一致性。作者还开发了一种新的方法，可以较好地对包含运动模糊的图像进行不一致性区域分割。

为了适应不同范围的模糊程度，Bahrami等人[37] 提出了一种基于**图像模糊度和深度信息不一致性的图像拼接检测框架**。首先估计图像块的模糊核，再利用分步模糊技术测量局部模糊核的相对模糊度。基于此，对不同模糊程度的图像块进行分类。

Rao等人[38]考虑手持摄像机中运动模糊现象这一特定场景，提出了一种**以模糊为线索的被动图像拼接检测方法**。离焦模糊也是图像拼接检测中的一种常用特征，然而纹理、光场、噪声等都会在一定范围内影响自然边缘的离焦模糊信息，导致边缘离焦模糊估计不一致。

Song等人[39]分析了图像拼接边缘和自然边缘的离焦模糊特征的差异性，提出了**一种新的基于离焦模糊差的自然图像拼接检测方法**。当伪造者使用一些后处理操作来掩盖拼接痕迹时，图像拼接问题是一个具有挑战性的问题。

为进一步解决这个问题，Bahrami等人[40]在2015年提出了一种**基于局部模糊类型不一致性的模糊图像拼接定位框架**。作者首先对图像进行分块，根据局部模糊核提取局部模糊类型检测特征用于离焦模糊和运动模糊的划分，从而生成模糊类型不变区域。最后，采用精细拼接定位方法提高区域边界的精度。

#### 基于噪声水平不一致性的方法

大多数图像在采集或后续处理过程中都会引入一定的噪声，而自然图像和具有不同来源的拼接图像中的噪声会存在不同程度的差异性。研究人员根据噪声的不一致性提出了相应的图像拼接检测算法。

Mahdian等人[41]将待测图像分割成不同噪声水平的分区，**利用基于中值的方法计算每个图像块的噪声标准差**，通过一个阈值确定图像拼接篡改区域。

Lyu等人[42]利用了自然图像在带通域内峰度的特殊规律以及噪声特征与峰度之间的关系。**将噪声统计量的估计表述为一个具有封闭解的优化问题**，并进一步推广到一种有效的局部噪声统计量估计方法。通过揭示局部噪声水平的不一致性来检测拼接区域。

研究人员发现可以通过主成分分析(PCA)来估计图像的噪声水平。其中，2015年，Zhan等人[43]在主成分分析的基础上，根据不同的局部噪声方差，**对待测图进行均匀噪声的区域分割**，实现篡改区域的定位。Zeng等人[44]发现当拼接区域与原始区域噪声差较小时，一些基于噪声的图像拼接定位算法性能不佳。作者采用基于主成分分析的算法对图像进行分块噪声水平估计，**通过k-means聚类从原始区域分割出篡改区域**。Yao等人[45]通过探讨噪声水平函数(NLF)与相机相应函数(CRF)之间的关系，拟合了CRF约束下的NLF曲线，**建立了一个贝叶斯最大后验(MAP)框架来优化NLF估计**，并开发了一种基于不同来源图像块噪声水平不一致性的图像拼接检测方法。Liu等人[46]针对多目标拼接伪造场景，**利用噪声水平函数(NLF)估计图像噪声与像素强度之间的关系，从而检测可疑篡改区域**。2018年，Nan等人[47]提出一种新的噪声水平函数的图像拼接检测方法。作者首先将图像分成不重叠的块，将每个块的噪声方差拟合到锐利度下，**通过计算图像块到拟合曲线的最小距离区分篡改区域**。

#### 基于光照不一致性的方法

一般来说，使用不同设备拍摄的图像会存在光照不一致性。基于此特性，Liu等人[48]在2011年提出了一种基于阴影亮度不一致性的图像拼接篡改检测框架。**该框架首先提取图像中的阴影边界和半阴影区域**，估计阴影的遮罩值来衡量其颜色特征。但当合成阴影和实际目标阴影一致时，该算法失效。Ke等人[49]对此提出改进，提出了基于阴影一致性的篡改图像检测方法。通过提取阴影区域和非阴影区域的纹理特征，**利用相关函数来度量两种纹理特征的相似性。通过比较相似度，实现图像拼接篡改的检测。**

#### 基于深度学习的方法

- Xiao等人[50]提出了一种由粗到精的两阶段检测网络(**C2RNet**)和稀释自适应聚类两部分组成的拼接伪造检测方法，从不同尺度的图像块中学习图像属性的差异。
- Bappy等人[51]提出了一种**利用空间域的编码器-解码器结构网络和频域的长短期记忆(LSTM)网络的双域检测方法**。该网络利用更大的接受域和频域相关性，通过结合编码器和LSTM网络来分析篡改区域和非篡改区域之间的区别特征。最后使用解码器实现像素级预测图像篡改定位。
- 进一步地，Wu等人[52]将伪造定位问题定义为局部异常检测问题，**设计了Z-score特征来捕获局部异常，并提出了一种新的检测网络结构(Mantra-net)来评估局部异常**。
- Bi等人[53]采用图像分割的思想，设计了一种用于图像拼接伪造检测的环形残差U-Net (RRU-Net)，**利用残差传播和残差反馈使得未篡改区域和篡改区域**之间的图像属性差异更加明显。
- Zhou等人[54]针对目前常见的几类局部篡改操作，**结合传统特征提出了一个双流Faster R-CNN网络**。不仅实现了篡改操作类型识别，更进一步地能够定位到篡改区域，在图像拼接伪造检测方面也具有比较好的性能。

目前，图像拼接伪造检测和定位问题出现了一种新的定义：给定一幅探针图像Q和一幅潜在的供体图像P。检测供体图像的区域是否已拼接到探针图像中，如果已拼接到探针图像，则提供两个掩码，指示拼接到探针中的供体图像区域和从供体图像中拼接的图像区域。这一新问题将图像拼接检测约束为一对图像，相关研究人员将其称为约束图像拼接检测问题。针对这一问题，Wu等人[55]提出了一种开拓性的CISDL方法，设计了一种新的深度卷积神经网络结构—**深度匹配与验证网络(DMVN)**。Ye等人[56]在继承DMVN深度密集匹配层的基础上，提出了**特征金字塔深度匹配与定位方法网络(FPLN)**。Liu等人[57]提出了**一种面向CISDL新的对抗性学习框架的深度匹配网络(DMAC)**，用于生成两个高质量候选掩模，基于检测网络纠正候选掩模之间的不一致，并**基于判别网络生成与真实篡改区域接近的掩模，检测网络与判别网络以对抗学习方式协同监督DMAC**训练。

### **小结与思考**

目前，除了上述图像篡改操作的取证，removal、seam carving等篡改操作的取证研究也吸引了国内外学者的广泛关注，并取得了一些阶段性成果。尤其是近年来，以卷积神经网络为代表的深度学习技术在图像篡改操作取证领域取得了突出的性能，但仍存在一些问题有待进一步研究。

（1）篡改者在使用copy-move，inpainting或者splicing操作对图像语义进行恶意篡改后，通常会使用一些后处理操作或者反取证技术掩盖操作的篡改痕迹，如何设计对不同后处理操作和反取证技术鲁棒的篡改操作取证模型是值得进一步探索的方向。

（2）针对inpainting操作检测问题，大多数取证方法都基于修复区域与未修复区域的块匹配原理，检测效率较低。如何在保证定位准确率的前提下，加快区域匹配速率是一个待解决的问题。

### 参考文献

[1]J. Fridrich, D. Soukal, and J. Lukas. Detection of copy-move forgery in digital images. Proceedings of Digital Forensic Research Workshop (DFRWS), Cleveland, OH, USA, 2003.

[2]M. Bashar, K. Noda, N. Ohnishi, and K. Mori. Exploring duplicated regions in natural images. IEEE Transactions on Image Processing, DOI: 10.1109/TIP.2010.2046599, 2010.

[3]D. Cozzolino, G. Poggi, and L. Verdoliva. Efficient dense¬field copy–move forgery detection. IEEE Transactions on Information Forensics and Security, vol. 10, no. 11, pp. 2284-2297, 2015.

[4]B. Mahdian, and S. Saic. Detection of copy–move forgery using a method based on blur moment in-variants,.Forensic Science International, vol. 171, no. 2, pp. 180-189, 2017.

[5]S. -J. Ryu, M. Kirchner, M. -J. Lee, and H. K. Lee. Rotation invariant localization of duplicated image regions based on zernike moments. IEEE Transactions on Information Forensics and Security, vol. 8, no. 8, pp. 1355-1370, 2013.

[6]R. Davarzani, K. Yaghmaie, S. Mozaffari, and M.Tapak. Copy¬-move forgery detection using multiresolution local binary patterns. Forensic Science International, vol. 231, no. 1, pp. 61-72, 2013.

[7]H. Huang, W. Guo, and Y. Zhang. Detection of copy-move forgery in digital images using sift algorithm. IEEE Pacific-Asia Workshop on Computational Intelligence and Industrial Application (PACIIA), Wuhan, China, pp. 272–276, 2008.

[8]X. Pan, and S. Lyu. Region duplication detection using image feature matching. IEEE Transactions on Information Forensics and Security, vol. 5, no. 4, pp. 857-867, 2010.

[9]I. Amerini, L. Ballan, R. Caldelli, A.D. Bimbo, and G. Serra. A sift-based forensic method for copy-move attack detection and transformation recovery. IEEE Transactions on Information Forensics and Security, vol. 6, no. 3, pp. 1099-1110, 2011.

[10]B. Xu, J. Wang, G. Liu, H. Li, and Y. Dai. Image copy-move forgery detection based on surf. International Conference on Multimedia Information Networking and Security (MINES), Nanjing, China, pp. 889-892, 2010.

[11]F. Yang, J. Li, W. Lu, and J. Weng. Copy¬-move forgery detection based on hybrid features. Engineering Applications of Artificial Intelligence, vol. 59, pp. 73-83, 2017.

[12]E. Ardizzone, A. Bruno, and G. Mazzola. Copy move forgery detection by matching triangles of keypoints. IEEE Transactions on Information Forensics and Security, vol. 10, no. 10, pp. 2084-2094, 2015.

[13]J. Li, X. Li, B. Yang, and X. Sun. Segmentation¬ based image copy¬-move forgery detection scheme. IEEE Transactions on Information Forensics and Security, vol. 10, no. 3, pp. 507-518, 2015.

[14]M. Zandi, A. M.-Aznaveh and A. Talebpour. Iterative copy-¬move forgery detection based on a new interest point detector. IEEE Transactions on Information Forensics and Security, vol. 11, no. 11, pp. 2499-2512, 2016.

[15]Y. Li, and J. Zhou. Fast and effective image copy¬-move forgery detection via hierarchical feature point matching. IEEE Transactions on Information Forensics and Security, vol. 14, no. 5, pp. 1307-1322, 2019.

[16]Y. Wu, W. A.-Almageed, and P. Natarajan. BusterNet: Detecting copy-move image forgery with source/target localization. Proceedings of the European Conference on Computer Vision (ECCV), Munich, Germany, pp.170-186, 2018.

[17]B. Chen, W. Tan, G. Coatrieux, Y. Zheng, and Y. Q. Shi. A serial image copy-move forgery localization scheme with source/target distinguishment. IEEE Transactions on Multimedia, DOI: 10.1109/TMM.2020.3026868, 2020.

[18]M. Barni, Q. -T. Phan, and B. Tondi. Copy move source-target disambiguation through multi-branch CNNs. IEEE Transactions on Information Forensics and Security, vol. 16, pp. 1825-1840, 2021.

[19]J. Zhong, and C. Pun. An end-to-end Dense-InceptionNet for image copy-move forgery detection. IEEE Transactions on Information Forensics and Security, vol. 15, pp. 2134-2146, 2020.

[20]A. Criminisi, P. Perez, and K. Toyama. Region filling and object removal by exemplar-based image inpainting. IEEE Transactions on Image Processing, vol. 13, no. 9, pp. 1200-1212, 2004.

[21]Q. Wu, S. Sun, W. Zhu, G. Li, and D. Tu. Detection of digital doctoring in exemplar-based inpainted images. International Conference on Machine Learning and Cybernetics (ICMLC), Kunming, China, pp. 1222–1226, 2008.

[22]K. S. Bacchuwar, Aakashdeep, and K. R. Ramakrishnan. A jump patch-block match algorithm for multiple forgery detection. International Mutli-Conference on Automation, Computing, Communication, Control and Compressed Sensing (iMac4s), Kottayam, India, pp. 723-728, 2013.

[23]I. Chang, J. Yu, and C. Chang. A forgery detection algorithm for exemplar-based inpainting images using multi-region relation. Image and vision computing, vol. 31, no. 1, pp. 57-71, 2013.

[24]Z. Liang, G. Yang, X. Ding, and L. Li. An efficient forgery detection algorithm for object removal by exemplar-based image inpainting. Journal of Visual Communication and Image Representation, vol. 30, pp. 75-85, 2015.

[25]L. Shen, G. Yang, L. Li, X. Sun. Robust detection for object removal by exemplar-based image inpainting with post-processing. International Conference on Natural Computation, Fuzzy Systems and Knowledge Discovery (FSKD), Guilin, China, pp. 2730-2736, 2017.

[26]Y. Zhao, M. Liao, F. Y. Shih, and Y. Q. Shic. Tampered region detection of inpainting JPEG images. Optik, vol. 124, no. 16, pp. 2487-2492, 2013.

[27]Q. Liu, A. H. Sung, B. Zhou, and M. Qiao. Exposing inpainting forgery in JPEG images under recompression attacks. IEEE International Conference on Machine Learning and Applications (ICMLA), Anaheim, CA, USA, pp. 164-169, 2016.

[28]H. Li, W. Luo, and J. Huang. Localization of diffusion-based inpainting in digital images. IEEE transactions on information forensics and security, vol. 12, no. 12, pp. 3050-3064, 2017.

[29]刘婷婷, 张玉金, 吴飞等. 基于梯度域导向滤波增强的图像扩散修复取证[J]. 激光与光电子学进展, 2020, vol. 57, no. 8, pp. 35-42.

[30]朱新山, 钱永军, 孙彪等. 基于深度神经网络的图像修复取证算法[J]. 光学学报, 2018, vol. 38, no. 11, pp. 97-105.

[31]X. Zhu, Y. Qian, X. Zhao, B. Sun, and Y. Sun. A deep learning approach to patch-based image inpainting forensics. Signal Processing: Image Communication, vol. 67, pp. 90–99, 2018.

[32]X. Wang, H. Wang, and S. Niu. An image forensic method for AI inpainting using faster R-CNN. International Conference on Artificial Intelligence and Security (ICAIS), New York, USA, pp. 476-487, 2019.

[33]M. Lu, and S. Niu. A detection approach using LSTM-CNN for object removal caused by exemplar-based image inpainting. Electronics, vol. 9, pp. 858, 2020.

[34]H. Li, and J. Huang. Localization of deep inpainting using high-pass fully convolutional network. IEEE International Conference on Computer Vision (ICCV), Seoul, South Korea, pp. 8301-8310, 2019.

[35]H. Wu, and J. Zhou. IID-Net: image inpainting detection network via neural architecture search and attention. IEEE Transactions on Circuits and Systems for Video Technology, DOI: 10.1109/TCSVT.2021.3075039, 2021.

[36]P. Kakar, N. Sudha, and W. Ser. Exposing digital image forgeries by detecting discrepancies in motion blur. IEEE Transactions on Multimedia, vol. 13, no. 3, pp. 443-452, 2011.

[37]K. Bahrami, A. C. Kot, and J. Fan. Splicing detection in out-of-focus blurred images. IEEE International Workshop on Information Forensics and Security (WIFS), Guangzhou, China, pp. 144-149, 2013.

[38]M. P. Rao, A. N. Rajagopalan, and G. Seetharaman. Harnessing motion blur to unveil splicing. IEEE Transactions on Information Forensics and Security, vol. 9, no. 4, pp. 583-595, 2014.

[39]C. Song, and X. Lin. Natural image splicing detection based on defocus blur at edges. IEEE/CIC International Conference on Communications in China (ICCC), Shanghai, China, pp. 225-230, 2014.

[40]K. Bahrami, A. C. Kot, L. Li, and H. Li. Blurred image splicing localization by exposing blur type inconsistency. IEEE Transactions on Information Forensics and Security, vol. 10, no. 5, pp. 999-1009, 2015.

[41]B. Mahdian, and S. Saic. Using noise inconsistencies for blind image forensics. Image and Vision Computing, vol. 27, no. 10, pp. 1497-1503, 2009.

[42]S. Lyu, X. Pan, and X. Zhang. Exposing region splicing forgeries with blind local noise estimation. International Journal of Computer Vision, vol. 110, no. 2, pp. 202–221, 2014.

[43]L. Zhan, and Y. Zhu. Passive forensics for image splicing based on PCA noise estimation. International Conference for Internet Technology and Secured Transactions (ICITST), London, UK, pp. 78-83, 2015.

[44]H. Zeng, Y. Zhan, X. Kang, and X. Lin. Image splicing localization using PCA-based noise level estimation. Multimedia Tools and Applications, vol. 76, no. 4, pp. 4783–4799, 2017.

[45]H. Yao, S. Wang, X. Zhang, C. Qin, and J. Wang. Detecting image splicing based on noise level inconsistency. Multimedia Tools and Applications, vol. 76, no. 10, pp. 12457–12479, 2017.

[46]B. Liu, and C. Pun. Multi-object splicing forgery detection using noise level difference. IEEE Conference on Dependable and Secure Computing (DSC), Taipei, Taiwan, pp. 533-534, 2017.

[47]Z. Nan, and L. Zhao. Blind image splicing detection via noise level function. Signal Processing: Image Communication, vol. 69, pp. 181-192, 2018.

[48]Q. Liu, X. Cao, C. Deng, and X. Guo. Identifying image composites through shadow matte consistency. IEEE Transactions on Information Forensics and Security, vol. 6, no. 3, pp. 1111-1122, 2011.

[49]Y. Ke, F. Qin, W. Min, and G. Zhang. Exposing image forgery by detecting consistency of shadow. The scientific world journal, vol. 2014, no. 3, pp. 1-9, 2014.

[50]B. Xiao, Y. Wei, X. Bi, W. Li, and J. Ma. Image splicing forgery detection combining coarse to refined convolutional neural network and adaptive clustering. Information Sciences, vol. 511, pp. 172–191, 2020.

[51]J. H. Bappy, C. Simons, L. Nataraj, B. S. Manjunath, and A. K. Roy-Chowdhury. Hybrid LSTM and encoder-decoder architecture for detection of image forgeries. IEEE Transactions on Image Processing, vol. 28, no. 7, pp. 3286-3300, 2019.

[52]Y. Wu, W. AbdAlmageed, and P. Natarajan. ManTra-Net: manipulation tracing network for detection and localization of image forgeries with anomalous features. IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), Long Beach, CA, USA, pp. 9535-9544, 2019.

[53]X. Bi, Y. Wei, B. Xiao, and W. Li. RRU-Net: the ringed residual U-Net for image splicing forgery detection. IEEE/CVF Conference on Computer Vision and Pattern Recognition Workshops (CVPRW), Long Beach, CA, USA, pp. 30-39, 2019.

[54]P. Zhou, X. Han, V. I. Morariu, and L. S. Davis. Learning rich features for image manipulation detection. IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), Salt Lake, USA pp. 1053-1061, 2018.

[55]Y. Wu, W. Abd-Almageed, and P. Natarajan. Deep matching and validation network: An end-to-end solution to constrained image splicing localization and detection. ACM international conference on Multimedia (MM), Mountain View, CA, USA, pp. 1480–1502, 2017.

[56]K. Ye, J. Dong, W. Wang, B. Peng, and T. Tan. Feature pyramid deep matching and localization network for image forensics. Asia-Pacific Signal and Information Processing Association Annual Summit and Conference (APSIPA ASC), Honolulu, Hawaii, USA, pp. 1796–1802, 2018.

[57]Y. Liu, X. Zhu, X. Zhao, and Y. Cao. Adversarial learning for constrained image splicing detection and localization based on atrous convolution. IEEE Transactions on Information Forensics and Security, vol. 14, no. 10, pp. 2551-2566, 2019.

## 数字图像处理操作取证(Manipulation)

### JPEG重压缩取证技术

篡改图像必然会经过重压缩这一步骤，因此数字图像重压缩检测能够为数字图像取证提供强有力的辅助依据。目前，使用最广泛的图像压缩标准是JPEG，若原始的图像是JPEG格式，篡改后的图像为达到不易于检测的效果，同样会保存为JPEG格式，则图像会进行两次JPEG压缩。现如今JPEG重压缩取证包含两个主要研究课题，一是**JPEG重压缩检测**，二是**对JPEG重压缩区域进行定位**。

#### JPEG重压缩检测

JPEG压缩属于有损压缩，每次压缩都会丢失一部分信息，由于JPEG重压缩对图像数据进行了两次量化操作，引入了一些单次JPEG压缩所没有的特征，因此通过一定的统计检测可以发现图像是否经历过JPEG重压缩。

现今的重压缩检测算法大多遵循一个检测模式，第一步是从图像中**找到能最大化单次压缩和双重压缩类间差异的特征**；第二步则是在得到特征后，基于数据驱动训练分类器，**用于识别和分类双重压缩和单次压缩**。

- 比如，Shang等人[1]**以DCT系数**矩阵水平、垂直、对角、反对角方向差分的高阶马尔科夫转移概率作为特征，用SVM和EC分类器分类实现JPEG重压缩图像检测。
- Zeng等人[2]提出了一种改进的密集连接的**卷积网络（DenseNet）**来完成双压缩图像中主JPEG压缩的检测任务。他们在网络的前端加入了一个特殊的滤波层，该层通常包含选定的滤波和，可以帮助后续网络更容易地识别图像。
- Wang等人[3]提出了**一种基于四元数离散余弦变换（QDCT）域的改进马尔可夫压缩检测算法**。首先，对给定JPEG图像的颜色信息提取图像构造四元数；然后，构造图像块QDCT系数矩阵，包括振幅和三个角；接着，在相应的细化过程中，由转移概率矩阵生成细化的马尔可夫特征；最后，使用支持向量机（SVM）方法进行NA-DJPEG压缩检测。然而这些统计模型大多关注变换域系数本身，忽略了JPEG压缩给变换域系数引入的相关性，使得当后压缩质量因子远小于前压缩质量因子时，难以判定双重压缩的存在性。

此外，**为了更进一步获取重压缩痕迹，首次压缩时的量化步长估计**是非常关键的问题。

- Galvan等人[4]首先使用直方图滤波除去二次量化以外操作引入的直方图噪声，然后使用一个新的估计方程来估计第一次量化使用的量化步长。该方法在实际应用中可以更准确估计量化步长。然而当后压缩质量因子较小时，大量图像数据会被破坏乃至丢弃，使得这类方法检测效果不佳。
- 此外，Thai等人[5]**将量化效应和DCT系数统计相结合**，对先前压缩并存储为无损的图像进行量化步长的估计。

#### JPEG重压缩定位

一些研究将JPEG重压缩检测和篡改区域定位相结合。

- Yang等人[6]先提取相同频率的量化DCT系数，建立新的数据矩阵，然后考虑方向对DCT域相邻位置相关性的影响，执行12种不同方向的高通滤波模板，计算每个滤波数据的平移概率矩阵。然后利用PCA和SVM分别对特征维数进行降维和分类器训练，以此确定图像是否被篡改。
- Wang等人[7]利用Laplacian分布来描述在拼接区域和原图像的DCT系数分布，通过估计DCT块的后验概率来确定被篡改区域。
- Amerini等人[8]使用卷积神经网络（CNN）实现了JPEG重压缩的篡改定位。
- Zhou等人[9]使用一种双通道的快速R-CNN网络，并对其进行端到端的训练，对图像进行篡改检测。双通道之一是**RGB流**，其目的是从RGB图像输入中提取特征，以发现篡改特征，如强烈的对比度差、非自然的篡改边界等。**另一种是利用隐写分析丰富模型滤波层提取的噪声特征**，发现真实区域和篡改区域之间的噪声不一致。然后，通过双线性池化层融合来自两种流的特征，进一步合并这两种模式的检测结果。

除JPEG压缩外，已经有一些学者研究更为一般的情况，估计图像可能经受过的各种变换和压缩。

- Tagliasacchi等人[10]给出了一个**一般估计使用的图像变换技术和量化步长的方法**。
- Bianchi等人[11]**给出了一个判定信号是否经历过格量化的最优检测子**，进而将该检测方法应用于实际的场景，并判断图像是否经历过双重JPEG压缩。**但该方法要求两次压缩使用的块划分必须相同**。

### 增强操作取证技术

在现实生活中，经常会遇到数码设备由于光线、环境以及设备自身性能的问题而得到不清晰的图像，导致无法辨识原始图像中的关键目标，需要对图像进行增强处理。图像增强指通过某些图像处理操作，如对比度增强、中值滤波、锐化、模糊等，对原始图像附加一些信息或变换数据，有目的地突出图像中某些“有用”信息或者抑制掩盖图像中某些“无用”信息，扩大图像中不同物体特征之间的差别，以改善图像的视觉效果，丰富信息量。**然而，图像增强操作可以淡化隐藏其他篡改操作的痕迹，达到降低篡改检测性能的目的。**目前，**图像增强操作取证**研究已经吸引了国内外学者的广泛关注，并取得了一些阶段性成果。

####  对比度增强取证

对比度增强是一种被广泛使用的图像增强处理技术，是对图像中每个像素点的值进行非线性映射，通过累积函数对灰度值进行调整，改变图像中像素强度的整体分布，最终达到对比度的增强效果。

- Stamm等人[12]利用像素值映射在图像直方图上的统计特征，通过观察对比度增强操作向图像直方图的高频成分添加的能量信息，**检测对比度增强操作**。
- Cao等人[13]提出了零波谷特征，即当图像经过对比度增强操作处理后，图像直方图能呈现出明显的波峰波谷，并且生成的波谷都是值为0的零波谷。利用零波谷特征，基于阈值化二类分类检测对比度增强操作。
- Zhang等人[14]提出一种深度多路径网络，基于灰度直方图，通过共享多个卷积层捕获图像底层特征，并利用由多条路径组成的特定操作层学习不同对比度增强操作的特征，最后通过聚合层对原始图像和对比度增强操作处理的图像进行分类。
- 王金伟等人[15]提出一种基于线性模型的图像对比度增强检测算法，提取图像噪声残差，采取分块策略计算每块残差的线性模型，并计算相应的功率谱密度，以整幅图像的均值功率谱密度作为分类特征，利用支持向量机进行分类。

#### 模糊取证

为了消除图像篡改在拼接边缘产生的视觉或统计上的畸变，通常会在图像篡改后使用模糊操作消除简单拼接留下的伪造痕迹。模糊操作的基本原理是对图像的局部邻近像素值进行邻域灰度平均。

- 周琳娜等人[16]提出一种基于图像形态学滤波边缘特征的模糊操作取证方法，用同态滤波和形态学滤波增强模糊操作的图像边缘，利用离焦模糊和人工模糊的边缘特性，**检测伪造图像的模糊操作痕迹**。
- Su等人[17]提出一种三维模糊识别方法，将图像划分为非模糊区、离焦模糊区和运动模糊区，利用梯度信息预测不同类型的模糊区域，并采用超像素分割技术对模糊区域进行细化识别。
- Xu等人[18]提出几种新的局部模糊度量方法，使用不同类型的图像信息，包括颜色、梯度和光谱信息，基于支持向量机，构造最优模糊检测分类器。

#### 中值滤波取证

中值滤波操作是一种高度非线性操作，由于其良好的平滑滤波性质，通常被用于反取证技术中[19-20]，使得中值滤波取证越来越受到关注。

- Kirchner等人[21]利用图像差分转移概率矩阵构造特征，检测图像是否经过中值滤波操作处理。
- Kang等人[22]利用中值滤波残差特征，将特征相邻元素之间的关系建模为自回归模型，利用自回归系数检测中值滤波。
- 彭安杰等人[23]提出一种基于中值滤波残差及其差分的鲁棒中值滤波取证技术，根据方向性和对称性将多方向差分特征分组，分别建立自回归模型，并提取其模型参数和直方图特征，组合成中值滤波检测特征。

#### 锐化取证

锐化滤波常用于增强图像的局部对比度，使边缘和文理等细节变得更加清晰锐利。同样，作为常用的图像润饰操作，锐化经常被用于削弱掩盖图像篡改时遗留的痕迹。

- Cao等人[24]提出了一种有效的过冲效应测度方法，进而提取有效的指纹特征，通过阈值化分类来鉴别图像是否经历过USM锐化操作。
- Ding等人[25]提出一种基于局部二值模式LBP的锐化检测方法，采用Canny算子进行边缘检测，将LBP应用于图像检测到的边缘像素并提取特征，基于支持向量机进行锐化分类。
- F. Ding等人[26]利用图像USM锐化引起的纹理变化，提出一种边缘垂直二值编码的USM锐化检测方法。

### **几何操作取证技术**

当一幅图像被篡改时，例如拷贝一副图像的某一区域覆盖到被篡改图像中，篡改者通常需要**采取缩放、旋转等几何变换来掩盖篡改痕迹**。而这一过程需要对图像重新采样和重构，因此图像重采样检测是数字图像取证中十分重要的研究课题。重采样取证主要包含两个主要的研究目标，第一是**判断图像是否经过重采样的重采样检测**，第二是**估计重采样操作过程中施加于图像上的相关参数，如重采样因子、旋转角度**等。

#### 缩放取证

缩放操作是最常见的几何操作，常见于篡改图像后，调整篡改区域的大小以适配图像内容。然而在实际情况中，受限于网络传输速度与机器存储容量，篡改图像在缩放前后很可能会经历JPEG压缩。

因此，涉及缩放操作的重采样取证有两大类研究方向，第一是针对无JPEG压缩的单一重采样取证场景；第二是和JPEG压缩操作相结合的复合取证场景，根据JPEG压缩出现的顺序，该场景可细分为三种复合取证场景，即Pre-JPEG重采样**（JPEG格式缩放后保存为无损格式）**、Post-JPEG重采样**（无损格式缩放后保存为JPEG格式）**和Double-JPEG重采样**（JPEG格式缩放后保存为JPEG格式）**三种情况。

针对无JPEG压缩的单一重采样取证场景，重采样图像中每一个像素都由原始像素与插值函数卷积而成，且像素之间隐藏着重采样痕迹。由于插值的影响，这种重采样痕迹反映在空域上体现为像素之间存在相关性[27]，且相邻插值像素的间隔存在一种周期性；反映在频域上体现为存在频谱峰值，且峰值位置与放缩因子有关[28]。鉴于重采样操作的这些特点，近年来专家学者们提出了许多重采样检测算法，虽然这些算法的思路各异，但是大体都遵循一个流程。首先，从待检测图像中通过某种方式提取出残差信号，这种残差信号放大了重采样痕迹，剔除噪音与视觉信息，显性的揭露出重采样操作遗留下的周期性。根据所采用的数学模型不同，这种残差信号可以通过计算图像的二阶差分获得[29]，也可以通过快速滤波计算出插值像素得到相应的概率图[30]。在得到蕴含周期性的残差信号后，第二步就是根据这种信号判别重采样操作的存在，最常用的手段是频谱方法，通过对残差信号进行傅里叶变换，由于周期函数傅里叶变换的特殊性，重采样图像的频谱图上会出现与放缩因子有关的频谱峰值[28]，这些峰值可以作为重采样操作存在的证据，更进一步，根据峰值与放缩因子的关系估计出相应的放缩因子。除此之外，可以将第一步得到的残差信号视为手工设计的特征，作为输入训练一个强有力的分类器，通过数据驱动学习一个重采样判别模型[31]。更进一步，可以借鉴深度学习在图像检测领域的发展，提出用于重采样检测和因子估计的深度网络[32-35]。

然而上述方法无法直接运用于与JPEG压缩操作相结合的复合取证场景，这是因为JPEG压缩通过分块将图像保存并复原，使得JPEG图像像素之间先天就带有周期性，当与放缩操作结合时，会混淆放缩操作带来的周期性，最终形成复合的周期，使得现有的重采样图像检测算法失效。

- 针对Pre-JPEG重采样的情况，Liu等人[36]基于自相关函数构建了重采样图像的数学模型，他们通过该模型推导出了重采样系数、插值函数和重采样谱峰位置的关系，他们提出了基于图像差分极值点距离直方图的方法，通过挖掘图像差分的规律来取证重采样操作和进行因子估计。而后，他们还提出了针对Post-JPEG重采样图像的取证方案[37]，他们基于循环平稳信号分析发现Post-JPEG重采样图像上会出现一系列的对称谐波峰，并提出一种基于相位抵消的图像重采样检测和因子估计方法。
- 除此之外，Lu等人[38]还提出了基于反缩放策略的双域联合估计算法，从频谱域和DCT域综合估计重采样因子，他们首先通过搜索匹配从Double-JPEG图像频谱中提取数个可能的候选因子，然后根据DCT域系数的独立同分布模型，使用反缩放策略得到最优估计。

#### 旋转取证

旋转操作也是常见的几何操作之一，同样涉及到图像像素重采样，在空域和频域上的操作痕迹与缩放操作有许多共通之处。

- Wei等人将旋转操作视为一种特殊的缩放操作[39]，将旋转角度与特定的缩放因子结合在一起，通过频谱峰值与缩放因子的关系推导出图像经历的旋转角度，不仅如此，他们发现不同的频谱提取操作顺序可以更加明显的突出重采样峰值特征，有利于进一步区分旋转操作和缩放操作，并在此基础上提出了只包含旋转和缩放的二次几何变换操作链恢复算法。
- 此后，Chen等人[40]提出对图像连续几何变换的取证方法，他们基于平方信号分析图像重采样特征，将Gallagher的理论推广到连续二次几何变换领域，揭示了二次几何变换的频谱特征，并提出了更细粒度的只包含旋转和缩放的二次几何变换操作链恢复算法。随后，他们根据二维自相关函数，提出了针对旋转缩放等仿射变换的参数估计方案[41]。

###  操作链取证技术

实际的图像处理过程可能包含多个操作，它们按照一定的顺序共同构成图像操作链。当图像经历多种操作处理时，不同操作遗留在图像中的痕迹可能相互叠加和覆盖，从而导致某个操作的遗留痕迹被掩盖或者破坏。同时，痕迹间的相互影响与操作的执行顺序有关，当操作顺序发生变化时，最终的遗留痕迹也会有所不同。因此，由于多个操作之间的相互影响，针对单个篡改操作的取证方法难以满足图像操作链取证的实际需求。**为了完整地揭示数字图像可能经历的处理过程，需要明确图像操作链包含的操作类型，多个操作的拓扑顺序，以及处理操作的关键参数。目前，图像操作链取证研究可以粗略的分为基于传统手工特征的方法和基于深度学习的方法。**

#### 基于传统手工特征的方法

- 西班牙维戈大学P. Comesaña于2012年最先提出操作链取证[42]。他从理论上分析了利用已有的单操作篡改取证算法检测图像操作链的可能性,并以量化和加性高斯白噪声组成的操作链为例进行了实验验证。随后, 他还进一步实验分析了包含更多操作的操作链拓扑结构[43]。
- Stamm [44]等人针对对比度增强与缩放组成的二元操作链取证，提出采用直方图缺值特征和图像预测误差评价，分别进行对比度增强和图像缩放的检测，并引入了条件指纹的概念，用以单独识别对比度增强先于缩放操作的操作顺序。
- Li [45]等人针对内容感知缩放和对比度增强组成的二元操作链取证，提出了通过计算马尔科夫一步转移概率矩阵以及提取DCT域的高维特征进行检测的方法。
- Chu [46]等人从信息论的角度分析了操作顺序检测的可能性以及最优检测阈值的选取问题。
- Gao等人[47]将操作可检测性问题转换为复杂假设检验问题，提出一种基于信息理论框架的图像操作链中特定操作的检测方案。
- Chen等人[48]提出了一种基于决策融合的图像操作链中操作类型识别方法，挖掘不同图像特征，获取不同的取证证据。基于可信度计算策略，重新分配各证据权重，并通过决策融合识别操作链中包含的操作类型。
- Liao等人[49]从操作相关性程度分析入手，开展操作链的参数估计研究。通过探究操作顺序和参数变化对生成图像及已有参数估计特征所带来的影响，将操作链中各操作间相关性分为耦合与非耦合，并设计了不同的参数估计策略。

#### 基于深度学习的方法

- Boroumand等人[50]针对特定二元操作链，通过**在卷积神经网络结构中添加全局平均池化层**, 实现对任意尺寸篡改图像的操作种类鉴别。
- Stamm等人[51]基于设计的CNN约束分类器, **通过联合提取与操作序列相关的条件指纹特征**, 实现了对特定二元操作序列的种类识别和顺序鉴定。
- Chen等人[52]设计了一个自动化的神经网络，通**过强化学习生成高性能的神经网络，用于多目标取证和处理历史检测。**同时，利用基于模块的搜索空间，通过密集连接，提升网络设计效率。
- Liao等人[53]提出了**基于双流卷积神经网络的图像操作链取证框架**，并设计了多个针对特定操作组合的预处理。该网络包括空域卷积流和变换特征提取流，利用空域卷积流提取可视篡改特征，而变换特征提取流则通过结合针对性设计的预处理从图像的变换域提取残差特征。

### **小结与思考**

图像处理操作取证是多媒体安全领域中的热点问题，除了上述处理操作的取证，小波去噪、直方图均衡化、仿射变换等图像处理操作的取证也都受到了政治、经济、社会文化等多个领域的广泛关注。尽管图像处理取证技术已经在特定篡改操作的取证等方面取得了阶段性进展，但在研究的深度和广度上仍未成熟，还有一些亟待解决的问题，主要表现在：

1. 在已知图像处理操作的情况下，可以通过模拟操作来训练模型，但对未知操作，如何设计对不同强度、不同操作组合均有效的取证模型是值得进一步探索的方向。
2. 当图像经历多种处理操作编辑润饰时，**不同操作的痕迹相互掩盖混淆**，图像处理操作取证变得困难。大多**数图像处理操作取证方法是对单个特定操作或者特定二元操作链检测有效**，**缺乏适用于各种图像处理操作链取证**的通用理论基础。

### 参考文献

[1]S. Shang, Y. Zhao, and R. Ni. Double JPEG detection using high order statistic features. IEEE International Conference on Digital Signal Processing (DSP), Beijing, China, pp. 550-554, 2016.

[2]X. Zeng, G. Feng, and X. Zhang. Detection of double JPEG compression using modified DenseNet model. Multimedia Tools and Applications, vol. 78, no. 7, pp. 8183-8196, 2019.

[3]J. Wang, W. Huang, X. Luo, Y.-Q. Shi, and S. Kr. Jha. Non-aligned double JPEG compression detection based on refined Markov features in QDCT domain. Journal of Real-time Image Processing, vol. 17, no. 1, pp.7-16, 2019.

[4]F. Galvan, G. Puglisi, A. R. Bruna, and S. Battiato. First quantization matrix estimation from double compressed JPEG images. IEEE Transactions on Information Forensics and Security, vol. 9, no. 8, pp. 1299-1310, 2014.

[5]T. Hai Thai, R. Cogranne, F. Retraint, and T. Doan. JPEG quantization step estimation and its applications to digital image forensics. IEEE Transactions on Information Forensics and Security, vol. 12, no. 1, pp. 123-133, 2017.

[6]P. Yang, R. Ni, and Y. Zhao. Double JPEG compression detection by exploring the correlations in DCT domain. Asia-Pacific Signal and Information Processing Association Annual Summit and Conference (APSIPA ASC), Honolulu, HI, USA, pp. 728-732, 2018.

[7]W. Wang, J. Dong, and T. Tan. Exploring DCT coefficient quantization effects for local tampering detection. IEEE Transactions on Information Forensics and Security, vol. 9, no. 10, pp. 1653-1666, 2014.

[8]I. Amerini, T. Uricchio, L. Ballan, and R. Caldelli. Localization of JPEG double compression through multi-domain convolutional neural networks. IEEE Conference on Computer Vision and Pattern Recognition Workshops (CVPRW), Honolulu, HI, USA, pp. 1865-1871, 2017.

[9]P. Zhou, X. Han, V. I. Morariu, and L. S. Davis. Learning Rich Features for Image Manipulation Detection. IEEE Conference on Computer Vision and Pattern Recognition (CVPR), Salt Lake City, UT, USA, pp. 1053-1061, 2018.

[10]M. Tagliasacchi, M. V.-Scarzanella, P. L. Dragotti, and S. Tubaro. Transform coder identification. IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), Vancouver, BC, Canada pp. 5785-5789, 2013.

[11]T. Bianchi, A. Piva, and F. Pérez-González. Near optimal detection of quantized signals and application to JPEG forensics. IEEE International Workshop on Information Forensics and Security (WIFS), Guangzhou, China, pp. 168-173, 2013.

[12]M. C. Stamm, and K. J. Ray Liu. Forensic detection of image manipulation using statistical intrinsic fingerprints. IEEE Transactions on Information Forensics and Security, vol. 5, no. 3, pp. 492-506, 2010.

[13]G. Cao, Y. Zhao, R. Ni, and X. Li. Contrast enhancement-based forensics in digital images. IEEE Transactions on Information Forensics and Security, vol. 9, no. 3, pp. 515-525, 2014.

[14]C. Zhang, D. Du, L. Ke, H. Qi, and S. Lyu. Global contrast enhancement detection via deep multi-path network. International Conference on Pattern Recognition (ICPR), Beijing, China, pp. 2815-2820, 2018.

[15]王金伟, 吴国静. 基于线性模型的图像对比度增强取证[J]. 网络空间安全, 2019, vol. 10, no. 8, pp. 47-54.

[16]周琳娜, 王东明, 郭云彪, 杨义先. 基于数字图像边缘特性的形态学滤波取证技术[J]. 电子学报, 2008, vol. 36, no. 6, pp. 1047-1051.

[17]B. Su, S. Lu, and C. L. Tan. Blurred image region detection and classification. ACM International Conference on Multimedia (ACM MM), New York, NY, USA, pp. 1397-1400, 2011.

[18]W. Xu, J. Mulligan, D. Xu, and X. Chen. Detecting and classifying blurred image regions. IEEE International Conference on Multimedia and Expo (ICME), San Jose, CA, USA, 2013.

[19]M. Kirchner, and R. Bohme. Hiding traces of resampling in digital images. IEEE Transactions on Information Forensics and Security, vol. 3, no. 4, pp. 582-592, 2008.

[20]M. C. Stamm, and K. J. Ray Liu. Anti-forensic of digital image compression. IEEE Transactions on Information Forensics and Security, vol. 6, no. 3, pp. 1050-1065, 2011.

[21]M. Kirchner, and J. Fridrich. On detection of median filtering in digital images. The SPIE-Media Forensics and Security, San Jose, USA, pp. 754110-1-75411012, 2010.

[22]X. Kang, M. C. Stamm, A. Peng, and K. J. Ray Liu. Robust median filtering forensics using an autoregressive model. IEEE Transactions on Information Forensics and Security, vol. 8, no. 9, pp. 1456-1468, 2013.

[23]彭安杰, 康显桂. 基于滤波残差多方向差分的中值滤波取证技术[J]. 计算机学报, 2016. vol. 39, no. 3, pp. 503-515.

[24]G. Cao, Y. Zhao, R. Ni, and A. C. Kot. Unsharp masking sharpening detection via overshoot artifacts analysis. IEEE Signal Processing Letters, vol. 18, no. 10, pp. 603-606, 2011.

[25]F. Ding, G. Zhu, and Y. Q. Shi. A novel method for detecting image sharpening based on local binary pattern. International Conference on Digital Forensics and Watermarking (IWDW), Berlin, Germany, pp. 180-191, 2013.

[26]F. Ding, G. Zhu, J. Yang, J. Xie, and Y. Q. Shi. Edge perpendicular binary coding for USM sharpening detection. IEEE Signal Processing Letters, vol. 22, no. 3, pp. 327-331, 2015.

[27]A. C. Popescu, and H. Farid. Exposing digital forgeries by detecting traces of resampling. IEEE Transactions on Signal Processing, vol. 53, no. 2, pp. 758-767, 2005.

[28]A. C. Gallagher. Detection of linear and cubic interpolation in JPEG compressed images. Canadian Conference on Computer and Robot Vision (CRV), Victoria, BC, Canada, pp. 65-72, 2005.

[29]B. Mahdian, and S. Saic. Blind authentication using periodic properties of interpolation. IEEE Transactions on Information Forensics and Security, vol. 3, no. 3, pp. 529-538, 2008.

[30]M. Kirchner. Fast and reliable resampling detection by spectral analysis of fixed linear predictor residue. ACM Workshop on Multimedia and Security (MM & Sec), Oxford, UK, pp. 11-20, 2008.

[31]X. Feng, I. J. Cox, and D. Gwenaël. Normalized energy density-based forensic detection of resampled images. IEEE Transactions on Multimedia, vol. 14, no. 3, pp. 536-545, 2012.

[32]B. Bayar, and M. C. Stamm. On the robustness of constrained convolutional neural networks to JPEG post-compression for image resampling detection. IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), New Orleans, LA, USA, pp. 2152-2156, 2017.

[33]B. Bayar, and M. C. Stamm. Constrained convolutional neural networks: A new approach towards general purpose image manipulation detection. IEEE Transactions on Information Forensics and Security, vol. 13, no. 11, pp. 2691–2706, 2018.

[34]C. Liu, and M. Kirchner. CNN-based rescaling factor estimation. ACM Workshop, pp. 119–124, 2019.

[35]S. Luo, J. Luo, W. Lu, Y. Fang, J. Zeng, S. Shi, and Y. Zhang. Resampling factor estimation via dual-stream convolutional neural network. Computers, Materials & Continua, vol. 66, no. 1, pp. 647–657, 2021.

[36]X. Liu, W. Lu, Q. Zhang, J. Huang, and Y. Shi. Downscaling factor estimation on pre-JPEG compressed images. IEEE Transactions on Circuits and Systems for Video Technology, vol. 30, no. 3, pp. 618-631, 2019.

[37]Q. Zhang, W. Lu, T. Huang, S. Luo, Z. Xu, and Y. Mao. On the robustness of JPEG post-compression to resampling factor estimation. Signal Processing, vol. 168, pp. 107371, 2020.

[38]W. Lu, Q. Zhang, S. Luo, Y. Zhou, J. Huang, and Y. Q. Shi. Robust estimation of upscaling factor on double JPEG compressed images. IEEE Transactions on Cybernetics, pp. 1-13, 2021.

[39]W. Wei, S. Wang, X. Zhang, and Z. Tang. Estimation of image rotation angle using interpolation-related spectral signatures with application to blind detection of image forgery. IEEE Transaction on Information Forensics and Security, vol. 5, no. 3, pp. 507-517, 2010.

[40]C. Chen, J. Ni, Z. Shen, and Y.Q. Shi. Blind forensics of successive geometric transformations in digital images using spectral method: theory and applications. IEEE Transactions on Image Processing, vol. 26, no. 6, pp. 2811-2824, 2017.

[41]J. Ou, and J. Ni. Blind estimation of affine transformation using 2D cyclostationarity of resampled images. Mippr: Multispectral Image Acquisition, Processing, & Analysis International Society for Optics and Photonics, 2015.

[42]P. Comesaña. Detection information theoretic measures for quantifying the distinguishability between multimedia operator chains. IEEE International Workshop on Information Forensics and Security (WIFS), Tenerife, Spain, pp. 211-216, 2012.

[43]P. Comesaña, and F. P. González. Multimedia operator chain topology and ordering estimation based on detection and information theoretic tools. International Conference on Digital Forensics and Watermarking (IWDW), Berlin, Germany, pp. 213-227, 2013.

[44]M. C. Stamm, X. Chu, and K. J. Ray Liu. Forensically determining the order of signal processing operations. IEEE International Workshop on Information Forensics and Security (WIFS), Guangzhou, China, pp. 162-167, 2013.

[45]J. Li, Y. Zhao, and R. Ni. Detection of seam carving and contrast enhancement operation chain. International Conference on Intelligent Information Hiding and Multimedia Signal Processing (IIH-MMSP), Adelaide, SA, Australia, pp. 235-238, 2015.

[46]X. Chu, Y. Chen, and K. J. Ray Liu. Detectability of the order of operations: An information theoretic approach. IEEE Transactions on Information Forensics and Security, vol. 11, no. 4, pp. 823-836, 2016.

[47]S. Gao, X. Liao, and X. Liu. Real-time detecting one specific tampering operation in multiple operator chains. Journal of Real-Time Image Processing, vol. 16, pp. 741-750, 2019.

[48]J. Chen, X. Liao, and Z. Qing. Identifying tampering operations in image operator chains based on decision fusion. Signal Processing: Image Communication, vol. 95, pp. 116287-1-116287-10, 2021.

[49]X. Liao, and Z. Huang. A framework for parameters estimation of image operator chain. IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), Barcelona, Spain, pp. 2787-2791, 2020.

[50]M. Boroumand, and J. Fridrich. Deep learning for detecting processing history of images. Electronic Imaging, pp. 213-1-213-9, 2018.

[51]B. Bayar, and M. C. Stamm. Towards order of processing operations detection in JPEG-compressed images with convolutional neural networks. Electronic Imaging, pp. 211-1-211-9, 2018.

[52]Y. Chen, Z. Wang, Z. J. Wang, and X. Kang. Automated design of neural network architectures with reinforcement learning for detection of global manipulations. IEEE Journal of Selected Topics in Signal Processing, vol. 14, no. 5, pp. 997-1011, 2020.

[53]X. Liao, K. Li, X. Zhu, and K. J. Ray Liu. Robust detection of image operator chain with two-stream convolutional neural network. IEEE Journal of Selected Topics in Signal Processing, vol. 14, no. 5, pp. 955-968, 2020.

## 视频编辑篡改检测Video manipulation Detetion综述

从公开发表论文数量来看，目前绝大多数的篡改被动检测算法都是专用篡改检测算法，且效果十分显著，但需要已知篡改方法和类型的先验知识.通用篡改检测算法针对多种或未知篡改检测准确率良好但也具有一定局限性，实用性和泛化能力有待提高，且对篡改类型的辨识能力不足，只能判断是否经历了篡改操作；**针对多类型+多次篡改的溯源篡改操作链识别能力有限，这也是未来可能的研究方向之一。**

**通用篡改检测算法**的最大优势就是快速筛选可疑视频和辨识经历一次及以上篡改的数字视频，然后再用专用算法探测或穷举识别其可能的篡改操作类型或者溯源篡改操作链。总而言之，两者技术是互补关系。

###  数字视频再编辑篡改技术

数字视频编辑篡改技术的一般定义：为了视频画面提质、传输、存储，或改变内容内在关系的后编辑操作的技术集合。这一后编辑操作可能是常规的需求，也可能是恶意的目的。目前，本文中将常见的数字视频编辑篡改技术分为**四大类**：

1. 数字视频**文件再编辑**的篡改方法：本文是指针对数字视频的码流、或者编码参数、容器等的编辑，达到对原始视频文件的再编辑目的，一般不改变视频内容。例**如，码率重采样、视频格式转码、容器转换、各种滤波器操作等后处理操作**；
2. 数字视频**内容再编辑**的篡改方法：本文是指针对数字视频的部分解码或完全解码后内容进行内容级编辑操作，达到对原始视频内容的再编辑目的。例如，**视频帧间插入/删除攻击、帧内复制粘贴攻击操作**等；
3. 数字视频**内容生成**的篡改方法：本文是指**针对数字视频内容的部分生成替换**或全部生成虚拟目标全局替换，进行视频内容级编辑操作，达到对原始视频内容的再编辑目的。例如，使用StyleGAN网络生成虚拟人物或目标的视频内容等操作；
4. 数字视频的**重拍摄篡改**方法：本文是指针对数字视频内容的重新数字采集再编辑操作，达到对原始视频内容的再编辑目的。例如，**利用数字设备对屏幕画面进行重新拍摄和再编辑操作**。

#### 视频文件再编辑篡改

视频文件再编辑篡改是指在不改变视频内容的前提下对视频文件的编辑操作，比如转码操作、分辨率提升/降低、平滑操作、锐化操作、去噪操作、信息隐藏操作等。

例如，数据隐藏技术可以在不影响视觉效果的前提下，向视频内嵌入信息，实现对视频文件的编辑。例如，北京交通大学的李赵红[4]等人研究了P帧种各尺寸PU划分类型在隐写前后的数目变化，构建了25维和3维特征用来检测HEVC视频的块划分模式隐写算法。帧率变化是通过提升或下降视频的帧率方法来达到编辑视频文件的目的。Khoubani[5]等人基于模糊平滑的快速四元数小波运动补偿进行帧率上转换。这篇论文使用图像序列的相位来考虑QWT运动估计，实现了更准确的运动估计、更少的后处理流程和更低的复杂度。码率变换是另外一种视频文件编辑的方法，Kevin[6]等人提出一种通过求解优化问题来选择比特率的方法即Bola算法。Yin等人[7]提出了MPC算法。Kim[8]等人结合残差学习方式提出了IFCNN网络，用以取代视频编码中的环路滤波算法，即把未经环路滤波的重建图像直接输入网络进行增强处理。

#### 数字视频内容编辑篡改方法

视频内容篡改是指部分解码或全解码后，针对音频、图象、视频中特定对象的操作过程，其结果是改变内容的原始属性，导致内容的不可信。从视频帧目标被攻击角度来看，数字视频内容编辑篡改分为**帧间编辑篡改和帧内编辑篡改**。

视频的帧间编辑篡改方式主要有：帧删除篡改，即删除原始视频的至少一帧或连续多帧的操作；帧插入篡改，即非同源视频的帧片段插入到原视频帧序列中的操作；帧复制粘贴篡改，即同源视频的帧片段在相同视频中不同时间轴上复制插入到原视频中的操作。

- 针对这类视频内容的帧间编辑篡改问题，2012年孙锬锋等人[9]提出了视频帧间篡改中主要篡改类型的定义，即包括视频帧复制粘贴、帧插入、帧删除等，其中对于帧的复制粘贴，可以划分为同源和异源两类，同源的帧复制表示复制的对象来自于当前视频片段，而异源帧复制粘贴是将其他视频的片段复制到当前视频片段中。
- 2014年王婉等人[10]根据场景的差异性将视频内容编辑篡改划分为静止背景下的内容编辑篡改以及包含运动背景的篡改场景，并提出了一种可以同时检测帧删除，帧插入及帧复制的算法。
- 同年柏正尧等人[11]针对帧间篡改对帧间相关性进行研究，并将非负张量分解（Nonnegative tensor factorization, NTF）算法应用到了视频帧间篡改检测中。
- 冯春晖等人[13]通过分析残差强度在不同宏块间分布是否具有波动性来检测视频是否被帧删除，并定位删除点的位置。该作者在[13]的基础上进一步分析了具有丰富运动信息下的视频帧间篡改场景，考虑到运动视频容易导致帧间数据特征的变化，作者从帧间差异的角度，提出了一种删帧检测算法[14]，对复杂篡改环境下的序列中不同干扰帧进行分析，并利用运动残差特征区分不同干扰帧和删帧位置处的帧，进而提出一种去帧内编码处理算法，使算法能够应对运动信息带来的影响。
- 不同于视频内容帧间篡改，视频内容帧内篡改并非以帧为单位进行篡改，而是以目标为单位进行编辑篡改操作，2021年Yang Quanxin等人[12] 指出视频帧内篡改主要有空域复制粘贴，帧内目标移除等，作者发现帧内篡改将引起视频在时空域上的高频信息的波动。

#### 数字视频内容生成篡改方法

视频内容生成方法是指在GAN网络及其衍生网络根据对抗原理，即生成器和判别器构成网络，从一幅噪声图像不断逼近真实图象的方法，其生成局部或全部图象和视频并不是真实的物理拍摄获得，从而达到以假乱真的目的。

- 例如，Elor[15]等人的方案可以生成含有人物的视频，并且可以通过扭曲来轻微改变人物的头部姿势。因为这种方法是基于单个目标图像的，它从源视频中的嘴唇内部复制到目标视频，因此仅能部分保留目标视频中的人物身份。
- Kim[16]等人的做法相对于以前的方法而言，可以生成更为逼真的视频。
- Zhouhang[17]等人使用音频来生成视频。他们将一个无声的视频分解为两部分，一部分是人物身份信息，另一部分是语音信息，这里的语音信息是指通过人物嘴部动作传递出来的广义语音信息，而非听到的声音。
- Fried[18]等人基于文本来编辑视频。给定任意文本，该方法就能改变一段视频中人物所说的话，同时保持无缝的试听流。要对一段视频中人物讲话内容进行改变，只需要编辑一下想要表达的文本内容，这种方法十分地简单易行。
- Suwajanakorn[19]等人对人脸中的口型进行替换，生成最终的伪造视频。

#### 数字视频重拍摄的篡改方法

数字视频重拍摄的篡改方法是指物理上用物理设备对数字视频内容播放进行重拍摄而造成内容时空含义混乱，达到篡改内容的目的，也就是“二次拍摄篡改编辑”。

现有的重拍摄的编辑篡改方法主要根据拍摄设备、拍摄场景以及拍摄对象的差异进行分类[20]。Lee[20]等人提出目前重拍摄视频大部分产生于视频投放到液晶屏幕（LCD）上时被重拍摄，因此该作者重点研究LCD显示的视频重拍摄编辑篡改，提出一种梳状纹理的特征识别其重拍摄操作。P. Bestagini[21]等人提出了同步性不一致的重拍摄编辑篡改，作者利用这种不一致性产生的块重影现象对重拍摄视频进行检测。另外，Xavier [22]等人根据电影被投影时引起屏幕空间上的亮度重分配效应、垂直投影在屏幕上的图像的稳定性效应、高频闪烁的显示屏与摄像机快门之间的相互作用这三种效应设计不同的重拍摄编辑篡改场景。Mahdian[23]等人分析了不同品牌LCD显示屏的重拍摄视频在频谱波纹上的差别。除了针对LCD屏幕的重拍摄，重拍摄编辑篡改还包括以手持摄像机拍摄的视频。此类视频中的运动分为帧内运动和手持引起的全局运动，其中全局运动为手持重拍摄独有的效应。Marco [24]等人提出了具有的全局运动特征的手持拍摄视频编辑篡改。另外，图像重拍摄编辑篡改方面的几个经典场景同样也可以在视频重拍摄上适用。比如Thongkamwitoon[25]针对图像的类别差异构建重拍摄图像集合，通过挖掘彩色图像和黑白图像在色度上的差异引起的重拍摄图像在像素上的失真特性对图像进行重拍摄检验。Anjum等人[26]通过挖掘图像中高层次边缘细节特征，进而根据在原始图像和重拍摄图像中不同组别的边缘像素数量具有一定差异这一特性，构建具有不同边缘特性的重拍摄场景并进行分类。

### 数字视频被动取证检测技术

上述数字视频编辑技术表明了：

1. 数字视频无论是编码复杂性，还是数据量的规模庞大，都给篡改编辑带来了更多的可利用空间和隐藏空间；
2. 篡改攻击的角度多样性，导致了针对篡改类型的通用识别算法实现具有较大难度。

针对上述篡改编辑类型，对目前已经取得的被动检测成果进行介绍和分析。我们把数字视频篡改被动取证技术**分为三类**：

1. **时空域**特征检测技术。即无论是音频、图象、视频完全解码后，就会是一种结构化或半结构化的媒体原始文件，在原始文件上，可以构建各种物理、几何、光学等的传统数学特征模型，而这些数学模型通常是某种目标特征属性的固定模式、或者连续变化的某种特征数据表征。篡改编辑的过程中会破坏这种上述固定内在模式，引起连续性质的某些突变、或者出现某些特殊非典型痕迹残留分布等情况，而这些情况就可以通过针对时空特征建模方法来加以检测和识别。**代表性算法有光流特征、运动场特征、亮度变化率特征、块效应强度特征等。**
2. **编码域**特征检测技术。即在数字媒体不完全解码的情况下，码流域、编码域的编码参数、编码域的预测模式、编码域分块模式等环境下，同样具有潜在的首次编码后的系数分布规律和特殊内在统计模式。而这种潜在的分布规律和模式，需要构建高维特征模型，如高阶概率统计模型、多模态融合特征模型等才能洞悉其规律。而且这种高维特征模型对人眼和人耳不可感知的细微编辑痕迹更为敏感。而且编码技术本身也会对数字媒体产生失真效果，因此，对完全解码后媒体数据可能带来意想不到的影响。但是在编码域对篡改痕迹直接展开分析的同时，已经充分考虑了编码失真的影响，在检测过程中可以更加精细化感知各种篡改编辑残留的痕迹。**代表性算法有PU数量统计特征、预测残差分布特征、宏块类型变化特征、DCT系数分布特征**。
3. **深度**特征检测技术。即无论数字媒体是什么容器格式或者什么编码，首先需要生成大量的篡改样本，把篡改样本进行初步的预处理之后，直接送到深度网络模型中加以学习叠代，直到获得预期稳定的输出，此时深度网络特征模型已经完成了参数训练，此后只需要给定输入就可给出分类结果。当然目前为止，这样简单粗暴的方法效果并不明显。学者们纷纷提出了多样化的**深度网络模型、预处理方法、增加Attention机制、修剪网络无意义的层、增加强化学习的机制**等等。通过深度网络自主学习的能力，学习到人类目前无法感知的特征，增强对篡改数据规律知识的学习，最终能否优于人类设计特征的效果。但是目前为止，大部分的深度网络模型对全局学习的效果不佳。**代表性算法有卷积神经网络、双通道残差网络、遗传卷积网络、混合深度学习网络**。

#### 时空域特征检测技术

在数字视频的拍摄过程中，**相邻帧或像素之间往往存在一定的关联**，而对于视频的篡改往往会破坏这种关联性，因此视频篡改操作往往会在时空与留下痕迹。在现有工作中，时空域的检测算法能够直接对篡改痕迹像素或帧之间的异常特性进行建模，但算法复杂度往往较高。

- 文献[27]中，巢娟等人提出了一种基于光流一致性的帧间篡改检测方法，针对帧插入和帧删除的细微差别，提出了两种不同的检测方案。实验表明，该方案在识别帧插入和帧删除模型方面取得了较好的效果。
- 在文献[28]中，吴俞醒等人提出了一种基于速度场一致性的视频帧间伪造（连续帧删除和连续帧复制）检测算法。在文献[3]中，许强等人结合GOP结构非对齐的HEVC重编码引起的质量下降特性，通过分析HEVC编码标准中帧间编码对重建像素值的影响，提出基于帧间质量下降机制分析的检测算法，该算法对GOP结构非对齐的重编码检测问题能取得0.98以上的AUC值。
- 而对于视频转码检测，在[29]中，许强构建了去块滤波模式决策特征以及SAO补偿特征来进行重编码的检测，算法分别在公开数据集上进行了验证，算法能取得97.21%的平均准确率。
- 在文献[30]、[31]中，何沛松等人将待测视频解码为一连串连续的视频帧后，根据块效应强度变化规律的不同能够对视频双编码视频进行检测。
- 在文献[32]中，杨高波等人提出了一种基于边缘强度的被动取证方法来检测候选视频中可能的视频帧速率上转换（FRUC）操作。平均检测准确率达94.5%。
- 在文献[33]中，边山等人在在大量实验的基础上，发现目前大多数视频编辑软件中采用的帧速率上转换算法不可避免地会在生成的视频帧序列的帧间相似性中引入一些周期性的伪影。

综上所述，时空域特征检测技术可以较全面的解决帧间和帧内篡改编辑的被动检测问题，**但仍存在一下问题**：

1. 视频包含快速运动的信息，或者包含场景切换，算法的性能将下降。这个问题是目前被动检测算法中普遍存在的鲁棒性问题，有待改善。
2. 在重编码比特率较低时检测性能会出现明显下降。这是因为视频重编码时比特率（画面质量）较低，会造成严重的信息失真，与篡改编辑痕迹耦合在一起，造成检测困难。这一问题应该系统研究比特率变化与篡改编辑痕迹变化之间的关系。
3. 时空特征检测技术基本上都是针对专用篡改编辑而设计的，因此通用性和泛化能力都十分有限。有的算法对复合篡改编辑的方式显得无能为力。这也是未来要解决的重要问题之一。

####  编码域特征检测技术

视频重编码操作是在首次编码的基础上再一次执行编码操作，基于编码域特征统计分析的视频重编码痕迹检测算法实际上就是根据重编码操作对视频编码后的参数扰动关系构建检测依据，依赖手工设计的特征来进行检测的算法。

- 在文献[34]中，DAVID等人提出了基于The Variation of Prediction Footprint（VPF）的二次编码篡改检测算法。
- 文献[35]中，该团队在MPEG-2标准上提出了一种基于广义VPF（G-VPF）的双编码检测算法，在首次编码使用QP（QP1）大于重编码使用QP（QP2）的情况下达到了98%以上的准确率。
- 在文献[38]中，赵耀等人通过对预测模式特征（PMF）的分析，提出了一种用于假高清视频场景的重编码检测方案，该方法首先从四个方向的帧内预测模式中提取一个四维特征。其次，从三个预测模式中提取了6维特征。最后，将这两种特征集结合到PMF中，检测出伪造高清视频，并进一步估计其原始QPs和比特率。
- 在文献[39]中，蒋兴浩等人提出了一种基于帧内预测模式的新方法。文献分析了帧内编码的质量退化机理，并充分考虑了帧内编码的误差来源，建立了等效误差模型，随后提出了基于帧内预测模式统计特征的双HEVC编码检测特征模型。最后，用720p和1080p的HEVC视频代替低分辨率（CIF或QCIF）视频进行了实验。实验结果表明，与现有方法相比，该方法具有更好的效率。此外，该方法对不同的编码配置具有较强的鲁棒性。

综上所述，该类检测算法能有效的检测普通场景下的重编码操作，**但存在一些不足**：

1. 算法过度依赖解码器对参数的提取，并且容易受到反取证手段的攻击。
2. 当视频包含强运动成分信息或场景切换时，算法性能将下降。
3. 智能编码技术的兴起，给重编码检测带来了新的危机。

#### 深度特征检测技术

近年来，卷积神经网络（CNN）已经在多媒体取证领域取得成功应用。CNN 能够从训练样本中自动有效地学习层次化的特征表达。受此启发，一系列算法利用卷积神经网络来解决视频重编码痕迹检测问题。

- 在文献[40]中，何沛松等人首先建立视频帧集合，以 3 帧为单位进行分块，若 3 帧中第二帧为重定位I帧，则该片段定义为正样本，否则为负样本。通过这种预处理操作，构建一个卷积神经网络，利用平均池化，作者能很好地检测出重定位I帧。
- 类似的在[41]中许强等人通过构建 Genetic CNN，来进行AVC视频中重定位 I 帧的检测。不同于一般的卷积神经网络，**Genetic CNN 能够结合遗传算法，实现自动设计网络架构的目的**，通过算法对比，该算法的有效性得到验证。
- 在[42]中，何沛松等人通过**构建一个混合深度神经网络来揭露伪高清的HEVC重编码视频**。通过提取基于块的残差信号，并构建一个双支路的网络进行检测，不同分支的输出向量将拼接后再联合优化得到逐块的检测结果。最后采用多数投票(local-to-global)策略得到最终的检测结果。
- 除此之外，何沛松等人在[2]中**提出了一种混合神经网络**，通过从编码域中的编码信息中学习鲁棒时空表示，来揭示具有双重编码的HEVC视频中异常帧。
- 在[43]中，Gan等人提出了一种**基于VGG-11卷积神经网络的视频帧内伪造取证算法**，该算法能自动检测视频伪造帧。该算法首先将视频解编码为一系列帧，计算出每帧的运动剩余映射，提取隐写特征。然后，以四个不同的隐写特征样本集作为训练集，并将测试集作为训练和测试模型。通过对比实验，选择了最佳性能特征。最后，通过伪造视频对伪造的帧进行了成功的标记。

综上所述，深度神经网络的运用在一定程度上解决了传统算法的缺陷，虽然这些算法都能够取得较高的准确率，**但其仍然存在一系列局限性**：

1. 大多数基于深度神经网络的算法对样本数量要求较高，并且需要耗费大量的时间训练网络模型。
2. 这些算法都是以重定位I帧或者块为单位作为输入，如何设计高效的网络**实现视频级别的重编码痕迹检测**是今后研究的重要方向。
3. 深度神经网络在提升了人工检测效率和准确率，但其深度网络的可解释性和学习到特征的可解释性仍然是不透明的，很多时候“过学习”的现象或者“欠学习”的问题普遍存在。这一问题有待进一步改善。

### 总结与展望

1. 篡改编辑（攻击）残留痕迹与数字媒体编码技术的依赖关系尚存在空白领域有待探索。数字媒体**各类编码标准的不同特性内在机制和信息失真模型理论、特征模型建模的方法论、算法检测框架的性能等问题**，还需要不断完善，逐步建立起完整的被动检测理论体系；
2. 人工智能理论、深度网络学习方法与对抗篡改攻击技术互为对抗和相互融合是未来的发展趋势。目前新型的**VVC编码已经采用了众多的神经网络模块替代传统编码框架中画面提质模块、滤波模块、运动预测模块**等，未来的人工智能技术与编码深度结合之下，如何检测篡改攻击痕迹是更加复杂和困难的挑战；
3. 该领域的专用算法尽管已经取得了丰硕的成果，但还存在着诸多边界条件的限制，离实际应用存在较大差距；**新型篡改攻击方法不断涌现；新的深度学习模型削弱了篡改痕迹等问题；新的编码算法使得篡改痕迹被隐藏；概率性取证检测转化为确定性检测**的方法等一系列问题。
4. 目前尽管已经出现了若干的公开视频篡改数据库，但是覆盖篡改类型还比较有限，数据库建设的标准也不统一，数据库的原始样本也存在容器、编码标准混乱的情况，对支撑整个领域研究还是远远不够的；
5. 在该领域的客观评价指标大多数**仅限于传统的检测准确率、算法效率、定位准确率等指标，但这些指标无法满足对篡改检测算法性能进行全方位的评价**，对未来算法应用落地是一个不容回避的问题，亟待更多的学者参与其中。

### 参考文献

[1] Mi Z, Jiang X, Sun T, GAN-Generated Image Detection with Self-Attention Mechanism against GAN Generator Defect[J]. IEEE Journal of Selected Topics in Signal Processing, 2020, 14(5): 969-981.

[2] Peisong He;Haoliang Li;Hongxia Wang;Shiqi Wang;Xinghao Jiang;Ruimei Zhang, Frame-wise Detection of Double HEVC Compression by Learning Deep Spatio-temporal Representations in Compression Domain[J]. IEEE Transactions on Multimedia, 2020, DOI: 10.1109/ TMM.2020.3021234.

[3] Xu Q, Jiang X, Sun T, Detection of HEVC double compression with non-aligned GOP structures via inter-frame quality degradation analysis, Neurocomputing,2021, 452: 99-113.

[4] Zhong hao Li, Meng, Laijin; Xu, Shutong; Li, Zhaohong; Shi, Yunqing; Liang, Yuanchang, A HEVC Video Steganalysis Algorithm Based on PU Partition Modes[J]. Computers, Materials & Continua, 2019, 59(2):563-574.

[5] Khoubani Sahar and Moradi Mohammad Hassan. A fast quaternion wavelet-based motion compensated frame rate up-conversion with fuzzy smoothing: application to echocardiography temporal enhancement[J]. Multimedia Tools and Applications, 2020, 80(6):8999-9025.

[6] Kevin Spiteri and Rahul Urgaonkar and Ramesh K. Sitaraman. BOLA: Near-Optimal Bitrate Adaptation for Online Videos[J]. IEEE/ACM Transactions on Networking, 2020, PP(99):1-14.

[7] Yin, Xiaoqi, Jindal, Abhishek, Sekar, Vyas,Sinopoli, Bruno, A Control-Theoretic Approach for Dynamic Adaptive Video Streaming over HTTP[J]. Computer communication review, 2015, 45(4):325-338.

[8] Park W S, Kim M., CNN-based in-loop filtering for coding efficiency improvement[C]// 2016 IEEE 12th Image, Video, and Multidimensional Signal Processing Workshop (IVMSP). IEEE, 2016, DOI: 10.1109 /IVMSPW.2016.7528223.

[9] Sun T, Jiang X, Chao J, A Novel Video Inter-frame Forgery Model Detection Scheme Based on Optical Flow Consistency[J]. International Workshop on Digital Watermarking, 2012. [10] Wang W, Jiang X, Wang S, et al. Identifying Video Forgery Process Using Optical Flow[M]//Digital-Forensics and Watermarking. Springer Berlin Heidelberg, 2014: 244-257.

[11] Yin L, Bai Z, Yang R. Video forgery detection based on nonnegative tensor factorization[C]//Information Science and Technology (ICIST), 2014 4th IEEE International Conference on. IEEE, 2014: 148-151.

[12] Quanxin Yang, Dongjin Yu, Zhuxi Zhang, Ye Yao, Linqiang Chen, Spatiotemporal Trident Networks: Detection and Localization of Object Removal Tampering in Video Passive Forensics[J]. IEEE Transactions on Circuits and Systems for Video Technology. 2020/12, DOI: 10.1109/TCSVT.2020.3046240.

[13] Feng C, Xu Z, Zhang W, et al. Automatic location of frame deletion point for digital video forensics[C]//Proceedings of the 2nd ACM workshop on Information hiding and multimedia security. ACM, 2014: 171-179.

[14] Feng C, Xu Z, Jia S, Zhang W, Xu Y, Motion-adaptive frame deletion detection for digital video forensics[J], IEEE Transactions on Circuits and Systems for Video Technology, 2016, 27(12):2543–2554.

[15] Averbuch-Elor, Hadar, Cohen-Or, Daniel, Kopf, Johannes. Bringing portraits to life[J]. ACM Transactions on Graphics, 2017, 36(6) :1-13.

[16] Kim Hyeongwoo, Theobalt Christian, Carrido Pablo. Deep video portraits[J]. ACM Transactions on Graphics, 2018, 37(4):1-14.

[17] Zhou H, Liu Y, Liu Z, et al. Talking Face Generation by Adversarially Disentangled Audio-Visual Representation[J]. Proceedings of the AAAI Conference on Artificial Intelligence, 2019, 33:9299-9306.

[18] Fried, O., Tewari, A., Zollh, Zollhöfer M et al. Text-Based Editing of Talking-Head Video[J]. ACM Trans. Graph. 38(4), 2019: 1-14.

[19] Supasorn Suwajanakorn, Steven M. Seitz. Synthesizing Obama: learning lip sync from audio[M]. ACM, 2017.

[20]Lee J W, Lee M J, Lee H Y, et al. Screenshot identification by analysis of directional inequality of interlaced video[J]. Eurasip Journal on Image & Video Processing, 2012, (1):1-15.

[21] Bestagini P, Visentini-Scarzanella M, Tagliasacchi M, et al. Video recapture detection based on ghosting artifact analysis[C]//Image Processing (ICIP), 2013 20th IEEE International Conference on. IEEE, 2013: 4457-4461.

[22] Rolland-Neviere, X., Chupeau, B., Doerr, G., et al. (2012) Forensic Characterization of Camcorded Movies: Digital Cinema vs. Celluloid Film Prints[C]//Proceedings of SPIE—The International Society for Optical Engineering, Burlin-game, 9 February 2012, 83030R-83030R-11.

[23] Mahdian B, Novozamsky A, Saic S. Identification of aliasing-based patterns in re-captured LCD screens[C]//Image Processing (ICIP), 2015 IEEE International Conference on. IEEE, 2015: 616-620.

[24] Visentini-Scarzanella M, Dragotti P L. Video jitter analysis for automatic bootleg detection[C]//Multimedia Signal Processing (MMSP), 2012 IEEE 14th International Workshop on. IEEE, 2012: 101-106.

[25] Thongkamwitoon T, Muammar H, Dragotti P L. An image recapture detection algorithm based on learning dictionaries of edge profiles[J]. Information Forensics and Security, IEEE Transactions on, 2015, 10(5): 953-968.

[26] Anjum, A., Islam, S. Recapture detection technique based on edge-types by analysing high-frequency components in digital images acquired through LCD screens[J]. Multimed Tools Appl, 2020,79: 6965–6985.

[27] Chao J, Jiang X, Sun T. A novel video inter-frame forgery model detection scheme based on optical flow consistency[C]//International Workshop on Digital Watermarking. Springer, Berlin, Heidelberg, 2012: 267-281.

[28] Wu Y, Jiang X, Sun T, et al. Exposing video inter-frame forgery based on velocity field consistency[C]//2014 IEEE international conference on acoustics, speech and signal processing (ICASSP). IEEE, 2014: 2674-2678.

[29] Qiang XU, Xinghao Jiang, Tanfeng Sun*, Alex C. Kot, Detection of transcoded HEVC videos based on in-loop filtering and PU partitioning analyses[J], Signal Processing: Image Communication, 2021, 92:116109.

[30] He P, Sun T, Jiang X, et al. Double compression detection in MPEG-4 videos based on block artifact measurement with variation of prediction footprint[C]// International Conference on Intelligent Computing. Springer. 2015: 787–793.

[31] He P, Jiang X, Sun T, et al. Detection of double compression in MPEG-4 videos based on block artifact measurement[J]. Neurocomputing, 2017, 228: 84–96.

[32] Yao Y, Yang G, Sun X, et al. Detecting video frame-rate up-conversion based on periodic properties of edge-intensity[J]. Journal of Information Security and Applications, 2016, 26: 39–50.

[33] Bian S, Luo W, Huang J. Detecting video frame-rate up-conversion based on periodic properties of inter-frame similarity[J]. Multimedia tools and applications, 2014, 72(1): 437–451.

[34] Vazquezpadin D, Fontani M, Bianchi T, et al. Detection of video double encoding with GOP size estimation[C]// IEEE International Workshop on Information Forensics and Security (WIFS), 2012:151-156.

[35] Vazquez-Padin D, Fontani M, Shullani D, et al. Video Integrity Verification and GOP Size Estimation Via Generalized Variation of Prediction Footprint[J]. IEEE transactions on information forensics and security, 2020, (15):1815-1830.

[36] Li, Q., Wang, R. and Xu, D., Detection of double compression in HEVC videos based on TU size and quantized DCT coefficients[J]. IET Inf. Secur., 2019, (13): 1-6.

[37] Yao H., Ni R., Zhao Y., Double compression detection for H.264 videos with adaptive GOP structure. Multimedia Tools and Applications, 2020, (79):5789-5806.

[38] Yu Y , Yao H , Ni R , et al. Detection of fake high definition for HEVC videos based on prediction mode feature[J]. Signal processing, 2020, 166(Jan.):107269.1-107269.11.

[39] X.H, Jiang, Q. Xu, T.F. Sun, Bin Li, Peisong He, Detection of HEVC double compression with the same coding parameters based on analysis of intra coding quality degradation process[J]. IEEE Transactions on Information Forensics and Security, 2019, (15): 250-263.

[40] He P, Jiang X, Sun T, et al. Frame-wise detection of relocated I-frames in double compressed H.264 videos based on convolutional neural network[J]. Journal of Visual Communication and Image Representation, 2017, (48): 149-158.

[41 Xu Q, Jiang X, Sun T, et al. Relocated I-Frames Detection in H. 264 Double Compressed Videos Based on Genetic-CNN[C]. in: 2018 Asia-Pacifc Signal and Information Processing Association Annual Summit and Conference (APSIPA ASC). 2018: 710-716.

[42] He P, Li H, Li B, et al. Exposing Fake Bitrate Videos Using Hybrid Deep-learning Network from Recompression Error[J]. IEEE Transactions on Circuits and Systems for Video Technology, 2019, (99):1-13.

[43] Gan Y, Yang J, Lai W. Video object forgery detection algorithm based on VGG-11 convolutional neural network[C]//2019 International Conference on Intelligent Computing, Automation and Systems (ICICAS). IEEE, 2019: 575-580.


> 本文转自公众号【隐者联盟】[【极简综述17】数字图像处理操作取证](https://mp.weixin.qq.com/s?__biz=Mzg4MjU4OTU0MA==&mid=2247485053&idx=1&sn=b658496c5826472b5cea4183ede69759)、[【极简综述18】数字图像篡改操作取证](https://mp.weixin.qq.com/s?__biz=Mzg4MjU4OTU0MA==&mid=2247485053&idx=2&sn=afbec76ac6f61518c50b6a040eb33fac)、[【极简综述19】数字视频再编辑篡改及被动取证检测技术综述](https://mp.weixin.qq.com/s?__biz=Mzg4MjU4OTU0MA==&mid=2247485207&idx=1&sn=c2be18dc1badc7c8731a91c0f926d55b)


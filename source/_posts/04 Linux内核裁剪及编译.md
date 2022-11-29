---
title: Linux 内核裁剪及编译
tag:
  - linux
categories:
  - linux
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
abbrlink: 8283904e
date: 2021-12-13 20:47:44
top:
---

<img src="https://qiniu.findn.cn//blog/photos/article/image-20211213231234705.png" alt="Linux Kernel" style="zoom:100%;" />

好久没更新了，上周，我利用空闲时间设计了linux内核实验的指导书，现在我把实验过程分享给大家。

本次实验的目标是自己动手裁剪并编译linux内核、制作最小根文件系统、并成功把制作的mini-linu启动起来，具体分为以下几步：

- 下载Linux内核，裁剪并编译内核源码。
- 下载并编译BusyBox，在此基础上制作一个最小的根文件系统。
- 用编译好的内核和根文件系统制作可启动的mini-Linux系统。
- 用QEMU启动制作好的mini-Linux系统。 

<!-- more -->

本次实验基于以下软件和环境完成：

- VMware® Workstation 16 Pro 
- Ubuntu 20.04 LTS
- Linux内核 5.10.83 （建议版本一致）
- BusyBox 1.33.2 （建议版本一致）
- grub-install (GRUB) 2.04
- QEMU 4.2.1

本篇文章，将完成实验的第一步——Linux内核裁剪及编译。



> Linux的内核是单内核设计风格的，不过Linux的单内核设计采用了微内核设计风格的模块化设计思想，所以使得内核的核心可以很小，而内核所需要提供的其他功能都被设计成了各种内核模块，需要的时候只需将各种内核模块加载进内核的核心即可，我们可以通过编辑Linux源码目录下的”.config”配置文件来裁剪定制linux内核，在此次实验中，我们主要通过“make menuconfig”命令打开图形化界面来配置“.config”文件。

## 下载内核源码

（1）Linux内核官网：[https://www.kernel.org/](https://www.kernel.org/)。

本次实验我们使用的内核版本为长期支持版本`5.10.83`，下载链接如下：[https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.10.83.tar.xz](https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.10.83.tar.xz)。

<img src="https://qiniu.findn.cn//blog/photos/article/image-20211214002141124.png" alt="kernel.org"  />

（2）本次实验采用的是`VMware® Workstation 16 Pro`虚拟机，虚拟机系统为`Ubuntu 20.04 LTS`。打开虚拟机的Ubuntu20.04系统，实验过程将全程在此系统上完成。

（3）打开终端，切换至root用户（以下操作都在root下完成），切换至根目录，创建实验项目文件夹，并将内核源码下载并解压到该目录下。


```bash
su 
cd /
mkdir mini-linux
cd mini-linux
wget https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.10.83.tar.xz
```

<img src="https://qiniu.findn.cn//blog/photos/article/image2.png" alt="创建mini-linux目录" style="zoom:67%;" />

（4）解压下载好的内核源码，并进入到linux-5.10.83目录。

```bash
tar -vxf linux-5.10.83.tar.xz
cd linux-5.10.83
```

如果不是第一次编译，请运行以下命令清理：

- makeclean: 删除编译中间文件，但是保留配置。
- make mrproper：删除包括配置文件的所有构建文件。
- make distclean：执行mrproper所做的一切，并删除备份文件。

## 配置内核

（1）指定硬件体系架构为`x86`。

```bash
 export ARCH=x86  
```

（2）生成config文件。

Linux自带很多内核的配置文件，如：

- make defconfig：生成默认的内核配置。

- make allmodconfig：所有的可选的选项构建成模块。

- make allyesconfig：生成全部选择是的内核配置。

- make noconfig：生成全部选择否的内核配置。

（3）本次实验我们根据虚拟机系统，选择 x86_64_defconfig 。

```bash
make x86_64_defconfig
```

此操作会将`./arch/x86/configs/x86_64_defconfig`文件复制为`./.config`，作为我们编译内核的初始配置文件。

<img src="https://qiniu.findn.cn//blog/photos/article/image3.png" alt="生成config文件" style="zoom:67%;" />

（4）使用图形化界面配置内核。

```bash
make meunconfig
```

此时会进入Kernel Configuration图形化配置界面

<img src="https://qiniu.findn.cn//blog/photos/article/image4.png" alt="Kernel Configuration图形化配置界面" style="zoom:67%;" />

（5）我们用键盘操作此图形界面：

- [*]代表被选中，[ ]表示未被选中。

- ↑ ↓ 方向键可以快速在配置项中选择。


- ← → 方向键可以在select、exit等菜单项之间选择。	


- Y 选择此项，并包含进内核中。


- N 取消选择此项，不包含内核中。


- M 编译成模块。


- Enter 进入或确认选项。


- **H 配置说明**。

​	*在任何一个选项下按H，可以看到详细的配置说明，自己不确定的项可以用此方法来辅助判断，如下图，如果有`If unsure say Y`、`you'll need to say Y here`、`If in doubt, say "Y"`则建议必选，如果有`If unsure say N here`，则可以根据情况不选。*

<img src="https://qiniu.findn.cn//blog/photos/article/image5.png" alt="配置小技巧" style="zoom: 67%;" />

- **/ 搜索**。

​	*在任意界面输入`/`，则会进入搜索，可以根据需求搜索配置项。*

<img src="https://qiniu.findn.cn//blog/photos/article/image6.png" alt="搜索界面" style="zoom: 67%;" />

返回搜索结果后，再输入搜索结果对应的数字，则会跳转至对应的配置项，可以大大提高效率。

<img src="https://qiniu.findn.cn//blog/photos/article/image7.png" alt="搜索结果" style="zoom:67%;" />

Kernel配置介绍、裁剪经验，可以参考以下文档

​	[1]. [Linux内核（4.17.10）配置项详解（x86）](https://blog.csdn.net/liao20081228/article/details/81389813)

​	[2]. [kernel裁剪](https://blog.csdn.net/weixin_43892506/article/details/117885040)

​	[3]. [linux内核裁剪的具体过程和方法](https://blog.csdn.net/u011124985/article/details/80453772)

## 内核裁剪

通过内核裁剪，我们可以

- 学习内核裁剪的方法和流程。

- 在资源内有限的时候，裁剪内核可以使系统变得简洁和轻量化。

- 不必要的驱动，不仅使得内核占用空间，运行速度慢，还会引起不必要的问题。

内核裁剪在`menuconfig`界面进行，我们使用的`x86_64_defconfig`已经做了大量裁剪，编译后内核大小仅有9.5M，精细裁剪需要花费大量时间，这里仅演示几项，大家可以多多尝试。

（1）给内核版本号添加自定义后缀：

- 在`General setup`选项下，选择`Local version - append to kernel release`，我们可以给内核版本号添加自定义后缀，如`-mini-linux-2021`。

<img src="https://qiniu.findn.cn//blog/photos/article/image8.png" alt="内核版本号添加自定义后缀" style="zoom: 67%;" />

（2）我们需要内核支持RAM disk：

- 在`General setup`选项下，选择`Initial RAM filesystem and RAM disk (initramfs/initrd) support`。
- 在`Device Drivers`选项下，勾选`Block devices`，并进入`Block devices`，勾选`RAM block device support`，并将其第二项`Default RAM disk size (kbytes) (NEW)`设置为`65536`。

<img src="https://qiniu.findn.cn//blog/photos/article/image9.png" alt="RAM disk support" style="zoom: 67%;" />

（3）取消多核心调度增强：

- 在`Processor type and features`选项下，取消勾选多核心调度增强`Multi-core scheduler support`。

<img src="https://qiniu.findn.cn//blog/photos/article/image10.png" alt="取消多核心调度增强" style="zoom: 67%;" />

（4）取消调试内核：

- 在`General architecture-dependent options`选项下，取消勾选调试内核`Kprobes`选项。

<img src="https://qiniu.findn.cn//blog/photos/article/image11.png" alt="取消调试内核" style="zoom: 67%;" />

（5）取消允许强制卸载正在使用中的模块：

- 在`Enable loadable module support`选项下，取消勾选允许强制卸载正在使用中的模块`Forced module unloading`。

（6）取消勾选磁盘配额：

- 在`File systems`选项下，取消勾选磁盘配额`Quota support`。

在所有需要的选项配置完毕之后，按Exit退出，选择Yes保存。

<img src="https://qiniu.findn.cn//blog/photos/article/image12.png" alt="保存并退出内核配置" style="zoom: 67%;" />

## 编译内核

（1）下面就可以开始编译内核了：

```bash
make -j8
```

make命令后面跟着线程数，8表示使用8线程去执行，不要超过虚拟机系统配置的核心数。

我的机子16G内存，8线程编译，大概10分钟，编译就完成了，编译成功后的内核位于：`arch/x86_64/boot/bzImage`。

（2）把编译好的内核文件拷贝到mini-linux目录下

```bash
cp arch/x86_64/boot/bzImage ../
cd ..
ls -alh
```

用`ls`命令，可以看到它的大小只有9.2M。

<img src="https://qiniu.findn.cn//blog/photos/article/image13.png" alt="查看编译好的内核" style="zoom: 67%;" />

Linux 内核裁剪及编译教程就到这里，下一部分是用busybox制作一个最小的根文件系统，敬请关注！


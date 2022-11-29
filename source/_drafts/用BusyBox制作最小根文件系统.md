---
title: 用BusyBox制作最小根文件系统
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
top:
---

本文是Linux内核实验的第二部分，想查看之前的内容可以点这里：[Linux 内核裁剪及编译](/post/8283904e.html)。

BusyBox 包含了一些简单的工具，例如ls、cat和echo等等。它提供了一个比较完善的环境，可以适用于任何小的嵌入式系统，我们将下载并编译BusyBox，并在它的基础上制作最小根文件系统。

<!-- more -->

BusyBox官网：[https://www.busybox.net/](https://www.busybox.net/)

<img src="https://qiniu.findn.cn//blog/photos/article/image14.png" alt="BusyBox官网" style="zoom:60%;" />

# 下载并编译BusyBox源码

（1）下载并解压BusyBox到mini-linux文件夹

```bash
wget https://busybox.net/downloads/busybox-1.33.2.tar.bz2
tar -xvf busybox-1.33.2.tar.bz2
cd busybox-1.33.2
```

（2）配置BusyBox

```bash
make menuconfig
```

相信经过Linux内核编译，你对menuconfig操作比较熟悉了吧

这里我们把BusyBox配置为静态编译，这样BusyBox在运行的时候就不需要额外的动态链接库了。

进入Settings下，勾选“Build static binary (no shared libs)”。

<img src="https://qiniu.findn.cn//blog/photos/article/image15.png" alt="BusyBox编译配置界面" style="zoom:60%;" />

同样在Settings下，勾选“Don't use /usr”。

<img src="https://qiniu.findn.cn//blog/photos/article/image16.png" alt="不配置/usr" style="zoom:60%;" />

​    选项配置完毕，按Exit退出，选择Yes保存。

<img src="https://qiniu.findn.cn//blog/photos/article/image17.png" alt="保存并退出" style="zoom:60%;" />

（3）编译和安装

```bash
make -j8 && make install
```

（编译耗时一分钟）

编译好的文件在BusyBox-1.33.2/_install/ 目录下

# 完善最小文件系统

（1）返回到mini-linux文件夹

```bash
cd .. 
```

（2）创建文件系统文件夹

```bash
mkdir rootfs
```

（3）拷贝编译好的BusyBox文件到rootfs

```bash
cp -rfa busybox-1.33.2/_install/* rootfs/

cp -rfa busybox-1.33.2/examples/bootfloppy/etc/ rootfs/
```

<img src="https://qiniu.findn.cn//blog/photos/article/image18.png" alt="image18" style="zoom:60%;" />

（4）修改`rootfs/etc/init.d/rcS`文件

```bash
vim rootfs/etc/init.d/rcS
```

改为如下：

```bash
#! /bin/sh                                 
/bin/mount -a
export PATH=/bin:/sbin:/usr/bin:/usr/sbin
export LD_LIBRARY_PATH=/lib/
```

<img src="https://qiniu.findn.cn//blog/photos/article/image19.png" alt="image19" style="zoom: 60%;" />

退出vim


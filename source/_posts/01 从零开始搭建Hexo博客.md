---
title: 从零开始搭建Hexo博客
tag:
  - hexo
  - yilia
categories:
  - [博客Blog, hexo]
  - [博客Blog, yilia]
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
abbrlink: 8d2d3001
date: 2021-10-22 21:12:44
top: 1
---

<img src="https://qiniu.findn.cn/blog/photos/article/blog.jpg" alt="blog" style="zoom:80%;" />

Hello，朋友，欢迎来到[三水のBlog](https://sanshui.findn.cn/)，耗时2周的博客终于搭建好了，期间踩了不少坑，不过也学到了非常多的内容。

> 博客使用的所有配置我已经打包为开源项目[hexo-theme-new-yilia](https://github.com/jackhanyuan/hexo-theme-new-yilia)，大家可以快速安装，欢迎Star！

<!--more-->

第一篇博文就做一个博客搭建过程的全记录吧，按照我的步骤，你也可以从零搭建一个属于自己的博客，我将按照以下目录逐步更新搭建博客的过程，希望能帮到大家。

- Hexo相关
	- Hexo博客入门
	- Hexo博客技巧
	- Hexo主题推荐
- Yilia主题相关
	- yilia主题bug修复
	- yilia主题功能新增
	- yilia 主题美化
- Hexo博客性能优化及部署
	- hexo博客性能优化
	- hexo博客部署及高阶技巧
- SEO优化
	- 让搜索引擎收录你的文章
	- 网站统计分析
- 工具分享
	- PicGo图床上传工具
	- Typora文章编辑工具

## Hexo相关

### Hexo博客入门

- 为什么选择hexo
- 初始化hexo博客

### Hexo博客技巧

- hexo常用命令
- hexo常用技巧
	- 跳过渲染
	- 显示摘要

### Hexo主题推荐

- hexo-theme-next
- hexo-theme-melody
- hexo-theme-yun
- hexo-theme-yilia
- hexo-theme-icarus

## Yilia主题相关

### Yilia主题bug修复

- 修复yilia主题所有文章列表不显示
- yilia主题头像显示异常
- 修复手机端toc目录不显示
- 修复mathjax数学公式js失效及换行问题
- 移除已经关闭的多说和网易云跟帖评论系统
- 修复翻页不能正确显示的bug
- 修复分享到微信二维码失效问题
- 取消litten.me统计

### Yilia主题功能新增

- 增加文章置顶功能
- 增加代码块复制功能
- 增加waline评论功能(含valine后端部署)
- 增加gittalk评论
- 增加APlayer播放器(可导入歌单)
- 增加live2d看板娘
- 增加归档页
- 增加分类和标签页
- 增加music页
- 增加相册photos和视频videos页
- 增加404页面(《圈小猫》游戏 和 腾讯公益404)

### Yilia 主题美化

- 文章添加字数统计和阅读时长
- 文章添加原创和转载标签
- 增加鼠标悬停头像旋转功能
- 侧栏left-col增加时钟clock显示
- 侧栏left-col增加网易云播放器
- 侧栏增加一言(hitokoto)
- 增加鼠标点击爱心love和文字特效
- 增加雪花飘落snow效果
- 文章底部增加版权声明
- 利用font-awesome给网站添加图标
- 侧栏subnav增加自定义图标
- 手机端增加smart menu按钮
- 添加不蒜子/busuanzi访问量统计功能
- footer添加网站运行时间
- footer添加icp备案信息
- 友链页面优化
- 修改css统一yilia主题视觉颜色
- 自定义背景图片
- 手机端美化

## Hexo博客性能优化及部署

### hexo博客性能优化

- 利用cdn加速js静态资源
- 利用七牛云图床存储网站图片

### hexo博客部署及高阶技巧

- 将hexo博客部署到github pages
- github pages绑定自定义域名并实现https
- 利用cdn全站加速hexo博客
- 使用Github Action实现hexo博客自动部署
- 使用Travis-CI实现hexo博客自动部署

## SEO优化

### 让搜索引擎收录你的文章

- 文章URL链接使用abbrlink持久化
- robots.txt配置
- 百度搜索资源平台（百度站长平台）配置
- 谷歌搜索( google search console)配置
- 百度主动推送链接配置
- 百度站长平台自动推送配置
- sitemap站点地图生成与提交

### 网站统计分析

- 配置谷歌分析(google analytics)
- 配置百度统计

## 其它

### 工具分享

- PicGo图床上传工具
- Typora文章编辑工具

### 已知bug

- toc目录跳转和Aplayer冲突

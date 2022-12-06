---
title: CSS代码实现网站全站变灰
tag:
  - 前端
categories:
  - - 博客Blog
    - hexo
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
abbrlink: cb72f2a0
date: 2022-11-30 21:30:46
updated: 2022-11-30 21:30:46
top:
---

在一些特殊日子，有不少网站都将全站变灰表示哀悼，今天我就来揭秘一下，这是如何实现的。

<!-- more -->

其实原理非常简单，我们可以通过CSS`filter`属性实现，具体来说就是给`html`标签添加如下CSS样式：

> Tips:
>可以直接在CSS文件添加如下代码
>可以通过`grayscale`值来调整元素的灰度值

```css
html {
  -webkit-filter: grayscale(100%); /* webkit */
  -moz-filter: grayscale(100%); /*firefox*/
  -ms-filter: grayscale(100%); /*ie9*/
  -o-filter: grayscale(100%); /*opera*/
  filter: grayscale(100%);
  filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  filter:gray; /*ie9- */
}
```

针对Hexo博客，我们可以在主题文件夹中找到`layout/_partial/head.ejs`文件，然后将以下代码放入`<head> </head>`标签中：

```html
<style type="text/css">
  html {
    -webkit-filter: grayscale(100%); /* webkit */
    -moz-filter: grayscale(100%); /*firefox*/
    -ms-filter: grayscale(100%); /*ie9*/
    -o-filter: grayscale(100%); /*opera*/
    filter: grayscale(100%);
    filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    filter:gray; /*ie9- */
  }
</style>
```

针对VuePress建站的网站，我们可以直接更改`.vuepress/styles/index.scss`文件，在该文件中放入以下代码：

```scss
html {
  -webkit-filter: grayscale(100%); /* webkit */
  -moz-filter: grayscale(100%); /*firefox*/
  -ms-filter: grayscale(100%); /*ie9*/
  -o-filter: grayscale(100%); /*opera*/
  filter: grayscale(100%);
  filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  filter:gray; /*ie9- */
}
```

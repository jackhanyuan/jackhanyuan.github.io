---
title: Linux服务器挖矿木马病毒查杀记录（-bash mcrond bprofr pwnrig ntpdate dbused sysdr）
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
top: 3
abbrlink: c2344f26
date: 2024-10-09 17:50:38
updated: 2024-10-09 17:50:38
---

近期，服务器异常，通过`htop`或`top`命令查看CPU占用前几的进程，发现`root`用户的`-bash`进程把CPU一半的核占满，而另一台服务器上`x`用户（被新创建的用户）和一个`普通用户`CPU占用也异常。

`kill -9 进程号`杀掉进程后立马又启动了新进程，`ll /proc/进程号`查看PID目录，可以看到exe指向了一个被删除了的-bash进程(/usr/bin/-bash)，使用 `netstat -anp|grep ESTABLISHED` 查看State为`ESTABLISHED`的网络连接，发现有异常外网连接，这应该就是`-bash`病毒木马了。



![htop查看进程 CPU异常](https://i-blog.csdnimg.cn/direct/8df62fd57d1f40a5917c387c7240a383.png)

<!-- more -->

## 处理思路

找出与木马相关的所有关联文件并删掉：**！！注意删除文件前一定要谨慎，逐一通过`文件内容`和`创建时间`来综合判断是否为木马关联文件。**

1. `cat /etc/passwd`查看是否有异常用户和组，对于木马创建的新用户可以直接删除，逐一检查每个用户目录（包括`root`）文件是否异常，重点是`~/.bash_profile`、`~/.bashrc`和`~/.ssh/authorized_keys`。

2. 木马能不停启动，可能会篡改命令，并且有守护进程，重点检查`定时任务`、`启动项`和`服务`等，排查`/bin`、`/sbin`、`/etc/cron*/`、 `/var/spool/cron*/`、`/etc/init.d/`、`/etc/rc*/`、`/etc/system*/`、`/lib/system*/`、`/run/system*/`目录下是否有`异常文件`或`最近修改`（`ls -lt | head`）。
   
3. 当查到木马脚本后，总结出脚本中的一些 `关键文件`名称，如`mcrond`、`bcrond`、`crondr`、`bprofr`、`ntpdate`、`entpdate`、`lntpdate`、`initdr`、`binitd`、`minitd`、`msysde`、`msysdl`、`bsysde`、`bsysdl`、`sysdr`、`dbused`、`do-dear`、`pwndns`、`pwnrig`并用这些关键词作为特征搜索上述目录文件。

下面是整个查杀过程，以下所有操作都在root权限下进行，一定谨慎删除文件，文末会附上我制作的批量查杀脚本：

[toc]

## 进程分析
```sh
# 分析前几个cpu占用高的进程
ps aux|grep -v PID|sort -rn -k +3|head

# 查看进程文件
ll /proc/进程号
lsof -p 进程号

# 筛选网络连接
netstat -anp|grep ESTABLISHED

# 杀掉进程
kill -9 PID
```
## 定时任务分析
```sh
# 查看定时任务
crontab -l
# 编辑定时任务
crontab -e
```
![查看定时任务](https://i-blog.csdnimg.cn/direct/a4c3db33fd774eab9d468dc688ac05b4.png)
这里发现了异常目录`/var/tmp/.systemd/`和域名`pwndns.pw`，在所有定时任务文件夹`/etc/cron*/`和`/var/spool/cron*/`查一遍最近修改的文件（目录下有很多子文件夹，如cron.d，cron.daily，cron.hourly，cron.weekly，cron.monthly等，很多都会有），可以使用`ls -lt 文件名 `、`cat 文件名`查看文件时间和内容是否异常，然后就发现了下面异常文件。
![定时任务异常文件](https://i-blog.csdnimg.cn/direct/ba2a5ce79e444014af0c4f0ae1bc39c2.png)
这里发现了异常文件`ntpdate`和`pwnrig`，可以看到文件修改时间为`9月28日 3点`，后面只要查到`文件在这个时间附近修改过`，就基本是`木马文件`。查看文件内容：
![ntpdate内容](https://i-blog.csdnimg.cn/direct/7b3506ac6f3a4303bdb2efb215ca2652.png)![pwnrig内容](https://i-blog.csdnimg.cn/direct/4d79689d1f5b4c6bad4ad9215943f8b4.png)
从文件里又提取了关键词`crondr`、`mcrond`、`bcrond`等，发现该脚本已经污染了`/bin`目录，也发现了木马会使用`curl`和`wget`从服务器不停请求`最新脚本`，`-bash`进程启动后，原二进制文件就会被删除，所以不能从`进程路径溯源`。

用关键词重新搜索一遍定时任务
```
grep -R -E 'mcrond|bcrond|crondr|bprofr|ntpdate|entpdate|lntpdate|initdr|binitd|minitd|msysde|msysdl|bsysde|bsysdl|sysdr|xmr|pwndns|pwnrig|do-dear|update\.sh|root\.sh|\.systemd|\.update' /etc/cron* /var/spool/cron* 2>/dev/null
```
## 限制网络连接

由于木马会不断通过网络请求下载最新脚本，所以得限制网络连接：

```sh
# 暂时修改掉curl和wget
mv curl curl.bak
mv wget wget.bak

#修改hosts文件
echo "127.0.0.1 pw.pwndns.pw" >> /etc/hosts
echo "127.0.0.1 xmr-rx0.do-dear.com" >> /etc/hosts
```
![修改hosts限制网络](https://i-blog.csdnimg.cn/direct/a769040201d24d94b47216c2520e1a0f.png)
## 排查/bin /sbin
```sh
cd /bin
# 分析最近修改
ls -lt|head -30

cd /sbin
ls -lt|head -30

cat 可疑文件名
```
`/bin`和`/sbin`目录下不少被篡改的命令，并且被添加了`-ai`保护属性，常规的`rm -rf 文件名`删除不掉，可以`chattr  -ai 文件名`减除保护属性后删除。

```sh
#查看文件保护属性
lsattr 文件名
#删除文件保护属性
chattr -i 文件名
# 删除文件
rm -rf 文件名
```
![chattr移除文件属性](https://i-blog.csdnimg.cn/direct/f74352edd7e4433296bf477bc806807f.png)
如果还删除不掉，可以使用`inode节点`的方式删除：

```
ls -i 文件名
rm -i 文件名 -inum 节点号
```
## 排除异常用户和home目录文件
```sh
# 检查异常组和用户
cat /etc/passwd
# 发现了异常新建用户x，直接删除（谨慎核对后操作）
userdel -r x
```

发现很多用户目录下和`~/.bash_profile`、`~/.bashrc`和`~/.ssh/authorized_keys`被篡改
![用户目录下多个文件被篡改](https://i-blog.csdnimg.cn/direct/6bf1e5e85ef64d69bb2161d5ea64dae3.png)

检查 SSH 授权密钥有无异常密钥
```sh
grep -R 'ssh-rsa' /root/.ssh/authorized_keys 2>/dev/null
grep -R 'ssh-rsa' /home/*/.ssh/authorized_keys 2>/dev/null
```
## 启动项和服务分析
```sh
systemctl list-units --type=service
```
![系统服务分析](https://i-blog.csdnimg.cn/direct/c60dc6d9a8a842e1b6a8783a1be1f8e0.png)
发现了系统级服务，结合上面的各种关键字，干脆在` /usr/lib/systemd/`、`/etc/rc.d/`、`/etc/systemd/`、` /lib/systemd/`文件夹里搜索一遍吧，搜索到有问题的再逐一核对删除：

```sh
grep -R -E 'mcrond|bcrond|crondr|bprofr|ntpdate|entpdate|lntpdate|initdr|binitd|minitd|msysde|msysdl|bsysde|bsysdl|sysdr|xmr|pwndns|pwnrig|do-dear|update\.sh|root\.sh' /etc/rc*/ /etc/init*/ /lib/system*/ /etc/system*/ 2>/dev/null
```

## 检查系统日志

````
grep -R -E 'mcrond|bcrond|crondr|bprofr|ntpdate|entpdate|lntpdate|initdr|binitd|minitd|msysde|msysdl|bsysde|bsysdl|sysdr|xmr|pwndns|pwnrig|do-dear|update\.sh|root\.sh' /var/log/ 2>/dev/null
````
![日志分析](https://i-blog.csdnimg.cn/direct/3834c8da024e4fa78fa2a5e357e2ed75.png)
找到来源了，`xmrminer`从某`98.12`服务器过来，可以确定这是`挖矿木马病毒`，并通过日志确定了`可疑用户x`以及`/tmp/.pwn`、`/tmp/systemd-private*`、`/var/tmp/.update`、`/var/tmp/.system*`、`/var/tmp/systemd-private*`等目录。

## 编写批量查杀脚本

基于以上分析，基本确定了病毒传播方式和一些关联文件和目录，编写批量查杀脚本`scan_bash.sh`：

```sh
# Linux server mining Trojan virus detection
# @author [jackhanyuan](https://github.com/jackhanyuan)
# @Date October 1, 2024

#!/bin/bash

# Define keywords (optimized regular expressions)
keywords='mcrond|bcrond|crondr|bprofr|ntpdate|entpdate|lntpdate|initdr|binitd|minitd|msysde|msysdl|bsysde|bsysdl|sysdr|dbused|xmrminer|xmr-rx0\.do-dear\.com|pw\.pwndns\.pw|pwndns|pwnrig.*|do-dear|root\.sh|reboot\.sh'

# Set maximum scan depth (adjust as needed)
max_scan_depth=2
# If the user provides a scan depth parameter, use it
if [ $# -ge 1 ]; then
if [[ $1 =~ ^[0-9]+$ ]]; then
max_scan_depth=$1
else
echo "Invalid scan depth parameter. Please provide a positive integer."
exit 1
fi
fi
echo "Scan depth set to: $max_scan_depth"

# Get all regular users' Home directories (as an array)
readarray -t homedirs <<< "$(awk -F: '($3>=1000)&&($3<65534)||($3==0){print $6}' /etc/passwd | sort -u)"

# Define other directories to scan (do not use quotes to allow globbing)
scandir_patterns=(
/bin/
/sbin/
/etc/cron*/
/var/spool/cron*/
/etc/init*/
/etc/rc*/
/etc/system*/
/lib/system*/
/run/system*
/var/tmp/.system*/
/var/tmp/.update/
/var/log/
)

# Merge directories to scan
dirs_to_scan=("${homedirs[@]}" "${scandir_patterns[@]}")

# Define colors
GREEN='\033[0;32m'  # Green
NC='\033[0m'        # No color

# Start scanning
for dir in "${dirs_to_scan[@]}"; do
if [ -d "$dir" ]; then
echo "Scanning directory: $dir"

# Build find command to scan only specific types of files, excluding binary files
find_cmd=(find -L "$dir" -maxdepth "$max_scan_depth" -type f -size -10M -print0)

# Execute find command
"${find_cmd[@]}" 2>/dev/null | while IFS= read -r -d '' file; do
# Check if the filename matches any keyword
filename=$(basename "$file")
if echo "$filename" | grep -E -q "$keywords"; then
echo -e "${GREEN}Found suspicious filename: $file${NC}"
echo "$file" | sed 's/^/    /'
echo "-------------------------"
fi

# echo "Scanning：$file"

# Search for keywords in file content, excluding binary files
matches=$(grep --binary-files=without-match -E -H -n "$keywords" "$file" 2>/dev/null)
if [ -n "$matches" ]; then
echo -e "${GREEN}Found suspicious file content: $file${NC}"

# Indent matched content and limit to first 10 lines with a maximum of 200 characters per line
echo "$matches" | awk 'NR <= 10 { 
if (length($0) > 200) { 
print "    " substr($0, 1, 200) " ..."
} else { 
print "    " $0 
} 
} NR > 10 { 
print "    ... (truncated)" 
exit 
}'
echo "-------------------------"
fi
done
else
echo "Directory does not exist or is not accessible: $dir"
fi
done
```
创建`scan_bash.sh`，添加权限并批量扫描：
```sh
# 创建scan_bash.sh文件并编辑
vim scan_bash.sh
# 添加x权限
chmod +x scan_bash.sh
# 执行扫描脚本
./scan_bash.sh
# 也可以添加扫描深度参数，默认为2
./scan_bash.sh 2
```
***！！一定记得扫描出的可疑文件请逐一核对确认再删除，以免删错影响系统运行。***

到这一步，`kill -9 进程号`杀掉相关进程，观察2天没有问题，查杀结束，记得恢复`curl`和`wget`~~~~


## 后续防护

- 升级SSH到最新版本`openssh-9.9p1`，[https://www.openssh.com/portable.html](https://www.openssh.com/portable.html)；

- 禁用默认`22端口`，禁用`Root远程登录`，禁用`密码登录`，改用`密钥登录`；

- 服务器防火墙禁用`不常用的端口`；

- 如果有docker和数据库等服务，一定要提升安全等级，不要使用默认端口，启用`docker持久化`，数据库绑定localhost防止`非本机数据库连接`；

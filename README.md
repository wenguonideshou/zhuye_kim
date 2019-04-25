# zhuye_kim
仿zhuye.kim的简单导航程序

![zhuye.kim(1).png](https://www.moerats.com/usr/picture/zhuye.kim(1).png)

![zhuye.kim(2).png](https://www.moerats.com/usr/picture/zhuye.kim(2).png)

#### 使用说明 ####

- 环境要求

Centos7 + Python3 + MySQL + Django1.8.x-2.0.x


- 安装Python3和pip3

Centos7系统安装Python3可以参考文章：http://blog.51cto.com/wenguonideshou/2083301

- 安装程序要求的必备组件、库

```bash
yum install git screen -y
pip3 install -r requirements.txt
```

- 安装宝塔面板，并安装mysql（mariadb也可以），新建数据库名为zhuye

- 修改zhuye_kim/settings.py中的DATABASES对应的数据库信息（只需要修改数据库密码）

- 下载源码、建表

```bash
git clone https://github.com/wenguonideshou/zhuye_kim
cd zhuye_kim
python3 manage.py makemigrations --merge
python3 manage.py makemigrations
python3 manage.py migrate
```

- 导入zhuye.sql

- 运行网站
```bash
screen -S zhuye
python3 manage.py runserver 127.0.0.1:8001
 ```
 	 
- Nginx反向代理

![反向代理.png](https://i.loli.net/2018/07/17/5b4df8524ab67.png)	

后台地址为http://域名/admin，管理员用户名admin 密码12345678@


后台的“大分类”指的是常用/男生/女生 这一行，“小分类”指的是热门/资讯/影音/邮箱的这一列

更新记录：

2019-04-25 解决django对mysql严格模式的警告、增加requirements.txt限定django大版本号

2019-01-07 合并yetist提交的PR：支持django1.8+、支持分类排序、增加站点描述、增加站点默认图标、所有变量统一到settings.py中设置

2019-01-06 修复https下百度搜索关键字不联想的bug

2018-07-26 增加更换背景图功能，发布1.1版

2018-07-19 修复百度搜索关键字联想功能，发布1.0版

2018-07-18 补全导航中所有站点、图标

2018-07-17 去除多引擎，修改为默认单引擎

2018-07-16 发布beta版

**获取更多帮助请[加群](http://shang.qq.com/wpa/qunwpa?idkey=d119da6023cc49729a61139ca4b8bb0ee770d8d9a89383939c4a45159f82bc6d)**


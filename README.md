# 项目介绍

这是一个高仿的网易云音乐的项目

# 技术栈
vue2 + vuex + vue-router + axios + ES6/7 + sass + flex + icomoon

# 预览地址
[网易云音乐vue版](http://www.zhixuanvip.com)（请用chrome手机模式预览）

# 关于后台数据
数据是真实的网易云音乐的数据，利用[Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)提供的node.js版接口！感谢Binaryify的付出！

# 项目本地运行

### 安装后台服务器
```
git clone https://github.com/zhixuanziben/MusicApi.git  

cd MusicApi

npm install

node app.js (运行服务器，注意：这个服务器默认采用CORS跨域，可接受域为http://localhost:8080，如果修改vue项目的端口，后台app.js文件内也需要修改)
```

### 安装vue项目
```
git clone https://github.com/zhixuanziben/NeteaseCloudMusic-vue.git  

cd NeteaseCloudMusic-vue

npm install

npm run dev (在浏览器访问本项目，端口默认8080)
```

# 说明
>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

> 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR ，也欢迎小伙伴一起完善这个项目👍

> 推荐一个我之前做的猫眼电影项目，比当前的项目简单很多，非常适合入门练习。[地址在这里](https://github.com/zhixuanziben/gouyan-movie-vue)

# 目标功能
- [x] 20种排行榜 -- 完成
- [x] 播放和暂停音乐，上一首，下一首，快进，快退 -- 完成
- [x] 滚动歌词 -- 完成
- [x] 列表播放，随机播放，单曲循环 -- 完成
- [x] 播放歌单全部音乐 -- 完成
- [x] 添加音乐到下一首播放 -- 完成
- [x] 查看评论，分为歌曲评论，专辑评论，歌单评论，mv评论 -- 完成
- [x] 查看mv，mv评论，相似mv -- 完成
- [x] mv排行榜和最新mv -- 完成
- [x] 获取最新最热歌单 -- 完成
- [x] 推荐歌单，推荐mv，推荐专辑 -- 完成
- [x] 查看用户个人信息 -- 完成
- [x] 查看用户歌单 -- 完成
- [x] 搜索单曲，专辑，歌手，歌单，MV，用户 -- 完成
- [x] 查看歌手信息，包括单曲，专辑，mv，介绍，相似歌手 -- 完成
- [ ] 登录 -- 半成品
- [ ] 给评论点赞 -- 半成品，需要登录
- [ ] 添加音乐到歌单 -- 半成品，需要登录
- [ ] 喜欢这首音乐 -- 未做，需要登录
- [ ] 日推 -- 半成品，需要登录
- [ ] 精品歌单 -- 未做
- [ ] 独家放送 -- 未做
- [ ] 电台 -- 未做



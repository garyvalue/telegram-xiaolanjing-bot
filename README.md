## 小蓝鲸机器人

### 功能

- [x] 规则匹配
- [x] DNS 查询
- [x] IP 地址查询
- [ ] Whois 查询
- [x] 化名聊天室
- [x] 生成二维码
- [ ] 进群验证
- [x] 设置功能
  - [x] 垃圾消息检测

### 使用方法

请先填写 config.ts 中的配置。

```bash
$ git clone https://github.com/lihai2333/telegram-xiaolanjing-bot
$ cd telegram-xiaolanjing-bot/
$ # 安装依赖
$ npm install --global typescript
$ npm install --force
$ # 部署
$ make build
$ # 运行小蓝鲸
$ node built/index.js
```

# JavaScript风格正则表达式可视化工具

[在线使用](https://aoxiaoqiang.github.io/reg)

## 功能与使用

1. 本工具可以可视化检验正则匹配的结果。
2. 输入JavaScript风格的正则表达式例如 `/[a-zA-Z]/`, 点击可视化即可查看。
3. 工具还可以将可视化结果保存为`svg`和`png`格式文件。
4. 在线测试匹配字符文本。

## 本地运行

```bash
# 安装模块依赖
npm install

npm run dev # 生成本地文件
npm run watch # 本地 watch 文件改动, 执行编译本地预览
npm run build # 编译生成最终发布文件
```

```javascript
// 匹配正则的正则
var reg1 = /^\/([\W\w]+)\/((?:([gim])(?!\3))(?:([gim])(?!(?:\3|\4)))?)?(?:[gim])?$/g;
var reg2 = /^\/([\W\w]+)\/(?=[gmi]{0,3}$)((.?)(?!.*\2))?((.?)(?!\4))?.?$/g;
```

[JavaScript中的正则](./Note.md)

[参考项目](https://gitlab.com/javallone/regexper-static)
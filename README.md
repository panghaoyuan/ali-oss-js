# ali-oss-js

## js插件的创建目的
使用阿里云oss的webpack插件会直接把OSSID和秘钥直接暴露在所有开发人员的代码中或git仓库中,为了防止暴露我们可以采取以下方法.

.gitignore掉此插件文件然后将文件放置于本地或者服务器由指定人员进行打包操作的形式来进行阿里云oss上传操作.


## 使用方法
在packagejson里添加命令

### TS版例子

需提前安装 ts-node

```JavaScript
"scripts": {
    ...
    "oss:test": "cross-env NODE_ENV=xxx ts-node oss.client.ts",
}
```

### js版例子

```JavaScript
"scripts": {
    ...
    "build:test": "cross-env NODE_ENV=xxx node oss.client.ts",
}
```

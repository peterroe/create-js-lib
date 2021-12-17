## 目标

一个快速搭建js库的脚手架，用于发布NPM包

测试环境基于Vue3和Vite

## 安装

```shell
$ yarn add -g @peterroe/create-js-lib
```

## 搭建项目

```shell
$ create-js-lib
```

## 启动项目

```shell
$ yarn
$ yarn dev
```

## 打包

提供UMD和ESM两种基本打包格式

```shell
$ yarn build
```

## UMD/ESM

pkg是包的名字：

```html
<script src="https://unpkg.com/[pkg]"></script>
```
```shell
$ yarn add [pkg]
``



---
title: 快速上手
---

# 快速上手

## 依赖环境

- [Node.js v14.18.0+](https://nodejs.org/)
- [Yarn v1 classic](https://classic.yarnpkg.com/en/)

## 手动安装

- **步骤 1**: 创建并进入一个新目录

```bash
mkdir dulladmin-starter
cd dulladmin-starter
```

- **步骤 2**: 初始化项目

```bash
yarn init
```

- **步骤 3**: 将 **dulladmin** 安装为本地依赖

```bash
yarn add -D @dulladmin/cli @dulladmin/generator-arco-vue
```

| 软件包                        | 用途                                                            |
| ----------------------------- | --------------------------------------------------------------- |
| @dulladmin/cli                | 命令行工具                                                      |
| @dulladmin/generator-arco-vue | 前端代码生成器，[Arco Design Vue](https://arco.design/vue) 版本 |

- **步骤 4**: 创建 client 目录

```bash
yarn dulladmin client:install
```

将会生成类似下方的目录结构：

```bash
├─ client     # clientDir, 客户端源码的输出目录
├─ dulladmin  # dulladminDir, 资源定义文件
│  ├─ resources
│  └─ app.yml
└─ package.json
```

- **步骤 5**: 创建你的第一个**资源定义文件**

```bash
vim dulladmin/resources/users.yml
```

::: details 点击查看 dulladmin/resources/users.yml 的文件内容
@[code](@/files/guide/getting-started-resources-users.yml)
:::

- **步骤 6**: 输出客户端源码

```bash
yarn dulladmin build
```

::: details 点击查看控制台的构建信息
@[code](@/files/guide/getting-started-build-info.sh)
:::

- **步骤 7**: 预览

```bash
cd client
yarn run-p mock:server dev
```

运行上述命令执行，会在 [http://127.0.0.1:3000](http://127.0.0.1:3000) 运行一个后台服务器来提供接口数据，
同时在 [http://127.0.0.1:5173](http://127.0.0.1:5173) 运行一个热加载的开发服务器来提供前端代码。

在登录界面，输入用户名 “admin” 和密码 “123456” 进入系统。到现在为止，你应该可以看到一个基本但实用的
后台管理系统。接下来，了解一下 [资源定义文件](./resource-file.md) 的基础知识。

::: tip
完整的示例可查看 [examples/arco-vue](https://github.com/dulladmin/dulladmin/tree/main/examples/arco-vue) 目录。
:::

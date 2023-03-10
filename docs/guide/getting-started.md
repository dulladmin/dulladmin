---
title: Get Started
---

# Get Started

## Prerequisites

- [Node.js v14.18.0+](https://nodejs.org/)
- [Yarn v1 classic](https://classic.yarnpkg.com/en/)

## Manual Installation

- **Step 1**: Create and change into a new directory

```bash
mkdir dulladmin-starter
cd dulladmin-starter
```

- **Step 2**: Initialize your project

```bash
yarn init
```

- **Step 3**: Install **dulladmin** locally

```bash
yarn add -D @dulladmin/cli @dulladmin/generator-arco-vue
```

| Package                       | Purpose                                                                 |
| ----------------------------- | ----------------------------------------------------------------------- |
| @dulladmin/cli                | cli toolkit                                                             |
| @dulladmin/generator-arco-vue | frontend code generator with [Arco Design Vue](https://arco.design/vue) |

- **Step 4**: Create client directory

```bash
yarn dulladmin client:install
```

Your project structure is probably like this:

```bash
├─ client     # clientDir, all frontend code will be generated here
├─ dulladmin  # dulladminDir, definition files here
│  ├─ resources
│  └─ app.yml
└─ package.json
```

- **Step 5**: Create your first **DullAdmin Resource File**

```bash
vim dulladmin/resources/users.yml
```

::: details Click to expand sample dulladmin/resources/users.yml
@[code](@/files/guide/getting-started-resources-users.yml)
:::

- **Step 6**: Generate client src code

```bash
yarn dulladmin build
```

::: details Click to expand build info
@[code](@/files/guide/getting-started-build-info.sh)
:::

- **Step 7**: Preview

```bash
cd client
yarn run-p mock:server dev
```

It will start a mock server at [http://127.0.0.1:3000](http://127.0.0.1:3000) to provide backend api service, and a
hot-reloading development server at [http://127.0.0.1:5173](http://127.0.0.1:5173) to serve frontend.

Enter username `admin` and password `123456` to log in to the system. By now, you should have a basic but functional
admin panel. Next, learn about the basics of [DullAdmin Resource File](./resource-file.md).

::: tip
Full example can be found in [examples/arco-vue](https://github.com/dulladmin/dulladmin/tree/main/examples/arco-vue).
:::

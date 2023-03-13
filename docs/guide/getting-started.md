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

```yml
# resources/users.yml
name: 'users'
views:
  index:
    table:
      items:
        - { name: 'id', type: 'int64' }
        - { name: 'name', type: 'string' }
        - { name: 'avatar', type: 'image' }
      sorters:
        - { name: 'id', directions: ['descend', 'ascend'] }
      searchers:
        - { name: 'id', predicate: 'eq' }
        - { name: 'name', predicate: 'cont' }
      pagination:
        per: 5

  show:
    descriptions:
      items:
        - { name: 'id', type: 'int64' }
        - { name: 'name', type: 'string' }
        - { name: 'avatar', type: 'image' }

  new:
    form:
      items:
        - { name: 'name', type: 'string' }
        - { name: 'avatar', type: 'image' }

  edit:
    form:
      items:
        - { name: 'name', type: 'string' }
        - { name: 'avatar', type: 'image' }

  delete:
    form:
      items: []
```

:::

- **Step 6**: Generate client src code

```bash
yarn dulladmin build
```

::: details Click to expand build info

```bash
[INFO] Parsing DULLADMIN_FILES in dulladmin
[INFO]   output to client
[INFO]     - dulladmin/resources/users.yml
[INFO]       + client/src/router/routes/modules/users.ts
[INFO]       + client/src/api/modules/users/index/self-block.ts
[INFO]       + client/src/api/modules/users/show/self-block.ts
[INFO]       + client/src/api/modules/users/new/self-block.ts
[INFO]       + client/src/api/modules/users/edit/self-block.ts
[INFO]       + client/src/api/modules/users/delete/self-block.ts
[INFO]       + client/src/views/modules/users/index/index.vue
[INFO]       + client/src/views/modules/users/index/components/self-block.vue
[INFO]       + client/src/views/modules/users/show/index.vue
[INFO]       + client/src/views/modules/users/show/components/self-block.vue
[INFO]       + client/src/views/modules/users/new/index.vue
[INFO]       + client/src/views/modules/users/new/components/self-block.vue
[INFO]       + client/src/views/modules/users/edit/index.vue
[INFO]       + client/src/views/modules/users/edit/components/self-block.vue
[INFO]       + client/src/views/modules/users/delete/index.vue
[INFO]       + client/src/views/modules/users/delete/components/self-block.vue
[INFO]       + client/src/assets/style/modules/users.less
[INFO]       + client/src/locale/en-US/modules/users.json
[INFO]       + client/src/locale/zh-CN/modules/users.json
[INFO]     - dulladmin/app.yml
[INFO]       + client/src/config/config.json
[INFO]       + client/src/locale/en-US/modules/07-app-site.json
[INFO]       + client/src/locale/zh-CN/modules/07-app-site.json
[INFO]       + client/src/router/app-menu/routes.ts
[INFO]       + client/src/locale/en-US/modules/13-app-menu.json
[INFO]       + client/src/locale/zh-CN/modules/13-app-menu.json
```

:::

- **Step 7**: Preview

```bash
cd client
yarn run-p mock:server dev
```

It will start a mock server at [http://127.0.0.1:3000](http://127.0.0.1:3000) to provide backend api service, and a
hot-reloading development server at [http://127.0.0.1:5173](http://127.0.0.1:5173) to serve frontend.

Enter username `admin` and password `123456` to log in to the system. By now, you should have a basic but functional
admin panel. Next, learn about the basics of [DullAdmin Resource File](./configuration.md).

::: tip
Full example can be found in [examples/arco-vue](https://github.com/dulladmin/dulladmin/tree/main/examples/arco-vue).
:::

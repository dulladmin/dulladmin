---
title: 介绍
---

# 介绍

**DullAdmin** 用以快速构建后台管理系统的规范。

构建后台管理系统通常需要编写大量重复的 CRUD 逻辑，实现排序、搜索等功能非常乏味。本规范定义了请求接口和数据呈现，让代码生成器处理剩余工作。例如：

**资源文件：**

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

**自动生成的管理页面：**

![generated webui](/images/guide/README-generated-webui.png)

---
title: Introduction
---

# Introduction

**DullAdmin** is a specification for building admin panel.

Building admin panel usually involves writing a lot of redundant CRUD logic, implementing features
like sorters, searchers can be tedious. This specification define the request interface and data
presentation, and let the code generator handle all the rest stuff. E.g.

**DullAdmin Resource File:**

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

**Generated WebUI:**

![generated webui](/images/guide/README-generated-webui.png)

::: tip
Full example can be found in [examples/arco-vue](https://github.com/dulladmin/dulladmin/tree/main/examples/arco-vue).
:::

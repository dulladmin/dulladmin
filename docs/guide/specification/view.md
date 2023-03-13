---
title: View
---

# View

## Definition File

### single block

```yml
name: 'users'
views:
  # <View @name="index">
  mycustom:
    # <TableBlock @name="self">
    table:
      items:
        - { name: 'id', type: 'int64' }
        - { name: 'name', type: 'string' }
        - { name: 'avatar', type: 'image' }
```

that will produce a view named **index** with following blocks:

| Name | Type       | Purpose                     |
| ---- | ---------- | --------------------------- |
| self | TableBlock | display a list of all users |

### multiple blocks

```yml
name: 'users'
views:
  # <View @name="show">
  show:
    blocks:
      # <DescriptionsBlock @name="self">
      - descriptions:
          items:
            - { name: 'id', type: 'int64' }
            - { name: 'name', type: 'string' }
            - { name: 'avatar', type: 'image' }
      # <TableBlock @name="posts">
      - name: 'posts'
        table:
          items:
            - { name: 'id', type: 'int64' }
            - { name: 'title', type: 'string' }
```

that will produce a view named **show** with following blocks:

| Name  | Type              | Purpose                        |
| ----- | ----------------- | ------------------------------ |
| self  | DescriptionsBlock | display user's detail          |
| posts | TableBlock        | display a list of user's posts |

## Fields

| Field        | Description                                      | Type           | Default value | Sample value |
| ------------ | ------------------------------------------------ | -------------- | ------------- | ------------ |
| name         | view name (**implicit definition**)              | string         | -             | "index"      |
| authority    | permission control                               | Array\<string> | -             | ["admin"]    |
| blocks       | collection of components in view                 | Array\<Block>  | -             | -            |
| table        | a shorthand for `blocks: [{ table: {} }]`        | -              | -             | -            |
| descriptions | a shorthand for `blocks: [{ descriptions: {} }]` | -              | -             | -            |
| form         | a shorthand for `blocks: [{ form: {} }]`         | -              | -             | -            |
| echarts      | a shorthand for `blocks: [{ echarts: {} }]`      | -              | -             | -            |
| custom       | a shorthand for `blocks: [{ custom: {} }]`       | -              | -             | -            |

- **authority** - inherited by all **blocks**

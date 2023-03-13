---
title: Block
---

# Block

## Definition File

```yml
name: 'users'
views:
  show:
    blocks:
      # <DescriptionsBlock @name="self">
      - name: 'self'
        descriptions:
          items:
            - { name: 'id', type: 'int64' }
            - { name: 'name', type: 'string' }
            - { name: 'avatar', type: 'image' }
```

## Fields

| Field        | Description                                  | Type           | Default value | Sample value |
| ------------ | -------------------------------------------- | -------------- | ------------- | ------------ |
| name         | block name                                   | string         | "self"        | "self"       |
| authority    | permission control                           | Array\<string> | -             | ["admin"]    |
| table        | [TableBlock](./block-table.md)               | -              | -             | -            |
| descriptions | [DescriptionsBlock](./block-descriptions.md) | -              | -             | -            |
| form         | [FormBlock](./block-form.md)                 | -              | -             | -            |
| echarts      | [EChartsBlock](./block-echarts.md)           | -              | -             | -            |
| custom       | [CustomBlock](./block-custom.md)             | -              | -             | -            |

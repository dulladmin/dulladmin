---
title: Table Block
---

# Table Block

## Definition File

```yml
name: 'users'
views:
  index:
    # <TableBlock @name="self">
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
```

## Fields

### items

| Field                | Description                                                | Type                                | Default value | Sample value                     |
| -------------------- | ---------------------------------------------------------- | ----------------------------------- | ------------- | -------------------------------- |
| name                 | model attribute name                                       | string                              | -             | "id"                             |
| type                 | model attribute value type                                 | string                              | -             | "string"                         |
| optionals            | model attribute value's enum                               | Array\<string \| number \| boolean> | -             | ["apple", "google", "microsoft"] |
| attributes           | embed object attributes, available when `type == "object"` | -                                   | -             | -                                |
| attributes.name      | object attribute name                                      | string                              | -             | -                                |
| attributes.type      | object attribute value type                                | string                              | -             | -                                |
| attributes.optionals | object attribute value's enum                              | Array\<string \| number \| boolean> | -             | -                                |
| hidden               | hide in column                                             | boolean                             | false         | false                            |

- **type** - must be one of [Value Type](./type.md)
- **attributes.type** - must be one of [Value Type](./type.md), except `object`

### sorters

| Field      | Description              | Type           | Default value | Sample value          |
| ---------- | ------------------------ | -------------- | ------------- | --------------------- |
| name       | sorter name              | string         | -             | "id"                  |
| directions | supported sort direction | Array\<string> | -             | ["descend", "ascend"] |

### searchers

| Field     | Description           | Type                                | Default value | Sample value                     |
| --------- | --------------------- | ----------------------------------- | ------------- | -------------------------------- |
| name      | searcher name         | string                              | -             | "id"                             |
| type      | searcher value type   | string                              | -             | "string"                         |
| optionals | searcher value's enum | Array\<string \| number \| boolean> | -             | ["apple", "google", "microsoft"] |
| predicate | searcher predicates   | string                              | -             | "eq"                             |

- **predicate** - must be one of `eq`, `cont`

### pagination

| Field | Description                        | Type   | Default value | Sample value |
| ----- | ---------------------------------- | ------ | ------------- | ------------ |
| per   | number of items displayed per page | number | -             | 20           |

## Request Interface

### GET

- **GET /users/index/self**
- **request**

```ts
interface ListRequest {
  search?: {
    id_eq?: number
    name_cont?: string
  }
  sorter?: {
    name: string
    direction: 'ascend' | 'descend'
  }
  pagination: {
    page_size: number
    current: number
    total?: number
  }
}
```

- **response data**

```ts
interface ListResponse {
  collection: {
    id?: number
    name?: string
    avatar?: string
  }[]
  pagination?: {
    page_size: number
    current: number
    total?: number
  }
}
```

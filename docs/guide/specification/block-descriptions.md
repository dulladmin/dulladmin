---
title: Descriptions Block
---

# Descriptions Block

## Definition File

```yml
name: 'users'
views:
  show:
    # <DescriptionsBlock @name="self">
    descriptions:
      items:
        - { name: 'id', type: 'int64' }
        - { name: 'name', type: 'string' }
        - { name: 'avatar', type: 'image' }
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

- **type** - must be one of [Value Type](./type.md)
- **attributes.type** - must be one of [Value Type](./type.md), except `object`

## Request Interface

### GET

- **GET /users/:id/show/self**
- **request**

```ts
interface GetRequest {}
```

- **response data**

```ts
interface GetResponse {
  model: {
    id?: number
    name?: string
    avatar?: string
  }
}
```

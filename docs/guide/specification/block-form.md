---
title: Form Block
---

# Form Block

## Definition File

```yml
name: 'users'
views:
  new:
    # <FormBlock @name="self">
    form:
      items:
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

- **GET /users/new/self**
- **request**

```ts
interface GetRequest {}
```

- **response data**

```ts
interface GetResponse {
  form: {
    name?: string
    avatar?: string
  }
}
```

### PUT

- **PUT /users/new/self**
- **request**

```ts
interface PutRequest {
  form: {
    name?: string
    avatar?: string
  }
}
```

- **response data**

```ts
interface PutResponse {
  form: {
    name?: string
    avatar?: string
  }
}
```

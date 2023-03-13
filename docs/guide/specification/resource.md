---
title: Resource
---

# Resource

## Definition File

```yml
# <Resource @name="users">
name: 'users'
views:
  index:
  new:
  show:
  edit:
  delete:
  mycustom:
```

that will produce following views:

| Name           | Route Path          | Purpose                     |
| -------------- | ------------------- | --------------------------- |
| users#index    | /users              | display a list of all users |
| users#new      | /users/new          | create a new user           |
| users#show     | /users/:id          | display a specific user     |
| users#edit     | /users/:id/edit     | edit a specific user        |
| users#delete   | /users/:id/delete   | delete a specific user      |
| users#mycustom | /users/:id/mycustom | depends on how you define   |

## Fields

| Field     | Description        | Type               | Default value | Sample value |
| --------- | ------------------ | ------------------ | ------------- | ------------ |
| name      | resource name      | string             | -             | "users"      |
| singular  | singular/plural    | boolean            | false         | false        |
| authority | permission control | Array\<string>     | -             | ["admin"]    |
| views     | pages              | { [string]: View } | -             | -            |

- **singular** - affect the **route path**
- **authority** - inherited by all **views**

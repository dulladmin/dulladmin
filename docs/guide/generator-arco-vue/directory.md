---
title: Directory Structure
---

# Directory Structure

## root

| Name            | Purpose                                  |
| --------------- | ---------------------------------------- |
| bin             | wrapper scripts around executables       |
| config          | vite config files                        |
| dist            | build artifacts                          |
| mock            | mock server (based on express)           |
| public          | pure static assets (directly copied)     |
| src             | source code                              |
| .env            | ENV, loaded in all cases                 |
| .env.local      | ENV, loaded in all cases, ignored by git |
| .eslintignore   | eslint ignore rules                      |
| .eslintrc.js    | eslint config                            |
| .prettierignore | prettier ignore rules                    |
| .prettierrc.js  | prettier config                          |
| index.html      | index.html template                      |
| package.json    | build scripts and dependencies           |
| tsconfig.json   | tsc config                               |
| yarn.lock       | yarn lockfile                            |

## src

| Name       | Purpose                           |
| ---------- | --------------------------------- |
| api        | request interface                 |
| asserts    | module assets (processed by vite) |
| components | global ui components              |
| config     | app config                        |
| directive  | instruction set                   |
| hooks      | global hooks                      |
| layouts    | layout                            |
| locale     | internationalized language pack   |
| router     | routing configuration             |
| store      | global state management           |
| utils      | tool libraries                    |
| views      | page template                     |
| App.vue    | main app component                |
| main.ts    | app entry file                    |

### codegen

**resource file**

```yml
# resources/users.yml
name: 'users'
views:
  index:
    table:
      items:
        - { name: 'id', type: 'int64' }
```

**generated files**

- **api/modules/users/index/self-block.ts** - request interface
- **assets/style/modules/users.less** - stylesheet
- **router/routes/modules/users.ts** - routing configuration
- **views/modules/users/index/index.vue** - page template
- **views/modules/users/index/components/self-block.vue** - component template
- **locale/en-US/modules/users.json** - i18n

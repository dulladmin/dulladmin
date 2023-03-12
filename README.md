# DullAdmin

## Introduction

**DullAdmin** is a specification for building admin panel.

Building admin panel usually involves writing a lot of redundant CRUD logic, implementing features
like sorters, searchers can be tedious. This specification define the request interface and data
presentation, and let the code generator handle all the rest stuff.

Guide: [dulladmin.github.io/dulladmin/guide/](https://dulladmin.github.io/dulladmin/guide/)

## Features

- **RESTful** - Use RESTful design style, includes API, views, etc.
- **Code Generator** - Use DULLADMIN_FILES to define the request interface and data presentation.
- **Block Components** - Build view by combining table, descriptions, form, chart components.
- **Data Renderer** - Automatic render element according to value type.
- **Permission Control** - Role-based access control.
- **I18n** - Built-in internationalized multi-language solution.

## License

This is an open source project by [DullAdmin Team](https://github.com/dulladmin) that is licensed
under [GPL-3.0](./LICENSE). We reserves the right to change the license of future releases.

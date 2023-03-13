---
title: Introduction
---

# Introduction

**DullAdmin** is a specification for building admin panel.

Building admin panel usually involves writing a lot of redundant CRUD logic, implementing features
like sorters, searchers can be tedious. This specification define the request interface and data
presentation, and let the code generator handle all the rest stuff. E.g.

**DullAdmin Resource File:**

@[code](@/files/guide/README-resources-users.yml)

**Generated WebUI:**

![generated webui](/images/guide/README-generated-webui.png)

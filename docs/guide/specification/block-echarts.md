---
title: ECharts Block
---

# ECharts Block

## Definition File

```yml
name: 'dashboard'
singular: true
views:
  show:
    # <EChartsBlock @name="self">
    echarts: {}
```

## Fields

none.

## Request Interface

### GET

- **GET /dashboard/show/self**
- **request**

```ts
interface GetRequest {}
```

- **response data**

```ts
// EChartsOption: https://echarts.apache.org/en/option.html
interface GetResponse {
  chart: EChartsOption
}
```

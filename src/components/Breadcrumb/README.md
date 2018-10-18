---
category: Components
type: Navigation
title: Breadcrumb
subtitle: 面包屑
---

# Breadcrumb 面包屑

---

## API

### Breadcrumb

| 参数      | 说明         | 类型   | 默认值 |
|-----------|------------|--------|--------|
|separator | 分隔符 | String / Element String | / |
|className | 自定义类 | String | - |

### BreadcrumbItem

| 参数      | 说明         | 类型   | 默认值 |
|-----------|------------|--------|--------|
|to | 链接，不传默认没有链接 | string / object | - |
|isNewPage | 是否在新窗口打开链接，不传默认在当前窗口打开 | Boolean | false |
|replace | 路由跳转时，开启 replace 将不会向 history 添加新记录 | Boolean | false |

<style>
    td{line-height:2em;}
</style>
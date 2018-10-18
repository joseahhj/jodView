---
type: Layout
title: Layout
subtitle: 布局
---

# Layout 布局

用于布局的容器组件，方便快速搭建页面的基本结构：

- `<j-layout>`：外层容器。

- `<j-header>`：顶栏容器。

- `<j-sider>`：侧边栏容器。

- `<j-content>`：主要区域容器。

- `<j-footer>`：底栏容器。

---

## API

### layout、content and footer props

| 属性      | 说明                   | 类型       | 默认值 |
|-----------|-------------------------|------------|--------|
| className    | 自定义样式名称 |    String     | -     |
| prefixCls | 样式前缀 | String |'jad' |

### Header props

| 属性      | 说明                   | 类型       | 默认值 |
|-----------|-------------------------|------------|--------|
| isFixed    | 是否固定 position:fixed |    Boolean     | false     |
| height    | 高度 |    String/Number     | 60px     |
| prefixCls | 样式前缀 | String | 'jad' |
| className    | 自定义样式名称 |    String     | -     |

### sider props

| 属性      | 说明                   | 类型       | 默认值 |
|-----------|-------------------------|------------|--------|
| isFixed    | 是否固定 position:fixed |    Boolean     | false     |
| width    | 宽度 |    String/Number     | 200    |
|float| 位置在容器的左边或右边 |    String     | left    |
| prefixCls | 样式前缀 | String | 'jad' |
| className    | 自定义样式名称 |    String     | -     |



---
type: Layout
title: Grid
subtitle: 栅格
---
# Grid 栅格

我们采用了24栅格系统，将区域进行24等分，这样可以轻松应对大部分布局问题。使用栅格系统进行网页布局，可以使页面排版美观、舒适。

我们定义了两个概念，行row和列col，具体使用方法如下：

1）使用row在水平方向创建一行

2）将一组col插入在row中

3）在每个col中，键入自己的内容

4）通过设置col的span参数，指定跨越的范围，其范围是1到24

5）每个row中的col总和应该为24

6) 可以在最外面包一层div,样式`jad-container` 来实现响应式布局，可选


---

## API

### Row props

| 属性      | 说明                   | 类型       | 默认值 |
|-----------|-------------------------|------------|--------|
| gutter    | 栅格间距，单位 px，左右平分|    Number     | 0     |
| type      |布局模式，可选值为flex或不选，在现代浏览器下有效  | String  | -     |
| align    | flex 布局下的垂直对齐方式，可选值为top、middle、bottom | String |- |
| justify |flex布局下的水平排列方式，可选值为start、end、center、space-around、space-between | String |- |
| className | 自定义的class名称|    String     | -     |
|prefixCls | 样式前缀 | String |'jad-row' |

### Col props

| 属性      | 说明                   | 类型       | 默认值 |
|-----------|-------------------------|------------|--------|
| span    | 栅格的占位格数，可选值为1~24的整数|Number \string    | 0 |
|order |栅格的顺序，在flex布局模式下有效  |Number \ String |-|
|offset |栅格左侧的间隔格数，间隔内不可以有栅格 | Number \ String |-|
|push   |栅格向右移动格数  |  Number \String |-|
|pull   |栅格向左移动格数  |  Number \String |-|
|className|自定义的class名称 |String | -|
|prefixCls | 样式前缀 | String |'jad-col' |
|xs  |<768px 响应式栅格，可为栅格数或一个包含其他属性的对象  |Number \ Object |-|
|sm  |≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象  |Number\ Object |-|
|md  |≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象  |Number\ Object |-|
|lg  |≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 |Number \ Object |-|
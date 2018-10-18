---
type: Notice
title: Badge
subtitle: 徽标
---
# Badge 徽标

出现在按钮、图标旁的数字或状态标记。


---
## API
### Badge props

| 参数      | 说明                            | 类型                     |可选值               | 默认值     |
|-----------|--------------------------------|---------------------|------------------------|-----------|
| value | 徽标上显示的内容，可以是文本也可以是数字，数字为0时徽标不显示 | String /Number | - | - |
| type | 类型 | String | info/success/error/warn | - | 
| max   | 允许的最大值，超出则用+显示（例如99+）。特殊说明： 使用max属性时，value需要设置Number类型| Number | - | - |
| isVisible | 是否显示 | Boolean | true/false | true |
| className | 自定义的class名称 | String | - | - |
| size | 大小 | String | small/large | large | 
| isDot | 展示为小红点的形式，不显示具体数字，优先展示小红点 | Boolean | true/false | false | 



### Badge slot

| slot      | 说明                            | 
|-----------|---------------------------------|
| 匿名插槽     | 自定义按钮，图标等               |      | 

<style lang='scss' scoped>
	.jad-badge + .jad-badge{
		margin:0 0 0 20px;
	}
</style>
---
type: Data
title: Tree
subtitle: 树形控件
---
# Tree 树形控件
用清晰的层级结构展示信息，可展开或折叠。

## 如何调用

全局使用：`j-tree`
局部注册：`jad.Tree`

---

## API
### Tree props

| 参数      | 说明                            | 类型                     | 默认值     |
|-----------|--------------------------------|-------------------------|-----------|
| data     | 生成Tree的数据	                   | Array                   | []        |
| filter   | 筛选Tree的数据,需结合filterNodeMethod使用 | String                  | -         |
| filterNodeMethod | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏 | Function | [value, node] |
| showCheckbox | 是否显示复选框                | Boolean                 | true      |
| showCheckAll | 是否显示全选复选框             | Boolean                 | true      |
| defaultCheckedKeys| 默认勾选的节点ID         | Array                   | []        |
| checkedKeys | 勾选的节点ID                  | Array                   |   -       |
| disabledKeys | 禁止勾选的节点ID              | Array                   |   []      |
| containDisabledKeys | on-check-change事件nodeKeys是否包含禁止勾选的节点ID | Boolean | false |
| defaultExpandedKeys | 默认展开的节点ID       | Array                   | []        |
| expandedKeys | 展开的节点ID                 | Array                   |   -       |
| defaultExpandAll | 默认展开全部节点           | Boolean                 | false     |
| autoExpandParent | 展开子节点的时候是否自动展开父节点 | Boolean            | true      |
| selectedKeys | 选择的节点ID                   | Array                   |   -       |
| multiSelect | 是否可以多选                   | Boolean                 | true      |

### Tree events

| 参数       | 说明                            | 类型                     | 返回值     |
|-----------|--------------------------------|--------------------------|-----------|
| on-check-change | 点击复选框时触发            | Function                 | [nodes, nodeKeys, node] |
| on-expand-change | 节点展开或关闭时触发        | Function                 | [nodes, nodeKeys, node] |
| on-select-change | 点击节点内容时触发          | Function                 | [nodes, nodeKeys, node] |
---
order: 5
---
## 筛选节点
结合filter和filterNodeMethod筛选Tree节点。

````html
<template>
<j-input v-model="filter" length="medium"></j-input>
<j-tree 
    :data="data" 
    :filter="filter" 
    :filterNodeMethod="filterNodeMethod" 
    :defaultCheckedKeys="defaultCheckedKeys" 
    :checkedKeys="checkedKeys" 
    :disabledKeys="disabledKeys" 
    :containDisabledKeys="false" 
    :defaultExpandedKeys="defaultExpandedKeys" 
    :expandedKeys="expandedKeys" 
    :autoExpandParent="true" 
    :defaultExpandAll="true" 
    :selectedKeys="selectedKeys" 
    :multiSelect="false" 
></j-tree>
</template>
<script>
    export default {
        data() {
            return {
                defaultCheckedKeys: [11, 121, 122],
                defaultExpandedKeys: [12, 21, 1],
                defaultSelectedKeys: [12, 21, 1],
                checkedKeys: [111],
                expandedKeys: [111],
                selectedKeys: [111],
                disabledKeys: [111],
                filter: '',
                data: [
                    {
                        id: 1,
                        title: '一级1',
                        expand: true,
                        children: [
                            {
                                id: 11,
                                title: '二级11',
                                expand: true,
                                disabled: true,
                                selected: true,
                                children: [
                                    {
                                        id: 111,
                                        title: '三级111',
                                        expand: true,
                                        children: [
                                            {
                                                id: 1111,
                                                title: '四级1111'
                                            },
                                            {
                                                id: 1112,
                                                title: '四级1112'
                                            },
                                            {
                                                id: 1113,
                                                title: '四级1113'
                                            }
                                        ]
                                    },
                                    {
                                        id: 112,
                                        title: '三级112'
                                    },
                                    {
                                        id: 113,
                                        title: '三级113'
                                    }
                                ]
                            },
                            {
                                id: 12,
                                title: '二级12',
                                children: [
                                    {
                                        id: 121,
                                        title: '三级121'
                                    },
                                    {
                                        id: 122,
                                        title: '三级122'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        title: '一级2',
                        children: [
                            {
                                id: 21,
                                title: '二级21',
                                children: [
                                    {
                                        id: 211,
                                        title: '三级211'
                                    },
                                    {
                                        id: 212,
                                        title: '三级212'
                                    },
                                    {
                                        id: 213,
                                        title: '三级213'
                                    }
                                ]
                            },
                            {
                                id: 22,
                                title: '二级22',
                                children: [
                                    {
                                        id: 221,
                                        title: '三级221'
                                    },
                                    {
                                        id: 222,
                                        title: '三级222'
                                    },
                                    {
                                        id: 223,
                                        title: '三级223'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            onChange(value) {
                this.filter = value;
            },
            filterNodeMethod(value, node) {
                if (!value) return true;
                return node.title.indexOf(value) !== -1;
            }
        }
    }
</script>
````

---
order: 4
---
## 可选择节点
可选择Tree节点，设置multiSelect可决定是否多选。

````html
<template>
<j-tree 
    :data="data" 
    :showCheckbox="false" 
    :expandedKeys="expandedKeys" 
    :autoExpandParent="true" 
    :defaultSelectedKeys="defaultSelectedKeys" 
    :selectedKeys="selectedKeys" 
    :multiSelect="false" 
    @on-select-change="onSelectChange" 
></j-tree>
</template>
<script>
    export default {
        data() {
            return {
                defaultSelectedKeys: [12, 21, 1],
                expandedKeys: [111],
                selectedKeys: [111],
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
            onSelectChange(nodes, nodeKeys, node) {
                console.log('select');
                console.log(nodes,'nodes');
                console.log(nodeKeys,'nodeKeys');
                console.log(node,'node');
            }
        }
    }
</script>
````

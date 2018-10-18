<template>
    <div :class="treeClassObj">
        <div v-if="showCheckbox && showCheckAll">
            <i-checkbox 
                :value="checkedAll" 
                :indeterminate="checkedSome"
                @on-change="checkAll" >
                全选
            </i-checkbox>
        </div>
        <ul>
            <li>
                <i-tree-node 
                    v-for="item in dataTree" 
                    :key="item.id"
                    :data="item"
                    :show-checkbox="showCheckbox">
                </i-tree-node>
            </li>
        </ul>
    </div>
</template>

<script>
import EventMixin from '../../mixins/eventMixin'
import {Checkbox} from '../Checkbox'
import TreeNode from './TreeNode'
export default {
    name: 'Tree',
    mixins: [EventMixin],
    props: {
        data: {
            type: Array,
            default() {
                return []
            }
        },
        filter: {
            type: String
        },
        filterNodeMethod: {
            type: Function
        },
        showCheckbox: {
            type: Boolean,
            default: true
        },
        showCheckAll: {
            type: Boolean,
            default: true
        },
        defaultCheckedKeys: {
            type: Array,
            default() {
                return []
            }
        },
        defaultExpandedKeys: {
            type: Array
        },
        defaultExpandAll: {
            type: Boolean,
            default: false
        },
        autoExpandParent: {
            type: Boolean,
            default: false
        },
        multiSelect: {
            type: Boolean,
            default: false
        },
        checkedKeys: {
            type: Array
        },
        selectedKeys: {
            type: Array
        },
        expandedKeys: {
            type: Array
        },
        disabledKeys: {
            type: Array,
            default() {
                return []
            }
        },
        containDisabledKeys: {
            type: Boolean,
            default: false
        },
        className: {
            type: String,
            default: ''
        },
        prefixCls: {
            type: String,
            default: 'jad'
        }
    },
    data() {
        return {
            dataTree: JSON.parse(JSON.stringify(this.data)),
            flatTree: [],
            checkedAll: false,
            checkedSome: false
        }
    },
    computed: {
        treeClassObj() {
            let {
                prefixCls, 
                className
            } = this;
            return [
                `${prefixCls}-tree`,
                {
                    [`${className}`]: !!className
                }
            ];
        }
    },
    components: {
        iCheckbox: Checkbox,
        iTreeNode: TreeNode
    },
    watch: {
        data: {
            handler(newData){
                this.dataTree = JSON.parse(JSON.stringify(newData));
                this.flatTree = this.getFlatTree();
                let {
                    defaultCheckedKeys,
                    defaultSelectedKeys,
                    defaultExpandedKeys,
                    checkedKeys,
                    selectedKeys,
                    expandedKeys
                } = this;
                this.setCheckedKeys(checkedKeys ? checkedKeys : defaultCheckedKeys);
                this.setSelectedKeys(1, selectedKeys ? selectedKeys : defaultSelectedKeys);
                this.setExpandedKeys(expandedKeys ? expandedKeys : defaultExpandedKeys);
                this.filterData();
            },
            deep: true
        },
        filter: {
            handler(){
                this.filterData(true);
            }
        },
        checkedKeys: {
            handler(newArr){
                this.setCheckedKeys(newArr);
            },
            deep: true
        },
        selectedKeys: {
            handler(newArr){
                this.setSelectedKeys(1, newArr);
            },
            deep: true
        },
        expandedKeys: {
            handler(newArr){
                this.setExpandedKeys(newArr);
            },
            deep: true
        },
        disabledKeys: {
            handler(newArr){
                this.setDisabledKeys(newArr);
            },
            deep: true
        }
    },
    methods: {
        getFlatTree() {
            let {
                defaultExpandAll,
                disabledKeys
            } = this;
            let dataTree = this.dataTree || [];
            let flatTree = [];
            let _this = this;
            /**
              *[flattenChildren 平级化子节点]
              * @param  {[Array]} nodeList     [description]
              * @param  {[Object]} parent [description]
              * @return {[Array]}           [返回值]
              */
            function flattenChildren(nodeList, parent) {
                nodeList.forEach((node, index) => {
                    node.parent = parent || null;
                    node.locate = parent ? parent.locate + '-' + index : index;
                    _this.$set(node, 'visible', true);
                    _this.$set(node, 'expand', defaultExpandAll);
                    _this.$set(node, 'disabled', disabledKeys.indexOf(node.id) > -1);
                    flatTree.push(node);

                    node.children && flattenChildren(node.children, node);
                });
            }
            flattenChildren(dataTree);
            return flatTree;
        },

        filterData(flag) {
            let _this = this;
            let {
                flatTree,
                filter,
                filterNodeMethod
            } = this;

            /**
              *[filterNodes 筛选节点]
              * @param  {[Object]} node     [description]
              * @return {[Boolean]}         [返回值]
              */
            function filterNodes(node) {
                let visible = node.visible || false;
                node.children && node.children.forEach((childNode) => {
                    visible = filterNodes(childNode) || visible;
                });
                return visible;
            }
            if (typeof(filterNodeMethod) === 'function') {
                flatTree.forEach((node) => {
                    node.visible = filterNodeMethod(filter, node);
                });
                flatTree.forEach((node) => {
                    let visible = filterNodes(node);
                    _this.$set(node, 'visible', visible);
                    flag && _this.$set(node, 'expand', visible);
                });
            }
        },

        updateData(node) {
            node && this.updateParent(node);
            node && this.updateChildren(node, node.checked);
        },
        updateParent(node) {
            if (node.parent) {
                let brothers = node.parent.children;
                let count = 0;
                brothers.forEach(brother => brother.checked && count++);
                if (count >= brothers.length) {
                    this.$set(node.parent, 'indeterminate', false);
                    this.$set(node.parent, 'checked', true);
                } else if (count > 0) {
                    this.$set(node.parent, 'indeterminate', true);
                    this.$set(node.parent, 'checked', false);
                } else {
                    this.$set(node.parent, 'indeterminate', node.indeterminate || false);
                    this.$set(node.parent, 'checked', false);
                }

                this.updateParent(node.parent);
            }
        },
        updateChildren(node, checked) {
            this.$set(node, 'indeterminate', false);
            if (node.children && node.children.length) {
                let children = node.children;
                children.forEach(item => {
                    this.$set(item, 'checked', checked);
                    this.$set(item, 'indeterminate', false);
                    
                    this.updateChildren(item, checked);
                });
            }
        },
        getCheckedNodes() {
            let {
                containDisabledKeys
            } = this;
            let nodeKeys = [];
            let nodes = this.flatTree.filter(node => {
                // if (node.checked && !node.disabled) {
                if (node.checked) {
                    (containDisabledKeys || !node.disabled) && nodeKeys.push(node.id);
                    // if (containDisabledKeys) {
                    //     nodeKeys.push(node.id);
                    // } else {
                    //     if (!node.disabled) {
                    //         nodeKeys.push(node.id);
                    //     }
                    // }
                    return true;
                }
                return false;
            });
            return [nodes, nodeKeys];
        },
        setCheckedKeys(keys) {
            this.flatTree.forEach(item => {
                this.$set(item, 'checked', false);
                this.$set(item, 'indeterminate', false);
            });
            this.flatTree.forEach(item => {
                if (keys.indexOf(item.id) > -1) {
                    this.$set(item, 'checked', true);
                    this.$set(item, 'indeterminate', false);
                    this.updateData(item);
                }
            });
            this.judgeCheckedAll();
        },
        
        checkAll(checked) {
            this.setAllNodesCheck(checked);
        },
        setAllNodesCheck(checked) {
            this.flatTree.forEach(item => {
                this.$set(item, 'checked', checked);
                this.$set(item, 'indeterminate', false);
            });
            this.checkedAll = checked;
            this.checkedSome = false;
            this.$emit('on-check-change', ...(this.getCheckedNodes()));
        },
        judgeCheckedAll() {
            let {
                flatTree,
                containDisabledKeys
            } = this;
            let checkedNodes = this.getCheckedNodes();
            let checkedNodeIds = checkedNodes[1];
            let checkedAll = true;
            let checkedSome = false;
            if (!flatTree.length) {
                this.checkedAll = false;
                this.checkedSome = false;
                return;
            }
            flatTree.forEach((item)=>{
                if (containDisabledKeys) {
                    if (checkedNodeIds.indexOf(item.id) > -1) {
                        checkedSome = true;
                    } else {
                        checkedAll = false;
                    }
                } else if (!item.disabled) {
                    if (checkedNodeIds.indexOf(item.id) > -1) {
                        checkedSome = true;
                    } else {
                        checkedAll = false;
                    }
                }
                // // if (!item.disabled) {
                //     if (checkedNodeIds.indexOf(item.id) > -1) {
                //         checkedSome = true;
                //     } else {
                //         checkedAll = false;
                //     }
                // // }
            });
            this.checkedAll = checkedAll;
            this.checkedSome = checkedAll ? false : checkedSome;
        },

        setExpandedKeys(keys) {
            let {
                autoExpandParent
            } = this;
            if (keys) {
                this.flatTree.forEach(item => {
                    this.$set(item, 'expand', false);
                });
                this.flatTree.forEach(item => {
                    if (keys.indexOf(item.id) > -1) {
                        this.$set(item, 'expand', true);
                        autoExpandParent && this.expandParent(item);
                    }
                });
            }
        },
        expandParent(node) {
            if (node.parent) {
                this.$set(node.parent, 'expand', true);
                this.expandParent(node.parent);
            }
        },
        getExpandNodes() {
            let nodeKeys = [];
            let nodes = this.flatTree.filter(node => {
                if (node.expand) {
                    nodeKeys.push(node.id);
                    return true;
                }
                return false;
            });
            return [nodes, nodeKeys];
        },

        setSelectedKeys(eventType, keys) {
            // eventType: 1.set 2.click
            let {
                multiSelect
            } = this;
            keys = keys || [];
            if (eventType == 1) {
                this.flatTree.forEach(item => {
                    this.$set(item, 'selected', keys.indexOf(item.id) > -1);
                });
            } else if (eventType == 2) {
                this.flatTree.forEach(item => {
                    if (keys.indexOf(item.id) > -1) {
                        this.$set(item, 'selected', !item.selected);
                    } else {
                        !multiSelect && this.$set(item, 'selected', false);
                    }
                });
            }
        },
        getSelectedNodes() {
            let nodeKeys = [];
            let nodes = this.flatTree.filter(node => {
                if (node.selected) {
                    nodeKeys.push(node.id);
                    return true;
                }
                return false;
            });
            return [nodes, nodeKeys];
        },

        setDisabledKeys(keys) {
            this.flatTree.forEach(item => {
                this.$set(item, 'disabled', keys.indexOf(item.id) > -1);
            });
        }
    },
    
    created(){
        this.flatTree = this.getFlatTree();
    },
    mounted() {
        let {
            defaultCheckedKeys,
            defaultSelectedKeys,
            defaultExpandedKeys,
            checkedKeys,
            selectedKeys,
            expandedKeys
        } = this;
        this.setCheckedKeys(checkedKeys ? checkedKeys : defaultCheckedKeys);
        this.setSelectedKeys(1, selectedKeys ? selectedKeys : defaultSelectedKeys);
        this.setExpandedKeys(expandedKeys ? expandedKeys : defaultExpandedKeys);
        this.filterData();

        this.$on('checked', (node) => {
            this.updateData(node);
            this.judgeCheckedAll();
        });
        this.$on('on-checked', (node) => {
            this.$emit('on-check-change', ...(this.getCheckedNodes()), node);
        });
        this.$on('expand', () => {});
        this.$on('on-expand', (node) => {
            this.$emit('on-expand-change', ...(this.getExpandNodes()), node);
        });
        this.$on('selected', (node) => {
            this.setSelectedKeys(2, [node.id]);
        });
        this.$on('on-selected', (node) => {
            let argu = [
                ...(this.getSelectedNodes()),
                node
            ];
            this.$emit('on-select-change', ...argu);
        });
    }
}
</script>
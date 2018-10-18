<template>
    <ul :class="treeNodeClassObj" v-show="data.visible" >
        <li>
            <div class="clearfix">
                <div style="float: left">
                    <i-checkbox 
                        v-if="showCheckbox"
                        v-model="data.checked"
                        :indeterminate="data.indeterminate"
                        @on-change="handleCheck"
                        :is-disabled="data.disabled">
                    </i-checkbox>
                </div>
                <div style="overflow: hidden">
                    <span :class="[prefixCls + '-tree-arrow']" @click="handleExpand" v-if="data.children && data.children.length">
                        <Icon :type="iconType" size="12"></Icon>
                    </span>
                    <span :class="treeNodeClassTitle" @click="handleSelect" >{{data.title}}</span>
                    
                </div>
            </div>
            
            <tree-node
                v-for="item in data.children"
                v-if="data.expand" 
                :data="item"
                :key="item.id"
                :show-checkbox="showCheckbox" >
            </tree-node>
        </li>
    </ul>
</template>

<script>
import EventMixin from '../../mixins/eventMixin'
import {Checkbox} from '../Checkbox'

import Icon from '../Icon'
export default {
    name: 'TreeNode',
    mixins: [EventMixin],
    props: {
        data: {
            type: Object,
            default() {
                return {}
            }
        },
        showCheckbox: {
            type: Boolean,
            default: true
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
    computed: {
        treeNodeClassObj() {
            let {
                prefixCls, 
                className
            } = this;
            return [
                `${prefixCls}-tree-node`,
                {
                    [`${className}`]: !!className
                }
            ];
        },
        treeNodeClassTitle() {
            let {
                prefixCls,
                data
            } = this;
            return [
                `${prefixCls}-tree-title`,
                {
                    [`${prefixCls}-tree-title-selected`]: !!data.selected
                }
            ];
        },
        iconType() {
            return this.data.expand ? 'angle-down' : 'angle-right';
        }
    },
    components: {
        iCheckbox: Checkbox,
        Icon
    },
    methods: {
        handleExpand() {
            this.$set(this.data, 'expand', !this.data.expand);
            this.dispatch('Tree', 'expand', this.data);
            this.dispatch('Tree', 'on-expand', this.data);
        },
        handleSelect() {
            this.dispatch('Tree', 'selected', this.data);
            this.dispatch('Tree', 'on-selected', this.data);
        },
        handleCheck() {
            let checked = this.data.checked;
            this.$set(this.data, 'checked', checked);
            this.$set(this.data, 'indeterminate', false);
            this.dispatch('Tree', 'checked', this.data);
            this.dispatch('Tree', 'on-checked', this.data);
        }
    }
}
</script>
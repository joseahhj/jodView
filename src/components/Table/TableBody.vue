<template>
    <table :style="styleObject" :class="bodyClasses">
        <table-colgroup v-if="data.length > 0"
            :prefix-cls="prefixCls"
            :columns="columns"
            :columns-width="columnsWidth">
        </table-colgroup>
        <tbody>
            <template v-for="(row, index) in data">
                <tr :key="('tr'+index)"
                    :class="[{[prefixCls + '-tr-hover']: !!row._isHover}]"
                    @mouseenter="mouseEnterHandler(index)"
                    @mouseleave="mouseLeaveHandler(index)">
                    <td 
                        v-if="rowSelection.type && rowSelection.type == 'checkbox'"
                            :class="[prefixCls + '-selection']">
                        <i-checkbox 
                            @on-change="onCheckHandler($event, row)" 
                            :value="Boolean(~checkedKeys.indexOf(row[rowKey]))"
                            :is-disabled="Boolean(rowSelection.getCheckboxProps && rowSelection.getCheckboxProps.disabled(row))"
                            :name="rowSelection.name">
                        </i-checkbox>
                    </td>
                    <td 
                        v-if="rowSelection.type && rowSelection.type == 'radio'"
                        :class="[prefixCls + '-selection']">
                        <i-radio 
                            @on-change="onRadioHandler($event, row)"
                            :label="row[rowKey]"
                            text=""
                            :value="checkedKeys && checkedKeys[0]"
                            :is-disabled="Boolean(rowSelection.getCheckboxProps && rowSelection.getCheckboxProps.disabled(row))"
                            :name="rowSelection.name">
                        </i-radio>
                    </td>
                    <td 
                        v-if="rowSelection.type && rowSelection.type == 'expand'"
                        :class="[prefixCls + '-selection', prefixCls + '-expand-selection']"
                        @click="expandClickHandler(row)">
                        <Icon type="angle-right" v-if="!row['_expand']"></Icon>
                        <Icon type="angle-down" v-else></Icon>
                    </td>
                    <slot name="bodyDetail" :row="row" :rowIndex="index"></slot>
                </tr>
                <tr
                    v-if="rowSelection.type && rowSelection.type == 'expand' && row['_expand']"
                    class="[prefixCls + '-expand-cell']">
                    <td :colspan="columns.length + 1">
                        <slot name="expandDetail" :row="row" :rowIndex="index"></slot>
                    </td>
                </tr>
            </template>
            <template v-if="data.length <= 0">
                <tr>
                    <td>
                        <span v-html="noDataText" v-if="noDataText"></span>
                        <slot name="bodyEmptyDataPanel" v-else>暂无数据</slot>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>
<script>
    import TableColgroup from './TableColgroup.vue';
    import {Checkbox} from '../Checkbox';
    import {Radio} from '../Radio';
    import Icon from '../Icon';

    export default {
        name: 'TableBody',
        props: {
            prefixCls: {
                type: String
            },
            columns: {
                type: Array,
                default() {
                    return []
                }
            },
            rowSelection: {
                type: Object,
                default() {
                    return {}
                }
            },
            columnsWidth: {
                type: Object,
                default() {
                    return {}
                }
            },
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            checkedKeys: {
                type: Array,
                default() {
                    return []
                }
            },
            rowKey: {
                type: String
            },
            styleObject: {
                type: Object,
                default() {
                    return {}
                }
            },
            noDataText: {
                type: String
            }
        },
        data() {
            return {
                styles: {}
            };
        },
        computed: {
            bodyClasses() {
                return {
                    [`${this.prefixCls}-content-nodata`]: !this.data.length
                };
            }
        },
        components: {
            TableColgroup,
            Icon,
            iCheckbox: Checkbox, 
            iRadio: Radio,
        },
        methods: {
            // checkbox 单选事件
            onCheckHandler(checked, row) {
                this.$parent.onCheckHandler(checked, row);
            },

            // radio单选事件
            onRadioHandler(checked, row) {
                this.$parent.onRadioHandler(checked, row);
            },

            // expand 展开事件
            expandClickHandler(row) {
                row['_expand'] = !row['_expand'];
                this.$forceUpdate();
            },

            // 鼠标移入事件 hover 为减少不必要的刷新，只在左右侧固定时生效
            mouseEnterHandler(index) {
                this.$parent.mouseEnterHandler(index);
            },

            // 鼠标移出事件 hover 为减少不必要的刷新，只在左右侧固定时生效
            mouseLeaveHandler(index) {
                this.$parent.mouseLeaveHandler(index);
            }
        },
        mounted() {
        },
    };
</script>

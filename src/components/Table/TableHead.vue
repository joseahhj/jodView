<template>
    <table :style="styleObject">
        <table-colgroup
            :prefix-cls="prefixCls"
            :columns="columns"
            :columns-width="columnsWidth">
        </table-colgroup>
        <thead>
            <tr>
                <th 
                    v-if="rowSelection.type && rowSelection.type == 'checkbox'"
                    :class="[prefixCls + '-selection']">
                    <i-checkbox 
                        @on-change="onCheckAllHandler"
                        :value="isCheckedAll"
                        :is-disabled="!choosableRows.length">
                    </i-checkbox>
                </th>
                <th 
                    v-if="rowSelection.type && (rowSelection.type == 'radio' || rowSelection.type == 'expand')"></th>
                <slot name="headDetail"></slot>
            </tr>
        </thead>
    </table>
</template>
<script>
    import TableColgroup from './TableColgroup.vue';
    import {Checkbox} from '../Checkbox';

    export default {
        name: 'TableHead',
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
            choosableCheckedRows: {
                type: Array,
                default() {
                    return []
                }
            },
            choosableRows: {
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
            styleObject: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
            };
        },
        computed: {
            isCheckedAll() {
                return (this.choosableRows.length > 0 
                    && this.choosableRows.length === this.choosableCheckedRows.length) 
                    || false; 
            }
        },
        components: {
            TableColgroup,
            iCheckbox: Checkbox, 
        },
        methods: {
            // checkbox 全选事件
            onCheckAllHandler(checked) {
                this.$parent.onCheckAllHandler(checked);
            },
        },
        mounted() {
        },
    };
</script>

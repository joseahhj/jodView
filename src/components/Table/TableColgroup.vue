<template>
    <colgroup>
        <col v-if="$parent.rowSelection.type" width="52">
        </col>
        <col 
            v-for="(column, index) in columns" 
            :key="index"
            :width="setCellWidth(column, index)" >
        </col>
    </colgroup>
</template>
<script>
    export default {
        name: 'TableColgroup',
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
            columnsWidth: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            /* 设置cell宽度 */
            setCellWidth(column, index) {
                let columnWidth = this.columnsWidth[index];
                if (column.width) return column.width;

                if (columnWidth && columnWidth.width) return columnWidth.width;

                return false;
            },
        }
    };
</script>

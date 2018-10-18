<template>
    <div :class="wrapClasses" :style="styles" ref="table">
        <div
            v-for="(tableItem, tableIndex) in tableArray"
            :class="[{[prefixCls + '-fixed-left']: tableItem == 'left', [prefixCls + '-fixed-right']: tableItem == 'right'}]"
            :style="tableItem == 'left' ? leftStyle : (tableItem == 'right' ? rightStyle : {})"
            :key="tableIndex">
        <div :class="headerClasses"
            :ref="tableItem == 'left' ? 'leftHeader' : (tableItem == 'right' ? 'rightHeader' : 'header')"
            :style="headerFixedStyle">
            <table-head
                :prefix-cls="prefixCls"
                :columns="columnList"
                :row-selection="rowSelection"
                :choosable-rows="choosableRows"
                :choosable-checked-rows="choosableCheckedRows"
                :columns-width="columnsWidth"
                :style-object="tableStyle" >
                <template slot="headDetail">
                    <th v-for="(column, index) in columnList"
                        :key="index">
                        <slot :name="'header-'+column.key" :column="column" :columnIndex="index">
                            <span v-html="column.title"></span>
                        </slot>
                        <span :class="[prefixCls + '-sort']" v-if="column.sort && column.sort.enable">
                            <Icon
                                v-if="column.sort._order !== 'desc' && column.sort._order !== 'asc'"     
                                type="long-arrow-down" 
                                font-size="12" 
                                @click.native.stop="sortHandler(column, 'init')">
                            </Icon>
                            <Icon 
                                v-else
                                :style="{color: column.sort.activeColor || 'red'}" 
                                :type="column.sort._order == 'desc' ? 'long-arrow-down' : 'long-arrow-up'" 
                                font-size="12"
                                @click.native.stop="sortHandler(column)">
                            </Icon>
                        </span>
                        <span :class="[prefixCls + '-filter']" v-if="column.filter && column.filter.enable">
                            <i-popover 
                                trigger="custom" 
                                placement="bottom" 
                                theme="light"
                                :is-manual="column.key == currentFilterKey">
                                <span @click="filterIconHandler(column.key)">
                                    <Icon 
                                        type="filter" 
                                        font-size="12" 
                                        :style="{color: column.filter._isFiltered ? 'red' : ''}">
                                    </Icon>
                                </span>
                                <template slot="content">
                                    <div :class="[prefixCls + '-filter-content']" @mouseleave=closePopoverHandler()>
                                        <slot 
                                            :name="'filter-'+column.key" 
                                            :column="column" 
                                            :columnIndex="index" 
                                            v-if="column.filter.custom">
                                        </slot>
                                        <div :class="[prefixCls + '-filter-content-multiple']" v-else >
                                            <i-checkbox-group 
                                                v-model="column.filter._filterValue"
                                                is-vertical>
                                                <i-checkbox 
                                                    v-for="(item, itemIndex) in column.filter.list"
                                                    :label="item.value"
                                                    :key="itemIndex">
                                                    <span v-html="item.text"></span>
                                                </i-checkbox>
                                            </i-checkbox-group>
                                            <div 
                                                :class="[prefixCls + '-filter-content-footer']" >
                                                <i-button 
                                                    type="text" 
                                                    :is-disabled="!column.filter._filterValue || column.filter._filterValue.length <= 0"
                                                    @click="filterSelectHandler(column, index)">
                                                    筛选
                                                </i-button>
                                                <i-button type="text" @click="filterResetHandler(column, index)">重置</i-button>
                                            </div>
                                        </div>  
                                    </div>
                                </template>
                            </i-popover>
                        </span>
                    </th>
                </template>
            </table-head>
        </div>
        <div 
            :class="[prefixCls + '-content']" 
            :style="tableItem !== 'right' ? bodyStyle : rightBodyStyle"
            ref="body" 
            @scroll.stop="scrollHandler">
            <table-body
                :prefix-cls="prefixCls"
                :columns="columnList"
                :row-selection="rowSelection"
                :columns-width="columnsWidth" 
                :data="dataList"
                :checked-keys="checkedKeys"
                :row-key="rowKey"
                :style-object="tableStyle"
                :no-data-text="noDataText" >
                <template slot="bodyEmptyDataPanel" >
                    <slot name="emptyDataPanel"></slot>
                </template>
                <template slot="bodyDetail" slot-scope="props">
                    <template v-for="(column, index) in columnList">
                        {{getSpan(props.row, column, props.rowIndex, index)}}
                        <td
                            :key="index"
                            :rowspan="spanObjArray[props.rowIndex]['_' + column.key] && spanObjArray[props.rowIndex]['_' + column.key]['_rowspan']"
                            :colspan="spanObjArray[props.rowIndex]['_' + column.key] && spanObjArray[props.rowIndex]['_' + column.key]['_colspan']"
                            v-if="spanObjArray[props.rowIndex]['_' + column.key]
                                && spanObjArray[props.rowIndex]['_' + column.key]['_rowspan']
                                && spanObjArray[props.rowIndex]['_' + column.key]['_colspan']">
                            <div>
                                <template v-if="column.render">
                                    {{ column.render(props.row[column.key], props.row, props.rowIndex, column) }}
                                </template>
                                <template v-else>
                                    <slot :name="column.key" :row="props.row" :column="column" :rowIndex="props.rowIndex">
                                        <div v-html="props.row[column.key]"></div>
                                    </slot>
                                </template>
                            </div>
                        </td>
                    </template>
                </template>
                <template slot="expandDetail" slot-scope="props">
                    <slot name="expandDataPanel" :row="props.row" :rowIndex="props.rowIndex"></slot>
                </template>
            </table-body>
        </div>
        </div>
    </div>
</template>
<script>
    import TableHead from './TableHead.vue';
    import TableBody from './TableBody.vue';
    import {deepCopy} from '../../utils/assist';
    import {on, off} from '../../utils/dom';
    import Icon from '../Icon';
    import {Checkbox, CheckboxGroup} from '../Checkbox';
    import {Button} from '../Button';
    import Popover from '../Popover';

    export default {
        name: 'Table',
        props: {
            prefixCls: {
                type: String,
                default: 'jad-table'
            },
            className: {
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
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            rowKey: {
                type: String
            },
            defaultCheckedKeys: {
                type: Array,
                default() {
                    return []
                }
            },
            width: {
                type: Number
            },
            height: {
                type: Number
            },
            noDataText: {
                type: String
            },
            defaultSort: {
                type: Object,
                default() {
                    return {}
                }
            },
            customThreshold: {
                type: Number,
                default: 0
            },
            fixed: {
                type: Boolean,
                default: false
            },
            spanMethod: {
                type: Function
            }
        },
        data() {
            return {
                tableArray: ['default'], //表格数量
                columnsWidth: {},
                columnList: [],
                dataList: deepCopy(this.data) || [],
                currentSort: deepCopy(this.defaultSort) || {},

                choosableCheckedRows: [],
                disabledCheckedKeys: [],
                checkedKeys: [],

                minColumnWidth: 80,
                tableWidth: 0,
                bodyHeight: 0,
                headerOffsetTop: 0,
                headerFixedStyle: {},
                currentFilterKey: null,
                spanObjArray: [],
                leftFixedColumns: [],
                rightFixedColumns: [],
                rightBodyStyle: {}
            };
        },
        computed: {
            wrapClasses() {
                let {prefixCls, className, leftFixedColumns, rightFixedColumns} = this;
            
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-fixed`]: (!!leftFixedColumns.length || !!rightFixedColumns.length),
                        [`${className}`]: !!className
                    }
                ]
            },
            headerClasses() {
                let {prefixCls, fixed} = this;

                return [
                    `${prefixCls}-header`,
                    {
                        // [`${prefixCls}-header-with-`]: !!height,
                        [`${prefixCls}-header-with-fixed-top`]: !!fixed
                    }
                ];
            },
            choosableRows() {
                let me = this;

                return me.rowSelection 
                    && (me.rowSelection.type == 'checkbox' || me.rowSelection.type == 'radio') 
                    ? (me.dataList && me.dataList.filter(
                        row => me.rowSelection
                                && (!me.rowSelection.getCheckboxProps
                                || !me.rowSelection.getCheckboxProps.disabled(row))
                    ) 
                        || [])
                    : me.dataList;
            },
            disabledCheckedRows() {

                let me = this;
                let disabledCheckedRowsArr = [];
                let disabledCheckedKeysArr = [];

                let disabledRows = me.dataList 
                    && me.dataList.filter(
                        row => me.rowSelection 
                            && me.rowSelection.getCheckboxProps 
                            && me.rowSelection.getCheckboxProps.disabled(row)
                    ) 
                    || [];

                disabledRows.forEach(function (row) {
                    ~me.defaultCheckedKeys.indexOf(row[me.rowKey]) 
                        ? (disabledCheckedRowsArr.push(row), disabledCheckedKeysArr.push(row[me.rowKey]))
                        : '';
                }); 

                me.disabledCheckedKeys = disabledCheckedKeysArr;

                return disabledCheckedRowsArr;
            },
            styles() {
                let style = {};

                if (this.height) style.height = `${this.height}px`;
                if (this.width) style.width = `${this.width}px`;

                return style;
            },
            tableStyle() {
                let style = {};

                if (this.tableWidth) style.width = `${this.tableWidth}px`;

                return style;
            },
            bodyStyle() {
                let style = {};

                if (this.bodyHeight) style.height = this.bodyHeight;

                return style;
            },
            leftStyle() {
                let {leftFixedColumns, columnsWidth, rowSelection} = this;
                let style = {};
                let width = 0;

                if (leftFixedColumns.length) {
                    leftFixedColumns.forEach(item => {
                        if (columnsWidth[item._index]) width += columnsWidth[item._index].width;
                    });

                    if (rowSelection.type
                        && (rowSelection.type == 'checkbox' || rowSelection.type == 'radio')) {
                        width = width + 51;
                    }
                    
                    style.width = `${width - 1}px`;
                }

                return style;
            },
            rightStyle() {
                let {rightFixedColumns, columnsWidth, $refs} = this;
                let style = {};
                let width = 0;

                if (rightFixedColumns.length) {
                    rightFixedColumns.forEach(item => {
                        if (columnsWidth[item._index]) { 
                            width += columnsWidth[item._index].width;
                        }

                    });

                    style.width = `${width}px`;

                    this.setRightFixedHeight();
                }
                if ($refs.table) style.height = `${$refs.table.offsetHeight}px`;

                return style;
            }

        },
        components: {
            TableHead,
            TableBody,
            Icon,
            iCheckbox: Checkbox, 
            iCheckboxGroup: CheckboxGroup,
            iButton: Button,
            iPopover: Popover,
        },
        watch: {
            columns: {
                handler: function () {
                    this.setColumns();
                    this.resizeHandler();
                },
                deep: true
            },
            defaultSort: {
                handler: function (val) {
                    this.currentSort = deepCopy(val) || {},
                    this.setColumns();
                },
                deep: true
            },
            data: {
                handler: function (val) {           
                    this.dataList = deepCopy(val) || [];
                    this.resetCheckbox();
                    this.initCheckedKeys();
                    this.resizeHandler();
                },
                deep: true
            },
            defaultCheckedKeys: {
                handler: function () { 
                    this.resetCheckbox();
                    this.initCheckedKeys();
                },
                deep: true
            }
        },
        methods: {
            // 右侧固定时，设置top 
            setRightFixedHeight() {
                let me = this;

                setTimeout(() => {
                    me.rightBodyStyle = {};
                    if (me.bodyHeight) me.rightBodyStyle.height = me.bodyHeight;
                    if (me.rightFixedColumns.length > 0 &&
                        me.$refs.header) me.rightBodyStyle.top = `${me.$refs.header[0].offsetHeight}px`;

                }, 0);
            },
            // cloumns 设置
            setColumns() {
                this.columnList = [];
                this.tableArray = ['default'];
                this.columns.forEach((column) => {
                    let newColumn = deepCopy(column);
                    let filter = newColumn.filter;
                    if (newColumn.sort && newColumn.sort.enable) { 
                        newColumn.sort._order = 'init';

                        if (this.currentSort && this.currentSort.columnKey == column.key) {
                            newColumn.sort._order = this.currentSort.order;
                            this.sortDataCallBack(newColumn);
                        }

                    }
                    if (filter && filter.enable) { 
                        filter._filterValue = [];
                        filter._isFiltered = false;
                    }

                    newColumn.fixed == 'right'
                        ? this.rightFixedColumns.push(newColumn)
                        : (newColumn.fixed == 'left' 
                            ? this.leftFixedColumns.push(newColumn)
                            : this.columnList.push(newColumn));
                    
                    // this.columnList.push(newColumn);
                });

                if (this.leftFixedColumns.length > 0) this.tableArray.push('left');
                if (this.rightFixedColumns.length > 0) this.tableArray.push('right');
                this.columnList = this.leftFixedColumns.concat(this.columnList).concat(this.rightFixedColumns);
            },

            // 计算cell宽度及bodyHeight。
            resizeHandler() {
                let tableWidth = this.width || this.$el.offsetWidth;

                let columnsWidth = {};
                let sumWidth = 0;
                let noWidthColumns = [];
                let hasMinOrMaxWidthColumns = [];

                this.columnList.forEach((column, index) => {
                    column.width 
                        ? (sumWidth += column.width) 
                        : (column.minWidth || column.maxWidth 
                            ? hasMinOrMaxWidthColumns.push(column)
                            : noWidthColumns.push(column));
                    column._index = index;
                    columnsWidth[index] = {width: column.width || 0};
                });

                let rowSelectionWidth = this.rowSelection.type ? 50 : 0;
                let usableWidth = tableWidth - sumWidth - rowSelectionWidth;
                let usableLength = noWidthColumns.length + hasMinOrMaxWidthColumns.length;
                let columnWidth = 0;

                hasMinOrMaxWidthColumns.forEach(column => {
                    columnWidth = usableWidth > 0 && usableLength > 0 ? parseInt(usableWidth / usableLength, 10) : 0;
                    let width = columnWidth || 0;
                    if (column.minWidth > columnWidth) {
                        width = column.minWidth;
                    } else if (column.maxWidth < columnWidth) {
                        width = column.maxWidth;
                    }

                    usableWidth -= width;
                    usableLength--;

                    columnsWidth[column._index].width = width;

                });

                if (noWidthColumns.length) {
                    columnWidth = usableWidth > 0 && usableLength > 0 ? parseInt(usableWidth / usableLength, 10) : 0;
                    noWidthColumns.forEach(column => {
                        columnsWidth[column._index].width = 
                            columnWidth < this.minColumnWidth ? this.minColumnWidth : columnWidth;
                    });
                }

                this.tableWidth = rowSelectionWidth - 1;
                for (let key in columnsWidth) {
                    this.tableWidth += columnsWidth[key].width;
                }

                if (this.tableWidth < tableWidth) this.tableWidth = tableWidth;
                  
                this.columnsWidth = columnsWidth;
                
                setTimeout(() => {
                    let offsetHeight = this.$refs.header[0].offsetHeight;
                    this.bodyHeight = this.height ? `${this.height - offsetHeight}px` : 0;
                }, 0);
            },

            // 重置table
            resetCheckbox() {
                this.checkedKeys = [];
                this.choosableCheckedRows = [];
                this.isCheckedAll = false;
            },

            // 获取选中的key集合
            getCheckedKeys() {
                let me = this;
                let choosableCheckedKeys = 
                    me.choosableCheckedRows.map(row => { return row[me.rowKey]; }) || [];

                return choosableCheckedKeys.concat(me.disabledCheckedKeys);
            },

            // body滚动事件
            scrollHandler(event) {
                this.$refs.header[0].scrollLeft = event.target.scrollLeft;
            },

            // head吸顶
            headFixed() {
                if (!this.headerFixedStyle.top) this.headerOffsetTop = this.$refs.header[0].offsetTop;

                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let top = scrollTop - this.headerOffsetTop + this.customThreshold;
                this.headerFixedStyle = {};
                this.fixed && top > 0 ? this.headerFixedStyle.top = `${top}px` : '';
            },

            // checkbox 全选事件
            onCheckAllHandler(checked) {
                let me = this;

                me.choosableCheckedRows = checked ? me.choosableRows : [];
                me.checkedKeys = me.getCheckedKeys();

                me.rowSelection 
                    && me.rowSelection.onSelectAll 
                    && me.rowSelection.onSelectAll(checked, me.choosableCheckedRows);
            },

            // checkbox 单选事件
            onCheckHandler(checked, row) {
                let me = this;

                checked 
                    ? me.choosableCheckedRows.push(row) 
                    : me.choosableCheckedRows = me.choosableCheckedRows.filter(
                        item => row[me.rowKey] !== item[me.rowKey]
                    );
                me.checkedKeys = me.getCheckedKeys();

                me.rowSelection 
                    && me.rowSelection.onSelect 
                    && me.rowSelection.onSelect(checked, me.choosableCheckedRows, row);

            },

            // radio单选事件
            onRadioHandler(checked, row) {
                let me = this;

                me.choosableCheckedRows = checked ? [row] : [];
                me.checkedKeys = checked ? [row[me.rowKey]] : [];

                me.rowSelection 
                    && me.rowSelection.onSelect 
                    && me.rowSelection.onSelect(checked, checked ? row : {});
            },

            // 排序，数组根据属性排序
            compare(prop, order) { 
                return function (a, b) { 
                    let num = order == 'desc' ? 1 : -1;
                    return a[prop] < b[prop] ? num : (a[prop] > b[prop] ? -num : 0);
                } 
            },

            // sort 排序点击事件
            sortHandler(column, order) {
                if (order == 'init') {
                    this.columnList.forEach((column) => {
                        if (column.sort && column.sort.enable) column.sort._order = 'init';
                    });
                }

                this.currentSort.order 
                    = this.currentSort.columnKey == column.key && this.currentSort.order == 'desc'
                        ? 'asc' 
                        : 'desc';

                this.currentSort.columnKey = column.key;
                column.sort._order = this.currentSort.order;

                this.sortDataCallBack(column);
                
            },

            // 返回sort方法
            sortDataCallBack(column) {
                if (!column.sort.remote) {
                    this.dataList.sort(this.compare(column.key, column.sort._order));
                    this.$emit('on-sort-change', column.sort._order, column.key, column, this.dataList);
                } else {
                    this.$emit('on-sort-remote-change', column.sort._order, column.key, column);
                }
            },

            // filter的时候重新调用排序
            sortData() {
                this.dataList = deepCopy(this.data) || [];
                this.dataList.sort(this.compare(this.currentSort.columnKey, this.currentSort.order));
            },

            filterData(column) {
                let filter = column && column.filter;
                return this.dataList.filter(row => {
                    let status = false;
                    for (let index = 0; index < filter._filterValue.length; index++) {
                        status = filter.method(filter._filterValue[index], row);
                        if (status) break;
                    }
                    return status;
                });
            },

            // filter 重置
            filterResetHandler(column) {
                this.closePopoverHandler();

                column.filter._filterValue = [];
                column.filter._isFiltered = false;

                if (column.filter.remote) {
                    this.$emit('on-filter-remote-change', [], column.key, column);

                    return;
                }

                this.sortData();
                
                let newDate = [];
                this.columnList.forEach(item => {
                    if (item.filter && item.filter.method 
                        && typeof item.filter.method == 'function' 
                        && item.filter._filterValue.length > 0) {
                        newDate = this.filterData(item);
                        this.dataList = newDate;
                    }
                });

                this.$emit('on-filter-change', [], column.key, column, this.dataList);
            },

            // filter选择单选事件
            filterSelectHandler(column) {
                this.closePopoverHandler();

                column.filter._isFiltered = true;

                if (column.filter.remote) {
                    this.$emit('on-filter-remote-change', column.filter._filterValue, column.key, column);

                    return;
                }

                this.sortData();
                let newDate = [];
                if (typeof column.filter.method == 'function' && column.filter._filterValue.length > 0) {
                    newDate = this.filterData(column);
                    this.dataList = newDate;
                }

                this.$emit('on-filter-change', column.filter._filterValue, column.key, column, this.dataList);
            },

            // 初始化checkedKeys和choosableCheckedRows
            initCheckedKeys(){
                let me = this;

                if (this.rowSelection && (this.rowSelection.type == 'checkbox' || this.rowSelection.type == 'radio')) {
                    this.checkedKeys = this.rowSelection.type == 'radio' 
                        ? this.defaultCheckedKeys && this.defaultCheckedKeys.slice(0, 1) || []
                        : deepCopy(this.defaultCheckedKeys) || [];

                    this.rowSelection.getCheckboxProps && this.rowSelection.getCheckboxProps.disabled 
                        ? this.disabledCheckedRows : '';

                    this.choosableRows.forEach(row => {
                        ~me.checkedKeys.indexOf(row[me.rowKey]) 
                            ? me.choosableCheckedRows.push(row)
                            : '';
                    });
                }
            },

            // filter icon click事件
            filterIconHandler(key) {
                this.currentFilterKey = key;
            },

            // 关闭filter
            closePopoverHandler() {
                this.currentFilterKey = null;
            },

            // 合并行或列（根据行号和列号设置rowspan和colspan）
            getSpan(row, column, rowIndex, columnIndex) {
                let result = {
                    rowspan: 1,
                    colspan: 1
                };
                let columnKey = column.key;
                const fn = this.spanMethod;
                if (typeof fn === 'function') { 
                    result = fn(row, column, rowIndex, columnIndex);  
                }
                
                this.spanObjArray[rowIndex] = this.spanObjArray[rowIndex] || {};
                this.spanObjArray[rowIndex]['_' + columnKey] = {};
                this.spanObjArray[rowIndex]['_' + columnKey]['_rowspan'] = result ? result.rowspan : 1;
                this.spanObjArray[rowIndex]['_' + columnKey]['_colspan'] = result ? result.colspan : 1;
            },

            // 鼠标移入事件 hover
            mouseEnterHandler(index) {
                if (this.leftFixedColumns.length && this.rightFixedColumns.length) {
                    this.dataList[index]['_isHover'] = true;
                    this.$forceUpdate();
                }
            },

            // 鼠标移出事件 hover
            mouseLeaveHandler(index) {
                if (this.leftFixedColumns.length && this.rightFixedColumns.length) {
                    this.dataList[index]['_isHover'] = false;
                    this.$forceUpdate();
                }
            }
        },
        created() {
            this.$on('resetCheckbox', this.resetCheckbox);
            this.initCheckedKeys();
            this.setColumns();
        },
        mounted() {
            this.$nextTick(() => { 
                this.resizeHandler();
                if (this.fixed) { 
                    this.headerOffsetTop = this.$refs.header[0].offsetTop;
                    on(window, 'scroll', this.headFixed);
                }
            }); 
            on(window, 'resize', this.resizeHandler);   
               
        },
        beforeDestroy() {
            off(window, 'resize', this.resizeHandler);
            if (this.fixed) off(window, 'scroll', this.headFixed);
        },
    };
</script>

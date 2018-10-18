<template>
    <div :class="wrapCls">
        <template v-for="component in components">
            <template v-if="component === 'next'">
                <button @click="handleClickButton(1)"
                        title="下一页"
                        :disabled="currentPage === maxPage"
                        :class="{disabled: currentPage === maxPage, [prefixCls+ '-button']: true}">
                    <Icon type="angle-right"></Icon>
                </button>
            </template>
            <template v-else-if="component === 'prev'">
                <button @click="handleClickButton(-1)"
                        title="上一页"
                        :disabled="currentPage === 1"
                        :class="{disabled: currentPage === 1, [prefixCls+ '-button']: true}">
                    <Icon type="angle-left"></Icon>
                </button>
            </template>
            <template v-else-if="component === 'pager'">
                <ul :class="prefixCls + '-pager'" v-if="isSimple">
                    <i-input-number v-model="currentPage"
                                    :min="1"
                                    :max="maxPage"
                                    placement="right"
                                    :is-controls="false"
                                    :size="size==='small' ? 'mini' : 'small'">

                    </i-input-number>
                     <span :class="prefixCls + '-divider'">/</span>
                     {{maxPage}}
                </ul>
                <ul :class="prefixCls + '-pager'" v-else>
                    <li v-for="page in pageList"
                        :class="{active:page.page === currentPage, 'pageIcon': page.page < 0}"
                        @click="handleClickPage(page.page)"
                        :title="page.title">
                        <template v-if="page.page === -1">
                            <Icon type="angle-double-left"></Icon>
                            <Icon type="ellipsis"></Icon>
                        </template>
                        <template v-else-if="page.page === -2">
                            <Icon type="angle-double-right"></Icon>
                            <Icon type="ellipsis"></Icon>
                        </template>
                        <template v-else>
                            {{page.page}}
                        </template>
                    </li>
                </ul>
            </template>
            <template v-else-if="component === 'jumper'">
                <div :class="prefixCls + '-jumper'">
                    跳转至
                    <i-input-number v-model="currentPage"
                                    :min="1"
                                    :max="maxPage"
                                    placement="right"
                                    :is-controls="false"
                                    :size="size==='small' ? 'mini' : 'small'">

                    </i-input-number>
                </div>
            </template>
            <template v-else-if="component === 'sizer'">
                <div :class="prefixCls + '-sizer'">
                    <!-- <i-select :options="sizeOptions"
                                  :type="btnType"
                                  :size="size==='small' ? 'small' : 'normal'"
                                  v-model="currentSize">

                        </i-select> -->
                    <j-popover :class-name="prefixCls +'-popper-pagesize'" ref="sizeList">
                        <j-button :type="btnType">{{currentSize}}条</j-button>
                        <div slot="content">
                            <ul>
                                <li 
                                    :class="[prefixCls +'-popper-pagesize-item', 
                                    currentSize == item.value && (prefixCls +'-popper-item-selected')]" 
                                    v-for="item in sizeOptions"
                                    @click="changeSize(item.value)">
                                    {{item.label}}
                                </li>
                            </ul>
                        </div>
                    </j-popover>
                </div>
            </template>
            <template v-else-if="component === 'total'">
                <span :class="prefixCls + '-total'" v-if="total > 0">
                    <slot>共{{total}}条</slot>
                </span>
            </template>
        </template>
    </div>
</template>

<script>
    import Icon from '../Icon'
    import Select from '../Select'
    import InputNumber from '../InputNumber'
    export default {
        name: 'Pagination',
        props: {
            isBackground: Boolean,
            isSimple: Boolean,
            layout: String,
            pageCount: {
                type: Number,
                default: 5
            },
            pageIndex: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            },
            pageSizes: {
                type: Array,
                default() {
                    return [10, 20, 30, 50, 100]
                }
            },
            pageTotal: {
                type: Number,
                default: 10
            },
            prefixCls: {
                type: String,
                default: 'jad-pagination'
            },
            size: String,
            sizerType: {
                type: String,
                default: 'default'
            },
            total: {
                type: Number,
                default: 0
            },
        },
        data() {
            return {
                currentPage: 1,
                currentSize: 10,
                components: ['prev', 'pager', 'next'],
                maxPage: 1,
                isOutsideChange: false
            }
        },
        computed: {
            wrapCls() {
                let {prefixCls, size, isBackground, isSimple} = this;
                return {
                    [prefixCls]: true,
                    [`${prefixCls}-mini`]: size === 'small',
                    [`${prefixCls}-bg`]: isBackground && !isSimple,
                }
            },
            sizeOptions() {
                return this.pageSizes.map(num => {
                    return {
                        value: num,
                        label: num + ' 条'
                    }
                })
            },
            btnType() {
                let typeArr = ['primary', 'success', 'warning', 'error', 'info',
                    'text', 'linear', 'linear-red', 'dash', 'default'];
                return typeArr.includes(this.sizerType)
                    ? this.sizerType
                    : 'default'
            },
            pageList() {
                let {maxPage, currentPage, pageCount} = this;
                let diff = Math.ceil((pageCount - 1) / 2);
                let diffElse = pageCount - 1 - diff;
                let start = 1;
                let end = 1;
                let showPrevFive = false;
                let showNextFive = false;
                let arr = [];
                if (maxPage - pageCount > 1) {
                    let prev = currentPage - diff;
                    let next = maxPage - currentPage + 1 - diffElse;
                    if (prev > 2 && next > 2) {
                        start = currentPage - diff;
                        end = currentPage + diffElse;
                        showPrevFive = true;
                        showNextFive = true;
                    } else if (prev > 2) {
                        end = maxPage;
                        start = maxPage - pageCount + 1;
                        showPrevFive = true;
                    } else if (next > 2) {
                        start = 1;
                        end = pageCount;
                        showNextFive = true;
                    } else {
                        start = 1;
                        end = maxPage;
                    }
                } else {
                    end = maxPage;
                }
                for (let i = start; i <= end; i++) {
                    arr.push({
                        title: i + '',
                        page: i
                    });
                }
                if (showPrevFive) {
                    arr.unshift(
                        {title: '1', page: 1},
                        {title: `向前${pageCount}页`, page: -1}
                    )
                }
                if (showNextFive) {
                    arr.push(
                        {title: `向后${pageCount}页`, page: -2},
                        {title: '' + maxPage, page: maxPage}
                    )
                }
                return arr;
            }
        },
        components: {
            Icon,
            iSelect: Select,
            iInputNumber: InputNumber
        },
        methods: {
            changeSize(val) {
                this.currentSize = val;
                this.$refs.sizeList[0].isShow = false
            },
            setLayout() {
                let {layout, isSimple} = this;
                if (isSimple) return;
                let defaultComponents = ['prev', 'pager', 'next', 'total', 'jumper', 'sizer'];
                let layoutArr = layout ? layout.split(',') : [];
                let components = layoutArr.filter(name => defaultComponents.includes(name));
                components.length && (this.components = components);
            },
            setSize(val) {
                let {pageSizes, total, pageTotal} = this;
                if (pageSizes && pageSizes.length && pageSizes.includes(val)) {
                    this.currentPage = 1;
                    this.currentSize = val;
                    this.maxPage = total > 0 ? Math.ceil(total / val) : pageTotal;
                }
            },
            handleClickPage(page) {
                let {currentPage, maxPage, pageCount} = this;
                if (currentPage !== page) {
                    let _page = page;
                    if (page === -1) {
                        _page = currentPage - pageCount > 0 ? currentPage - pageCount : 1;
                    } else if (page === -2) {
                        _page = currentPage + pageCount > maxPage ? maxPage : currentPage + pageCount;
                    }
                    this.currentPage = _page;
                }
            },
            handleClickButton(num) {
                let {currentPage, maxPage} = this;
                let _page = currentPage + num;
                if (_page > 0 && _page <= maxPage) {
                    this.currentPage = _page;
                }
            },
            handleEmit(pageIndex, pageSize) {
                this.$emit('on-change', {
                    pageIndex: pageIndex,
                    pageSize: pageSize
                });
            }

        },
        watch: {
            currentSize(val) {
                this.setSize(val);
                this.handleEmit(1, val);
            },
            currentPage(val) {
                if (this.isOutsideChange) {
                    this.isOutsideChange = false;
                    return;
                }
                this.handleEmit(val, this.currentSize);
            },
            pageIndex(val) {
                if (val !== this.currentPage) {
                    this.isOutsideChange = true;
                    this.currentPage = val;
                }
            },
            total(val) {
                let {currentSize, currentPage} = this;
                let max = val > 0 ? Math.ceil(val / currentSize) : 1;
                this.maxPage = max;
                if (currentPage > max) {
                    this.currentPage = 1;
                }
            }
        },
        created() {
            let {pageSize, pageIndex} = this;
            this.setLayout();
            this.setSize(pageSize);
            this.currentPage = pageIndex;
        }
    }
</script>
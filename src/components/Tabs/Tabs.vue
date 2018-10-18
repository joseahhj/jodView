<template>
    <div :class="wrapClasses">
        <span v-if="scrollable" :class="[prefixCls + '-nav-prev']" @click="scrollHandler(1)" :style="navPreStyle"><Icon type="angle-left" /></span>
        <span v-if="scrollable" :class="[prefixCls + '-nav-next']" @click="scrollHandler(2)" :style="navNextStyle"><Icon type="angle-right" /></span>
        <div :class="addClasses" v-if="isShowAdd" :style="addStyle"><slot name="add"></slot></div>
      
        <div :class="barWrapClasses" ref="barWrap" :style="scrollStyle">
            <div :class="navScrollClasses" ref="navScroll" :style="navScroll">
                <div :class="navClasses" ref="nav" :style="navStyle">
                    <div :class="barClasses" :style="barStyle()"></div>
                    <div :class="tabClass(item)" v-for="(item, index) in navList" :key="index+''+item.name" @click="handlerTab(item, $event)" ref="barNum">
                        <Icon :type="item.icon" v-if="item.icon"></Icon>
                        <slot :name="item.name" :data="item">
                            <span v-html="item.label"></span> 
                        </slot>
                        <div v-if="isShowClose(item)" @click="removeHandler(item, index)">
                            <Icon type="cancel4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {oneOf} from '../../utils/assist'
    import {on, off} from '../../utils/dom';
    import Icon from '../Icon'
    export default {
        name: 'Tabs',
        props: {
            prefixCls: {
                type: String,
                default: 'jad-tabs'
            },
            value: {
                type: String
            },
            type: {
                type: String,
                validate(value) {
                    return oneOf(value, ['line', 'card'])
                },
                default: 'line'
            },
            isClosed: {
                type: Boolean,
                default: false
            },
            className: {
                type: String,
                default: ''
            },
            dataList: {
                type: Array
            },
            tagHeight: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                navList: [],
                currentValue: this.value,
                actBarWidth: 0,
                actBarLeft: 0,
                scrollable: false,
                observer: null,
                isShowAdd: false,
                navStyle: {
                    transform: '',
                    transition: 'transform .5s ease-in-out'
                }
            }
        },
        computed: {
            wrapClasses() {
                let {prefixCls, type} = this;
                return [
                    `${prefixCls}`,
                    {[`${prefixCls}-${type}`]: type == 'card'}
                ]
            },
            addClasses() {
                let {prefixCls, isShowAdd} = this;
                return [
                    {[`${prefixCls}-add`]: !!isShowAdd}
                ]
            },
            barWrapClasses() {
                let {prefixCls, type, className, scrollable} = this;
                return [
                    `${prefixCls}-bar`,
                    {
                        [`${prefixCls}-bar-${type}`]: type == 'card',
                        [`${className}`]: type == 'card' && className,
                        [`${prefixCls}-bar-scroll`]: scrollable
                    }
                ]
            },
            scrollStyle() {
                let {scrollable, isShowAdd, prefixCls} = this;
                let styleObj = {
                    marginRight: ''
                }
                if (scrollable && isShowAdd && this.$el.querySelector(`.${prefixCls}-add`)) {
                    let width = this.$el.querySelector(`.${prefixCls}-add`).offsetWidth;
                    styleObj.marginRight = 20 + width + 'px';
                } else if (scrollable && !isShowAdd) {
                    styleObj.marginRight = '20px';
                } else if (!scrollable && isShowAdd && this.$el.querySelector(`.${prefixCls}-add`)) {
                    let width = this.$el.querySelector(`.${prefixCls}-add`).offsetWidth;
                    styleObj.marginRight = 10 + width + 'px';
                }
                return styleObj
            },
            addStyle() {
                let {tagHeight} = this;
                if (tagHeight > 36) {
                    return {
                        'line-height': `${tagHeight}px`
                    }
                }
            },
            navPreStyle() {
                let {tagHeight} = this;
                if (tagHeight > 36) {
                    return {
                        'line-height': `${tagHeight}px`
                    }
                }
            },
            navNextStyle() {
                let {scrollable, isShowAdd, prefixCls, tagHeight} = this;
                let styleObj = {
                    right: ''
                }
                if (scrollable && isShowAdd && this.$el.querySelector(`.${prefixCls}-add`)) {
                    let width = this.$el.querySelector(`.${prefixCls}-add`).offsetWidth;
                    styleObj.right = 10 + width + 'px';
                } else if (scrollable && !isShowAdd) {
                    styleObj.right = '8px';
                } else if (!scrollable && isShowAdd) {
                    styleObj.right = '';
                }
                if (tagHeight > 36) {
                    styleObj.lineHeight = tagHeight + 'px'
                }
                return styleObj
            },
            navScrollClasses() {
                let {prefixCls} = this;
                return [
                    `${prefixCls}-nav-scroll`
                ]
            },
            navScroll() {
                let {tagHeight} = this;
                if (tagHeight > 36) {
                    return {
                        height: `${tagHeight}px`,
                        lineHeight: `${tagHeight}px`
                    }
                }
            },
            navClasses() {
                let {prefixCls, className, type} = this;
                return [
                    `${prefixCls}-nav`,
                    {
                        [`${prefixCls}-nav-card`]: type == 'card' && className,
                    }
                ]
            },
            barClasses() {
                let {prefixCls, type, className} = this;
                return [
                    {
                        [`${prefixCls}-tab-bottom`]: !(type == 'card' && className) 
                    }
                ]
            }
        },
        components: {
            Icon
        },
        watch: {
            value(val) {
                this.currentValue = val
            }
        },
        methods: {
            //获取子组件列表
            getTabPane() {
                let sonList = [];
                sonList = this.$children.filter((pane) => {
                    return pane.$options.name === 'TabsPane'
                })
                return sonList;
            },
            //更新标签标题
            updateNav() {
                this.navList = [];
                if (this.dataList && this.dataList.length) {
                    this.dataList.forEach((pane) => {
                        this.navList.push(pane);
                    });
                } else {
                    this.getTabPane().forEach((pane, index) => {
                        this.navList.push({
                            name: pane.currentName || index,
                            label: pane.currentLabel,
                            isDisabled: pane.isDisabled || false,
                            icon: pane.icon || ''
                        });
                        if (!pane.currentName) pane.currentName = index;
                        if (index === 0) {
                            if (!this.currentValue) {
                                this.currentValue = pane.currentName || index;
                            }
                        }
                    });
                }
                this.activeTab()
                this.locateBar()
            },
            //更新被激活的tab对应的内容
            activeTab() {
                let navList = this.dataList ? this.dataList : this.getTabPane();
                navList.forEach((pane) => {
                    if (pane.currentName == this.currentValue) {
                        pane.show = true;
                    } else {
                        pane.show = false;
                    }
                })
            },
            //tab激活样式
            tabClass(pane) {
                let {prefixCls, currentValue, type} = this;
                return [
                    `${prefixCls}-nav-tab`,
                    {[`${prefixCls}-nav-tab-${type}`]: !!type,
                        [`${prefixCls}-nav-tab-active`]: pane.name === currentValue,
                        [`${prefixCls}-nav-tab-disable`]: pane.isDisabled == true,
                    }
                ]
            },
            isShowClose(pane) {
                let {currentValue, isClosed} = this;
                if (!isClosed) return false;
                if (pane.name === currentValue) {
                    return true
                } else {
                    return false
                }
            },
            //tab激活控制
            handlerTab(pane, ev) {
                if (pane.isDisabled) {
                    return;
                }
                this.currentValue = pane.name;
                //定位滚动条位置
                this.updateNav()
                this.scrollToActiveTab()
                this.$emit('input', this.currentValue)
                this.$emit('on-click', pane, ev)
            },
            //关闭tabspane
            removeHandler(pane) {
                this.$emit('on-remove', pane.name)
                this.updateNav()
            },
            //获取激活子组件索引
            getTabIndex() {
                let index = 0;
                if (this.dataList && this.dataList.length) {
                    index = this.navList.findIndex(item => item.name === this.currentValue);
                } else {
                    index = this.getTabPane().findIndex(item => item.currentName === this.currentValue);
                }
                return index;
            },
            //获取滚动条位置
            locateBar() {
                let {prefixCls} = this;
                this.$nextTick(() => {
                    let index = this.getTabIndex();
                    let navNodeList = this.$refs.nav ? this.$refs.nav.querySelectorAll(`.${prefixCls}-nav-tab`) : [];
                    if (navNodeList[index]) {
                        this.actBarWidth = navNodeList[index].offsetWidth;
                        let offset = 0;
                        for (let i = 0; i < index; i++) {
                            offset += navNodeList[i].offsetWidth + 16;
                        }
                        this.actBarLeft = offset;
                        this.updateNavScroll()
                    }
                })
            },
            //计算被激活tab底部滚动条位置
            barStyle() {
                return {
                    width: this.actBarWidth + 'px',
                    left: this.actBarLeft + 'px'
                }
            },
            resizeHandler(){
                this.updateNavScroll();
            },
            //滚动事件,val==1为左滚动，val==2为右滚动
            scrollHandler(val) {
                let {scrollable} = this;
                if (!scrollable) return false
                let scrollWidth = this.$refs.navScroll.offsetWidth;
                let currentNavOffset = this.getCurrentNavOffset();
                let navWidth = this.$refs.nav.offsetWidth;
                let newNavOffset = 0;
                if (val === 1) {
                    //每次移动一个容器的宽度
                    if (!currentNavOffset) return;
                    newNavOffset = currentNavOffset > scrollWidth
                        ? currentNavOffset - scrollWidth
                        : 0;
                } else {
                    if (navWidth - currentNavOffset <= scrollWidth) return;
                    newNavOffset = navWidth - currentNavOffset > scrollWidth * 2
                        ? currentNavOffset + scrollWidth
                        : (navWidth - scrollWidth);
                }
                this.setNavOffset(newNavOffset);
            },
            scrollToActiveTab() {
                let {prefixCls} = this;
                if (!this.scrollable) return;
                let nav = this.$refs.nav;
                let activeTab = null;
                this.$nextTick(() => {
                    activeTab = this.$el.querySelector(`.${prefixCls}-nav-tab-active`);
                    if (!activeTab) return;
                    let navScroll = this.$refs.navScroll;
                    let activeTabBounding = activeTab.getBoundingClientRect();
                    let navScrollBounding = navScroll.getBoundingClientRect();
                    let navBounding = nav.getBoundingClientRect();
                    let currentNavOffset = this.getCurrentNavOffset();
                    let newOffset = currentNavOffset;

                    if (navBounding.right < navScrollBounding.right) {
                        newOffset = nav.offsetWidth - navScrollBounding.width;
                    }

                    if (activeTabBounding.left < navScrollBounding.left) {
                        newOffset = currentNavOffset - (navScrollBounding.left - activeTabBounding.left);
                    } else if (activeTabBounding.right > navScrollBounding.right) {
                        newOffset = currentNavOffset + activeTabBounding.right - navScrollBounding.right;
                    }
                    if (currentNavOffset !== newOffset) {
                        this.setNavOffset(Math.max(newOffset, 0));
                    }
                })
            },
            //设置滚动位置
            setNavOffset(value) {
                this.navStyle.transform = `translateX(-${value}px)`;
            },
            //获取当前偏移位置
            getCurrentNavOffset() {
                let {navStyle} = this;
                return navStyle.transform
                    ? Number(navStyle.transform.match(/tr.+\(-(\d+(\.\d+)*)px\)/)[1])
                    : 0;
            },
            //是否激活scroll滚动
            updateNavScroll(){
                let navWidth = this.$refs.nav.offsetWidth;
                let scrollWidth = this.$refs.navScroll.offsetWidth;
                let currentNavOffset = this.getCurrentNavOffset();
                if (scrollWidth < navWidth) {
                    this.scrollable = true;
                    if (navWidth - currentNavOffset < scrollWidth) {
                        this.setNavOffset(navWidth - scrollWidth);
                    }
                } else {
                    this.scrollable = false;
                    if (currentNavOffset > 0) {
                        this.setNavOffset(0);
                    }
                }
            },
        },
        created() {
            if (this.dataList && this.dataList.length) {
                this.updateNav()
            }
        },
        mounted() {
            this.isShowAdd = this.$slots.add !== undefined;
            //监听dom变化
            on(window, 'resize', this.resizeHandler); 
        },
        beforeDestroy() {
            off(window, 'resize', this.resizeHandler);
        }
    }
</script>

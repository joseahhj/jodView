<template>
    <div :class="wrapClasses" @click="handleInputClick">
        <div :class="[isDisabled ? prefixCls + '-disabled' : '', 'relative']">
            <i-input :is-readonly="!isFilterable" v-model="searchVal"
                     :className="isDisabled ? 'disabled-input' : 'pointer-input'"
                     :is-disabled="isDisabled"
                     :placeholder="placeholder"
                     @input="searchItemsByInputValue"
                     ref="input"
                     :length="size">
                <template slot="suffix">
                    <i-icon
                            key="1"
                            type="angle-down" v-show="!isShow || isDisabled"></i-icon>
                    <i-icon
                            key="2"
                            type="angle-up" v-show="isShow && !isDisabled"></i-icon>
                </template>
            </i-input>

            <span :class="prefixCls + '-label'"
                  v-show="!isDisabled && (!searchVal.length || (!searchVal.length && this.defaultValue))">
                {{inputValue}}
            </span>
        </div>


        <transition name="fade">
            <div :class="[prefixCls + '-menus', className]" ref="popper" v-show="isShow && !isDisabled">
                <div v-if="!searchVal.length">
                    <i-menu :key="item.options.value"
                            @change-menus="changeMenusByClick"
                            @hover-menus="changeMenusByHover"
                            :menuData="item"
                            :mode="mode"
                            :isFocus="isFocus"
                            :default-active-items="activeAry[index]"
                            :default-disabled-items="defaultDisabledKeys"
                            v-for="(item, index) in menusAry">
                        <template slot-scope="{option}">
                            <slot :option="option">
                                {{option.label}}
                            </slot>
                        </template>
                    </i-menu>
                </div>
                <div v-else>
                    <ul :class="[prefixCls + '-menu', prefixCls + '-menu-flexible']" :style="{'min-width': minWidth}">
                        <li :class="getItemClass"
                            v-for="item in matchedItems"
                            @click="getDefaultMenusByClick(item.index)"
                            v-html="item.html">
                        </li>
                        <li :class="getItemClass" v-if="!matchedItems.length">
                            无匹配数据
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import PopperMixin from '../../mixins/popperMixin';
    import Input from '../Input';
    import Icon from '../Icon';
    import Menu from './Menu';

    export default {
        name: 'Cascader',
        components: {
            iInput: Input,
            iIcon: Icon,
            iMenu: Menu
        },
        mixins: [PopperMixin],
        props: {
            prefixCls: {
                type: String,
                default: 'jad-cascader'
            },
            trigger: {
                type: String,
                default: 'click',
            },
            placement: {
                type: String,
                default: 'bottomLeft',
            },
            options: {
                type: Array,
                required: true
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            mode: {
                type: String,
                default: 'click'
            },
            isShowLevels: {
                type: Boolean,
                default: true
            },
            isFilterable: {
                type: Boolean,
                default: false
            },
            isChange: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'medium'
            },
            defaultValue: {
                type: Array,
                required: false
            },
            separator: {
                type: String,
                default: '/'
            },
            className: {
                type: String,
                default: ''
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            defaultDisabledKeys: {
                type: Array,
                required: false
            }
        },
        data() {
            return {
                inputValue: this.placeholder || '请选择',
                currentValue: this.value || [],
                currentLevelOneMenuItem: '',
                currentLevelTwoMenuItem: '',
                menusAry: [],
                activeAry: [],
                lastSelectAry: [],
                flattenItems: [],
                matchedItems: [],
                minWidth: '260px',
                searchVal: '',
                preVal: '',
                isFocus: false,
                copyActiveAry: [],
                copyMenusAry: []
            }
        },
        computed: {
            wrapClasses() {
                let {prefixCls} = this;
                return [
                    `${prefixCls}`
                ]
            },
            getItemClass() {
                let {prefixCls} = this;
                let disabled = this.matchedItems.length ? '' : 'disabled';
                return [
                    `${prefixCls}-menu-item`,
                    disabled
                ]
            }
        },
        methods: {
            closeMenus() {
                this.isShow = false;
            },
            handleInputClick() {
                let input = this.$refs.input.$el.querySelector('input');
                input.focus();
                if (this.isShow && !this.menusAry.length) {
                    this.menusAry.push({options: this.options, level: 0});
                }
            },
            changedMenus(children) {
                let realIndex = children.level;
                let activeIndex = -1;

                if (children.options) {
                    let index = this.menusAry.findIndex(item => item.level === children.level);
                    index > -1
                        ? this.menusAry.splice(index, this.menusAry.length - index, children)
                        : this.menusAry.push(children);

                    realIndex = realIndex - 1;
                    this.$emit('on-item-change', children.active);
                } else {
                    this.menusAry = this.menusAry.slice(0, children.level + 1);
                }

                activeIndex = this.activeAry.findIndex(item => item.level === realIndex);

                if (activeIndex > -1) {
                    this.activeAry = this.activeAry.slice(0, realIndex);
                }

                this.activeAry.push({
                    active: children.active,
                    level: realIndex
                });
            },
            toCopyActiveAry() {
                this.copyActiveAry = this.activeAry.map((item) => {
                    return {
                        active: {
                            label: item.active.label,
                            value: item.active.value
                        },
                        level: item.level
                    }
                });
            },
            changeMenusByClick(children) {
                let method = this.isShowLevels ? this.showAllLevelsPath : this.showLastLevel;
                this.changedMenus(children);
                if (this.isChange) {
                    this.inputValue = this.showAllLevelsPath();
                    this.toCopyActiveAry();
                }
                if (!children.options) {
                    this.inputValue = method();
                    this.toCopyActiveAry();
                    this.closeMenus();
                }
            },
            changeMenusByHover(children) {
                this.changedMenus(children);
                if (this.isChange) {
                    this.inputValue = this.showAllLevelsPath();
                    this.toCopyActiveAry();
                }
            },
            showAllLevelsPath() {
                let str = '';

                this.activeAry.forEach((item, index) => {
                    str += index < this.activeAry.length - 1 ? item.active.label + this.separator : item.active.label;
                });

                return str;
            },
            showLastLevel() {
                return this.activeAry[this.activeAry.length - 1].active.label;
            },
            searchItemByValue(options, keyWords, isAdd) {
                let isFind = false;

                for (let item of options) {
                    if (keyWords.indexOf(item.value) > -1) {
                        let tmp = {
                            active: {
                                value: item.value,
                                label: item.label
                            },
                            level: this.menusAry.length
                        };
                        isAdd && this.activeAry.push(tmp);
                        this.menusAry.push(Object.assign({}, tmp, {options: options}));
                        item.children && this.searchItemByValue(item.children, keyWords, isAdd);
                        isFind = true;
                        break;
                    }
                }
                if (!isFind) {
                    this.menusAry.push({
                        level: this.menusAry.length,
                        options: options
                    });
                }
            },
            getDefaultMenusByClick(index) {
                let keyWords = [];
                this.activeAry = this.flattenItems[index].map((item, _innerIndex) => {
                    keyWords.push(item.value);
                    return {
                        active: {
                            value: item.value,
                            label: item.label
                        },
                        level: _innerIndex
                    }
                });

                this.menusAry = [];
                this.searchItemByValue(this.options, keyWords);
                this.matchedItems = [];
                this.searchVal = '';
                this.inputValue = this.showAllLevelsPath();
                this.toCopyActiveAry();
                this.isShow = false;
            },
            changePlaceholder() {
                if (this.inputValue.length) {
                    this.inputPlaceholder = this.inputValue;
                    this.inputValue = '';
                }
            },
            searchItemsByInputValue(searchVal) {
                if (!searchVal && !this.inputValue) {
                    this.activeAry = [];
                    this.menusAry = [];
                    this.isShow = true;
                    this.handleInputClick();
                }

                if (!searchVal && this.inputValue) {
                    this.isShow = true;
                    this.handleInputClick();
                }

                this.matchedItems = [];
                this.flattenItems.forEach((itemAry, index) => {
                    let html = '';
                    let isFind = false;
                    itemAry.forEach((item) => {
                        item.label.replace(searchVal, (match, index, val) => {
                            html += `${html.length ? ' / ' : ''}${val.slice(0, index)}`
                                + `<span class="${this.prefixCls}-menu_item_bold">${match}</span>`
                                + `${val.slice(index + match.length)}`;
                            isFind = true;
                        });

                        if (item.label.indexOf(searchVal) == -1) {
                            html += `${html.length ? ' / ' : ''}${item.label}`;
                        }
                    });

                    isFind && this.matchedItems.push({
                        index: index,
                        html: html
                    });
                });
            },
            flattenOptionsStr(options, ary) {
                if (options) {
                    for (let i = 0; i < options.length; i++) {
                        let item = options[i];
                        let obj = {
                            label: item.label,
                            value: item.value
                        };

                        this.flattenOptionsStr(item.children, ary.concat(obj));
                    }
                } else {
                    this.flattenItems.push(ary);
                }
            }
        },
        mounted() {
            if (this.isFilterable) {
                this.flattenOptionsStr(this.options, []);
            }

            if (this.defaultValue) {
                let method = this.isShowLevels ? this.showAllLevelsPath : this.showLastLevel;
                this.searchItemByValue(this.options, this.defaultValue, true);
                this.inputValue = method();
                this.toCopyActiveAry();
            }
        },
        watch: {
            options: {
                deep: true,
                handler(val) {
                    this.menusAry = [];
                    this.searchItemByValue(val, this.activeAry.map((item) =>
                        item.active.value)
                    );
                }
            },
            inputValue(val, oldVal) {
                let _activeAry = this.activeAry.map((item) => item.active);

                if (val != oldVal) {
                    this.$emit('on-change', _activeAry);
                }
            },
            isShow(newVal) {
                if (newVal) {
                    return;
                }
                let method = this.isShowLevels ? this.showAllLevelsPath : this.showLastLevel;
                let currentValue = method();

                if (currentValue != this.inputValue) {
                    let defaultValue = this.copyActiveAry.map(item => item.active.value);
                    this.menusAry = [];
                    this.activeAry = [];
                    defaultValue.length && this.searchItemByValue(this.options, defaultValue, true);
                }
            }
        }
    }
</script>

<style scoped>

</style>

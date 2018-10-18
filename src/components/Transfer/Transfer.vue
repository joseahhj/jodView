<template>
    <div :class="transferCls">
        <transfer-panel
            :default-selected="leftDefaultSelected"
            :data="source"
            :title="leftTitle"
            :empty-text="emptyText"
            :has-footer="isShowFooter"
            :is-filterable="isFilterable"
            :filter-placeholder="filterPlaceholder"
            :format-selected="formatSelected"
            :on-filter="onFilter"
            @on-select="onSelectSource"
            ref="leftPanel"
            :prefix-cls="transferPanelCls">
            <template slot-scope="{option}">
                <slot :option="option">
                    {{option.label}}
                </slot>
            </template>
            <template slot="footer">
                <slot name="left-footer"></slot>
            </template>
        </transfer-panel>
        <div :class="prefixCls+'-buttons'">
            <v-button
                type="primary"
                :shape="addText ? '' : 'circle'"
                :class-name="prefixCls+'-button'"
                :is-disabled="!selectSource.length"
                @click="handleAdd">
                <j-icon type="angle-right"></j-icon>
                <span :class="prefixCls+'-button-text'">{{addText}}</span>
            </v-button>
            <v-button
                type="primary"
                :shape="removeText ? '' : 'circle'"
                :class-name="prefixCls+'-button'"
                :is-disabled="!selectTarget.length"
                @click="handleRemove">
                <j-icon type="angle-left"></j-icon>
                <span :class="prefixCls+'-button-text'">{{removeText}}</span>
            </v-button>
        </div>
        <transfer-panel
            :default-selected="rightDefaultSelected"
            :data="target"
            :title="rightTitle"
            :empty-text="emptyText"
            :has-footer="isShowFooter"
            :is-filterable="isFilterable"
            :filter-placeholder="filterPlaceholder"
            :format-selected="formatSelected"
            :on-filter="onFilter"
            @on-select="onSelectTarget"
            ref="rightPanel"
            :prefix-cls="transferPanelCls">
            <template slot-scope="{option}">
                <slot :option="option">
                    {{option.label}}
                </slot>
            </template>
            <template slot="footer">
                <slot name="right-footer"></slot>
            </template>
        </transfer-panel>
    </div>
</template>
<script>
    import vIcon from '../Icon/Icon'
    import vButton from '../Button/Button'
    import vCheckbox from '../Checkbox/Checkbox'
    import TransferPanel from './TransferPanel'
    import {typeOf} from '../../utils/helper'

    export default {
        name: 'Transfer',
        components: {
            vIcon,
            vButton,
            vCheckbox,
            TransferPanel
        },
        props: {
            buttonTexts: {
                type: Array,
                default: () => {
                    return []
                }
            },
            className: {
                type: String,
                default: ''
            },
            customField: {
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
            emptyText: {
                type: String,
                default: '暂无内容'
            },
            filterPlaceholder: {
                type: String,
                default: '请输入搜索内容'
            },
            formatSelected: Function,
            isFilterable: {
                type: Boolean,
                default: false
            },
            isShowFooter: Boolean,
            leftDefaultSelected: {
                type: Array,
                default() {
                    return []
                }
            },
            onFilter: Function,
            panelTitles: {
                type: Array,
                default() {
                    return []
                }
            },
            prefixCls: {
                type: String,
                default: 'jad-transfer'
            },
            rightDefaultSelected: {
                type: Array,
                default() {
                    return []
                }
            },
            targetOrder: String,
            value: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                selectSource: [],
                selectTarget: [],
                keywordsSrc: '',
                keywordsTar: '',
                renderData: [],
                currentValue: []
            }
        },
        computed: {
            transferCls() {
                let {prefixCls, className, isFilterable} = this;
                return {
                    [prefixCls]: true,
                    [className]: !!className,
                    'has-search': isFilterable
                }
            },
            transferPanelCls() {
                let {prefixCls} = this;
                return prefixCls + '-panel';
            },
            source() {
                let {renderData, currentValue} = this;
                return renderData.filter(item => !currentValue.includes(item.value));
            },
            target() {
                let {renderData, currentValue, targetOrder} = this;
                return targetOrder
                    ? currentValue.reduce((pre, value) => {
                        let item = renderData.find(item => item.value === value);
                        return item ? [...pre, item] : [...pre]
                    }, [])
                    : renderData.filter(item => currentValue.includes(item.value));
            },
            addText() {
                let {buttonTexts} = this;
                return buttonTexts && buttonTexts[0] || '';
            },
            removeText() {
                let {buttonTexts} = this;
                return buttonTexts && buttonTexts[1] || '';
            },
            leftTitle() {
                let {panelTitles} = this;
                return panelTitles && panelTitles[0] || '全选';
            },
            rightTitle() {
                let {panelTitles} = this;
                return panelTitles && panelTitles[1] || '全选';
            }
        },
        methods: {
            handleAdd() {
                let {
                    selectSource,
                    targetOrder,
                    currentValue
                } = this;
                if (!selectSource.length) return;
                this.currentValue = targetOrder === 'unshift'
                    ? [...selectSource, ...currentValue]
                    : [...currentValue, ...selectSource];
                this.selectSource = [];
                this.handleChange({
                    checked: selectSource,
                    event: 'add'
                });
            },
            handleRemove() {
                let {
                    selectTarget,
                    currentValue
                } = this;
                if (!selectTarget.length) return;
                this.currentValue = currentValue.filter(value => !selectTarget.includes(value));
                this.selectTarget = [];
                this.handleChange({
                    checked: selectTarget,
                    event: 'remove'
                });
            },
            handleChange({checked, event}) {
                let {currentValue, target} = this;
                this.$emit('on-change', {
                    value: currentValue,
                    list: target,
                    checked: checked || [],
                    event: event || ''
                });
            },
            onSelectSource(val) {
                this.selectSource = val;
            },
            onSelectTarget(val) {
                this.selectTarget = val;
            },
            setDefault(data) {
                let {value, customField} = this;
                let obj = typeOf(customField) === 'object' ? customField : {};
                let _data = null;
                if (Object.keys(obj).length) {
                    let keys = Object.assign({}, {
                        label: 'label',
                        value: 'value',
                        disabled: 'disabled'
                    }, obj);
                    _data = (data || []).map(item => {
                        return Object.assign({}, item, {
                            label: item[keys['label']],
                            value: item[keys['value']],
                            disabled: item[keys['disabled']]
                        })
                    });
                }
                this.renderData = _data || data || [];
                this.currentValue = value.slice();
            },
            clearKeyword(panel) {
                if (panel === 'left') {
                    this.$refs.leftPanel.clearKeyword();
                    return
                } else if (panel === 'right') {
                    this.$refs.rightPanel.clearKeyword();
                    return
                }
                this.$refs.leftPanel.clearKeyword();
                this.$refs.rightPanel.clearKeyword();
            }
        },
        watch: {
            data(val) {
                this.setDefault(val);
            }
        },
        created() {
            this.setDefault(this.data);
        },

    }
</script>
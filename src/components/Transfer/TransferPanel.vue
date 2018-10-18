<template>
    <div :class="prefixCls">
        <div :class="prefixCls+'-header'">
            <v-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                :is-disabled="!selectable.length"
                @on-change="handleCheckAll">
                {{title}}
            </v-checkbox>
            <div :class="prefixCls+'-header-selected'">
                {{selectedText}}
            </div>
        </div>
        <div :class="prefixCls+'-body'">
            <div v-if="isFilterable" :class="prefixCls+'-body-search'">
                <j-input
                    :class-name="prefixCls+'-body-search-input'"
                    v-model="keyword"
                    :placeholder="filterPlaceholder"
                    :is-clearable="true"
                    prefix-icon="search2"
                    length="medium">
                </j-input>
            </div>
            <div
                :class="prefixCls+'-content'"
                v-show="showData.length">
                <checkbox-group
                    v-model="selected">
                    <v-checkbox
                        v-for="item in showData"
                        :key="item.value"
                        :is-disabled="item.disabled"
                        :label="item.value"
                        :class-name="prefixCls + '-item'">
                        <slot :option="item">
                            {{item.label}}
                        </slot>
                    </v-checkbox>
                </checkbox-group>
            </div>
            <div
                :class="prefixCls+'-notFound'"
                v-show="!showData.length && keyword">
                {{emptyText}}
            </div>
        </div>
        <div :class="prefixCls+'-footer'" v-if="hasFooter">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    import vIcon from '../Icon/Icon'
    import vCheckbox from '../Checkbox/Checkbox'
    import CheckboxGroup from '../Checkbox/CheckboxGroup'
    import {typeOf} from '../../utils/helper'

    export default {
        name: 'TransferPanel',
        components: {
            vCheckbox,
            CheckboxGroup,
            vIcon
        },
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            defaultSelected: Array,
            emptyText: String,
            filterPlaceholder: String,
            formatSelected: Function,
            hasFooter: Boolean,
            isFilterable: Boolean,
            onFilter: Function,
            prefixCls: String,
            title: String
        },
        data() {
            return {
                selected: [],
                keyword: '',
                checkAll: false
            }
        },
        computed: {
            isIndeterminate() {
                let {checkAll, selected, selectable} = this;
                let selectLed = selected.length;
                return !checkAll && selectLed > 0 && (selectLed < selectable.length)
            },
            selectedText() {
                let {data, selected, formatSelected} = this;
                if (formatSelected && typeOf(formatSelected) === 'function') {
                    return formatSelected(selected.length, data.length);
                }
                return `已选${selected.length}/${data.length}项`
            },
            showData() {
                let {data, keyword, onFilter} = this;
                return data.filter(item => {
                    return onFilter
                        ? onFilter(keyword, item)
                        : ~item.label.indexOf(keyword)
                })
            },
            selectable() {
                return this.showData.filter(item => !item.disabled)
            },
        },
        methods: {
            handleCheckAll(val) {
                this.selected = val
                    ? this.selectable.map(item => item.value)
                    : []
            },
            clearKeyword() {
                this.keyword = '';
            },
            updateCheckAll() {
                let {selected, selectable} = this;
                let checked = selectable.every(item => selected.includes(item.value));
                this.checkAll = !!selectable.length && checked
            }
        },
        watch: {
            selected(val) {
                this.updateCheckAll();
                this.$emit('on-select', val);
            },
            data() {
                let {selected, showData} = this;
                this.selected = selected.filter(v => showData.find(item => v === item.value))
            },
            selectable() {
                this.updateCheckAll();
            }
        },
        created() {
            let {defaultSelected} = this;
            defaultSelected
            && defaultSelected.length
            && (this.selected = [...defaultSelected]);
        }
    }
</script>
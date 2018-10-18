<template>
    <li :key="option[originKeys.value]" 
        :class="[prefixCls+'-dropdown-item',
                findIndex(option[originKeys.value]) !== -1 && !isMultiple && prefixCls+'-dropdown-item-selected',
                findIndex(option[originKeys.value]) !== -1 && isMultiple && prefixCls+'-multi-item-selected',
                option[originKeys.isDisabled] && prefixCls+'-dropdown-item-disabled',
                option.isExtra && 'relative',
                isMultiple && 'clearfix']" 
        @click="select(option,$event)">
        <slot :data="option">
            <span v-if="isMultiple && !isShowCheckbox" :class="prefixCls+'-select-multi-icon'">
                <Icon type="checkmark3" font-size="12" color="#666"></Icon>
            </span>
            <template v-if="!isMultiple && !option.isExtra">
                {{option[originKeys.label]}}
            </template>
            <i-checkbox 
                v-if="isMultiple && isShowCheckbox" 
                :value="findIndex(option[originKeys.value]) !== -1"
                :is-disabled="option[originKeys.isDisabled]"
                ></i-checkbox>
            <span :class="prefixCls+'-select-li-text'" v-if="isMultiple || option.isExtra">{{option[originKeys.label]}}</span>
            
            <span v-if="option.isExtra" :class="prefixCls+'-select-extra-icon'" @click.stop="removeExtra(option)">
                <Icon type="cancel" color="#666"></Icon>
            </span>
        </slot>
    </li>
</template>
<script>
    import {Checkbox} from '../Checkbox'
    import Icon from '../Icon'
    //从父组件接收所有的属性和方法
    export default {
        name: 'jOption',
        props: {
            option: Object,
            originKeys: Object,
            select: Function,
            removeExtra: Function,
            remoteMethod: Function,
            findIndex: Function,
            placeholder: {
                type: String,
                default: '请选择',
            },
            searchPlaceholder: {
                type: String,
                default: '可搜索',
            },
            isDisabled: {
                type: Boolean,
                default: false,
            },
            isSearch: {
                type: Boolean,
                default: false
            },
            isMultiple: {
                type: Boolean,
                default: false
            },
            isShowCheckbox: {
                type: Boolean,
                default: false
            },
            isAllowClear: {
                type: Boolean,
                default: true
            },
            isExtra: {
                type: Boolean,
                default: false
            },
            prefixCls: {
                type: String,
                default: 'jad'
            },
            size: {
                type: String,
                default: ''
            },
            notFoundContent: {
                type: String,
                default: '没有相关结果'
            },
            selectedAllContent: {
                type: String,
                default: '全选'
            },
            
        },
        components: {
            iCheckbox: Checkbox,
            Icon
        },
    }
</script>



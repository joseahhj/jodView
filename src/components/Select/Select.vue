<template>
	<div :class="wrapClasses">
		<template v-if="type!='input' && type!='custom' && !$slots.custom">
            <i-button   
                :type="type" 
                :size="size" 
                :class-name="prefixCls+'-select-btn'  + (isMultiple ?  (' '+ prefixCls+'-select-btn-multi'):'')"
                :is-disabled="isDisabled">
                <span  
                    v-if="(placeholder && !selectItem) || !isShowSelect" 
                    :class="[prefixCls+'-select-btn-text']">
                    {{placeholder}}
                </span>
                <template v-if="isShowSelect && selectItem">
                    <span  v-if="!isMultiple" :class="[prefixCls+'-select-btn-text']">
                        {{selectItem}}
                    </span>
                    <slot name="multi-tag" :selectVal="valueArray">
                        <i-tag 
                            v-if="isMultiple"
                            isClosable 
                            v-for="item in valueArray"
                            type="dash"
                            size="small"
                            :key="item[originKeys.value]" 
                            :is-disabled="isDisabled"
                            style="margin-right:5px" 
                            @on-close="del(item)">
                            {{item[originKeys.label]}}
                        </i-tag>
                    </slot>
                </template>
                <Icon :type="isShow?'angle-up':'angle-down'"></Icon>
            </i-button>  
        </template>
        <template v-if="type=='input' && !$slots.custom">
            <template v-if="isShowSelect">
                <template v-if="isMultiple">
                    <div :class="multiWrapClasses">
                        <slot name="multi-tag" :selectVal="valueArray">
                            <i-tag 
                                isClosable 
                                type="primary"
                                shape="rounded"
                                size="small"
                                v-for="item in valueArray"
                                :key="item[originKeys.value]" 
                                :is-disabled="isDisabled"
                                style="margin-right:5px" 
                                @on-close="del(item)">
                                {{item[originKeys.label]}}
                            </i-tag>
                        </slot>
                        <span v-show="(!valueArray.length && !isSearch)" 
                            :class="prefixCls+'-select-input-place-text'">
                            {{placeholder}}
                        </span>
                        <template v-if="isSearch">
                            <input type="text" 
                            :style="multipleSearchStyle" 
                            :placeholder="valueArray.length ? '' : searchPlaceholder"
                            v-model="searchText" 
                            ref="searchInput"
                            @keydown.enter="addExtra"
                            :disabled="isDisabled">
                            <span ref="searchInputText" :class="prefixCls+'-select-input-mirror'">{{searchText}}</span>
                        </template>
                        <span :class="prefixCls+'-select-input-arrow'">
                            <Icon :type="isShow ? 'angle-up':'angle-down'"></Icon>
                        </span>
                        <span :class="prefixCls+'-select-input-clear'" v-if="isAllowClear && selectItem && !isDisabled"   @click.stop="clear">
                            <Icon type="cancel" ></Icon>
                        </span>
                    </div>
                </template>
                <template v-if="!isMultiple">
                    <i-input 
                        :placeholder="placeholder"
                        :size="size"   
                        v-model="selectItem" 
                        :is-disabled="isDisabled" 
                        isReadonly
                        v-if="!isSearch">
                        <span slot="suffix" :class="prefixCls+'-select-input-arrow'">
                            <Icon :type="isShow ? 'angle-up':'angle-down'" ></Icon>
                        </span>
                        <span slot="suffix" :class="prefixCls+'-select-input-clear'" v-if="isAllowClear && selectItem && !isDisabled"   @click.stop="clear">
                            <Icon type="cancel"></Icon>
                        </span>
                    </i-input>
                    <template v-if="isSearch">
                        <i-input 
                            :placeholder="selectItem ? '' : searchPlaceholder"  
                            v-model="searchText" 
                            :is-disabled="isDisabled" 
                            @on-input="handleInputEnter"
                            @on-focus="searchFocus"
                            @keydown.enter.native="addExtra"
                            :size="size" 
                            >
                            <span slot="suffix" :class="prefixCls+'-select-input-arrow'">
                                <Icon :type="isShow ? 'angle-up':'angle-down'" ></Icon>
                            </span>
                            <span slot="suffix" 
                                :class="prefixCls+'-select-input-clear'" 
                                v-if="isAllowClear && selectItem"   
                                @click.stop="clear">
                                <Icon type="cancel"></Icon>
                            </span>
                        </i-input>
                        <span :class="[prefixCls+'-select-searchipt-text', size]" :style="{opacity:iptOpacity}">{{selectItem}}</span>
                    </template>
                </template>
            </template>
            <template v-if="!isShowSelect">
                <i-input :placeholder="placeholder" v-model="placeholder" :is-disabled="isDisabled" isReadonly>
                    <Icon :type="isShow?'angle-up':'angle-down'" slot="suffix"></Icon>
                </i-input>
            </template>
        </template> 
        <slot name="custom"></slot> 
        <transition name="jad-zoom-in-top">
			<div :class="popperClasses" 
				ref="popper" 
                v-show="isShow && (!remoteMethod || (remoteMethod && searchText || type!='input'))" 
                :style="popperStyle">
				<slot name="select-head"></slot>
                <div v-if="isSearch && type!='input'" @click.stop="stopEvent" :class="`${prefixCls}-select-searchIpt`">
                    <i-input v-model="searchText"  
                        @on-input="handleInputEnter"
                        :placeholder="searchPlaceholder">
                        <Icon type="search2" slot="suffix" v-if="!isExtra"></Icon>
                        <Icon type="plus4" slot="suffix" v-if="isExtra" @click.native.stop="addExtra"></Icon>
                    </i-input>
                    <slot name="select-search-bot"></slot>
                </div>
                
                <div v-if="selectedAllContent && isMultiple && filterOptions.length  && (!remoteMethod || (remoteMethod && searchText))" 
                    :class="`${prefixCls}-select-multi-all ${prefixCls}-dropdown-item clearfix`" 
                    @click.stop="selectAll">
                        <i-checkbox  :value="allSelected" v-if="isShowCheckbox"></i-checkbox>
                        <Icon type="checkmark3" v-if="allSelected && !isShowCheckbox" font-size="12" color="#333"></Icon>
                        {{selectedAllContent}}
                </div>
                <slot name="select-content"></slot>
                <ul 
                    :class="[prefixCls+'-select-ul-bd',isMultiple? prefixCls+'-select-ul-multi':'']" 
                    :style="{'max-height':popperMaxHeight+'px'}">
                    <template 
                        v-if="currentOptions.length && (!remoteMethod || (remoteMethod && searchText))"
                        v-for="option in filterOptions">
                        <template v-if="option[originKeys.items]">
                            <li :key="option[originKeys.label]">
                                <div 
                                    :class="prefixCls+'-select-item-group-title'" 
                                    v-html="option[originKeys.label]" 
                                    @click.stop="stopEvent">
                                </div>
                                <ul v-if="option[originKeys.items].length" :class="prefixCls+'-select-item-group-ul'">
                                    <i-option 
                                        v-for="option in option[originKeys.items]"
                                        :key="option[originKeys.value]"
                                        :origin-keys="originKeys"
                                        :option="option"
                                        :prefix-cls="prefixCls"
                                        :is-multiple="isMultiple"
                                        :is-show-checkbox="isShowCheckbox"
                                        :remove-extra="removeExtra"
                                        :find-index="findIndex"
                                        :select="select">
                                        <template slot-scope="props" v-if="$scopedSlots&&$scopedSlots.default">
                                            <slot :data="props.data"></slot>
                                        </template>
                                    </i-option>
                                </ul>
                            </li>
                        </template>
                        <template v-if="!option[originKeys.items]">
                            <i-option 
                                :key="option[originKeys.value]"
                                :option="option"
                                :prefix-cls="prefixCls"
                                :origin-keys="originKeys"
                                :is-multiple="isMultiple"
                                :is-show-checkbox="isShowCheckbox"
                                :remove-extra="removeExtra"
                                :find-index="findIndex"
                                :select="select">
                                <template slot-scope="props" v-if="$scopedSlots&&$scopedSlots.default">
                                    <slot :data="props.data"></slot>
                                </template>
                            </i-option>
                        </template>
                    </template>
                    <li
                        v-if="!filterOptions.length" 
                        :class="`${prefixCls}-select-notFoundTxt`" 
                        v-html="notFoundContent"></li>
                </ul>
                <slot name="select-footer"></slot>
                <div :class="`${prefixCls}-select-notify`" v-if="showNotify" transition="fade">最多选择 {{limit}} 项</div>
            </div>
		</transition>
	</div>
</template>
<script>
    import Icon from '../Icon'
    import Tag from '../Tag'
    import Input from '../Input'
    import {Button} from '../Button'
    import {Checkbox} from '../Checkbox'
    import PopperMixin from '../../mixins/popperMixin';
    import iOption from './Option.vue'
    export default {
        name: 'Select',
        mixins: [PopperMixin],
        props: {
            type: {
                type: String,
                default: 'linear',
            },
            optionsKeys: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            options: {
                type: Array,
                default(){
                    return []
                },
            },
            filterMetod: Function,
            remoteMethod: Function,
            placeholder: {
                type: String,
                default: '请选择',
            },
            searchPlaceholder: {
                type: String,
                default: '可搜索',
            },
            isShowSelect: {
                type: Boolean,
                default: true,
            },
            trigger: {
                type: String,
                default: 'click',
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
            isRemote: {
                type: Boolean,
                default: false
            },
            isExtra: {
                type: Boolean,
                default: false
            },
            popperWidth: {
                type: [Number, String],
            },
            popperMaxHeight: {
                type: [Number, String],
            },
            popperClassName: {
                type: String,
                default: ''
            },
            limit: {
                type: [Number, String],
            },
            placement: {
                type: String,
                default: 'bottomLeft',
            },
            prefixCls: {
                type: String,
                default: 'jad'
            },
            className: {
                type: String,
                default: ''
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
            value: {
                type: [String, Array, Number],
            } 
        },
        data(){
            let options = this.options ? JSON.parse(JSON.stringify(this.options)) : []
            return {
                popperStyle: {},
                showNotify: false,
                currentValue: this.value,
                currentOptions: options,
                searchText: '',
                isSearchFocus: 1,
                multipleSearchStyle: {},
                remoteList: [],
                originKeys: {
                    value: 'value',
                    label: 'label',
                    isDisabled: 'isDisabled',
                    items: 'items'
                },
                
            }
        },
        components: {
            iOption,
            Icon,
            iTag: Tag,
            iInput: Input,
            iButton: Button,
            iCheckbox: Checkbox,
        },
        computed: {
            
            iptOpacity(){
                let isSearchFocus = this.isSearchFocus
                switch (isSearchFocus) {
                    case 1:
                        return 1;
                    case 2:
                        return 0.3;
                    case 3:
                        return 0;
                }
            },
            filterOptions() {
                return this.filter(this.currentOptions, this.searchText)
            },
            wrapClasses() {
                let {prefixCls, isDisabled, className, type, isSearch, isMultiple} = this
                return [
                    `${prefixCls}-dropdown ${prefixCls}-select`,
                    {
                        [`${prefixCls}-dropdown-disabled`]: isDisabled,
                        [`${prefixCls}-select-input-search-wrap`]: type == 'input' && isSearch && !isMultiple,
                        [`${className}`]: !!className
                    }
                ]
            },
            popperClasses() {
                let {prefixCls, popperClassName, size} = this
                return [
                    `${prefixCls}-dropdown-popper ${prefixCls}-select-popper ${prefixCls}-click-popper`,
                    {
                        [`${popperClassName}`]: !!popperClassName,
                        [`${prefixCls}-select-popper-${size}`]: size
                    }
                ]
            },
            multiWrapClasses() {
                let {prefixCls, size, isDisabled} = this
                return [
                    `${prefixCls}-select-input-mulit-wrap`,
                    {
                        [`${prefixCls}-select-input-mulit-${size}`]: !!size,
                        [`${prefixCls}-select-input-mulit-disabled`]: !!isDisabled,
                    }
                ]
            },
            valueArray: {
                get() {
                    let tempVal
                    if (Array.isArray(this.currentValue)) {
                        tempVal = this.currentValue
                    } else {
                        tempVal = [this.currentValue]
                    }
                    return this.findInOptions(tempVal)
                },
                set(value) {
                    let me = this
                    let originKeys = me.originKeys
                    if (this.isMultiple) {
                        let ret = []
                        for (let i = 0; i < value.length; i++) {
                            ret.push(value[i][originKeys.value])
                        }
                        let timeout
                        if (timeout) clearTimeout(timeout)
                        if (ret.length > this.limit) {
                            this.showNotify = true
                            this.remove(value, this.limit)
                            timeout = setTimeout(() => {
                                me.showNotify = false
                            }, 1000)
                        } else {
                            this.currentValue = ret
                        }
                        this.popper && this.updatePopper();
                    } else {
                        this.currentValue = value[0] ? value[0][originKeys.value] : ''
                    }
                    
                }
            },
            selectItem() {
                let originKeys = this.originKeys
                return this.valueArray && this.valueArray.length ? this.valueArray[0][originKeys.label] : ''
            },
            allSelected() {
                let currentOptions = []
                let originKeys = this.originKeys
                this.currentOptions.forEach(function (opt){
                    if (opt[originKeys.items] && opt[originKeys.items].length){
                        currentOptions = currentOptions.concat(opt[originKeys.items])
                    } else {
                        currentOptions.push(opt)
                    }
                })
                currentOptions = currentOptions.filter((item) => { 
                    return !item[originKeys.isDisabled]
                })
                let options = this.filter(currentOptions, this.searchText)
                let values = this.currentValue
                if (!values || options.length !== values.length || options.length === 0) {
                    return false
                }
                for (let i = 0, l = options.length; i < l; i++) {
                    let value = options[i][originKeys.value]
                    if (values.indexOf(value) === -1) {
                        return false
                    }
                }
                return true
            },
            
        },
        watch: {
            optionsKeys: {
                handler(val){
                    this.originKeys = Object.assign({}, this.originKeys, val)
                },
                deep: true,
                immediate: true
            },
            //监听下拉层
            isShow(val) {
                let me = this
                
                if (val){
                    this.updataWidth()
                    if (this.isMultiple && this.type == 'input' && this.isSearch) {
                        this.$refs.searchInput.focus()
                    }
                    //console.log(this.popper.options,'this.popper.options')
                } else {
                    if (this.remoteMethod){
                        this.remoteList = JSON.parse(JSON.stringify(me.valueArray))
                    }
                    me.isSearchFocus = 1;
                    me.searchText = '';
                }
               
            },
            //搜索框文本
            searchText(val){
                if (this.isMultiple && this.type == 'input' && this.isSearch){
                    this.$nextTick(() => { 
                        this.multipleSearchStyle = val 
                            ? {width: `${this.$refs.searchInputText.offsetWidth + 2}px`} 
                            : (this.valueArray.length ? {width: '9px'} : {}); 
                    });
                }
                
                if (this.remoteMethod){
                    this.remoteMethod(val)
                } 
                this.$nextTick(() => {
                    this.popper && this.updatePopper();
                })
            },
            //传入数据
            options: {
                handler(val){
                    let newVal = val ? JSON.parse(JSON.stringify(val)) : []
                    this.currentOptions = JSON.parse(JSON.stringify(newVal))
                    if (this.remoteMethod){
                        let remoteList = JSON.parse(JSON.stringify(newVal))
                        this.remoteList = this.findInSelectOption(this.valueArray, remoteList)
                    }
                },
                deep: true
            },
            value: {
                handler(val){
                    if (val){
                        this.currentValue = val
                    }
                },
                immediate: true
            },
            isSearch: {
                handler(val){
                    if (val && this.type == 'input'){
                        this.isToggle = false
                    }
                },
                immediate: true
            },
            currentValue(val, oldVal) {
                this.$emit('input', val)
                //是否返回选中的对象
                
                let tempVal
                if (Array.isArray(val)) {
                    tempVal = val
                } else {
                    tempVal = [val]
                }
                if (JSON.stringify(oldVal) != JSON.stringify(val)){
                    this.$emit('on-select', {
                        selectedVal: val,
                        selectedOption: this.findInOptions(tempVal)
                    })
                }
                
                if (this.isMultiple && this.type == 'input' && this.isSearch){
                    this.$nextTick(() => { 
                        this.multipleSearchStyle = this.valueArray.length ? {width: '9px'} : {}
                    });
                    this.$refs.searchInput.focus()
                }
                if (this.isMultiple && this.popper){
                    this.$nextTick(() => {
                        this.updatePopper();
                    })
                }
            }
        },
        methods: {
            updataWidth(){
                let me = this
                let minWidth = me.$el.getBoundingClientRect().width + 'px';
                if (me.popperWidth) {
                    me.popperStyle = {width: `${this.popperWidth}px`};
                }
                me.popperStyle.minWidth = minWidth
            },
            //过滤要显示的下拉数据
            filter(value, search) {
                if (search === '') return value
                let originKeys = this.originKeys
                let ret = []
                for (let i = 0, l = value.length; i < l; i++) {
                    if (this.isSearch && this.filterMetod) {
                        let item = this.filterMetod(value[i], search)
                        item ? ret.push(value[i]) : 0
                    } else {
                        let v = value[i] && String(value[i][originKeys.label]).replace(/<.*?>/g, '')
                        let s = search
                        if (v != '' && v.indexOf(s) > -1 && !value[i][originKeys.isDisabled]) {
                            ret.push(value[i])
                        }
                    }
                    
                }

                return ret
            },
            //全选
            selectAll() {
                let originKeys = this.originKeys
                if (this.allSelected) {
                    this.valueArray = []
                } else {
                    let currentOptions = []
                    this.currentOptions.forEach(function (opt){
                        if (opt[originKeys.items] && opt[originKeys.items].length){
                            currentOptions = currentOptions.concat(opt[originKeys.items])
                        } else {
                            currentOptions.push(opt)
                        }
                    })
                    currentOptions = currentOptions.filter((item) => { 
                        return !item[originKeys.isDisabled]
                    })
                    this.valueArray = this.filter(currentOptions, this.searchText)
                }
            },
            //额外添加不存在列表的数据
            addExtra() {
                let originKeys = this.originKeys
                if (this.isExtra && this.searchText.replace(/\s+$|^\s+/g, '')) {
                    let index = this.findIndex(this.searchText, this.currentOptions)
                    if (index == -1){
                        this.currentOptions.push({
                            [originKeys.value]: this.searchText, 
                            [originKeys.label]: this.searchText, 
                            isExtra: true})
                        this.add({
                            [originKeys.value]: this.searchText, 
                            [originKeys.label]: this.searchText, 
                            isExtra: true})
                        this.searchText = ''
                    }
                }
            },
            //删除额外添加的
            removeExtra(option) {
                let originKeys = this.originKeys
                let optionIndex = this.findIndex(option[originKeys.value], this.currentOptions)
                let currenArrIndex = this.findIndex(option[originKeys.value])
                if (optionIndex > -1){
                    this.currentOptions.splice(optionIndex, 1)
                }
                if (currenArrIndex > -1){
                    this.remove(this.valueArray, currenArrIndex, 1)
                }
                
            },
            findInOptions(a) {
                let options = this.currentOptions
                let ret = []
                if (this.remoteMethod){
                    options = this.remoteList
                }
                
                for (let i = 0; i < a.length; i++) {
                    let findObj = this.find(a[i], options)
                    findObj != null ? ret.push(findObj) : 0
                }
                return ret
            },
            findInSelectOption(val, array){
                let originKeys = this.originKeys
                let ret = array || []
                for (let i = 0; i < val.length; i++) {
                    let findIndex = this.findIndex(val[i][originKeys.value], array)
                    findIndex == -1 ? ret.push(val[i]) : 0
                }
                return ret
            },
            find(v, array) {
                let tempArr = array || this.valueArray
                let endObj = null
                let originKeys = this.originKeys
                tempArr.forEach(function (opt){
                    if (opt[originKeys.items] && opt[originKeys.items].length){
                        opt[originKeys.items].forEach(function (val){
                            if (v === val[originKeys.value]) {
                                endObj = val
                            }
                        })
                    } else if (v === opt[originKeys.value]) {
                        endObj = opt
                    }
                })
                return endObj
            },
            findIndex(v, array) {
                let tempArr = array || this.valueArray
                let originKeys = this.originKeys
                for (let i = 0; i < tempArr.length; i++) {
                    if (v === tempArr[i][originKeys.value]) {
                        return i
                    }
                }
                return -1
            },
            add(option) {
                let valueArray = this.valueArray.slice(0)
                if (this.isMultiple) {
                    valueArray.push(option)
                } else {
                    valueArray = [option]
                }
                this.valueArray = Object.assign([], valueArray)
            },
            //删除选中
            del(item) {
                let originKeys = this.originKeys
                let index = this.findIndex(item[originKeys.value])
                
                this.remove(this.valueArray, index, 1)
            },
            remove(array, index, num) {
                let copyArr = array.slice(0)
                num ? copyArr.splice(index, num) : copyArr.splice(index)
                this.valueArray = copyArr
            },
            //清空输入框
            clear(){
                this.valueArray = []
                this.searchText = ''
                if (this.isMultiple && this.type == 'input' && this.isSearch){
                    this.$refs.searchInput.focus()
                }
            },
            //点击下拉条
            select(option, event) {
                if (option.isDisabled) { 
                    event.stopPropagation()
                    return
                }
                let index = this.findIndex(option.value)
                if (this.isMultiple) {
                    this.stopEvent(event)
                    index === -1 ? this.add(option) : this.remove(this.valueArray, index, 1)
                    
                } else {
                    index === -1 ? this.valueArray = [option] : this.cancelled ? this.valueArray = [] : 0
                    this.hidePopper()
                }
                
            },
            //阻止冒泡
            stopEvent(e){
                e.stopPropagation()
            },
            //type=input isSearch=true 获取焦点
            searchFocus() {
                this.isSearchFocus = 2;
                this.$emit('focus');
            },
            //type=input isSearch=true 实时输入
            handleInputEnter(){
                this.isSearchFocus = 3;
            }
        }

    };
</script>



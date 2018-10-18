/* eslint-disabled */
<template>
    <label :class="wrapClasses">
        <span :class="checkboxClasses">
            <span :class="innerClasses"></span>
            <input
                v-if="isGroup"
                type="checkbox"
                :class="inputClasses"
                :disabled="isDisabled"
                :name="name"
                :value="label"
                v-model="model">
            <input
                v-else
                type="checkbox"
                :class="inputClasses"
                :disabled="isDisabled"
                :name="name"
                :value="label"
                v-model="model">
        </span>
        <span :class="labelClasses">
            <slot><span v-if="!$slots.default">{{ label ? label : '' }}</span></slot>
        </span>
    </label>
</template>

<script>
import {findComponentUpward} from '../../utils/assist';
import eventMixin from '../../mixins/eventMixin';

export default {
    name: 'Checkbox',
    mixins: [eventMixin],
    props: {
        prefixCls: {
            type: String,
            default: 'jad-checkbox'
        },
        isDisabled: {
            type: Boolean
        },
        value: {
            type: [String, Number, Boolean, Array]
        },
        label: {
            type: [String, Number, Boolean]
        },
        indeterminate: {
            type: Boolean
        },
        className: {
            type: String
        },
        name: {
            type: String
        }
    },
    data() {
        return {
            currentValue: this.value,
            parent: null
        };
    },
    computed: {
        wrapClasses() {
            let {prefixCls, isDisabled, className, isChecked} = this;
            
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-wrapper-disabled`]: !!isDisabled,
                    [`${prefixCls}-wrapper-checked`]: !!isChecked,
                    [`${className}`]: !!className
                }
            ]
            
        }, 
        checkboxClasses() {
            let {prefixCls, isDisabled, isChecked, indeterminate} = this;
            
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-disabled`]: !!isDisabled,
                    [`${prefixCls}-checked`]: !!isChecked,
                    [`${prefixCls}-indeterminate`]: !!indeterminate
                }
            ]
            
        },
        innerClasses() {
            return `${this.prefixCls}-inner`;
        },
        inputClasses() {
            return `${this.prefixCls}-input`;
        },
        labelClasses() {
            return `${this.prefixCls}-label`;
        },
        isGroup() {
            this.parent = findComponentUpward(this, 'CheckboxGroup');
            return this.parent ? true : false;
        },
        model: {
            get() {
                return this.isGroup
                    ? this.parent.currentValue
                    : (this.currentValue !== undefined ? this.currentValue : this.selfModel);
            },
            set(val) {
                if (this.isGroup) {
                    this.parent.change(val);
                } else {
                    this.$emit('input', val);
                    this.$nextTick(() => {
                        this.$emit('on-change', val);
                    });
                    this.currentValue !== undefined ? this.currentValue = val : this.selfModel = val;  
                }
            }
        },
        isChecked() {
            return Array.isArray(this.model) ? ~this.model.indexOf(this.label) : this.model;
        }
    },
    watch: {
        value() {
            this.currentValue = this.value;
        }
    }
}
</script>

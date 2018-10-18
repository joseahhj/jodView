<template>
<div 
    :class="stepClassObj" 
    :style="styles" 
    :title="title" 
    :description="description" 
    :icon="icon" 
    :customStepIcon="customStepIcon" >
    <div :class="[prefixCls + '-step-line']" v-if="stepNumber != total" >
        <span></span>
    </div>
    <div :class="[prefixCls + '-step-inner']">
        <div :class="[prefixCls + '-step-head']">
            <div :class="[prefixCls + '-step-head-inner']" >
                <span v-if="customStepIcon" :class="[prefixCls + '-step-head-text']" v-html="customStepIcon"></span>
                <Icon v-else-if="icon" 
                    :type="innerIcon.type" 
                    :font-size="innerIcon.fontSize || '26'" 
                    :color="innerIcon.color" />
                <span v-else-if="status === 'error' || (currentStep == stepNumber && currentStatus === 'error')" :class="[prefixCls + '-step-head-text']">
                    <Icon :type="'cancel3'" />
                </span>
                <span v-else-if="status === 'finish' || (!status && currentStep > stepNumber)" :class="[prefixCls + '-step-head-text']">
                    <Icon :type="'checkmark3'" />
                </span>
                <span v-else :class="[prefixCls + '-step-head-text']">{{ stepNumber }}</span>
            </div>
        </div><div :class="[prefixCls + '-step-main']">
            <span v-if="title || description">
                <div :class="[prefixCls + '-step-title']" v-html="title"></div>
                <div :class="[prefixCls + '-step-description']" v-html="description"></div>
            </span>
            <span v-else :class="[prefixCls + '-step-custom-content']" >
                <slot name="customContent" ></slot>
            </span>
        </div>
    </div>
</div>
</template>

<script>
import {oneOf} from '../../utils/assist';
import Icon from '../Icon'
export default {
    name: 'Step',
    props: {
        status: {
            type: String,
            validator(value) {
                return oneOf(value, ['wait', 'process', 'finish', 'error']);
            }
        },
        title: {
            type: [String, Number, Boolean],
            default: ''
        },
        description: {
            type: [String, Number, Boolean],
            default: ''
        },
        icon: {
            type: [String, Object],
            default: ''
        },
        customStepIcon: {
            type: String,
            default: ''
        },
        className: {
            type: String,
            default: ''
        },
        prefixCls: {
            type: String,
            default: 'jad'
        }
    },
    data() {
        return {
            stepNumber: 0,
            nextError: false,
            total: 1,
            currentStatus: '',
            currentStep: 0,
            currentDirection: ''
        };
    },
    computed: {
        stepClassObj() {
            let {
                prefixCls, 
                className, 
                stepNumber, 
                currentStep, 
                currentStatus, 
                status
            } = this;
            return [
                `${prefixCls}-step`,
                {
                    [`${prefixCls}-step-process`]: !status && currentStep == stepNumber,
                    [`${prefixCls}-step-finish`]: !status && currentStep > stepNumber,
                    [`${prefixCls}-step-error`]: !status && currentStep == stepNumber && currentStatus === 'error',
                    [`${prefixCls}-step-${status}`]: !!status,
                    [`${className}`]: !!className
                }
            ];
        },
        styles() {
            let {currentDirection} = this;
            if (currentDirection === 'vertical') {
                return false;
            }
            return {
                width: `${ 1 / this.total * 100 }%`
            };
        },
        innerIcon() {
            let {icon} = this;
            let tempIcon = {};
            if (typeof icon === 'string') {
                tempIcon.type = icon;
            } else {
                tempIcon = icon;
            }
            return tempIcon;
        }
    },
    components: {
        Icon
    },
    watch: {
        status() {
            
        }
    }
}
</script>

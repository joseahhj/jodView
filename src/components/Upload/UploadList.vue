<template>
    <transition-group :class="listClass" tag="ul" name="upload">
        <li v-for="(file,index) in files" :class="[prefixCls+'-item', file.status]" :key="index">
            <div v-if="listType === 'text'"
                 :class="[prefixCls + '-item-info']">
                <Icon type="file-text-o"></Icon>
                <span>{{file.name}}</span>
            </div>
            <div :class="prefixCls+'-item-status'">
                <span :class="prefixCls+'-item-percent'" v-if="file.status==='uploading'">{{file.percent}}</span>
                <Icon type="checkmark" v-if="file.status==='done'"></Icon>
                <Icon type="cancel"
                        title="删除"
                        @click.native="delFile(file, index)"></Icon>
            </div>
            <j-progress
                    :stroke-width="progressWidth"
                    :is-show-text="listType === 'pic'"
                    :type="listType === 'pic' ? 'circle' : 'line'"
                    :width='140'
                    :percent="file.percent"
                    v-if="file.status==='uploading'"></j-progress>
            <div :class="prefixCls+'-item-info'" v-if="listType === 'pic'">
                <img :src="file.url" :alt="file.name">
            </div>
            <div :class="prefixCls+'-item-mask'" v-if="listType === 'pic'">
                <span @click="preview(file)">
                    <Icon type="eye2"></Icon>
                </span>
                <span @click="delFile(file, index)">
                    <Icon type="trash-o2"></Icon>
                </span>
            </div>
        </li>
        <li key="trigger"
            v-if="listType === 'pic'"
            :class="prefixCls+'-trigger'">
            <slot></slot>
        </li>
    </transition-group>
</template>

<script>
    import JProgress from '../Progress/Progress';
    import Icon from '../Icon';

    export default {
        components: {
            JProgress,
            Icon
        },
        props: {
            prefixCls: {
                type: String,
                default: 'jad-upload-list'
            },
            listType: {
                type: String,
                default: 'text'
            },
            onRemove: Function,
            onPreview: Function,
            files: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        computed: {
            listClass() {
                let {prefixCls, listType} = this;
                return {
                    [prefixCls]: true,
                    [`${prefixCls}-text`]: listType === 'text',
                    [`${prefixCls}-pic`]: listType === 'pic',
                }
            },
            progressWidth() {
                return this.listType === 'pic' ? 6 : 4
            }
        },
        methods: {
            delFile(file, index) {
                this.onRemove(file, index);
            },
            preview(file) {
                this.onPreview(file);
            }
        }
    }
</script>

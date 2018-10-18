<template>
    <div :class="prefixCls">
        <div :class="triggerCls"
             @click="clickHandler"
             v-if="listType !== 'pic'"
             @dragenter.prevent="dragOver = true"
             @dragover.prevent="dragOver = true"
             @dragleave.prevent="dragOver = false"
             @drop.prevent="dropHandler">
            <input type="file"
                   :accept="accept"
                   :name="name"
                   :class="prefixCls+'-input'"
                   @change="changeHandler"
                   :multiple="isMultiple"
                   ref="fileInput">
            <slot>
                <i-button>点击上传</i-button>
            </slot>
        </div>
        <div :class="prefixCls + '-tip'">
            <slot name="tip"></slot>
        </div>
        <upload-list
                :on-remove="removeHandler"
                :on-preview="onPreview"
                :prefix-cls="prefixCls + '-list'"
                :files="uploadList"
                :list-type="listType"
                v-show="isShowList">
            <div :class="triggerCls"
                 v-if="listType === 'pic'"
                 @click="clickHandler"
                 @dragenter.prevent="dragOver = true"
                 @dragover.prevent="dragOver = true"
                 @dragleave.prevent="dragOver = false"
                 @drop.prevent="dropHandler">
                <input type="file"
                       :accept="accept"
                       :name="name"
                       :class="prefixCls+'-input'"
                       @change="changeHandler"
                       :multiple="isMultiple"
                       ref="fileInput">
                <slot>
                    <Icon type="plus3" font-size="48" color="#ccc"></Icon>
                </slot>
            </div>
        </upload-list>
    </div>
</template>
<script>
    import UploadList from './UploadList.vue'
    import Ajax from './ajax'
    import {typeOf} from '../../utils/helper'
    import {Button} from '../Button'
    import Icon from '../Icon';

    const noop = () => {
    };
    export default {
        name: 'Upload',
        components: {
            UploadList,
            iButton: Button,
            Icon
        },
        props: {
            accept: String,
            action: {
                type: String,
                required: true
            },
            beforeUpload: Function,
            beforeRemove: Function,
            data: Object,
            fileList: {
                type: Array,
                default() {
                    return []
                }
            },
            headers: Object,
            isAutoRemove: {
                type: Boolean,
                default: true
            },
            isAutoUpload: {
                type: Boolean,
                default: true
            },
            isCombine: Boolean,
            isDrag: Boolean,
            isMultiple: Boolean,
            isShowList: {
                type: Boolean,
                default: true
            },
            listType: {
                type: String,
                default: 'text'
            },
            maxLength: Number,
            maxSize: Number,
            name: {
                type: String,
                default: 'file'
            },
            onCombine: Function,
            onChange: {
                type: Function,
                default: noop
            },
            onError: {
                type: Function,
                default: noop
            },
            onExceed: Function,
            onPreview: {
                type: Function,
                default: noop
            },
            onProgress: {
                type: Function,
                default: noop
            },
            onRemove: {
                type: Function,
                default: noop
            },
            onSelect: {
                type: Function,
                default: noop
            },
            onSuccess: {
                type: Function,
                default: noop
            },
            prefixCls: {
                type: String,
                default: 'jad-upload'
            },
            suffix: String,
            withCredentials: Boolean

        },
        data() {
            return {
                hasFormData: !!window.FormData,
                uploadList: [],
                dragOver: false,
                tempIndex: 1,
                xhrObj: {}
            }
        },
        computed: {
            triggerCls() {
                let {prefixCls, dragOver, listType, isDrag} = this;
                return {
                    [`${prefixCls}-trigger`]: true,
                    [`${prefixCls}-${listType}`]: ['text', 'pic'].includes(listType) && !isDrag,
                    [`${prefixCls}-drag`]: isDrag && listType === 'text',
                    dragOver: dragOver
                }
            }
        },
        watch: {
            fileList(val) {
                val && val.length && this.createDefault(val);
            }
        },
        methods: {
            clickHandler() {
                let el = this.$refs.fileInput;
                if (!el) return;
                el.click();
            },
            dropHandler(ev) {
                this.dragOver = false;
                const files = ev.dataTransfer.files;
                this.uploadFiles(files);
            },
            changeHandler(ev) {
                const files = ev.target.files;
                if (!files) return;
                this.onSelect(files, this.uploadList);
                this.uploadFiles(files);
            },
            uploadFiles(files) {
                let {maxLength, uploadList, isAutoUpload} = this;
                let postFiles = Array.prototype.slice.call(files);

                if (postFiles.length === 0) return;

                if (!this.isMultiple) {
                    postFiles = postFiles.slice(0, 1);
                }
                if (maxLength && uploadList.length + postFiles.length > maxLength) {
                    this.onExceed && this.onExceed(postFiles, uploadList);
                    return;
                }

                if (this.isCombine && this.onCombine) {
                    //合并文件一次上传
                    let uid = Date.now() + this.tempIndex++;
                    let obj = {
                        raw: postFiles,
                        uid: uid,
                        status: 'uploading',
                        size: '',
                        name: '',
                        percent: 0,
                        response: '',
                        msg: '',
                        url: ''
                    };
                    this.postFile(obj);
                } else {
                    postFiles.forEach(rawFile => {
                        this.createFileObj(rawFile);
                        isAutoUpload && this.postFile(rawFile);
                    });
                }
            },
            createFileObj(rawFile) {
                rawFile.uid = Date.now() + this.tempIndex++;
                let url = '';
                try {
                    url = URL.createObjectURL(rawFile);
                } catch (e) {
                    new Error('browser no support URL APIs');
                }
                let obj = {
                    raw: rawFile,
                    uid: rawFile.uid,
                    status: 'ready',
                    size: rawFile.size,
                    name: rawFile.name,
                    percent: 0,
                    response: '',
                    msg: '',
                    url: url
                };

                this.uploadList.push(obj);
            },
            upload() {
                let postFiles = this.uploadList.reduce((pre, file) => {
                    let arr = [...pre];
                    if (file.status === 'ready') {
                        arr.push(file.raw);
                    }
                    return arr
                }, []);
                postFiles.forEach(raw => {
                    this.postFile(raw);
                });
            },
            postFile(raw) {
                let {suffix, maxSize, beforeUpload, isAutoRemove, onChange, onError} = this;
                const file = this.getFile(raw);
                file.status = 'uploading';
                onChange(file, this.uploadList);
                this.$refs.fileInput.value = null;
                if (suffix) {
                    let fileName = file.name;
                    let typeIndex = fileName.lastIndexOf('.');
                    let type = fileName.slice(typeIndex + 1);
                    let reg = new RegExp(suffix, 'i');
                    if (!reg.test(type)) {
                        file.status = 'error';
                        file.msg = '文件类型不正确';
                        onError(file, this.uploadList);
                        onChange(file, this.uploadList);
                        return;
                    }
                }
                if (maxSize) {
                    if (file.size / 1024 > maxSize) {
                        file.status = 'error';
                        file.msg = '文件大小超限';
                        onError(file, this.uploadList);
                        onChange(file, this.uploadList);
                        return;
                    }
                }

                if (!beforeUpload) {
                    this.post(file);
                    return;
                }

                const before = beforeUpload(file.raw);
                if (before && before.then) {
                    before.then(processedFile => {
                        let type = typeOf(processedFile);
                        if (['file', 'blob'].includes(type)) {
                            file.raw = processedFile;
                            this.post(file);
                        }
                    })
                } else if (before !== false) {
                    this.post(file);
                } else {
                    isAutoRemove && this.removeHandler(file);
                }
            },
            post(file) {
                let {
                    name,
                    data,
                    headers,
                    withCredentials,
                    onProgress,
                    onSuccess,
                    onError,
                    onChange,
                    xhrObj,
                    isCombine,
                    onCombine,
                    isAutoRemove
                } = this;
                let _file = {[name]: file.raw};
                if (isCombine) {
                    _file = onCombine(file.raw);
                }
                let _data = Object.assign({}, data, _file);

                const xhr = Ajax({
                    action: this.action,
                    params: _data,
                    headers: headers,
                    withCredentials: withCredentials,
                    onProgress: e => {
                        file.percent = e.percent;
                        onProgress(e, file);
                    },
                    onSuccess: data => {
                        file.response = data;
                        file.status = 'done';
                        onSuccess(data, file, this.uploadList);
                        onChange(file, this.uploadList);
                        xhrObj[file.uid] && delete xhrObj[file.uid];
                    },
                    onError: e => {
                        file.status = 'fail';
                        file.msg = e.msg;
                        onError(file, this.uploadList);
                        onChange(file, this.uploadList);
                        isAutoRemove && this.removeHandler(file);
                        xhrObj[file.uid] && delete xhrObj[file.uid];
                    }
                });

                xhrObj[file.uid] = xhr;
                if (xhr && xhr.then) {
                    xhr.then(onSuccess, onError);
                }
            },
            abort(file) {
                let {xhrObj} = this;
                if (file) {
                    let uid = file.uid;
                    if (xhrObj[uid]) {
                        xhrObj[uid].abort();
                        delete xhrObj[uid]
                    }
                } else {
                    Object.keys(xhrObj).forEach(uid => {
                        xhrObj[uid] && xhrObj[uid].abort();
                        delete xhrObj[uid]
                    })
                }
            },
            remove(file) {
                this.removeHandler(file);
            },
            //移除文件，当index有值时代表手动删除，会触发beforeRemove钩子，否则不触发beforeRemove钩子
            removeHandler(file, index) {
                let {beforeRemove, abort, getFileIndex, onRemove} = this;
                let flag = index !== null && index > -1;
                let _index = flag ? index : getFileIndex(file);
                const remove = () => {
                    abort(file);
                    _index > -1 && this.uploadList.splice(_index, 1);
                    onRemove(file, this.uploadList);
                };

                if (!beforeRemove) {
                    remove();
                } else if (typeof beforeRemove === 'function') {
                    if (flag) {
                        const result = beforeRemove(file.raw);
                        if (result && result.then) {
                            result.then(() => {
                                remove();
                            }, noop);
                        } else if (result !== false) {
                            remove();
                        }
                    } else {
                        remove();
                    }
                }
            },
            getFile(raw) {
                return this.uploadList.find(file => file.uid === raw.uid);
            },
            getFileIndex(file) {
                return this.uploadList.findIndex(item => item.uid === file.uid)
            },
            createDefault(val) {
                this.uploadList = val.map(item => {
                    let uid = Date.now() + this.tempIndex++;
                    return Object.assign({}, item, {status: 'done', uid: uid});
                })
            },
            clear() {
                this.uploadList = [];
            }
        },
        created() {
            let {fileList} = this;
            fileList && fileList.length && this.createDefault(fileList);
        }
    }
</script>
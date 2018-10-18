//const datePrefixCls = 'jad-date-picker';

export default {
    methods: {
        iconBtnCls(direction, type = '', datePrefixCls) {
            return [
                `${datePrefixCls}-icon-btn`,
                `${datePrefixCls}-${direction}-btn`,
                `${datePrefixCls}-${direction}-btn-arrow${type}`,
            ];
        },
        handlePickClear() {
            this.$emit('on-pick-clear');
        },
        handlePickSuccess() {
            this.$emit('on-pick-success');
        }
    }
};
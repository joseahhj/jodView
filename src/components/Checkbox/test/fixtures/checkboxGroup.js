/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
        fruit: ['apple', 'banana'],
        list: [{
            label: 'apple',
            text: '苹果'
        }, {
            label: 'banana',
            text: '香蕉'
        }, {
            label: 'pear',
            text: '梨'
        }, {
            label: 'watermelon',
            text: '西瓜'
        }, {
            label: 'strawberry',
            text: '草莓'
        }],
        checkAll: false,
        indeterminate: true
    },
    methods: {
        change(value) {
            let checkedCount = value.length;
            this.fruit = value;
            this.checkAll = checkedCount === this.list.length;
            this.indeterminate = checkedCount > 0 && checkedCount < this.list.length;
        },
        handleCheckAll() {
            this.checkAll = this.indeterminate ? false : !this.checkAll;
            this.fruit = this.checkAll ? this.list.map(item => item.label) : [];
            this.indeterminate = false;
        }
    }
})
/*eslint-disable */
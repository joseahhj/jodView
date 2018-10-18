window.app = new Vue({
    el: '#app',
    data: {
        data1: [
            {label: '河北', value: 1, disabled: false},
            {label: '北京', value: 2, disabled: true},
            {label: '天津', value: 3, disabled: false},
            {label: '上海', value: 4, disabled: false},
            {label: '山东', value: 5, disabled: false},
            {label: '江苏', value: 6, disabled: false}
        ],
        data2: [
            {label: '河北', en: 'Hebei', value: 1, disabled: false},
            {label: '北京', en: 'Beijing', value: 2, disabled: false},
            {label: '天津', en: 'Tianjin', value: 3, disabled: false},
            {label: '上海', en: 'Shanghai', value: 4, disabled: false},
            {label: '山东', en: 'Shandong', value: 5, disabled: false},
            {label: '江苏', en: 'Jiangsu', value: 6, disabled: false}
        ],
        data3: [
            {name: '河北', en: 'Hebei', id: 1, ban: false},
            {name: '北京', en: 'Beijing', id: 2, ban: false},
            {name: '天津', en: 'Tianjin', id: 3, ban: false},
            {name: '上海', en: 'Shanghai', id: 4, ban: false},
            {name: '山东', en: 'Shandong', id: 5, ban: false},
            {name: '江苏', en: 'Jiangsu', id: 6, ban: false}
        ],
        data4: [
            {label: '河北', en: 'Hebei', value: 1, disabled: false},
            {label: '北京', en: 'Beijing', value: 2, disabled: false},
            {label: '天津', en: 'Tianjin', value: 3, disabled: false},
            {label: '上海', en: 'Shanghai', value: 4, disabled: false},
            {label: '山东', en: 'Shandong', value: 5, disabled: false},
            {label: '江苏', en: 'Jiangsu', value: 6, disabled: false}
        ],
        buttons: ['添加','删除'],
        titles: ['可选区域','投放区域'],
        value1: [3, 5],
        fields: {
            label: 'name',
            value: 'id',
            disabled: 'ban',
        },
        changeObj: {
            event: '',
            list: [],
            checked: [],
            value: []
        },
        emitChange: false

    },
    methods: {
        handleChange({event, value, list, checked}) {
            this.emitChange = true;
            this.changeObj.event = event;
            this.changeObj.value = value;
            this.changeObj.checked = checked;
            this.changeObj.list = list;
        },
        onFilter(keyword, item) {
            let _key = keyword.toLowerCase();
            let en = item.en.toLowerCase();
            return ~en.indexOf(_key) || ~item.label.indexOf(_key)
        },
        format(checked, len) {
            if (!checked) return '未选择';
            return `已选择${Math.round(checked * 100 / len)}%`
        }
    }
})
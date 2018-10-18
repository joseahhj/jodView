/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
        columns: [{
            key: 'name',
            title: '名字',
            sort: {
                enable: true
            }
        }, {
            key: 'age',
            title: '年龄',
            width: 200,
            render: (text, row, index, column) => {
                return '年龄为：' + text;
            }
        }, {
            key: 'address',
            title: '地址'
        }],
        data: [{
            id: 1,
            name: '王小明',
            age: 18,
            address: '北京市朝阳区芍药居'
        }, {
            id: 2,
            name: '张小刚',
            age: 25,
            address: '北京市海淀区西二旗'
        }, {
            id: 11,
            name: '李小红',
            age: 30,
            address: '上海市浦东新区世纪大道'
        }, {
            id: 12,
            name: '周小伟',
            age: 26,
            address: '深圳市南山区深南大道'
        }],
        rowSelection: {
            type: 'checkbox',
            getCheckboxProps: {
                disabled: row => {
                    return row.age > 25;
                }
            },
            onSelect: (checked, choosableCheckedRows) => {
                window.app.checkedRows = choosableCheckedRows;
            },
            onSelectAll: (checked, choosableCheckedRows) => {
                window.app.checkedRows = choosableCheckedRows;
            }
        },
        checkedRows: [],
        newData: [],
        noData: [],
        expandSelection: {
            type: 'expand'
        }
    },
    methods: {
        sortChange(order, key, column, newData) {
            if (newData) {
                window.app.newData = newData;
            } else {
                console.log(key, '如果定义了remote为true，则可以自定义排序方法sort-remote-change');
            }
        },
        spanMethod(row, column, rowIndex, columnIndex) {
            if (rowIndex === 1) {
                if (columnIndex === 1) {
                    return {
                        rowspan: 1,
                        colspan: 2
                    };
                } else if (columnIndex === 2) {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        }
    }
})
/*eslint-disable */
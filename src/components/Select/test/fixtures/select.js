/*eslint-disable */
window.app = new Vue({
        el: '#app',
        data: {
            fruitOptions: [{
                    value: 'apple',
                    label: '苹果',
                    isDisabled: true
                },
                {
                    value: 'banana',
                    label: '香蕉'
                },
                {
                    value: 'cherry',
                    label: 'Cherry'
                },
                {
                    value: 'orange',
                    label: 'Orange'
                },
                {
                    value: 'grape',
                    label: 'Grape',
                }
            ],
            groupOpt: [{
                label: '重庆',
                items: [{
                    value: 'lp',
                    label: '梁平'
                }, {
                    value: 'wz',
                    label: '万州',
                    isDisabled: true
                }]
            }, {
                label: '四川',
                items: [{
                    value: 'cd',
                    label: '成都'
                }, {
                    value: 'dz',
                    label: '达州'
                }]
            }],
            single: 'banana',
            mutli: ['banana', 'grape'],
            remoteOption: [],
            states: ["Alabama", "Alaska", "Arizona",
                "Arkansas", "California", "Colorado",
                "Connecticut", "Delaware", "Florida",
                "Georgia", "Hawaii", "Idaho", "Illinois",
                "Indiana", "Iowa", "Kansas", "Kentucky",
                "Louisiana", "Maine", "Maryland",
                "Massachusetts", "Michigan", "Minnesota",
                "Mississippi", "Missouri", "Montana",
                "Nebraska", "Nevada", "New Hampshire",
                "New Jersey", "New Mexico", "New York",
                "North Carolina", "North Dakota", "Ohio",
                "Oklahoma", "Oregon", "Pennsylvania",
                "Rhode Island", "South Carolina",
                "South Dakota", "Tennessee", "Texas",
                "Utah", "Vermont", "Virginia",
                "Washington", "West Virginia", "Wisconsin",
                "Wyoming"
            ],
            filterOptions: [{
                value: '1',
                label: '河北',
                jp: 'HB',
                qp: 'HeiBei',
            }, {
                value: '2',
                label: '河南',
                jp: 'HN',
                qp: 'HeiNan',
            }, {
                value: '3',
                label: '海南',
                jp: 'HN',
                qp: 'HaiNan',
            }],
        },
        mounted() {
            this.list = this.states.map(item => {
                return {
                    value: item,
                    label: item
                };
            });
        },
        methods: {
            selectedHandler(val) {
                console.log('我是select单选选中的' + val.selectedVal)
            },
            remoteMethod(query) {
                if (query !== '') {
                    //setTimeout(() => {
                    this.remoteOption = this.list.filter(item => {
                        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });
                    //}, 200);
                } else {
                    this.remoteOption = [];

                }
            },
            filter(item, val) {
                const input = val.toLocaleUpperCase();
                return item.label.startsWith(input) ||
                    item.jp.startsWith(input) ||
                    item.qp.startsWith(input);
            },
        }

    })
    /*eslint-disable */
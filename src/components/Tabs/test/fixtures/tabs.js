/*eslint-disable */
window.app = new Vue({
    el: '#app',
    components: {
        tab1:{
            template: '<p>tab11111</p>'
        },
        tab2:{
            template: '<p>tab22222</p>'
        },
        tab3:{
            template: '<p>tab33333</p>'
        }
    },
    data: {
        index: 3,
        currentView: 'tab3',
        paneList: [
            {label: '标签一', name: 'one', content: '我是标签一的内容'},
            {label: '标签二', name: 'two', content: '我是标签二的内容'},
            {label: '标签三', name: 'three', content: '我是标签三的内容'},
        ],
        dataList: [
            {
                name: 'tab1',
                label: '我是标签一11111',
                icon: 'github'
            },
            {
                name: 'tab2',
                label: '我是标签二22222',
                isDisabled: true
            },
            {
                name: 'tab3',
                label: '我是标签三'
            }
        ]
    },
    methods: {
        add() {
            this.index++
            this.paneList.push({name: 'four'+this.index, label: '标签'+this.index, content: '我是标签'+this.index+'的内容'})
        },
        handle(item) {
            this.currentView = item.name
        }
    }
})
/*eslint-disable */
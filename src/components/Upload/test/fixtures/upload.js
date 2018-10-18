window.app = new Vue({
    el: '#app',
    data: {
        hasError: false,
        tip: '',
        defaultTip: '请上传500k以内的文件',
        buttons: ['添加', '删除'],
        titles: ['可选区域', '投放区域'],
        value1: [3, 5],
        emitChange: false,
        firstList: [],
        fileList: [
            {
                url: '//img1.360buyimg.com/da/jfs/t22009/356/2115822821/18508/bab1bb04/5b4893e3Nba8a7be6.jpg',
                name: '班尼路'
            },
            {
                url: '//img1.360buyimg.com/da/jfs/t24139/121/853815729/81174/5e705ddd/5b45d96aNcbe11612.jpg',
                name: '奥克斯空调'
            }
        ],

    },
    methods: {
        handleChange({event, value, list, checked}) {

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
    },
})
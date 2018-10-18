/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
        list: [
            {
                name: '卡片数据一'
            },
            {
                name: '卡片数据二'
            },
            {
                name: '卡片数据三'
            }
        ],
        gutter: 16
    },
    methods: {
        showMessage() {
            console.log('共有' + this.list.length + '条卡片数据');
        },
        currentDate() {
            let date  = new Date();
            let time = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                hour: date.getHours(),
                minutes: date.getMinutes(),
                seconds: date.getSeconds()
            };

            return time.year + '-' + time.month + '-' + time.day + ' '
                + (time.hour <= 9 ? '0' + time.hour : time.hour) + ':'
                + (time.minutes <= 9 ? '0' + time.minutes : time.minutes) + ':'
                + (time.seconds <= 9 ? '0' + time.seconds : time.seconds);
        },
        showImgMessage() {
            console.log('带图卡片');
        },
    }
})
/*eslint-disable */
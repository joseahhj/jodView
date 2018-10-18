/*eslint-disable */
window.app = new Vue({
        el: '#app',
        data: {
            value1: new Date(),
            value2: [(new Date() - (86400000 * 7)), new Date()],
            value3: '',
            value4: new Date(),
            dateType: 'week',
            timeType:'time',
            cType:'datetimerange',
            currentDate: '',
            shortcuts2: [
                {
                    text: '不限',
                    value () {
                        return '';
                    }
                },
                {
                    text: '今天',
                    value () {
                        return new Date();
                    }
                },
                {
                    text: '昨天',
                    value () {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        return date;
                    }
                },
                {
                    text: '一周前',
                    value () {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        return date;
                    }
                }
            ],
            options3: {
                rangeLimit:30,//双日历  一次最多能选的天数
                disableStartDay:'2018-3-20',//这个时间之前不能选
                disableEndDay:new Date()//这个时间之后不能选
            },
            options4: {
                disableEndDay: new Date(),//这个时间之后不能选
            },
            isClearable: false,
            isManual: false,
            innitDate: '',
            ymType: 'month'
        },
        methods: {
            changeManual(){
                this.isManual = !this.isManual
            },
            selectedDate(Obj) {
                console.log(Obj, '我是选择的日历')
            },
            selectedSingleDate(Obj) {
                console.log('clickrili',Obj)
                this.currentDate = Obj
            },
            selectedDateA(obj){
                this.innitDate = (obj.start ? (obj.start +'至') : '') +  (obj.end? obj.end:'')
            },
            clear(){
                this.isManual=false
                this.innitDate =  ''
            }
        }
    })
    /*eslint-disable */
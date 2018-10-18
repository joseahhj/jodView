/*eslint-disable */
import {
    loadFixture,
    testVM,
    setData,
    nextTick,
    sleep,
    triggerEvent
} from '../../../../tests/utils'
import dateUtil from '../../../utils/date';
const formatDate = function (val, format) {
    const date = val ? new Date(val) : new Date();
    return dateUtil.format(date, format || 'yyyy-MM-dd');
};
const initTimeDate = function (val) {
    const date = val ? new Date(val) : new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
};
describe('datePicker', async() => {
    beforeEach(loadFixture(__dirname, 'datePicker'))
    testVM()

    it('Snapshot has the expected html structure', () => {
        const {
            app
        } = window
        expect(app.$el).toMatchSnapshot()
    })
    
    it('open the calendar with the current month',async()=>{
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.single;
        const picker = vm.$children[0];
        picker.$el.click();
        vm.$nextTick(() => {
            const calendarBody = document.querySelector('.basic_single_test').querySelector('.jad-date-picker-body .jad-date-picker-inner');
            const calendarCells = [...calendarBody.querySelectorAll('.jad-date-picker-cell')].filter(el => {
                const prevMonth = el.classList.contains('jad-date-picker-cell-prev-month');
                const nextMonth = el.classList.contains('jad-date-picker-cell-next-month');
                return !prevMonth && !nextMonth;
            });
            const today = new Date();
            const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            expect(calendarCells).toHaveLength(daysInCurrentMonth)
        })
    })
    it('should pass correct to change-type and change-input-value ',async()=>{
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.changeType;
        const picker = vm.$children[0];
        picker.$el.click();
        let wrapDom = document.querySelector('.change_type_test')
        await vm.$nextTick(() => {
            const wrapper = wrapDom.querySelector('.jad-date-picker-body-wrapper');
            expect(wrapper).notHaveClass('jad-date-picker-with-range')
            vm.handlerInputChange("第28周 2018-07-08至2018-07-14")
            let dateFormat = '第28周 ' + formatDate(vm.currentValue[0]) + '至' + formatDate(vm.currentValue[1])
            expect(dateFormat).toBe('第28周 2018-07-08至2018-07-14')
            vm.handlerInputChange("第28周")
            expect(dateFormat).toBe('第28周 2018-07-08至2018-07-14')
            console.log(vm.isShow,'change-input-value')
        })
        picker.$el.click();
        setData(app, 'dateType', 'daterange')
        console.log(vm.isShow,'change-input-value')
        await vm.$nextTick(() => {
            const wrapperB = wrapDom.querySelector('.jad-date-picker-body-wrapper');
            expect(wrapperB).toHaveClass('jad-date-picker-with-range')
            vm.handlerInputChange("20180901至20180910")
            
            let dateFormat = formatDate(vm.currentValue[0]) + '至' + formatDate(vm.currentValue[1])
            expect(dateFormat).toBe('2018-09-01至2018-09-10')
            vm.handlerInputChange("20180901")
            expect(dateFormat).toBe('2018-09-01至2018-09-10')
            vm.handlerInputChange("2018-09-10至2018-09-01")
            expect(dateFormat).toBe('2018-09-01至2018-09-10')
        })
        const latestDay = new Date().getTime() + (3600 * 1000 * 24*3);
        await vm.handlerInputChange('2018-03-17至'+formatDate(latestDay))
        let dateFormat = formatDate(vm.currentValue[0]) + '至' + formatDate(vm.currentValue[1])
        expect(dateFormat).toBe('2018-03-20至'+formatDate())
        setData(app, 'dateType', 'date')
        vm.$nextTick(() => {
            let today = new Date()
            vm.handlerInputChange("2018-9-11")
            expect(formatDate(vm.currentValue)).toBe('2018-09-11')
            vm.handlerInputChange(formatDate(latestDay))
            expect(formatDate(vm.currentValue)).toBe(formatDate())
            vm.handlerInputChange('2018-03-17')
            expect(formatDate(vm.currentValue)).toBe(formatDate())

        })
        vm.emitChange('')
        vm.handlerShortcutClick(app.shortcuts2[1])
        expect(formatDate(vm.currentValue)).toBe(formatDate())
        
    })
    
    it('click cell and shortcut with type is date',async()=>{
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.click_single;
        const picker = vm.$children[0].$el;
        picker.click()
        const today = formatDate();
        //选择今日
        await vm.$nextTick(() => {//jad-date-picker-cell-today
            vm.handlerInputChange('2018-03-17')
            expect(formatDate(vm.currentValue)).toBe('2018-03-17')
            const calendarBody = document.querySelector('.click_single_test').querySelector('.jad-date-picker-body .jad-date-picker-inner');
            const todayDom = calendarBody.querySelector('.jad-date-picker-cell-today')
            const todayDomEm = todayDom.querySelector('em')
            todayDomEm.click()
            
            const selectDay = formatDate(app.currentDate)
            expect(selectDay).toBe(today)
            vm.$nextTick(()=>{
                expect(todayDom).toHaveClass('jad-date-picker-cell-selected')
            })

        })
        vm.handlerMonuseInput(1)
        vm.handlerClickIcon()
        expect(formatDate(vm.currentValue)).toBe(formatDate())
        await setData(app, 'isClearable', true)
        vm.handlerMonuseInput(1)
        vm.handlerClickIcon()
        expect(vm.currentValue).toBe('')
    })
    it('click cell with type is week',async()=>{
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.changeType;
        const picker = vm.$children[0];
        picker.$el.click();
        let wrapDom = document.querySelector('.change_type_test')
        vm.$nextTick(() => {
            const wrapper = wrapDom.querySelector('.jad-date-picker-body-wrapper');
            expect(wrapper).notHaveClass('jad-date-picker-with-range')
            const todayDom = wrapDom.querySelector('.jad-date-picker-cell-today')
            const todayDomEm = todayDom.querySelector('em')
            todayDomEm.click()
            const weekDay = formatDate(vm.currentValue[0]) + '|' + formatDate(vm.currentValue[1])
            expect(vm.currentValue.length).toBe(2)
            expect(formatDate(vm.currentValue[1])).toBe(formatDate())
        })
    })
    it('click cell with type is year',async()=>{
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.date_year;
        const picker = vm.$children[0].$el;
        picker.click()
        //选择月
        vm.$nextTick(() => {
            const wrapper = document.querySelector('.change_year_test').querySelector('.jad-date-picker-body-wrapper')
            const calendarBody = wrapper.querySelector('.jad-date-picker-yearRange');
            const todayDom = calendarBody.querySelectorAll('.jad-date-picker-cell')
            const disabledMonth = calendarBody.querySelector('.jad-date-picker-cell-disabled').querySelector('em')
            let disIndex = disabledMonth.getAttribute('index')
            const todayDomEm = todayDom[disIndex-2].querySelector('em')
            todayDomEm.click()
            const todayM = new Date()
            const tYear = todayM.getFullYear()-1
            const selectDay = formatDate(vm.currentValue,'yyyy')
            expect(selectDay).toBe(tYear+'')
            disabledMonth.click()
            expect(selectDay).toBe(tYear+'')
            calendarBody.click()
        })
    })
    it('click cell with type is time',()=>{
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.changeSingleTime;
        const picker = vm.$children[0];
        picker.$el.click();
        vm.$nextTick(() => {
            const wrapper = document.querySelector('.change_single_time_test').querySelector('.jad-date-picker-inner');
            const ulList = wrapper.querySelectorAll('.jad-time-picker-ul')
            const hours = ulList[0].querySelectorAll('.jad-time-picker-cell')
            const minutes = ulList[1].querySelectorAll('.jad-time-picker-cell')
            const seconds = ulList[2].querySelectorAll('.jad-time-picker-cell')
            const pickerTable = vm.$refs.pickerTable
            vm.handlerInputChange(" ")
            expect(vm.currentValue).toBe("")
            vm.handlerInputChange("00:05:03")
            expect(vm.currentValue).toBe("00:05:03")
            vm.handlerInputChange("00:10:03")
            expect(vm.currentValue).toBe("")
            hours[2].click()
            expect(pickerTable.hours).toBe(2)
            minutes[10].click()
            expect(pickerTable.minutes).toBe('')
            seconds[11].click()
            expect(pickerTable.seconds).toBe(11)
        })
    })
    it('on-select with isShowConfirm and isShowClear is true',async()=>{
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.basic_input;
        const picker = vm.$children[0].$el;
        picker.click()
        vm.handlerInputChange("2018-09-13 00:00:00至2018-09-20 00:00:00")
        await vm.$nextTick( async() => {
            const wrapper = document.querySelector('.basic_input_test .jad-date-picker-body-wrapper')
            const btnTime = wrapper.querySelector('.jad-date-picker-confirm .jad-date-picker-confirm-time')
            const confirmBtn = wrapper.querySelector('.jad-date-picker-confirm .jad-btn-primary')
            btnTime.click()
            vm.handlerInputChange("")
            btnTime.click()
            vm.handlerInputChange("2018-09-13 00:00:00至2018-09-20 00:00:03")
            confirmBtn.click()
            let dateFormat = formatDate(vm.currentValue[0],'yyyy-MM-dd HH:mm:ss') + '至' + formatDate(vm.currentValue[1],'yyyy-MM-dd HH:mm:ss')
            expect(dateFormat).toBe("2018-09-13 00:00:00至2018-09-20 00:00:03")
        })
        // 
        setData(app, 'cType', 'date')
        picker.click()
        //选择单日
        vm.$nextTick(() => {
            const wrapper = document.querySelector('.basic_input_test .jad-date-picker-body-wrapper')
            const calendarBody = wrapper.querySelector('.jad-date-picker-inner');
            const confirmBtn = wrapper.querySelector('.jad-date-picker-confirm .jad-btn-primary')
            const clearBtn = wrapper.querySelector('.jad-date-picker-confirm .jad-btn-default')
            vm.handlerInputChange("2018-09-13")
            clearBtn.click()
            expect(vm.currentValue).toBe('')
            picker.click()
            vm.handlerInputChange("2018-09-14")
            confirmBtn.click()
            const selectDay = formatDate(vm.currentValue)
            expect(vm.currentValue).toBe("2018-09-14")
        })
    })
    it('change-type reload time-picker',async()=>{
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.changeTypeTime;
        const picker = vm.$children[0];
        picker.$el.click();
        await vm.$nextTick(() => {
            const wrapper = document.querySelector('.change_type_time_test').querySelector('.jad-date-picker-inner');
            expect(wrapper).notHaveClass('jad-date-picker-content-left')
        })
        setData(app, 'timeType', 'timerange')
        vm.$nextTick(() => {
            const wrapper = document.querySelector('.change_type_time_test').querySelector('.jad-date-picker-inner');
            expect(wrapper).toHaveClass('jad-date-picker-content-left')
        })
        setData(app, 'timeType', 'time')
    })
    it('click cell with type is month',()=>{
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.date_month;
        const picker = vm.$children[0].$el;
        
        picker.click()
        //选择月
        vm.$nextTick(() => {
            const pickerTable = vm.$refs.pickerTable
            const wrapper = document.querySelector('.change_month_test').querySelector('.jad-date-picker-body-wrapper')
            const calendarBody = wrapper.querySelector('.jad-date-picker-body .jad-date-picker-monthRange');
            const todayDom = calendarBody.querySelectorAll('.jad-date-picker-cell')
            const todayDomEm = todayDom[0].querySelector('em')
            todayDomEm.click()
            const todayMonth = new Date()
            const curMonth = todayMonth.getMonth()
            const tYear= todayMonth.getFullYear()
            const selectDay = formatDate(vm.currentValue,'yyyy-MM')
            expect(selectDay).toBe(tYear+'-01')
            picker.click()
            const disabledMonth = todayDom[curMonth+1].querySelector('em')
            disabledMonth.click()
            expect(selectDay).toBe(tYear+'-01')
            calendarBody.click()
            const headBox = wrapper.querySelector('.jad-date-picker-ctrl')
            const headLabel = headBox.querySelector('.jad-date-picker-header-label')
            
            pickerTable.handleClickYear('prev')
            let prevYear = tYear-1
            expect(pickerTable.year).toBe(prevYear)
            pickerTable.handleClickYear('next')
            expect(pickerTable.year).toBe(prevYear+1)
            headLabel.click()
            expect(pickerTable.currentView).toBe('year')
            pickerTable.handleClickYear('prev')
            pickerTable.handleClickYear('next')
        })

    })
    it('click cell with type is daterange ',async()=>{
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.changeType;
        const picker = vm.$children[0];
        setData(app, 'dateType', 'daterange')
        picker.$el.click();
        let wrapDom = document.querySelector('.change_type_test')
        vm.$nextTick(() => {
            const wrapper = wrapDom.querySelector('.jad-date-picker-body-wrapper');
            const todayDom = wrapDom.querySelector('.jad-date-picker-cell-today')
            const todayDomEm = todayDom.querySelector('em')
            todayDomEm.click()
            todayDomEm.click()
            const weekDay = formatDate(vm.currentValue[0]) + '|' + formatDate(vm.currentValue[1])
            expect(vm.currentValue.length).toBe(2)
            expect(formatDate(vm.currentValue[1])).toBe(formatDate())
        })
    })
    it('render correct with isManual is true',async()=>{
        const {
            app: {
                $refs
            }
        } = window
        let vm = $refs.manual_date;
        const picker = $refs.clickManual.$el;
        const btnSure = $refs.clickManualSure.$el
        vm.$children[0].$el.click();
        const wrap = document.querySelector('.change_manual_test')
        vm.$nextTick(() => {
            expect(vm.isManual).toBe(true)
            console.log(vm.isManual,'vm.isManual')
            vm.handlerClose()
            expect(vm.isShow).toBe(true)
            btnSure.click()
        })
        
    })
})
    /*eslint-disable */
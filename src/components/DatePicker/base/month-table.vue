<template>
    <div :class="[prefixCls + '-inner']">
        <div :class="classes" @click="handleClick">
            <span :class="getCellCls(cell)" v-for="(cell, index) in cells" :key="index">
                <em :index="index">{{ monthLabel[index]}}</em>
            </span>
        </div>
    </div>
</template>
<script>
    import {disabledRangeDate} from '../util';
    export default {
        props: {
            date: {
                validator(value) {
                    return !!new Date(value).getTime() || !value;
                },
                default: ''
            },
            month: {
                type: [Number, String],
                default: '',
            },
            disableStartDay: {
                validator(value) {
                    return !!new Date(value).getTime() || !value;
                },
                default: ''
            },
            disableEndDay: {
                validator(value) {
                    return !!new Date(value).getTime() || !value;
                },
                default: ''
            },
            selectionMode: {
                type: String,
                default: 'month'
            },
            monthLabel: {
                type: Array,
                default(){
                    return ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            },
            prefixCls: {
                type: String,
                default: ''
            }
        },
        computed: {
            classes() {
                const {prefixCls} = this;
                return [
                    `${prefixCls}-monthRange`
                ];
            },
            cells() {
                let cells = [];
                const me = this;
                const cell_tmpl = {
                    text: '',
                    selected: false,
                    disabled: false
                };

                for (let i = 0; i < 12; i++) {
                    const cell = JSON.parse(JSON.stringify(cell_tmpl));
                    cell.text = i + 1;
                    const date = new Date(this.date);
                
                    date.setMonth(i);
                
                    cell.disabled = disabledRangeDate(date, me.disableStartDay, me.disableEndDay) 
                                && this.selectionMode === 'month'
                    cell.selected = Number(this.month) === i;
                    cells.push(cell);
                }
                return cells;
            }
        },
        methods: {
            getCellCls(cell) {
                const {prefixCls} = this;
                return [
                    `${prefixCls}-cell`,
                    {
                        [`${prefixCls}-dateRange-item-active`]: !!cell.selected,
                        [`${prefixCls}-cell-disabled`]: !!cell.disabled
                    }
                ];
            },
            handleClick(event) {
                const target = event.target;
                if (target.tagName === 'EM') {
                    const index = parseInt(event.target.getAttribute('index'), 10);
                    const cell = this.cells[index];
                    if (cell.disabled) return;
                    this.$emit('on-pick', index);
                }
            },
            
        }
    };
</script>
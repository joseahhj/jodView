<template>
<div :class="[prefixCls + '-inner']">
    <div :class="classes" @click="handleClick">
        <span :class="getCellCls(cell)" v-for="(cell, index) in cells" :key="index">
            <em :index="index">{{ cell.text }}</em>
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
            year: {
                type: [Number, String],
                default: ''
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
                default: 'year'
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
                    `${prefixCls}-yearRange`
                ];
            },
            startYear() {
                return Math.floor(this.year / 10) * 10;
            },
            cells() {
                let cells = [];
                const me = this;
                const cell_tmpl = {
                    text: '',
                    selected: false,
                    disabled: false
                };
                for (let i = 0; i < 10; i++) {
                    //const cell = deepCopy(cell_tmpl);
                    const cell = JSON.parse(JSON.stringify(cell_tmpl));
                    cell.text = this.startYear + i;
                    const date = new Date(this.date);
                    date.setFullYear(cell.text);
                    cell.disabled = disabledRangeDate(date, me.disableStartDay, me.disableEndDay) 
                                    && this.selectionMode === 'year'
                    cell.selected = Number(this.year) === cell.text;
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
            nextTenYear() {
                this.$emit('on-pick', Number(this.year) + 10, false);
            },
            prevTenYear() {
                this.$emit('on-pick', Number(this.year) - 10, false);
            },
            handleClick(event) {
                const target = event.target;
                if (target.tagName === 'EM') {
                    const cell = this.cells[parseInt(event.target.getAttribute('index'), 10)];
                    if (cell.disabled) return;
                    this.$emit('on-pick', cell.text);
                }
            }
        }
    };
</script>
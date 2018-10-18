import Picker from '../Picker.vue';
import DatePanel from '../panel/date.vue';
import Week from '../panel/week.vue';
import DateRangePanel from '../panel/date-range.vue';

const getPanel = function (type) {
    return ~type.indexOf('range') ? 
        DateRangePanel : (type === 'week' ? Week : DatePanel);
};

import {
    oneOf
} from '../../../utils/assist';

export default {
    mixins: [Picker],
    name: 'DatePicker',
    props: {
        type: {
            default: 'date',
            validator(value) {
                return oneOf(value, ['year', 'month', 'date', 'daterange', 'datetime', 'datetimerange', 'week']);
            },

        },
        value: {}
    },
    created() {
        if (!this.currentValue) {
            let isType = this.type === 'daterange' 
                || this.type === 'datetimerange' 
                || this.type === 'week'
            this.currentValue = isType ? ['', ''] : ''
        }

        this.panel = getPanel(this.type);
    },
    watch: {
        type(val){
            this.panel = getPanel(val);
            let isType = val === 'daterange' 
                || val === 'datetimerange' 
                || val === 'week'
            this.currentValue = isType ? ['', ''] : ''
        }
    }
};
import Picker from '../Picker.vue';
import TimePanel from '../panel/time.vue';
import TimeRangePanel from '../panel/time-range.vue';
import Options from '../time-mixins';

const getPanel = function (type) {
    return type === 'timerange' ? TimeRangePanel : TimePanel;
};

import {oneOf} from '../../../utils/assist';

export default {
    mixins: [Picker, Options],
    name: 'TimePicker',
    props: {
        type: {
            validator(value) {
                return oneOf(value, ['time', 'timerange']);
            },
            default: 'time'
        },
        value: {}
    },
    created() {
        if (!this.currentValue) {
            this.currentValue = this.type === 'timerange' ? ['', ''] : ''
        }
        this.panel = getPanel(this.type);
    },
    watch: {
        type(val){
            this.currentValue = val === 'timerange' ? ['', ''] : ''
            this.panel = getPanel(val);
        }
    }
};
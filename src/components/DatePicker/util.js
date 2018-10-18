import dateUtil from '../../utils/date';

export const toDate = function (date) {
    date = new Date(date);
    if (isNaN(date.getTime())) return null;
    return date;
};

export const formatDate = function (date, format) {
    date = toDate(date);
    if (!date) return '';
    return dateUtil.format(date, format || 'yyyy-MM-dd');
};

export const parseDate = function (string, format) {
    return dateUtil.parse(string, format || 'yyyy-MM-dd');
};

export const getDayCountOfMonth = function (year, month) {
    let litMonth = [3, 5, 8, 10]
    let isInMonth = litMonth.indexOf(month) > -1
    let isEvent = (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)
    return isInMonth ? 30 : (month === 1 ? (isEvent ? 29 : 28) : 31);
};

export const getFirstDayOfMonth = function (date) {
    const temp = new Date(date.getTime());
    temp.setDate(1);
    return temp.getDay();
};
export const prevMonth = function (val) {
    const date = new Date(val);
    const year = date.getFullYear();
    const month = date.getMonth();
    const tpDate = date.getDate();

    const newYear = month === 0 ? year - 1 : year;
    const newMonth = month === 0 ? 11 : month - 1;

    const newMonthDayCount = getDayCountOfMonth(newYear, newMonth);
    if (newMonthDayCount < tpDate) {
        date.setDate(newMonthDayCount);
    }

    date.setMonth(newMonth);
    date.setFullYear(newYear);

    return new Date(date.getTime());
};

export const nextMonth = function (val) {
    const date = new Date(val);
    const year = date.getFullYear();
    const month = date.getMonth();
    const tpDate = date.getDate();

    const newYear = month === 11 ? year + 1 : year;
    const newMonth = month === 11 ? 0 : month + 1;

    const newMonthDayCount = getDayCountOfMonth(newYear, newMonth);
    if (newMonthDayCount < tpDate) {
        date.setDate(newMonthDayCount);
    }

    date.setMonth(newMonth);
    date.setFullYear(newYear);

    return new Date(date.getTime());
};

export const initTimeDate = function () {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
};
export const disabledRangeDate = function (date, disableStartDay, disableEndDay) {
    if (disableStartDay && !disableEndDay) {
        return date && date.valueOf() < new Date(disableStartDay).getTime()
    } else if (!disableStartDay && disableEndDay) {
        return date && date.valueOf() > new Date(disableEndDay).getTime();
    } else if (disableStartDay && disableEndDay) {
        return date && date.valueOf() < new Date(disableStartDay).getTime() ||
            date && date.valueOf() > new Date(disableEndDay).getTime();
    }
    return false
}
export const getWeekNumber = function (date) {
    let now = toDate(date),
        year = now.getFullYear(),
        month = now.getMonth(),
        days = now.getDate();
    let AllDays = getFullYearDays(year);
    for (let i = 0; i < month; i++) {
        days += getDayCountOfMonth(year, i);
    }

    //那一年第一天是星期几
    let yearFirstDay = new Date(year, 0, 1).getDay();
    //那一年最后一天是星期几
    let lastMonth = getDayCountOfMonth(year, 11)
    let yearLastDay = new Date(year, 11, lastMonth).getDay()
    let dyDay = (AllDays - AllDays % 7 - 7) / 7

    let week = null;
    days -= (7 - yearFirstDay + 1);
    let tmWeek = Math.floor(days / 7)
    week = tmWeek >= dyDay && yearLastDay != 6 ? 1 : tmWeek + 2;
    return week;
}
const getFullYearDays = function (y) {
    let isLeap = (0 === y % 4) && (0 === y % 100) || (0 === y % 400),
        days = isLeap ? 366 : 365;
    return days
}

export const DEFAULT_FORMATS = {
    date: 'yyyy-MM-dd',
    week: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    year: 'yyyy',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    time: 'HH:mm:ss',
    timerange: 'HH:mm:ss',
    daterange: 'yyyy-MM-dd',
    datetimerange: 'yyyy-MM-dd HH:mm:ss'
};

const DATE_FORMATTER = function (value, format) {
    return formatDate(value, format);
};
const DATE_PARSER = function (text, format) {
    return parseDate(text, format);
};
const RANGE_FORMATTER = function (value, format, separator) {
    let RANGE_SEPARATOR = separator ? separator : '至'
    if (Array.isArray(value) && value.length === 2) {
        const start = value[0];
        const end = value[1];
        if (start && end) {
            return (
                formatDate(start, format) + RANGE_SEPARATOR + formatDate(end, format)
            );
        }
    } else if (value && value.start) {
        return (
            formatDate(value.start, format) +
            RANGE_SEPARATOR +
            formatDate(value.end, format)
        );
    }
    return '';
};
const RANGE_WEEK_FORMATTER = function (value, format, separator) {
    let RANGE_SEPARATOR = separator ? separator : '至'
    if (Array.isArray(value) && value.length === 2) {
        const start = value[0];
        const end = value[1];
        if (start && end) {
            return (
                '第' +
                getWeekNumber(start) +
                '周 ' +
                formatDate(start, format) +
                RANGE_SEPARATOR +
                formatDate(end, format)
            );
        }
    }
    return '';
};
const RANGE_PARSER = function (text, format, separator) {
    let RANGE_SEPARATOR = separator ? separator : '至'
    const array = text.split(RANGE_SEPARATOR);
    if (array.length === 2) {
        const range1 = array[0];
        const range2 = array[1];
        return [parseDate(range1, format), parseDate(range2, format)];
    }

    return [];
};
const RANGE_WEEK_PARSER = function (text, format, separator) {
    let RANGE_SEPARATOR = separator ? separator : '至'
    const array = text.split(RANGE_SEPARATOR);
    if (array.length === 2) {
        const range = array[0].split(' ');
        const range2 = array[1];
        return [parseDate(range[1], format), parseDate(range2, format)];
    }
    return [];
};
export const TYPE_VALUE_RESOLVER_MAP = {
    default: {
        formatter(value) {
            return value ? ('' + value) : '';
        },
        parser(text) {
            if (text === undefined || text === '') return null;
            return text;
        }
    },
    date: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    datetime: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    week: {
        formatter: RANGE_WEEK_FORMATTER,
        parser: RANGE_WEEK_PARSER
    },
    daterange: {
        formatter: RANGE_FORMATTER,
        parser: RANGE_PARSER
    },
    datetimerange: {
        formatter: RANGE_FORMATTER,
        parser: RANGE_PARSER
    },
    timerange: {
        formatter: RANGE_FORMATTER,
        parser: RANGE_PARSER
    },
    time: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    month: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    year: {
        formatter: DATE_FORMATTER,
        parser: DATE_PARSER
    },
    number: {
        formatter(value) {
            return value ? ('' + value) : '';
        },
        parser(text) {
            let result = Number(text);
            return isNaN(text) ? null : result
        }
    }
};
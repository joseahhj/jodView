/**
 * 判断数据类型
 * @param {string} obj 任意类型的参数
 * @returns {string} 数据类型
 */
export function typeOf(obj) {
    const typeMap = {
        '[object Null]': 'null',
        '[object Undefined]': 'undefined',
        '[object Date]': 'date',
        '[object File]': 'file',
        '[object Blob]': 'blob',
        '[object Symbol]': 'symbol',
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Object]': 'object',
    };
    try {
        let type = Object.prototype.toString.call(obj);
        return typeMap[type] ? typeMap[type] : 'unKnow'
    } catch (e) {
        new Error(e)
    }
}
/**
 * [add 浮点数计算]
 * @param  {[Number]} arg1     [description]
 * @param  {[Number]} arg2 [description]
 * @return {[Number]}           [返回值]
 */
export function add(arg1, arg2) {
    let arg1Arr = arg1.toString().split('.');
    let arg2Arr = arg2.toString().split('.');
    let d1 = arg1Arr[1] ? arg1Arr.length : 0;
    let d2 = arg2Arr[1] ? arg2Arr.length : 0;
    let maxLen = Math.max(d1, d2);
    let m = Math.pow(10, maxLen);
    let res = ((arg1 * m + arg2 * m) / m).toFixed(maxLen);
    return +res;
}

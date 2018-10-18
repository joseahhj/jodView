const SHADOW_STYLE = `
        position: absolute;
        top: -9999px;
        left: -9999px;
        z-index: -9999;
        opacity: 0;
        visible: hidden;
    `
const STYLE_PROPS = [
    'box-sizing',
    'width',
    'padding',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
    'font-size',
    'line-height'
]
let shadow = null

/**
 * [_getTargetStyle 获取目标文本域的盒样式]
 * @param  {[Element]} target     [description]
 * @return {[Object]}           [返回值]
 */
function _getTargetStyle(target) {
    let styleObj = window.getComputedStyle(target)
    let styleText = ''
    for (let key of STYLE_PROPS) {
        styleText += `${key}: ${styleObj.getPropertyValue(key)};`
    }
    return styleText
}
/**
 * [_getHeight 获取高度]
 * @param  {[Element]} target     [description]
 * @param  {[Number]} rows [description]
 * @param  {[Boolean]} useValue [description]
 * @return {[Number]}           [返回值]
 */
function _getHeight(target, rows, useValue) {
    if (!shadow) {
        shadow = document.createElement('textarea')
    }
    document.body.appendChild(shadow)
    shadow.style = `${_getTargetStyle(target)}${SHADOW_STYLE}`
    shadow.setAttribute('rows', rows)
    shadow.value = target.value || ''
    let result = 0
    if (useValue) {
        result = shadow.scrollHeight
    } else {
        result = shadow.getBoundingClientRect().height
    }
    document.body.removeChild(shadow)
    return result
}
/**
 * [getTextareaHeight 获取文本域自适应的高度数据]
 * @param  {[Element]} target     [description]
 * @param  {[Number]} minRows [description]
 * @param  {[Number]} maxRows [description]
 * @return {[Object]}           [返回值]
 */
function getTextareaHeight(target, minRows, maxRows) {
    let minHeight = _getHeight(target, minRows, false)
    let maxHeight = _getHeight(target, maxRows, false)
    let scrollHeight = _getHeight(target, 1, true)
    let height = 0
    if (maxRows) {
        height = Math.min(maxHeight, Math.max(minHeight, scrollHeight))
    } else {
        height = Math.max(minHeight, scrollHeight)
    }

    return {
        minHeight,
        maxHeight: maxRows ? maxHeight : null,
        height
    }
}

export default getTextareaHeight
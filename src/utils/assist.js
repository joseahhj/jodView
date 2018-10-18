/**
 *[typeOf 判断对象类型]
 * @param  {[Object,String]} obj     [description]
 * @return {[String]}           [返回值]
 */
function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}
/**
 *[deepCopy 深拷贝对象]
 * @param  {[Object]} data     [description]
 * @return {[Object]}           [返回值]
 */
export function deepCopy(data) {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}


/**
 * [oneOf 判断某个值是否在数组中]
 * @param  {[type]} value     [description]
 * @param  {[Object]} validList [description]
 * @return {[Boolean]}           [返回值]
 */
export function oneOf(value, validList) {

    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}


/**
 * [findComponentUpward 查找某个组件的父组件]
 * @param  {[Object]} context     [description]
 * @param  {[String]} componentName [description]
 * @param  {[String]} componentNames [description]
 * @return {[Object]}           [返回值]
 */
export function findComponentUpward(context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}

/**
 * [findComponentsUpward 查找某个组件的父组件]
 * @param  {[Object]} context     [description]
 * @param  {[String]} componentName [description]
 * @param  {[String]} rootComponentName 查找到某个节点为止，不传则一直查找
 * @return {[Object]}           [返回值]
 */
export function findComponentsUpward(context, componentName, rootComponentName) {
    let parents = [];
    let parent = context.$parent;
    let name = parent.$options.name;
    if (parent && name !== rootComponentName) {
        if (name === componentName) parents.push(parent);
        return parents.concat(findComponentsUpward(parent, componentName, rootComponentName));
    }

    return parents;
}

/**
 *[findComponentDownward 查找某个组件的子组件]
 * @param  {[Object]} context     [description]
 * @param  {[String]} componentName [description]
 * @return {[Object]}           [返回值]
 */
export function findComponentDownward(context, componentName) {
    const childrens = context.$children;
    let children = null;

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
            }
        });

        for (let i = 0; i < childrens.length; i++) {
            const child = childrens[i];
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children;
}


/**
 *[findComponentsDownward 查找某个组件的子组件]
 * @param  {[Object]} context     [description]
 * @param  {[String]} componentName [description]
 * @param  {[Array]} components [description]
 * @return {[Object]}           [返回值]
 */
export function findComponentsDownward(context, componentName, components = []) {
    const childrens = context.$children;

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name;
            const childs = child.$children;

            if (name === componentName) components.push(child);
            if (childs.length) {
                const findChilds = findComponentsDownward(child, componentName, components);
                if (findChilds) components.concat(findChilds);
            }
        });
    }
    return components;
}
/**
 *[firstUpperCase 第一个字母大写]
 * @param  {[String]} str     [description]
 * @return {[String]}           [返回值]
 */
export function firstUpperCase(str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1);
}
/**
 *[scrollTop 动态计算滚动条位置]
 * @param  {[String]} el     [description]
 * @param  {[Number]} from     [description]
 * @param  {[Number]} to     [description]
 * @param  {[Number]} duration     [description]
 * @return {[Undefined]}           [返回值]
 */
export function scrollTop(el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    /**
     *[scroll 动态计算滚动条位置]
     * @param  {[Number]} start     [description]
     * @param  {[Number]} end     [description]
     * @param  {[Number]} step     [description]
     * @return {[Undefined]}           [返回值]
     */
    function scroll(start, end, step) {
        if (start === end) return;

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
}
/**
 *[lightenDarkenColor 按比例更改16进制颜色]
 * @param  {[String]} color     [description]
 * @param  {[String]} amt       [description]
 * @return {[Object]}           [返回值]
 */
export function lightenDarkenColor(color, amt) {
    let regRgb = /^rgb\(\d+,\d+,\d+\)$/,
        regRgba = /^rgba\(\d+,\d+,\d+,.*\)$/,
        regSingle = /^#[\d|a-f|A-F]{3}$/,
        regDouble = /^#[\d|a-f|A-F]{6}$/,
        r,
        g,
        b;
    if (regSingle.test(color) || regDouble.test(color)) {
        let defaultAmt = 9,
            bitR = 8,
            bitG = 4,
            G16 = 0x0F,
            B16 = 0x00F,
            max = 15;
        if (regDouble.test(color)) {
            defaultAmt = 150;
            bitR = 16;
            bitG = 8;
            G16 = 0x00FF;
            B16 = 0x0000FF;
            max = 255;
        }
        color = color.slice(1);
        amt = amt || defaultAmt;
        let num = parseInt(color, 16);
        // red part
        r = (num >> bitR) + amt;
        if (r > max) {
            r = max;
        } else if (r < 0) {
            r = 0;
        }
        // green part
        g = ((num >> bitG) & G16) + amt;
        if (g > max) {
            g = max;
        } else if (g < 0) {
            g = 0;
        }
        // blue part
        b = (num & B16) + amt;
        if (b > max) {
            b = max;
        } else if (b < 0) {
            b = 0;
        }

        return '#' + (b | (g << bitG) | (r << bitR)).toString(16);
    } else if (regRgb.test(color) || regRgba.test(color)) {
        amt = amt || 150;
        let arr = color.match(/\d+/g);
        // red part
        r = arr[0] + amt;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
        // green part
        g = arr[1] + amt;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        // blue part
        b = arr[2] + amt;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
        if (regRgba.test(color)) {
            return 'rgba(' + r + ',' + g + ',' + b + color.slice(color.lastIndexOf(','));
        }
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    } else {
        return color;
    }
}
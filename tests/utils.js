import { readFileSync } from 'fs'
import { resolve } from 'path'
import Vue from 'vue/dist/vue.common'
import jadVue from '../src'

// Install Vue and jadVue
window.Vue = Vue
Vue.use(jadVue)

export function loadFixture(dirName, name) {
    const fixtureBase = resolve(dirName, 'fixtures')
    const template = readFileSync(resolve(fixtureBase, name + '.html'), 'UTF-8')
    const js = readFileSync(resolve(fixtureBase, name + '.js'), 'UTF-8')
    return async() => {
        // Mount template
        document.body.innerHTML = template

        // Eval js
        // eslint-disable-next-line no-eval
        eval(js)

        // Await for Vue render
        await Vue.nextTick()
    }
}

export async function testVM() {
    it(`vm mounts`, async() => {
        return expect(window.app.$el).toBeDefined()
    })
}

export function nextTick() {
    return new Promise((resolve, reject) => {
        Vue.nextTick(resolve)
    })
}

export async function setData(app, key, value) {
    app[key] = value
    await nextTick()
}

// Usage: await sleep(1000);
export function sleep(ms) {
    ms = ms || 0
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
}
/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
exports.triggerEvent = function(elm, name, ...opts) {
    let eventName;

    if (/^mouse|click/.test(name)) {
        eventName = 'MouseEvents';
    } else if (/^key/.test(name)) {
        eventName = 'KeyboardEvent';
    } else {
        eventName = 'HTMLEvents';
    }
    const evt = document.createEvent(eventName);

    evt.initEvent(name, ...opts);
    elm.dispatchEvent ?
        elm.dispatchEvent(evt) :
        elm.fireEvent('on' + name, evt);

    return evt;
};

/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} elm
 * @param {*} opts
 */
exports.triggerClick = function(elm, ...opts) {
    exports.triggerEvent(elm, 'mousedown', ...opts);
    exports.triggerEvent(elm, 'mouseup', ...opts);

    return elm;
};

/**
 * 触发 keydown 事件
 * @param {Element} elm
 * @param {keyCode} int
 */
exports.triggerKeyDown = function(el, keyCode) {
    const evt = document.createEvent('Events');
    evt.initEvent('keydown', true, true);
    evt.keyCode = keyCode;
    el.dispatchEvent(evt);
};
const isVueInstance = vm => vm instanceof Vue
const isHTMLElement = el => el instanceof HTMLElement

const throwIfNotVueInstance = vm => {
    if (!isVueInstance(vm)) {
        // debugging breadcrumbs in case a non-Vue instance gets erroneously passed
        // makes the error easier to fix than example: "Cannot read _prevClass of undefined"
        console.error(vm)
        throw new TypeError(`The matcher function expects Vue instance. Given ${typeof vm}`)
    }
}

const throwIfNotHTMLElement = el => {
    if (!isHTMLElement(el)) {
        console.error(el)
        throw new TypeError(`The matcher function expects an HTML Element. Given ${typeof el}`)
    }
}

const throwIfNotArray = array => {
    if (!Array.isArray(array)) {
        throw new TypeError(`The matcher requires an array. Given ${typeof array}`)
    }
}

const vmHasClass = (vm, className) => {
    throwIfNotVueInstance(vm)
    return vm.$el._prevClass.indexOf(className) !== -1
}

/**
 * @param {HTMLElement} el
 * @param {string} className
 * @return {boolean}
 */
const elHasClass = (el, className) => {
    throwIfNotHTMLElement(el)
    return el.classList.contains(className)
}

/**
 * @param {Vue|HTMLElement} node
 * @param {string} className
 * @return {boolean}
 */
const hasClass = (node, className) => (isVueInstance(node) ? vmHasClass(node, className) : elHasClass(node, className))

const getVmTag = vm => vm.$options._componentTag
const getHTMLTag = el => String(el.tagName).toLowerCase()
const getTagName = node => (isVueInstance(node) ? getVmTag(node) : getHTMLTag(node))

// Extend Jest marchers
expect.extend({
    toHaveClass(node, className) {
        return {
            message: (() => {
                return `expected <${getTagName(node)}> to have class '${className}'`
            }),
            pass: hasClass(node, className)
        }
    },
    notHaveClass(node, className) {
        return {
            message: (() => {
                return `expected <${getTagName(node)}> to not have class '${className}'`
            }),
            pass: !hasClass(node, className)
        }
    },
    toHaveAllClasses(node, classList) {
        throwIfNotArray(classList)

        let pass = true
        let missingClassNames = []

        classList.forEach(className => {
            if (!hasClass(node, className)) {
                pass = false
                missingClassNames.push(className)
            }
        })

        const plural = missingClassNames.length > 1
        const classStr = classList.join(', ')
        const missingClassStr = missingClassNames.join(', ')
        const tagName = getTagName(node)

        return {
            // more debugging breadcrumbs
            message: (() => {
                return `Expected <${tagName}> to have all classes in [${classStr}], but was missing [${missingClassStr}] class${plural
                ? 'es'
                : ''}.`
            }),
            pass
        }
    },
    toBeComponent(vm, componentTag) {
        throwIfNotVueInstance(vm)

        return {
            message: (() => {
                return `Expected to be <${componentTag}>. Received: ${getVmTag(vm)}`
            }),
            pass: getVmTag(vm) === componentTag
        }
    },
    toBeElement(el, tagName) {
        throwIfNotHTMLElement(el)

        return {
            message: (() => {
                return `Expected to be <${String(tagName).toLowerCase()}>. Received: ${el.tagName.toLowerCase()}`
            }),
            pass: el.tagName === String(tagName).toUpperCase()
        }
    }
})
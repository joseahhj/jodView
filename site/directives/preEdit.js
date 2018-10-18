import Vue from 'vue'

const VUE_REGEX = /<!-- (.*).vue -->/
const TEMPLATE_REGEX = /<template>([\s\S]*)<\/template>/
const SCRIPT_REGEX = /<script>([\s\S]*)<\/script>/
const STYLE_REGEX = /<style>([\s\S]*)<\/style>/
const match = (regex, text) => (regex.exec(text) || [])[1]

const loadVue = text => {
    let name = match(VUE_REGEX, text)
    let template = match(TEMPLATE_REGEX, text)
    let script = match(SCRIPT_REGEX, text)
    let style = match(STYLE_REGEX, text)
    let options = {}
    if (script && script.includes('export default')) {
        eval(script.replace('export default', 'options = '))
    }

    return { name, template, script, style, options }
}

const removeNode = node => node && node.parentNode && node.parentNode.removeChild(node)

const createHtml = function(pre, vnode, binding) {
    let vm = null

    const destroyVM = () => {
        // console.log('Destroy VM')
        if (vm) {
            vm.$destroy()
            removeNode(vm.$el)
            vm.$el.innerHTML = ""

        }
        if (name) {
            Array.prototype.slice.apply(document.querySelectorAll(`.vue-example-${name}`)).forEach(removeNode)
        }
    }

    if (!Array.isArray(vnode.context.$options['beforeDestroy'])) {
        vnode.context.$options['beforeDestroy'] = []
    }

    vnode.context.$options['beforeDestroy'].push(destroyVM)

    const createVM = () => {
        try {
            // Try to load vue template
            let {
                name,
                template,
                options,
                style
            } = loadVue(pre.textContent)
            name = name ? name : binding.value

            if (!template) {
                if (name) {
                    // It is plain code
                    template = pre.textContent
                } else {
                    return
                }
            }

            // Destroy old instance
            destroyVM()

            // Create a placeholder after pre
            let holder = document.createElement('div')
            pre.parentNode.insertBefore(holder, pre.parentNode.firstChild)
                // CreateVM
            vm = new Vue(Object.assign({}, options, {
                template: `<div class='bd-example vue-example vue-example-${name}'>${template}</div>`,
                router: vnode.context.$router,
                el: holder
            }))
        } catch (e) {
            console.error('[v-editor]', e)
        }
    }
    createVM()
}

Vue.directive('editor', (el, binding, vnode, oldVnode) => {
    if (vnode.tag == oldVnode.tag) return;
    // Get all code-snippets
    const codeBox = Array.prototype.slice.apply(el.querySelectorAll('.pre-code-box'));
    const codeHtml = Array.prototype.slice.apply(el.querySelectorAll('.code-html'));
    codeHtml.forEach(code => {
        const preHtml = code.querySelector('.hljs');
        createHtml(preHtml, vnode, binding)
    })
    codeBox.forEach(code => {
        const pre = code.querySelector('pre.hljs');

        const btnShow = code.querySelector('.pre-show');
        const preRun = code.querySelector('.pre-run');
        // Add bd-clipboard class
        // Test if it is really vue template
        btnShow.onclick = function() {
            const oldHtml = this.innerHTML
            if (oldHtml == '显示编辑代码') {
                pre.className = 'hljs'
                preRun.className = 'pre-run'
                pre.contentEditable = true
                this.innerHTML = '隐藏代码'
            } else {
                pre.className = 'hljs hide'
                preRun.className = 'pre-run hide'
                pre.contentEditable = false
                this.innerHTML = '显示编辑代码'
            }
        }
        let l = loadVue(pre.textContent)
            // if (!l.template && !l.name) {
            //     return
            // }
            // console.log(l, 'l')


        // Add live class
        pre.className = 'hljs hide'
        pre.contentEditable = true
            // createVM function
        let vm = null
            //let name = l.name ? l.name : binding.value
        const destroyVM = () => {
            if (vm) {
                vm.$destroy()
                removeNode(vm.$el)
                vm.$el.innerHTML = ""
            }
            if (name) {
                Array.prototype.slice.apply(document.querySelectorAll(`.vue-example-${name}`)).forEach(removeNode)
            }
        }

        if (!Array.isArray(vnode.context.$options['beforeDestroy'])) {
            vnode.context.$options['beforeDestroy'] = []
        }

        vnode.context.$options['beforeDestroy'].push(destroyVM)

        const createVM = () => {
            try {
                // Try to load vue template
                let { name, template, options, style } = loadVue(pre.textContent)
                name = name ? name : binding.value
                if (!template) {
                    if (name) {
                        // It is plain code
                        template = pre.textContent
                    } else {
                        return
                    }
                }
                let innerStyle = {}
                if (style) {
                    innerStyle.styles = style
                }

                // Destroy old instance
                destroyVM()

                // Create a placeholder after pre
                let holder = document.createElement('div')
                pre.parentNode.insertBefore(holder, pre.parentNode.firstChild)
                if (style) {
                    let innerStyle = document.createElement('style');
                    innerStyle.innerHTML = style

                    pre.parentNode.insertBefore(innerStyle, pre.parentNode.firstChild)
                }
                // CreateVM
                vm = new Vue(Object.assign({}, options, {
                    template: `<div class='bd-example vue-example vue-example-${name}'>${template}</div>`,
                    router: vnode.context.$router,
                    el: holder
                }))
            } catch (e) {
                console.error('[v-editor]', e)
            }
        }
        createVM()

        preRun.onclick = async() => {
            const hljs = await
            import ('highlightjs')
            hljs.highlightBlock(pre)
            createVM()
        }
    })
})
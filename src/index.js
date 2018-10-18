import * as components from './components'
// import * as directives from './directives'
import {registerComponent} from './utils/'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

// const VuePlugin = {
const install = function (Vue) {
    if (Vue._jad_vue_installed) {
        return
    }

    Vue._jad_vue_installed = true

    // Register component plugins
    for (let plugin in components) {
        registerComponent(Vue, 'j' + plugin, components[plugin])
    }
    Vue.prototype.$Notification = components['Notification'];
    Vue.prototype.$jLoading = components['Loading'];
    Vue.prototype.$Modal = components['Modal'];
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
// }

// vueUse(VuePlugin)

// export default VuePlugin
const VuePlugin = {
    install,
    ...components
}
module.exports.default = module.exports = VuePlugin

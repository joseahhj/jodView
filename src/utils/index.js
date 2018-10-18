/**
* Install plugin if window.Vue available
* @param {object} VuePlugin definition
* @return {undefined}
*/
export function vueUse(VuePlugin) {
    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(VuePlugin)
    }
}

/**
 * Register a component plugin as being loaded. returns true if compoent plugin already registered
 * @param {object} Vue definition
 * @param {string} name definition
 * @param {string} def definition
 * @return {boolean} loaded 
 */
export function registerComponent(Vue, name, def) {

    Vue._jad_vue_components_ = Vue._jad_vue_components_ || {}
    const loaded = Vue._jad_vue_components_[name]
    if (!loaded && def && name) {
        Vue._jad_vue_components_[name] = true
        Vue.component(name, def)
    }
    return loaded
}
/**
 * Register a group of components as being loaded.
 * @param {object} Vue definition
 * @param {object} components definition
 * @return {undefined} 
 */
export function registerComponents(Vue, components) {
    for (let component in components) {
        registerComponent(Vue, component, components[component])
    }
}
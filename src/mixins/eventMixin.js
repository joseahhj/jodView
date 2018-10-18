/**
 * @param {string} targetName target name.
 * @param {string} eventName event name.
 * @param {...*} additional arguments
 * @returns {Undefined} return
 */
function broadcast(targetName, eventName, ...params) {
    this.$children.forEach((child) => {
        let name = child.$options && child.$options.name
        if (name === targetName) {
            child.$emit.apply(child, [eventName, ...params])
        } else {
            broadcast.apply(child, [targetName, eventName, ...params])
        }
    })
}
/**
 * @param {string} targetName target name.
 * @param {string} eventName event name.
 * @param {...*} additional arguments
 * @returns {Boolean} whether has parent
 */
function dispatch(targetName, eventName, ...params) {
    let parent = this.$parent || this.$root
    let name = parent.$options.name
    while (parent && (!name || name !== targetName)) {
        parent = parent.$parent
        name = parent && parent.$options.name
    }
    if (parent) {
        parent.$emit.apply(parent, [eventName, ...params])
    }
}

export default {
    methods: {
        dispatch(targetName, eventName, ...params) {
            return dispatch.apply(this, [targetName, eventName, ...params])
        },
        broadcast(targetName, eventName, ...params) {
            return broadcast.apply(this, [targetName, eventName, ...params])
        }
    }
}
import Vue from 'vue';
import Main from './Notification.vue';

const Constructor = Vue.extend(Main);

let instance = null;
let instances = [];

const Notification = properties => {
    const id = properties.id || 'Notification_' + Date.now();
    const position = properties.position || 'top-right';
    let verticalOffset = properties.verticalOffset || 0;
    let customOnClose = properties.onClose;
    properties = properties || {};
    properties.verticalOffset = verticalOffset;

    properties.onClose = function () {
        Notification.close(id, customOnClose);
    };

    instance = new Constructor({
        propsData: properties
    });

    instance.id = id;
    instance = instance.$mount();
    document.body.appendChild(instance.$el);
    instance.isVisible = true;

    instances.filter(item => item.position === position).forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16;
    });
    verticalOffset += 16;
    instance.verticalOffset = verticalOffset;
    instances.push(instance);

    return instance;
};

Notification.close = (id, customOnClose) => {
    let curIndex = -1;
    let curInstance = instances.filter((instance, index) => {
        return instance.id === id ? (curIndex = index, true) : false;
    })[0];

    if (!curInstance) return;

    typeof customOnClose === 'function' ? customOnClose() : '';
    instances.splice(curIndex, 1);

    let length = instances.length;
    let curOffsetHeight = curInstance.$el.offsetHeight;

    curInstance.isVisible = false;

    for (let index = curIndex; index < length; index++) {
        let verticalOffset = instances[index].verticalOffset - curOffsetHeight - 16;
        instances[index].position === curInstance.position ?
            instances[index].verticalOffset = verticalOffset : '';
    }
};

['success', 'info', 'warn', 'error'].forEach(type => {
    Notification[type] = properties => {
        let newArgs = Object.assign({}, properties, {
            type: type
        });

        return Notification(newArgs);
    }
})

export default Notification;

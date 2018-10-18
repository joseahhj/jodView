import Modal from './Modal.vue';
import Icon from '../Icon';
import Button from '../Button/Button.vue';
import Vue from 'vue'

const iconConfig = {
    'info': {
        icon: 'info',
        color: '#DDD'
    },
    'success': {
        icon: 'checkmark2',
        color: '#DDD'
    },
    'error': {
        icon: 'cancel2',
        color: '#DDD'
    },
    'confirm': {
        icon: 'notice2',
        color: '#DDD'
    }
};

['info', 'success', 'error', 'confirm'].forEach((type) => {
    Modal[type] = function ({
        title,
        content,
        onOk,
        onCancel,
        btnCancelText,
        btnOkText
    }) {

        let modalObj = Vue.extend({
            template: `
              <v-modal :is-show-header="false" :is-show="true" :width="464" v-if="show">
                <div slot="modal-body">
                    <div class="confirm-modal-icon" style="float:left;width: 72px;">
                        <v-icon :type="type" font-size="72" :color="color"></v-icon>
                    </div>
                    <div class="confirm-modal-content" style="overflow:auto;padding-left:20px;">
                        <p style="padding: 0; margin-bottom:10px; font-size:24px;">{{title}}</p>
                        <div v-html="content"></div>
                    </div>
                </div>
                <div slot="modal-footer">
                    <template  v-if="type !== 'notice2'">
                        <v-button type="primary" size="large" @click.native="callback">
                            {{'确定' !== btnOkText ? btnOkText : '知道了'}}
                        </v-button>
                    </template>
                    <template v-else>
                        <v-button @click.native="close" size="large">{{btnCancelText}}</v-button> 
                        <v-button type="primary" @click.native="callback" size="large">{{btnOkText}}</v-button>
                    </template>
                  </div>
              </v-modal>`,
            components: {
                vModal: Modal,
                vIcon: Icon,
                vButton: Button
            },
            data() {
                return {
                    title: title,
                    content: content,
                    type: iconConfig[type].icon,
                    color: iconConfig[type].color,
                    show: false,
                    btnOkText: btnOkText ? btnOkText : '确定',
                    btnCancelText: btnCancelText ? btnCancelText : '取消'
                }
            },
            mounted(){
                setTimeout(() => {
                    this.show = true
                }, 20)
            },
            methods: {
                callback() {
                    onOk && onOk()
                    this.show = false
                },
                close() {
                    onCancel && onCancel()
                    this.show = false
                }
            },
        })
        let elem = new modalObj().$mount()
        document.body.appendChild(elem.$el)
    }
});


export default Modal
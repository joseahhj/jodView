/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
        duration: 0,
        position:'top-right',
        type:'success'
    },
    methods: {
        _openNotification() {
        	let me = this;
            this.$Notification({
                message: '这是标题',
                description: '这是消息框的文案',
                position:me.position
            })
        },
        _openNotificationDuration() {
            let me = this;
            this.$Notification({
                message: '这是标题',
                description: '这是消息框的文案',
                duration: me.duration
            })
        },
        _openNotificationType(type){
			this.$Notification({
                message: '这是标题',
                description: '这是消息框的文案',
                type: type
            })
        }


    }
})
/*eslint-disable */
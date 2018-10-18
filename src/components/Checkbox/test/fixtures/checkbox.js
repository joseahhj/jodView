/*eslint-disable */
window.app = new Vue({
    el: '#app',
    data: {
    	apple:true,
    	text:'',
        unapple:undefined
    },
    methods: {
    	change(val){
    		this.text = val
    	}
    }
})
/*eslint-disable */
<template>

    <div class="container">
    	<div class="bd-content fz14 big-box guid-box" v-html="readMe"></div>
    </div>

</template>
<script>
	import jNav from '../../components/nav'
	import sidebar from '../../components/sidebar'
	import { renderDocMd } from '../../utils'
	const getReadMe = name => import('../../doc/' + name + '.md')
	export default {
		name: 'guid',
		data() {
			return {
				readMe:''
			}
		},
		components:{
	        jNav,
	        sidebar
	    },
		created() {
			const name = this.$route.params.id || 'install';
			this.renderHtmlDate(name)
        },
        watch: {
		    '$route' (to, from) {
		    	const name = to.params.id;
				this.renderHtmlDate(name)
		    }
		},
        methods: {
			async renderHtmlDate(name){
				const me =this
				const getDate = await getReadMe(name)
				const result = renderDocMd(getDate)
				me.readMe  = result
			}
		},
	}
</script>
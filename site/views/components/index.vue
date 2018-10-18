<template>
    <div class="cpts-body">
        <j-nav></j-nav>
        <div class="clearfix">
	        <sidebar></sidebar>
		    <router-view v-if="isRouterAlive"></router-view>
	    </div>
	    <div class="cpts-footer">
	    	<j-row class="cpts-list">
	    		<j-col span="5">
	    			<dl  class="cpts-dl">
	    				<dt>谁在使用</dt>
	    				<dd>
	    					<a href="http://git.jd.com/ads-fe/flow-launch" target="_blank">
		    					<span>流量货币化</span>
		    				</a>
	    				</dd>
	    				<!-- <dd>
	    					<a href="http://git.jd.com/ads-fe/flow-launch" target="_blank">
		    					<span>流量货币化</span>
		    				</a>
	    				</dd> -->
	    			</dl>
	    		</j-col>
	    		<j-col span="6">
	    			<dl class="cpts-dl">
	    				<dt>相关链接</dt>
	    				<dd>
	    					<a href="http://git.jd.com/ads-fe/jad-pack" target="_blank">
		    					<span>jad-pack</span>: 脚手架工具
		    				</a>
		    			</dd>
	    				<dd>
	    					<a href="http://jad.jd.com/v1/" target="_blank">
		    					<span>jad-vue</span>: jad第一版组件
		    				</a>
	    				</dd>
	    				<dd>
	    					<a href="http://jad.jd.com/mobile/#/home"  target="_blank">
	    						<span>jad-mobile</span>: jad移动端组件
	    					</a>
	    				</dd>
	    			</dl>
	    		</j-col>
	    	</j-row>
	    	<p class="cpts-center">Copyright © 2018 JAD DESIGN. All Rights Reserved.</p>
	    </div>
	</div>
</template>
<script>
	import jNav from '../../components/nav'
	import sidebar from '../../components/sidebar'
	
	export default {
		name: 'components',
		data() {
			return {
				readMe:'',
				isRouterAlive:true
			}
		},
		components:{
	        jNav,
	        sidebar
	    },
	   	methods:{
	    	reload () {
	    	    this.isRouterAlive = false
	    	    this.$nextTick(() => (this.isRouterAlive = true))
		    }  
	    }
	}
</script>
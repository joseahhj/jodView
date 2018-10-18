<template>
    <div class="cpts-body">
        <j-nav></j-nav>
        <sidebar>
       
		    <div class="side-ul rule-side" slot="side-text">
		        <p class="fz14 bd7">开发规范</p>
		        <ul class="s-menu-vertical">
		            <li>
		                <router-link :to="{path:'/rule/componentRule'}">组件目录规范</router-link>
		            </li>
		            <li>
		                <router-link :to="{path:'/rule/cssRule'}">css编写规范</router-link>
		            </li>
		             <li>
		                <router-link :to="{path:'/rule/jsRule'}">js编写规范</router-link>
		            </li>
		        </ul>
		    </div>
		
		</sidebar>
	    <div class="container">
	    	<div class="bd-content bd-rule fz14 big-box" v-html="readMe"></div>
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
<style scope>
	.bd-rule li{
		padding-left: 10px;
		list-style: decimal;
		color: #333;
		font-size: 15px;
	}
	.bd-rule p{
		line-height: 30px;
	}
</style>
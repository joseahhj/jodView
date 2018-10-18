<template>
	<div class="home-cont">
		<j-nav />
	    <div class="home-bd clearfix">
	    	<div class="home-left">
	    		<h2 class="logo-tit">京东广告组件库</h2>
	    		<p class="solan-tit">一套好看、好用、高效的桌面端组件库，<br/>
				基于 Vue 2.X 让开发者、设计师和产品经理专注于更好的用户体验。</p>
	    		<p class="home-btn-box">
	    			<j-button shape="circle" size="large" type="primary" @click="openRouter($event,'/components')">
					    开始使用
					</j-button>
					<j-button shape="circle" size="large" @click="openRouter($event,'/rule')">
					    查看规范
					</j-button>
	    			<j-button icon="github-alt" size="medium" type="linear">
					    <span class="inline-block">Github</span>
					</j-button>
	    		</p>
	    	</div>
	    	<div class="home-right"></div>
	    </div>
	    <div class="home-bg-blank"></div>
	    <div class="home-footer">
	    	Copyright © 2018 JAD DESIGN. All Rights Reserved.
	    </div>
	</div>
</template>
<script>
	import jNav from '../../components/nav'
	export default {
		name: 'home-intro',
		components:{
	        jNav,
	    },
	    methods:{
	    	openRouter(e,tag){
	    		this.$router.push({path:tag})
	    	}
	    }
	}
</script>
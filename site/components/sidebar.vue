<template>
  <div class="bd-sidebar" :class="classSide">
    <slot name="side-text">
        <div class="side-ul pb10">
            <p class="fz14 bd7 pb10 spl40">开发指南</p>
            <ul class="s-menu-vertical spl40 lh40 s-memu-toli">
                <li>
                    <router-link :to="{path:'/components/guid/intro'}">介绍</router-link>
                </li>
                <li>
                    <router-link :to="{path:'/components/guid/install'}">安装</router-link>
                </li>
                <li>
                    <router-link :to="{path:'/components/guid/newguid'}">快速上手</router-link>
                </li>
                <li>
                    <router-link :to="{path:'/components/guid/infoLog'}">更新日志</router-link>
                </li>
            </ul>
        </div>
        <div class="side-ul">
            <p class="fz14 bd7 gray spl40">组件</p>
            <j-menu :open-keys="navType" class-name="s-menu-vertical">
                <j-submenu 
                    :item-key="type" 
                    :title="navTxt[type]" 
                    v-for="type in navType"
                    :key="type">
                    <j-menu-item 
                        :item-key="item.title" 
                        v-for="item in mdAllMeta" 
                        v-if="item.type == type" 
                        :key="item.title">
                        <router-link :to="{path:'/components/origin/'+item.title}">
                            {{item.title}} {{item.subtitle}}
                        </router-link>
                    </j-menu-item>
                    <j-menu-item item-key="basic-font" v-if="type == 'Basic'">
                        <router-link :to="{path:'/components/guid/font'}">Font 字体</router-link>
                    </j-menu-item>
                </j-submenu>
                
            </j-menu>

        </div>
    </slot>
    
  </div>
</template>
<script>
    import { mdAllMeta } from "../content";
	//const routeList = require('../route-list.js')
	//import routeList from ;
    export default{
    	name: 'jsidebar',
    	data(){
    		return {
    			mdAllMeta:mdAllMeta,
                navType:['Basic','Layout','Navigation','Form','Data','Notice','Other'],
                navTxt:{
                    'Basic':'基础',
                    'Form':'表单',
                    'Data':'数据',
                    'Notice':'通知',
                    'Navigation':'导航',
                    'Other':'其他',
                    'Layout':'布局'
                },
                classSide:''
    		}
    	},
        mounted(){
            this.computeScroll()
            window.addEventListener('scroll', this.computeScroll, false)
        },
        methods:{
            computeScroll(){
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                if(scrollHeight > clientHeight && (scrollHeight - clientHeight - 250) <= scrollTop){
                    this.classSide = 'positionAbs'
                }else{
                    this.classSide = ''
                }
                if(scrollTop==0){
                    this.classSide = ''
                }
            }
        },
        beforeDestroy(){
            window.removeEventListener('scroll', this.computeScroll, false)
        }
        
    };
</script>

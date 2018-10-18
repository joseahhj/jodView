<template>
<header class="clearfix st-header">
    <j-row>
        <j-col span="4">
            <div class="logo-wrap">
                <router-link :to="{path:'/home'}">
                    <span class="logoBg"></span>
                </router-link>
            </div>
        </j-col>
        <j-col span="8" style="padding-top:25px">
            <j-select 
                type="custom" 
                :options="searchList" 
                :options-keys="originKeys"
                @on-select="selected">
                <template slot="custom">
                    <j-input 
                    class-name="searchIpt"
                    placeholder="搜索组件..." 
                    prefix-icon="search2"
                    v-model="iptValue"
                    @input="searchCpents"/>
                </template>
                <template slot-scope="{data}">
                    {{data.title}} <span class="fz12">{{data.subtitle}}</span>
                </template>
            </j-select>
        </j-col>
        <j-col span="10">
             <ul class="s-menu s-menu-horizontal">
                <router-link :to="{path:'/home'}" tag="li" class="s-menu-item">
                    首页
                    <span class="s-menu-bot"></span>
                </router-link>
                <router-link :to="{path:'/components'}" tag="li" class="s-menu-item">
                    组件
                    <span class="s-menu-bot"></span>
                </router-link>
                <router-link :to="{path:'/rule'}" tag="li" class="s-menu-item">
                    规范
                    <span class="s-menu-bot"></span>
                </router-link>
            </ul>
        </j-col>
        <j-col span="2" class="version">
            <j-tag isDisabled>V.{{verNum}}</j-tag>
            <span class="inline-block" ></span>
        </j-col>
    </j-row>
</header>

</template>
<script>
    import clickoutside from '../directives/clickoutside'
    import { mdAllMeta } from "../content";
    import PackageInfo from '../../package.json';
    const originList = (function (){
        let tempLi = []
        for(let key in mdAllMeta){
            tempLi.push(mdAllMeta[key])
        }
        return tempLi
    })()
    export default{
    	name: 'NavTop',
        data(){
            return {
                searchList: JSON.parse(JSON.stringify(originList)),
                isShow: false,
                iptValue:'',
                originKeys: {
                    value:'title',
                    label:'subtitle'
                },
                currentValue:'搜索组件',
                verNum: PackageInfo.version
            }
        },
        methods:{
            selected(obj){
                let id = obj.selectedVal
                this.iptValue = ''
                this.searchList = JSON.parse(JSON.stringify(originList))
                this.$router.push({path:'/components/origin/'+id})
            },
            searchCpents(){
                let val = this.iptValue
                let newVal = val.toUpperCase()
                this.searchList = originList.filter(function(item){
                    let title = (item.title).toUpperCase()
                    return title.indexOf(newVal)>-1 || item.subtitle.indexOf(val)>-1
                })
            }
        }
    };
</script>

<template>
    <div class="container origin-container">
        <div class="bd-content">
            <div class="colTop" v-html="intro[0]"></div>
            <div class="code-demo">
                <div
                    v-for="(item,index) in readMe" 
                    :key="index"
                    v-if="index!=0&&index!=100" 
                    v-html="item.html" 
                    v-editor="index">
                </div>
            </div>
            <div class ="apiBox" v-html="intro[1]" v-editor></div>
        </div>
        <div class="menu-time">
            <j-timeline>
                <j-timeline-item v-for="(item,index) in readMe" :key="'menu'+index">
                    <p v-html="renderH2(item.html)"></p>
                </j-timeline-item>
            </j-timeline>
        </div>
        <div class="cpts-menus clearfix">
            <router-link 
                style="float:left" 
                :to="{path:'/components/origin/'+linkRoute[0]}" 
                v-if="linkRoute[0]">
                <j-icon type="angle-left" font-size="20"></j-icon>
                <span>{{mdAllMeta[linkRoute[0]].title}} {{mdAllMeta[linkRoute[0]].subtitle}}</span>
            </router-link>
            <router-link 
                style="float:right" 
                :to="{path:'/components/origin/'+linkRoute[1]}" 
                v-if="linkRoute[1]">
                <span>{{mdAllMeta[linkRoute[1]].title}} {{mdAllMeta[linkRoute[1]].subtitle}}</span>
                <j-icon type="angle-right" font-size="20"></j-icon>
            </router-link>
        </div>
    </div>
    
</template>

<script>
import jNav from '../../components/nav'
import sidebar from '../../components/sidebar'
import { mdFileUrl } from "../../content";
import { renderMdList } from '../../utils'
import Clipboard from '../../plugins/clipboard'
import { mdAllMeta } from "../../content";
export default {
    name: 'componentsApp',
    data () {
        return {
            mdAllMeta:mdAllMeta,
            readMe:'',
            navType:['Basic','Layout','Navigation','Form','Data','Notice','Other'],
        };
    },
    components:{
        jNav,
        sidebar
    },
    computed:{
        intro(){
            let oldHtml = this.readMe[0].html
            let newHtml = oldHtml.split('<hr>')
            return newHtml
        },
        sortKeys(){
            let navType = this.navType
            let mdAllMeta = this.mdAllMeta
            let guid = this.guid
            let sortMenu = {}
            navType.forEach((item)=>{
                for(let key in mdAllMeta){
                    if(mdAllMeta[key].type == item){
                        sortMenu[key] = mdAllMeta[key]
                    }
                }
            })
            let sortKeys = Object.keys(sortMenu)
            return sortKeys
        },
        linkRoute(){
            let sortKeys = this.sortKeys
            let name = this.$route.params.id || 'Button'
            let index = sortKeys.indexOf(name)
            if(index == 0){
                return ['',sortKeys[index+1]]
            } else if(index == sortKeys.length-1){
                return [sortKeys[index-1],'']
            } else {
                return [sortKeys[index-1],sortKeys[index+1]]
            }
        }
    },

    watch: {
        '$route' (to, from) {
            
            this.$parent.reload()
            const name = to.params.id;
            this.renderHtmlDate(name)
            if(name == 'Icon'){
                this.bindCopy()
            }

        }
    },
    methods: {
        renderH2(text){
            const match = (regex, text) => (regex.exec(text) || [])[0]
            const STYLE_REGEX = /<(h2)[^<>]*?>(.|\s)*?<\/h2>/g;
            let style = match(STYLE_REGEX, text)
            style = style.replace(/h2/g,'a').replace(/id="/g,'href="#')
            return style
        },
        async renderHtmlDate(name){
            const me =this
            /*对md内容进行修改，加排序,
            通过name获取相应的文件夹下的md*/
            const mdUrl = mdFileUrl[name]
            //把多个md解析成自定义的html,返回值是一个对象，key值是数字
            const resultList = renderMdList(mdUrl)
            me.readMe = resultList
        },
        copyIcon(item){

            let clipBoardContent ='<j-icon type="'+item+'"></j-icon>';
            let clipboard = new Clipboard('.icon-li',{
                text: function() {
                    return clipBoardContent;
                }
            })
            clipboard.on('success', function(e) {
                alert('复制成功');
                clipboard.destroy()
            });

            clipboard.on('error', function(e) {
                alert('请手动复制');
                clipboard.destroy()
            });
        },
        bindCopy(){
            let me = this
            this.$nextTick(function(){
                let iconList = document.querySelector('.icon-list')
                if(iconList){
                    let iconLi = Array.prototype.slice.apply(iconList.querySelectorAll('li'))
                    iconLi.forEach(function(item){
                        item.onclick = function(){
                            let iname = this.getAttribute('data-name')
                            me.copyIcon(iname)
                        }
                    })
                }
            })
        }
    },
    created() {
        const name = this.$route.params.id || 'Button';
        this.renderHtmlDate(name)
    },
    mounted(){
        const name = this.$route.params.id
        if(name == 'Icon'){
            this.bindCopy()
        }
    },
        
  
};
</script>
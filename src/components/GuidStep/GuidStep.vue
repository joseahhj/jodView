<template>
<div :class="guidClass" :style="{width:domWidth+'px',height:domHeight+'px'}">
  <div :class="guidClass+'-pop-body'" :style="{width:bhWidth+'px',left:bhLeft+'px',top:bhTop+'px'}">
    <div :class="guidClass+'-pop-bh'">
      <h4 :class="guidClass+'-pop-title'" v-html="title" v-if="title!=''"></h4> 
      <span :class="guidClass+'-pop-close'" @click="close" v-if="isShowIcon">
        <i class="jad-icon jad-icon-cancel4" style="font-size: 16px;"></i>
      </span>
    </div> 
    <div :class="guidClass+'-pop-bb'" v-html="content"></div> 
    <div :class="guidClass+'-pop-btn'">
      <button type="button" class="jad-btn jad-btn-secondary" @click="sureBtn">{{okText}}</button>
    </div> 
    <div :class="guidCart" :style="{left:arrLeft}"></div>
  </div>
  <div :class="guidClass+'-pop-cover'" :style="{width:coverWidth+'px',height:coverHeight+'px',left:coverLeft+'px',top:coverTop+'px'}"></div>
</div>
</template>

<script>
export default {
    name: 'GuidStep',
    data(){
        return {
        placement:'top',
        content:'',
        title:'',
        okText:'',
        coverWidth:'',
        coverHeight:'',
        coverLeft:'',
        coverTop:'',
        bhWidth:'',
        bhLeft:'',
        bhTop:'',
        arrLeft:'',
        onOk:null,
        onClose:null,
        lastOne:false,
        options:null,
        guidCart:null,
        prefixCls:'jad',
        isShowIcon:true,
        isShow:false
        }
    },
  
    computed:{
        guidClass(){
           return this.prefixCls+'-guid'
        },
        domWidth(){
           return document.body.scrollWidth 
        },
        domHeight(){
           return document.body.scrollHeight 
        }
    },
    methods:{
        show(options){
            var me =this
            me.placement = options.placement
            me.content = options.content
            me.title = options.title
            me.okText = options.okText
            me.lastOne = options.lastOne
            me.isShowIcon = options.isShowIcon
            me.bhWidth = options.bhWidth
            me.prefixCls=options.prefixCls?options.prefixCls:'jad'
            var scrollTop = document.documentElement.scrollTop
            var scrollLeft = document.documentElement.scrollLeft

            if(options.container){
            me.options = options
             var size = options.container.getBoundingClientRect()
             if(options.coverWidth){
                me.coverWidth = options.coverWidth
             }else{
                me.coverWidth = size.width
             }
             if(options.coverHeight){
                me.coverHeight = options.coverHeight
             }else{
                me.coverHeight = size.height
             }

             me.coverLeft=size.left+scrollLeft
             me.coverTop=size.top+scrollTop
             me.$nextTick(function(){

                me.computedBhBox(size,scrollTop,scrollLeft,options.isleft)
             })

              me.onOk=me.lastOne?me.close:options.onOk
              me.onClose=options.onClose
              window.addEventListener('resize', me.resizeCover,false);  
            }  
        },
        resizeCover(){
            this.show(this.options)
        },
        computedBhBox(size,scrollTop,scrollLeft,isleft){
            var bdClass='.'+this.guidClass+'-pop-body'
            var bhBox = document.querySelector(bdClass).getBoundingClientRect()
            var placement = this.placement 
            var me = this
            switch(placement){
                case 'top':
                    me.posiDirect(size,bhBox,scrollTop,scrollLeft,isleft,'top');
                    break;
                case 'bottom':
                    me.posiDirect(size,bhBox,scrollTop,scrollLeft,isleft);
                    break; 
                case 'right':
                    me.posiOrient(size,bhBox,scrollTop,scrollLeft,'right');
                    break;
                case 'left':
                    me.posiOrient(size,bhBox,scrollTop,scrollLeft,'left');
                    break; 
            }
        },
        posiDirect(size,bhBox,scrollTop,scrollLeft,isleft,tag){
            var tempLeft=''
            if(tag=='top'){
                this.bhTop=size.top-bhBox.height-15+scrollTop
                this.guidCart = [this.guidClass+'-pop-caret']
            }else{
                this.bhTop=size.top+size.height+15+scrollTop
                this.guidCart = [this.guidClass+'-pop-caretb']
            }
            
            tempLeft=size.left+size.width/2-bhBox.width/2+scrollLeft
            if(tempLeft<0){
              this.bhLeft=size.left+scrollLeft
              this.arrLeft=(size.left+size.width/2-this.bhLeft-8)+'px'
            }else{
              if(isleft){
                this.bhLeft=size.left+scrollLeft
                this.arrLeft=''
              }else{
                this.bhLeft=size.left+size.width/2-bhBox.width/2+scrollLeft
                this.arrLeft=(size.left+size.width/2-this.bhLeft-8)+'px'
              }
              
            }
            
        },
        posiOrient(size,bhBox,scrollTop,scrollLeft,tag){
            if(tag=='right'){
                this.bhLeft=size.left+size.width+20+scrollLeft
                this.guidCart=[this.guidClass+'-pop-caretl']
            }else{
                this.bhLeft=size.left+scrollLeft-20-bhBox.width
                this.guidCart=[this.guidClass+'-pop-caretr']
            }
            this.bhTop=size.top-bhBox.height/2+scrollTop+size.height/2
            this.arrLeft=''
        },
        close(){
          var me =this
          me.onClose&&me.onClose()
          me.isShow=false
          document.body.removeChild(me.$el);
          window.removeEventListener('resize', me.resizeCover,false);
        },
        sureBtn(){
          var me =this
          window.removeEventListener('resize', me.resizeCover,false);
          me.onOk&&me.onOk()
        }
    }
}
</script>

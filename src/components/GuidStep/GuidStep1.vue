<template>
<div :class="guidClass" :style="{width:domWidth+'px',height:domHeight+'px'}">
  <slot></slot>
</div>
</template>

<script>
import Button from '../Button'
export default {
  name: 'GuidStep',
  components: {
      vButton:Button,
  },
  props:{
    options:{
      type:Object,
      default(){
         return null
      }
    }
  },
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
      isShowIcon:false,
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
  
  // mounted(){
  //   console.log(this.options,'mounted')
  //     this.show(this.options)
  // },
  methods:{
      show(options){
         var me =this
         me.placement = options.placement
         me.content = options.content
         me.title = options.title
         me.okText = options.okText
         me.lastOne=options.lastOne
         
         me.prefixCls=options.prefixCls?options.prefixCls:'jad'
         var scrollTop = document.documentElement.scrollTop
         var scrollLeft = document.documentElement.scrollLeft

         if(options.container){
          console.log(options.container,'12')
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
             console.log(size,'34',me.coverLeft,me.coverTop)
             me.$nextTick(function(){

                me.computedBhBox(size,scrollTop,scrollLeft,options.isleft)
                console.log(size,'56',me.coverLeft,me.coverTop)
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
        var tempLeft=''
        if(this.placement=='top'){
            this.bhTop=size.top-bhBox.height-15+scrollTop
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
            this.guidCart = [this.guidClass+'-pop-caret']
        }else if(this.placement=='right'){
            this.bhTop=size.top-bhBox.height/2+scrollTop+size.height/2
            this.bhLeft=size.left+size.width+20+scrollLeft
            this.guidCart=[this.guidClass+'-pop-caretl']
            this.arrLeft=''
        }
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
          me.onOk&&me.onOk()
      }
  }
}
</script>

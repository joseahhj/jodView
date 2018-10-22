import Guid from './GuidStep.vue';
import Button from '../Button'
// Guid.newInst = properties => {

//     const div = document.createElement('div');
//     div.innerHTML = `<guid></guid>`;
//     const guidStep = new Vue({
//         el: div,
//         data: properties || {},
//         components: { Guid }
//     }).$children[0];
//     return {
//         show (noticeProps) {
//             guidStep.show(noticeProps);
//             document.body.appendChild(guidStep.$el);
//         }
//     };
// };

Guid.open=function(args){
  var divEnd=document.querySelector('.jad-guid')
  if(!!divEnd){
    document.body.removeChild(divEnd)
  }
  
      let guidObj = new Vue({
            template:`<guid :options="options" ref="guids">
                <div :class="guidClass+'-pop-body'" :style="{width:bhWidth+'px',left:bhLeft+'px',top:bhTop+'px'}">
                <div :class="guidClass+'-pop-bh'">
                  <h4 :class="guidClass+'-pop-title'" v-html="title"></h4> 
                  <span :class="guidClass+'-pop-close'" @click="close">
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
            </guid>`,
            components:{
              Guid,
              vButton:Button,
            },
            computed:{
              guidClass(){
                 return this.prefixCls+'-guid'
              },
            },
            data(){
              return {
                options:args,
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
            mounted(){
              console.log('mounted')
              this.show(args)
            },
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
            
      })
      let elem = guidObj.$mount()
      
        document.body.appendChild(elem.$el)
      
}

// Guid.open=function(args){
//       const div = document.createElement('div');
//       div.innerHTML = `<guid></guid>`;
//       const guidStep = new Vue({
//           el: div,
//           components: { Guid }
//       }).$children[0];
//       guidStep.show({    
//         title: args.title || '',
//         content: args.content || '',
//         onOk: args.onOk,
//         onClose: args.onClose,
//         container:args.container || '',
//         coverWidth:args.coverWidth || '',
//         coverHeight:args.coverHeight || '',
//         okText:args.okText || '完成',
//         placement:args.placement || 'top',
//         lastOne:args.lastOne,
//         prefixCls:args.prefixCls||'jad',
//         isleft:args.isleft
//       });

//       document.body.appendChild(guidStep.$el);
// }


// let newGuid = newGuid ? newGuid : Guid.newInst()

// let guid = {
//   open (args) {

//     newGuid.show({    
//       title: args.title || '',
//       content: args.content || '',
//       onOk: args.onOk,
//       onClose: args.onClose,
//       container:args.container || '',
//       coverWidth:args.coverWidth || '',
//       coverHeight:args.coverHeight || '',
//       okText:args.okText || '完成',
//       placement:args.placement || 'top',
//       lastOne:args.lastOne,
//       prefixCls:args.prefixCls||'jad',
//       isleft:args.isleft
//     })
//   }
  
// };


export default Guid;

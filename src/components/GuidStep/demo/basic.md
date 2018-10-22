---
order: 0
title:
  zh-CN: 单独使用
  en-US: basic
---

## zh-CN

自动调用或者手动调用jad.GuidStep.open(options)

## en-US

````jsx

<v-button primary @click.native="openGuid">打开新手引导</v-button> 
<span ref="step1" style="display:inline-block ">打开新手引导第一步</span>
<p style="height:100px"></p>
<v-button ref="step2" primary>第二步</v-button>
<p style="height:100px"></p>
<p style="text-align:right" >
<v-button  primary ref="step3">第三步</v-button>
</p>
<p style="height:100px"></p>
<p style="text-align:right" >
<v-button  primary ref="step4">第四步</v-button>
</p>
````

````vue-script
new Vue({
  el: 'body',
  components: {
    
    vButton: jad.Button
  },
  data() {
      return {
          count:1,
      }
  },
  methods: {
    openGuid(value) {
      var me =this
      var fname='step'+me.count
      var myCont=me.$refs[fname].$el || me.$refs[fname]
      var myText='下一步'
      var lastOne=false
      var placement='top'
      var isShowIcon = true
      var title = '<span>'+me.count+'/<em class="font12">4</em></span>对推广单元的操作'
      if(me.count==4){
        myText='完成'
        lastOne=true
        placement='bottom'
        isShowIcon = false
        title = ''
      }else if(me.count==2){
        placement='right'
      }else if(me.count==3){
        placement='left'
      }
      if(myCont){
          jad.GuidStep.open({
             content:'<p class="font14">鼠标悬停于某推广单元时，可在推广单元名称下方看到操作按钮，依次为“编辑单元”“数据趋势图”、“复制计划”；</p><p class="font14">注意原“分日报表”可在【账户报表】页面统一下载哦！</p>',
             title:title,
             okText:myText,
             lastOne:lastOne,
             placement:placement,
             isShowIcon:isShowIcon,
             bhWidth:'300',
             container:me.$refs[fname].$el || me.$refs[fname],
             onOk:function(){
                  me.count++
                  me.openGuid()
             },
             onClose:function(){
                  me.count=1
             }
          })
      }
    }
  }
})
````

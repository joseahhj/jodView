import Guid from './GuidStep.vue'


Guid.open=function(args){
      var divEnd=document.querySelector('.jad-guid')
      if(!!divEnd){
        document.body.removeChild(divEnd)
      }
      const div = document.createElement('div');
      div.innerHTML = `<guid></guid>`;
      const guidStep = new Vue({
          el: div,
          components: { Guid }
      }).$children[0];
      guidStep.show({    
        title: args.title || '',
        content: args.content || '',
        onOk: args.onOk,
        onClose: args.onClose,
        container:args.container || '',
        bhWidth:args.bhWidth || '',
        coverWidth:args.coverWidth || '',
        coverHeight:args.coverHeight || '',
        okText:args.okText || '完成',
        placement:args.placement || 'top',
        lastOne:args.lastOne,
        prefixCls:args.prefixCls||'jad',
        isleft:args.isleft,
        isShowIcon:args.isShowIcon
      });

      document.body.appendChild(guidStep.$el);
}





export default Guid;

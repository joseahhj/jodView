---
order: 7
---
## 实例化使用方法
封装的对话框组件实例用法，有`confirm`,`success`,`error`,`info`四种实例。

```html
<template>
<j-button @click="showConfirmA">显示确认对话框</j-button>
<j-button @click="showConfirm" type="info">信息提示</j-button>
<j-button @click="showConfirmB" type="success">成功信息提示</j-button>
<j-button @click="showConfirmC" type="error">错误信息提示</j-button>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    showConfirm () {
      this.$Modal.info({
        title: '操作确认操作确认操作确认操作确认操作确认操作确认操作确认操作确认操作确认', 
        content: '您确认要删除选择记录?您确认要删除选择记录您确认要删除选择记录您确认要删除选择记录您确认要删除选择记录<br>确定？<br>确定？<br>确定？<br>确定？<br>确定？', 
        onOk () {
          console.log('您确认了删除操作')
        },
        onCancel () {
            console.log('取消')
        }
        })
    },
    showConfirmB () {
      this.$Modal.success({
        title: '提示', 
        content: '操作成功了，可以去前往……', 
        btnOkText:'我成功了',
        onOk () {
          console.log('您确认了删除操作')
        },
        onCancel () {
            console.log('取消')
        }
        })
    },
    showConfirmC () {
      this.$Modal.error({
        title: '提示', 
        content: '操作失败了，继续……', 
        btnOkText:'我失败了',
        onOk () {
          console.log('您确认了删除操作')
        },
        onCancel () {
            console.log('取消')
        }
        })
    },
    showConfirmA () {
      this.$Modal.confirm({
        title: '操作确认', 
        content: '您确认要删除选择记录?', 
        onOk () {
          console.log('您确认了删除操作')
        },
        onCancel () {
            console.log('取消')
        }
        })
    }
  }
}
</script>
```

## API
this.$Modal.success(props)
this.$Modal.error(props)
this.$Modal.confirm(props)
this.$Modal.info(props)
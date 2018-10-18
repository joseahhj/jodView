---
order: 2
---
## 组合使用

与其他组件组合使用，展示新消息的数量。

````html

<template>
<j-badge :value="66">
    <j-button>
        评论
    </j-button>
</j-badge>
<j-badge :value="1">
    <j-icon type="envelope-o" font-size="30"></j-icon>
</j-badge>
<j-badge :is-visible='show' value="new">
	<j-button @click="onChanged">
		{{show ? "显示" : "隐藏"}}
	</j-button>
</j-badge>
</template>
<script>
    export default {
        data() {
            return {
                show:true
            }
        },
        methods:{
            onChanged() {
                this.show = !this.show
            }
        }
    }
</script>

````
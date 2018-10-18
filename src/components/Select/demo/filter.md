---
order: 9
---
## 搜索过滤

使用 filter 进行自定义的搜索
````html
<template>
    <j-select type="input" :options="filterOptions" isSearch :filter-metod="filter"></j-select>
</template>
<script>
    export default {
      data () {
        return {
           filterOptions: [{
                value: '1',
                label: '河北',
                jp: 'HB',
                qp: 'HeiBei',
            }, {
                value: '2',
                label: '河南',
                jp: 'HN',
                qp: 'HeiNan',
            }, {
                value: '3',
                label: '海南',
                jp: 'HN',
                qp: 'HaiNan',
            }],
          
          
        }
      },
      methods:{
        filter(item,val) {
                const input = val.toLocaleUpperCase();
                return item.label.startsWith(input) ||
                        item.jp.startsWith(input) ||
                        item.qp.startsWith(input);
        },
      }
    }
</script>
<!-- filterSelect.vue -->
```
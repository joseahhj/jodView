---
order: 5
---
## 远程搜索

设置 isSearch 为TRUE，可以开启搜索功能
````html
<template>
    <j-select :options="remoteOption" style="min-width:100px" isSearch :remote-method="remoteMethod"></j-select>
    <j-select type="input" :options="remoteOption" isSearch :remote-method="remoteMethod"></j-select>
    <j-select :options="remoteOption" placeholder="多选" style="min-width:100px" isMultiple isSearch :remote-method="remoteMethod2"></j-select>
    <j-select type="input" :options="remoteOption" isMultiple style="width:200px" isSearch :remote-method="remoteMethod2"></j-select>
    <j-select :options="remoteOption" isSearch :remote-method="remoteMethod">
        <span style="color:blue" slot="custom">{{currentValue}}</span>  
    </j-select>
</template>
<script>
    export default {
      data () {
        return {
          fruitOptions: [
            {value: 'apple', label: '苹果'},
            {value: 'banana', label: '香蕉'},
            {value: 'cherry', label: 'Cherry'},
            {value: 'orange', label: 'Orange'},
            {value: 'grape', label: 'Grape'}
          ],
          arr: ['apple', 'banana'],
          single: 'Apple',
          multiple: [],
          multipleLimit: [],
          custom: [],
          currentValue:'自定义展示',
          list: [],
          remoteOption: [],
          states: ["Alabama", "Alaska", "Arizona",
            "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida",
            "Georgia", "Hawaii", "Idaho", "Illinois",
            "Indiana", "Iowa", "Kansas", "Kentucky",
            "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana",
            "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York",
            "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania",
            "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas",
            "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin",
            "Wyoming"],
        }
       },
        mounted(){
            this.list = this.states.map(item => {
                return { value: item, label: item };
            });
        },
        methods: {
            remoteMethod(query) {
                if (query !== '') {
                    // this.loading = true;
                    setTimeout(() => {
                        // this.loading = false;
                        this.remoteOption = this.list.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.remoteOption = [];
                }
            },
            remoteMethod2(query) {
                if (query !== '') {
                    this.loading2 = true;
                    setTimeout(() => {
                        // this.loading2 = false;
                        this.remoteOption = this.list.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.remoteOption = [];
                }
            }
        }
    }
</script>
<!-- remoteSelect.vue -->
```
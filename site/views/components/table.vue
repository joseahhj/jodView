<template>
    <div>
        <j-nav></j-nav>
        <sidebar></sidebar>
        <div class="container">
            <span>Fixed header</span>
            <div style="height: 100px"></div>
            <j-table 
                :columns="columns" 
                :data="data" 
                row-key="id"
                fixed
                :customThreshold="80" >
            </j-table>
        </div>
       
    </div>
    
</template>
<script>
    import jNav from '../../components/nav';
    import sidebar from '../../components/sidebar';

    export default {
        components:{
            jNav,
            sidebar
        },
        data() {
            return {
                columns: [{
                    key: 'name',
                    title: '名字'
                }, {
                    key: 'age',
                    title: '年龄'
                }, {
                    key: 'phone',
                    title: '手机号码'
                }, {
                    key: 'address',
                    title: '地址',
                    width: 200
                }, {
                    key: 'job',
                    title: '工作地址',
                    minWidth: 150
                }],
                data: []
            };
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                for (let index = 0; index < 200; index++){
                    let item = {
                        id: 100 + index,
                        name: '周小伟',
                        age: 23,
                        address: '深圳市南山区深南大道',
                        phone: 13112121212,
                        job: '深圳市南山区深南大道银白大厦6层'
                    };

                    this.data.push(item);
                }
            }
        }
    }
</script>
<style type="text/css" scoped>
.container {
    padding: 80px;
}
</style>
import jLoading from './service'
import directive from './directive';
import {registerComponents} from '../../utils'
import Vue from 'vue';

//注册全局组件
Vue.use(directive);


registerComponents(Vue, {
    jLoading
});


export default jLoading
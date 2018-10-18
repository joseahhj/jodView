/**
 * @ 入口文件
 * @author hhj
 */
import Vue from 'vue';
import App from './app.vue';
import router from './routes.js';
import './directives/preEdit'
import './plugins/jad-vue'
require('./assets/index.scss')
new Vue({
	router,
	el: '#main',
	...App
});
/**
 * @ 路由跳转
 * @author hhj
 */
import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const routes = [
    {
        path:'/',
        redirect:'/home',
    },
    { 
    	path: '/home', 
    	component: resolve => require(['./views/home/index'], resolve) ,
    },
    // { 
    // 	path: '/components/:id',
    // 	component: resolve => require(['./views/components/index'], resolve)
    // },
    {
        path: '/components',
        component: resolve => require(['./views/components/index'], resolve),
        redirect: '/components/guid/intro',
        children: [
            {
                path: '/components/origin/:id',
                component: resolve => require(['./views/components/origin'], resolve),
                // meta: {
                //     title: '流量货币化-账户信息'
                // }
            },
            {
                path: '/components/guid/:id',
                // redirect: '/components/guid/install',
                component: resolve => require(['./views/components/guid'], resolve),
                // meta: {
                //     title: '流量货币化-账户信息'
                // }
            },
        ]
    },
    // { 
    //     path: '/guid/:id',
    //     component: resolve => require(['./views/guid/index'], resolve) ,
    // },
    { 
        path: '/rule/:id',
        component: resolve => require(['./views/rule/index'], resolve) ,
    },
    // {
    //     path:'/components',
    //     redirect:'/guid/index'
    // },
    // {
    //     path:'/guid',
    //     redirect:'/guid/install'
    // },
    {
        path:'/rule',
        redirect:'/rule/componentRule'
    },
    {
        path:'/table',
        component: resolve => require(['./views/components/table'], resolve)
    }
  
];
const router = new Router({ routes });

export default router;

// { path: '/intro', component: resolve => require(['./views/intro/index'], resolve) },
//   { path: '/components/:id',component: resolve => require(['./views/components/index'], resolve) }
import BasicLayout from '/@/layouts/BasicLayout/index.vue';
import BlankLayout from '/@/layouts/BlankLayout.vue';
import type { RouteRecordRaw } from 'vue-router';

export const accessRoutes: RouteRecordRaw[] = [
  {
    path: '/app',
    name: 'app',
    component: BasicLayout,
    redirect: '/app/home',
    meta: { title: '管理平台' },
    children: [
      {
        path: '/app/home',
        component: () => import('/@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          icon: 'liulanqi',
          auth: ['home'],
        },
      },
      {
        path: '/app/custom',
        name: 'custom',
        redirect:'/app/custom/clue',
        // component: BlankLayout,
        meta: {
          title: '客户管理',
          keepAlive: true,
          icon: 'jiedianguanli',
          auth: ['custom'],
        },
        children: [
          {
            path: '/app/custom/clue',
            name: 'clue',
            component: () => import('/@/views/custom/clue/index.vue'),
            meta: { title: '客户来源', keepAlive: true, breadcrumb: true },
          },
          {
            path: '/app/custom/manage',
            name: 'manage',
            component: () => import('/@/views/custom/manage/index.vue'),
            meta: { title: '客户管理', keepAlive: true, breadcrumb: true },
          },
          {
            path: '/app/custom/lasting',
            name: 'lasting',
            component: () => import('/@/views/custom/lasting/index.vue'),
            meta: { title: '客户追踪', keepAlive: true, breadcrumb: true },
          },
        ],
      },
      {
        path: '/app/contract',
        name: 'contract',
        component: () => import('/@/views/contract/index.vue'),
        meta: {
          title: '合同管理',
          keepAlive: true,
          icon: 'rili',
        },
        // children: [
        //   {
        //     path: '/app/contract/newly',
        //     name: 'newly',
        //     component: () => import('/@/views/house-info/newly/index.vue'),
        //     meta: { title: '新增房源', keepAlive: true,breadcrumb: true },
        //   },
        //   {
        //     path: '/app/house-info/online',
        //     name: 'online',
        //     component: () => import('/@/views/house-info/online/index.vue'),
        //     meta: { title: '房源上线', keepAlive: true, breadcrumb: true },
        //   },
        //   {
        //     path: '/app/house-info/map',
        //     name: 'online',
        //     component: () => import('/@/views/house-info/map/index.vue'),
        //     meta: { title: '房源地图编辑', keepAlive: true, breadcrumb: true },
        //   },
        // ],
      },
      {
        path: '/app/house-info',
        name: 'houseInfo',
        component: BlankLayout,
        redirect: '/app/house-info/newly',
        meta: {
          title: '房源管理',
          icon: 'shurumimadenglu',
          auth: ['houseInfo'],
        },
        children: [
          {
            path: '/app/house-info/newly',
            name: 'newly',
            component: () => import('/@/views/house-info/newly/index.vue'),
            meta: { title: '新增房源', keepAlive: true,breadcrumb: true },
          },
          {
            path: '/app/house-info/online',
            name: 'online',
            component: () => import('/@/views/house-info/online/index.vue'),
            meta: { title: '房源上线', keepAlive: true, breadcrumb: true },
          },
          {
            path: '/app/house-info/map',
            name: 'online',
            component: () => import('/@/views/house-info/map/index.vue'),
            meta: { title: '房源地图编辑', keepAlive: true, breadcrumb: true },
          },
        ],
      },
      {
        path: '/sys/account',
        name: 'account',
        component: () => import('/@/views/account/index.vue'),
        meta: { title: '用户管理', keepAlive: true, breadcrumb: true },
      },
    ],
  },
];

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
    name: 'login',
    meta: { title: '登录' },
  },
  {
    path: '/edit',
    name: 'edit',
    redirect: '/edit/map-edit',
    meta: { title: '地图编辑器' },
    children:[
      {
        path: '/app/map-edit',
        name: 'map-edit',
        component: () => import('/@/views/edit/map/index.vue'),
        meta: { title: '地图编辑器', keepAlive: true,breadcrumb: true },
      },
    ]
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/app',
    meta: {
      title: 'Root',
    },
  },
  // ...accessRoutes,
];

export const publicRoutes = [
  {
    path: '/redirect',
    component: BlankLayout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('/@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('/@/views/404.vue'),
  },
];

// /**
//  * 基础路由
//  * @type { *[] }
//  */
// export const constantRouterMap = [];

export default constantRoutes;

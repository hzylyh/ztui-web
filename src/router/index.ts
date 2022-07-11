import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Layout from '@/layout/default/index.vue'
import WithoutNav from '@/layout/without-nav/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/projectManage',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/dashboard.vue'),
      },
      {
        path: '/caseManage',
        name: 'CaseManage',
        component: () => import('@/views/case-manage/case-manage.vue'),
      },
      {
        path: '/POManage',
        name: 'POManage',
        component: () => import('@/views/po-manage/po-manage.vue'),
      },
      {
        path: '/driverManage',
        name: 'DriverManage',
        component: () => import('@/views/driver-manage/driver-manage.vue'),
      }
    ]
  },
  {
    path: '/withoutNav',
    name: 'WithoutNav',
    redirect: '/projectManage',
    component: WithoutNav,
    children: [
      {
        path: '/projectManage',
        name: 'ProjectManage',
        component: () => import('@/views/project-manage/project-manage.vue'),
      }
    ]
  }
]

const router = createRouter({
  end: false,
  history: createWebHashHistory(),
  strict: true,
  routes
})

export default router

import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Layout from '@/layout/default/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
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

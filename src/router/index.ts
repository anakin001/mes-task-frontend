import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProductionTrackingView from '@/views/ProductionTrackingView.vue'
import QualityControlView from '@/views/QualityControlView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardView,
    },
    {
      path: '/tracking',
      component: ProductionTrackingView,
    },
    {
      path: '/qc',
      component: QualityControlView,
    },
  ],
})

export default router

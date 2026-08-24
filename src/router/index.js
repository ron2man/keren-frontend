import Vue from 'vue'
import VueRouter from 'vue-router'
import { applyRouteMeta } from '@/utils/head-manager'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Homepage.vue'),
    meta: {
      title: 'קרן ליזרוביץ – אדריכלות ועיצוב פנים',
      description: 'אדריכלית קרן ליזרוביץ – תכנון בתי יוקרה, עיצוב פנים ואדריכלות סינרגית בישראל'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue'),
    meta: {
      title: 'צור קשר – קרן ליזרוביץ אדריכלית',
      description: 'צרו קשר עם הסטודיו של קרן ליזרוביץ לתחילת פרויקט אדריכלות או עיצוב פנים'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    meta: {
      title: 'אודות – קרן ליזרוביץ אדריכלית',
      description: 'הכירו את אדריכלית קרן ליזרוביץ, בוגרת הטכניון ו-Politecnico di Milano, ותהליך העבודה בסטודיו'
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "projects" */ '@/views/Projects.vue'),
    meta: {
      title: 'פרויקטים – קרן ליזרוביץ אדריכלות ועיצוב פנים',
      description: 'גלריית פרויקטים: בתי יוקרה, וילות, דירות ומשרדים שתוכננו ועוצבו על ידי הסטודיו'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isInitialNavigation = from.name === null
  if (!isInitialNavigation && to.path === from.path) {
    next(false)
  } else {
    next()
  }
})

router.afterEach((to) => {
  applyRouteMeta(to)
})

export default router

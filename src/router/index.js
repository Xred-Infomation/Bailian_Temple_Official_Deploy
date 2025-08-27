import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AboutBailian from '@/pages/AboutBailian.vue'
import DayCare from '@/pages/DayCare.vue'
import DonationPage from '@/pages/DonationPage.vue'
import HotPot from '@/pages/HotPot.vue'
import Academy from '@/pages/AcademyPage.vue'
import ContactPage from '@/pages/ContactPage.vue'
import Config from '@/pages/testPage.vue'
import NewsDetail from '@/components/NewsDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutBailian },
  { path: '/academy', name: 'Academy', component: Academy },
  { path: '/daycare', name: 'DayCare', component: DayCare },
  { path: '/donation', name: 'Donation', component: DonationPage },
  { path: '/hotpot', name: 'Hotpot', component: HotPot },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/config', name: 'Config', component: Config },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail,
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})

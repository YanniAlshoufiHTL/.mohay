import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Documentation from '../views/documentation/Documentation.vue';
import AboutUs from '../views/AboutUs.vue';
import Codespace from '../views/Codespace.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/documentation',
    redirect: '/documentation/Home',
  },
  {
    path: '/documentation/:id',
    name: 'Documentation',
    component: Documentation,
    props: true,
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUs,
  },
  {
    path: '/codespace',
    name: 'Codespace',
    component: Codespace,
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUs,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

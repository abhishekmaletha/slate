import { createRouter, createWebHistory } from "vue-router";
import Master from ".././components/Master"
import landing from ".././components/landing"
const routes = [
  {
    path: '/',
    name: 'landing',
    component: landing,
  },
  {
    path: '/master/:id?',
    name: 'Master',
    component: Master
  },
  {
    path: '/share/:id?',
    name: 'Share',
    component: () => import('.././components/share'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

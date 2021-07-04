import { createRouter, createWebHistory } from "vue-router";
import Master from ".././components/Master"
const routes = [
  {
    path: '/',
    name: 'Master',
    component: Master,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "group-foo" */ "@/views/Home.vue")
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () =>
      import(/* webpackChunkName: "group-bar" */ "@/views/Favorites.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

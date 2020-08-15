import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import DefaultLayout from "@/layouts/default.vue";
import Login from "@/views/auth/login.vue";

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
        {
            path: "",
            component: Login,
            name: 'auth.login',
        }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

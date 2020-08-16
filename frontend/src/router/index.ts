import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import DefaultLayout from "@/layouts/default.vue";
import AdminLayout from "@/layouts/admin.vue";
import AdminAuthorLayout from "@/views/admin/author/layout.vue";

import Login from "@/views/auth/login.vue";
import AdminHome from "@/views/admin/home.vue";
import AdminAuthorList from "@/views/admin/author/list.vue";
import { component } from 'vue/types/umd';

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
  {
    path: '/admin',
    component: AdminLayout,
    children: [
        {
            path: "home",
            component: AdminHome,
            name: 'admin.home',
        },
        {
            path: "authors",
            component: AdminAuthorLayout,
            children: [
                {
                    path: '',
                    component: AdminAuthorList,
                    name: 'admin.author.list',
                }
            ]
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

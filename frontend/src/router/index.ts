import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import DefaultLayout from "@/layouts/default.vue";
import AdminLayout from "@/layouts/admin.vue";

import { auth } from "@/router/auth";
import { admin } from "@/router/admin";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "*",
        redirect: "/",
    },
    {
        path: "/",
        component: DefaultLayout,
        children: [...auth]
    },
    {
        path: "/admin",
        component: AdminLayout,
        children: [...admin]
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    if (to.meta.home_redirect && token) {
        next({ name: "admin.home" });
    } else if (to.meta.auth && !token) {
        next({ name: "auth.login" });
    } else {
        next();
    }
});

export default router;

import Login from "@/views/auth/login.vue";

export const login = [
    {
        path: "",
        component: Login,
        name: 'auth.login',
        meta: {
            home_redirect: true,
        }
    }
]

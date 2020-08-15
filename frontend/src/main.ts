import Vue from "vue";
import App from "./app.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { i18n } from "@/plugins/vue-i18n";

import "@/styles/_main.scss";

import "@/components";
import "@/plugins/vue-moment";
import "@/router/interceptors";
import "@/plugins/vee-validate";
import "@/plugins/vue-notification";

Vue.config.productionTip = false;

new Vue({
    i18n,
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");

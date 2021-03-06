import Vue from "vue";
import VueI18n from "vue-i18n";
import { es } from "@/lang/es";
import { en } from "@/lang/en";

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: "es",
    messages: {
        es,
        en
    }
});

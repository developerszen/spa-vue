import Vue from "vue";
import { i18n } from "./vue-i18n";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import {
    max,
    email,
    image,
    required,
    alpha_spaces
} from "vee-validate/dist/rules";

Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);

extend("max", {
    ...max,
    message: (field, values: any): any => i18n.t("validations.max", values)
});

extend("email", {
    ...email,
    message: (field, values: any): any => i18n.t("validations.email", values)
});

extend("image", {
    ...image,
    message: (field, values: any): any => i18n.t("validations.image", values)
});

extend("required", {
    ...required,
    message: (field, values: any): any => i18n.t("validations.required", values)
});

extend("alpha_spaces", {
    ...alpha_spaces,
    message: (field, values: any): any =>
        i18n.t("validations.alpha_spaces", values)
});

//- Custom validation

extend("alpha_custom", {
    validate(value) {
        const regex: any = /^([A-Za-z .])+$/;
        return regex.test(value);
    },
    message: (field, values): any => i18n.t('validations.alpha_custom', values),
} as any);

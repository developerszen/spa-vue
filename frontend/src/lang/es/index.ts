import { app } from "./app";
import es_vuetify from "vuetify/src/locale/es";
import validationMessages from "vee-validate/dist/locale/es.json";

export const es = {
    ...app,
    $vuetify: es_vuetify,
    validations: {
        ...validationMessages.messages,
        alpha_custom: 'El campo {_field_} solo puede contener, letras, espacios y puntos',
    }
};

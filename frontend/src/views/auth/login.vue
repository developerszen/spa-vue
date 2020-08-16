<template lang="pug">
    v-row(justify="center" align="center")
        v-col(xl="4" lg="4" md="5" sm="6" xs="10" cols="10")
            v-card.primary.pa-4.elevation-4
                //- Header
                v-card-title.secondary--text {{ $t('auth.login') }}
                v-card-subtitle.white--text {{ $t('auth.enter_credentials') }}

                //- Body
                v-card-text
                    v-row
                        v-col.text-center(cols="12")
                            v-icon(color="secondary" size="80") fas fa-fingerprint

                        v-col.pb-0(cols="12")
                            //- Lang

                    validation-observer(v-slot="{ invalid }")
                        v-row
                            //- Email
                            v-col.py-0(cols="12")
                                validation-provider(
                                    :name="$t('auth.fields.email')"
                                    :rules="'required|email'"
                                    v-slot="{ errors }"
                                )
                                    v-text-field(
                                        v-model="payload.email"
                                        prepend-icon="fas fa-at"
                                        :label="$t('auth.fields.email')"
                                        :error-messages="errors"
                                        dense outlined dark
                                    )
                            //- Password
                            v-col.py-0(cols="12")
                                validation-provider(
                                    :name="$t('auth.fields.password')"
                                    :rules="'required'"
                                    v-slot="{ errors }"
                                )
                                    v-text-field(
                                        type="password"
                                        v-model="payload.password"
                                        prepend-icon="fas fa-key"
                                        :label="$t('auth.fields.password')"
                                        :error-messages="errors"
                                        dense outlined dark
                                    )
                            //- Remember
                            v-col.py-0(cols="12")
                                v-switch(
                                    v-model="payload.remember"
                                    color="secondary"
                                    :label="$t('auth.fields.remember')"
                                    dark
                                )

                            //- Actions
                            v-col.py-0.text-center(cols="12")
                                v-btn(
                                    color="secondary"
                                    :loading="loading"
                                    :disabled="invalid"
                                    @click="login()"
                                ) {{ $t('auth.login') }}

            //- Footer
            v-footer(color="secondary")
                v-row
                    v-col.text-center(cols="12")
                        v-icon(colo="primary" left) fas fa-desktop
                        v-icon(colo="primary" left) fas fa-tablet-alt
                        v-icon(colo="primary" left) fas fa-mobile-alt
</template>

<script lang="ts">
    import axios from "axios";

    export default {
        data() {
            return {
                loading: false,
                payload: {
                    email: "",
                    password: "",
                    remember: false,
                }
            }
        },
        methods: {
            login() {
                this.loading = true;

                axios.post("/api/login", this.payload)
                .then((response) => {
                    this.loading = false;

                    localStorage.setItem("token", response.data.token);

                    this.$notify({
                        type: "success",
                        title: this.$t('general.notifications.success.title'),
                        text: this.$t('auth.login_success'),
                    });

                    this.$router.push({ name: "admin.home" });
                })
                .catch(() => {
                    this.loading = false;

                    this.$notify({
                        type: "error",
                        title: this.$t('general.notifications.error.title'),
                        text: this.$t('auth.verify_credentials'),
                    })
                });
            }
        }
    }
</script>

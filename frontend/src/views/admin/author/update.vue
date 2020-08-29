<template lang="pug">
    v-row(justify="center")
        v-col.py-0(cols="12")
            //- Title
            h3.secondary--text {{ $t('admin.author.update') }}

        //- Loader
        app-loader(v-if="loading")

        //-Body
        v-row(v-else justify="center")
            v-col(xl="5" lg="5" md="6" sm="10" xs="12" cols="12")
                v-card.primary.pa-4.elevation-4
                    //- Header
                    v-card-title.secondary--text {{ $t('general.info') }}
                    v-card-subtitle.white--text {{ $t('general.fields_requireds') }}

                    //- Form
                    v-card-text
                        //- Errors
                        show-errors(v-if="errors" :errors="errors")
                        form-author(
                            :payload="payload"
                            :loading="loading"
                            @save="save"
                            edit
                        )
</template>

<script lang="ts">
    import axios from "axios";
    import FormAuthor from "@/components/views/admin/author/form.vue";

    export default {
        props: ['id'],
        components: { FormAuthor },
        created() {
            this.fetchData();
        },
        data() {
            return {
                loading: false,
                payload: {
                    name: "",
                },
                errors: null,
            }
        },
        methods: {
            save() {
                this.loading = true,

                axios.put(`/api/authors/${this.id}`, this.payload).then(() => {
                    this.loading = false;

                    this.$notify({
                        type: 'success',
                        title: this.$t('general.notifications.success.title'),
                        text: this.$t('general.notifications.success.server')
                    });

                    this.$router.push({ name: "admin.author.list" });

                }).catch((error) => {
                    this.loading = false;

                    this.errors = error.response.data.errors;

                    this.$notify({
                        type: 'error',
                        title: this.$t('general.notifications.error.title'),
                        text: this.$t('general.notifications.error.server')
                    });
                });
            },
            fetchData() {
                this.loading = true;

                axios.get(`/api/authors/${this.id}/edit`).then((response) => {
                    this.loading = false;
                    this.payload = response.data;
                });
            }
        }
    }
</script>


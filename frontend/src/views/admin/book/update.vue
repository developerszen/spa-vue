<template lang="pug">
    v-row(justify="center")
        v-col.py-0(cols="12")
            //- Title
            h3.secondary--text {{ $t('admin.book.update') }}

        //- Loader
        app-loader(v-if="loading_resource")

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

                        form-book(
                            :payload="payload"
                            :loading="loading"
                            @save="save"
                            edit
                        )
</template>

<script lang="ts">
    import axios from "axios";
    import FormBook from "@/components/views/admin/book/form.vue";

    export default {
        props: {
            id: {
                required: true,
            }
        },
        components: { FormBook },
        created() {
            this.fectchData();
        },
        data() {
            return {
                loading: false,
                loading_resource: false,
                payload: {
                    authors: [],
                    category_id: "",
                    title: "",
                    synopsis: "",
                    image: ""
                },
                errors: null,
            }
        },

        methods: {
            save() {
                this.loading = true;

                const form = new FormData();
                form.append("title", this.payload.title);
                form.append("synopsis", this.payload.synopsis);
                form.append("category_id", this.payload.category_id);
                form.append("_method", "put");

                if(this.payload.image) {
                    form.append("image", this.payload.image);
                }

                for (const [index, author] of this.payload.authors.entries()) {
                    form.append(`authors[${index}]`, author);
                }

                axios.post(`/api/books/${this.id}`, form).then(() => {
                    this.loading = false;

                    this.$notify({
                        type: 'success',
                        title: this.$t('general.notifications.success.title'),
                        text: this.$t('general.notifications.success.server')
                    });

                    this.$router.push({ name: "admin.book.list" });
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
            fectchData() {
                this.loading_resource = true;

                axios.get(`/api/books/${this.id}/edit`).then((response) => {
                    this.loading_resource = false;
                    this.payload = response.data;
                }).catch(() => {
                    this.$notify({
                        type: 'error',
                        title: this.$t('general.notifications.error.title'),
                        text: this.$t('general.notifications.error.server')
                    });
                });
            },
        }
    }
</script>

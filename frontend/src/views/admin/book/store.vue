<template lang="pug">
    v-row(justify="center")
        v-col.py-0(cols="12")
            //- Title
            h3.secondary--text {{ $t('admin.book.store') }}

        //-Body
        v-row(justify="center")
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
                        )

</template>

<script lang="ts">
    import axios from "axios";
    import FormBook from "@/components/views/admin/book/form.vue";

    export default {
        components: { FormBook },
        data() {
            return {
                loading: false,
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
                form.append("image", this.payload.image);

                for (const [index, author] of this.payload.authors.entries()) {
                    form.append(`authors[${index}]`, author);
                }

                axios.post("/api/books", form).then(() => {
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
        }
    }
</script>

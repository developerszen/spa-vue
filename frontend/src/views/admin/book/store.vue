<template lang="pug">
    v-row(justify="center")
        v-col.py-0(cols="12")
            //- Title
            h3.secondary--text {{ $t('admin.book.store') }}

        //-Body
        v-row(justify="center")
            pre {{ payload }}
            v-col(xl="5" lg="5" md="6" sm="10" xs="12" cols="12")
                v-card.primary.pa-4.elevation-4
                    //- Header
                    v-card-title.secondary--text {{ $t('general.info') }}
                    v-card-subtitle.white--text {{ $t('general.fields_requireds') }}

                    //- Form
                    v-card-text
                        //- Errors
                        show-errors(v-if="errors" :errors="errors")

                        validation-observer(v-slot="{ invalid }")
                            v-row
                                //- Name
                                v-col.py-0(cols="12")
                                    validation-provider(
                                        :name="$t('admin.book.fields.title')"
                                        :rules="'required|max:150'"
                                        v-slot="{ errors }"
                                    )
                                        v-text-field(
                                            v-model="payload.title"
                                            counter="150"
                                            prepend-icon="fas fa-book"
                                            :label="`${$t('admin.book.fields.title')}*`"
                                            :error-messages="errors"
                                            dense outlined dark
                                        )
                                //- Categories
                                v-col.py-0(cols="12")
                                    validation-provider(
                                        :name="$t('admin.book.fields.category')"
                                        :rules="'required'"
                                        v-slot="{ errors }"
                                    )
                                        app-loader(v-show="loading.resource")
                                        v-select(
                                            v-show="!loading.resource"
                                            v-model="payload.category_id"
                                            :items="categories"
                                            item-text="name"
                                            item-value="id"
                                            prepend-icon="fas fa-sitemap"
                                            :label="$t('admin.book.fields.category')"
                                            :error-messages="errors"
                                            dense outlined dark
                                        )

                                //- Authors
                                v-col.py-0(cols="12")
                                    validation-provider(
                                        :name="$t('admin.book.fields.authors')"
                                        :rules="'required'"
                                        v-slot="{ errors }"
                                    )
                                        app-loader(v-show="loading.resource")
                                        v-select(
                                            v-show="!loading.resource"
                                            v-model="payload.authors"
                                            :items="authors"
                                            item-text="name"
                                            item-value="id"
                                            prepend-icon="fas fa-pen-nib"
                                            :label="$t('admin.book.fields.authors')"
                                            :error-messages="errors"
                                            dense outlined dark multiple
                                        )

                                //- Synopsis
                                v-col.py-0(cols="12")
                                    validation-provider(
                                        :name="$t('admin.book.fields.synopsis')"
                                        :rules="'required|max:500'"
                                        v-slot="{ errors }"
                                    )
                                        v-textarea(
                                            v-model="payload.synopsis"
                                            counter="500"
                                            prepend-icon="fas fa-file-alt"
                                            :label="$t('admin.book.fields.synopsis')"
                                            :error-messages="errors"
                                            :value="payload.synopsis"
                                            outlined dark
                                        )

                                //- Image
                                v-col.py-0(cols="12")
                                    validation-provider(
                                        ref="provider_image"
                                        :name="$t('admin.book.fields.image')"
                                        :rules="'image'"
                                        v-slot="{ errors }"
                                    )
                                        v-file-input(
                                            v-model="file"
                                            prepend-icon="fas fa-image"
                                            :label="$t('admin.book.fields.image')"
                                            :error-messages="errors"
                                            @change="setImage"
                                            dense outlined dark
                                        )

                                //- Actions
                                v-col.py-0.text-center(cols="12")
                                    v-btn(
                                        color="secondary"
                                        :loading="loading.data"
                                        :disabled="invalid || loading.data"
                                        @click="save()"
                                    ) {{ $t('general.store') }}

                                    button-return.ml-2
</template>

<script lang="ts">
    import axios from "axios";

    export default {
        created() {
            this.fetchResources();
        },
        data() {
            return {
                loading: {
                    data: false,
                    resource: false,
                },
                payload: {
                    authors: [],
                    category_id: "",
                    title: "",
                    synopsis: "",
                    image: ""
                },
                errors: null,
                authors: [],
                categories: [],
                file: []
            }
        },
        methods: {
            save() {
                this.loading.data = true;

                const form = new FormData();
                form.append("title", this.payload.title);
                form.append("synopsis", this.payload.synopsis);
                form.append("category_id", this.payload.category_id);
                form.append("image", this.payload.image);

                for (const [index, author] of this.payload.authors.entries()) {
                    form.append(`authors[${index}]`, author);
                }
                
                axios.post("/api/books", form).then(() => {
                    this.loading.data = false;

                    this.$notify({
                        type: 'success',
                        title: this.$t('general.notifications.success.title'),
                        text: this.$t('general.notifications.success.server')
                    });

                    this.$router.push({ name: "admin.book.list" });
                }).catch((error) => {
                    this.loading.data = false;

                    this.errors = error.response.data.errors;

                    this.$notify({
                        type: 'error',
                        title: this.$t('general.notifications.error.title'),
                        text: this.$t('general.notifications.error.server')
                    });
                });
            },
            fetchResources() {
                this.loading.resource = true;

                axios.get("/api/books/resources").then((response) => {
                    this.loading.resource = false;

                    this.authors = response.data.authors;
                    this.categories = response.data.categories;
                });
            },
            async setImage(image) {
                const { valid } = await this.$refs.provider_image.validate(image);

                if(valid) {
                    this.payload.image = image;
                    console.log(this.payload);
                }
            }
        }
    }
</script>

<template lang="pug">
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
                    app-loader(v-show="loading_resource")
                    v-select(
                        v-show="!loading_resource"
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
                    app-loader(v-show="loading_resource")
                    v-select(
                        v-show="!loading_resource"
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
                    :loading="loading"
                    :disabled="invalid || loading"
                    @click="save()"
                ) {{ $t(edit ? 'general.update' : 'general.store') }}

                button-return.ml-2
</template>

<script lang="ts">
    import axios from "axios";

    export default {
        props: {
            payload: {
                type: Object,
                required: true
            },
            loading: {
                type: Boolean,
                required: true,
            },
            edit: {
                type: Boolean,
                default: false,
            }
        },
        created() {
            this.handleImage();
            this.fetchResources();
        },
        data() {
            return {
                loading_resource: false,
                authors: [],
                categories: [],
                file: [],
            }
        },
        watch: {
            file(image) {
                this.setImage(image);
            }
        },
        methods: {
            fetchResources() {
                this.loading_resource = true;

                axios.get("/api/books/resources").then((response) => {
                    this.loading_resource = false;

                    this.authors = response.data.authors;
                    this.categories = response.data.categories;
                });
            },
            async setImage(image) {
                const { valid } = await this.$refs.provider_image.validate(image);

                if(valid) {
                    this.payload.image = image;
                }
            },
            handleImage() {
                if (!this.payload.image) return;

                axios.get(`/${this.payload.image}`, { responseType: 'blob' })
                .then((response) => {
                    this.file = this.generateImage(response.data);
                    this.setImage(response.data);
                })
            },
            generateImage(data) {
                const extension = data.type.slice(data.type.indexOf('/') + 1);
                const name = `${new Date().getTime()}.${extension}`;

                return new File([data], name, { type: data.type });
            },
            save() {
                this.$emit('save');
            },
        }
    }
</script>

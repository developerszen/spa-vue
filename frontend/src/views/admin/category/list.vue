<template lang="pug">
    v-row(justify="center")
        v-col.py-0(cols="12")
            //- Title
            h3.secondary--text {{ $t('admin.category.list') }}

            //- Store
            v-btn(
                :to="{ name: 'admin.category.store' }"
                color="primary"
                fab x-small left depressed
            ): v-icon(x-small) fas fa-plus

            app-loader(v-if="loading.data")

            //- Data table
            v-data-table(v-else :headers="headers" :items="items" :items-per-page="5")
                template(#item.name="{ item }"): span.font-weight-bold {{ item.name }}
                template(#item.created_at="{ item }") {{ item.created_at | moment('LLL') }}
                template(#item.actions="{ item }")
                    //- Show
                    v-btn.mr-2(
                        :to="{ name: 'admin.category.show', params: { id: item.id } }"
                        color="primary"
                        fab x-small depressed
                    ): v-icon(x-small) fas fa-eye
                    //- Update
                    v-btn.mr-2(
                        :to="{ name: 'admin.category.update', params: { id: item.id } }"
                        color="secondary"
                        fab x-small depressed
                    ): v-icon(x-small) fas fa-edit
                    //- Delete
                    v-btn.mr-2(
                        :disabled="Boolean(item.book_count)"
                        @click="openDialog(item)"
                        color="error"
                        fab x-small depressed
                    ): v-icon(x-small) fas fa-trash

        v-col.py-0.text-center(cols="12"): button-return

        //- Dialog
        v-dialog(v-model="dialog" max-width="300" persistent)
            v-card(color="primary")
                v-card-text
                    v-row
                        v-col.text-center(cols="12")
                            v-icon(color="error" large) fas fa-exclamation-triangle

                        v-col.text-center.py-0.white--text(cols="12")
                            div.text-h6.font-weight-bold {{ $t('general.delete') }}
                            p {{ item.name }}

                            v-btn(
                                :loading="loading.delete"
                                @click="deleteItem()"
                                color="secondary"
                            ) {{ $t('general.delete') }}

                            v-btn.ml-2(@click="dialog = false") {{ $t('general.close') }}
</template>

<script lang="ts">
    import axios from "axios";

    export default {
        created() {
            this.fetchData();
        },
        data() {
            return {
                loading: {
                    data: false,
                    delete: false,
                },
                item: {},
                dialog: false,
                items: [],
                headers: [
                    {
                        text: this.$t("admin.category.fields.name"),
                        value: "name",
                    },
                    {
                        text: this.$t("admin.category.fields.created_at"),
                        value: "created_at",
                    },
                    {
                        text: this.$t("general.actions"),
                        value: "actions",
                    },
                ]
            }
        },
        methods: {
            fetchData() {
                this.loading.data = true;

                axios.get("/api/categories").then((response) => {
                    this.loading.data = false;
                    this.items = response.data;
                });
            },
            openDialog(item) {
                this.item = item;
                this.dialog = true;
            },
            deleteItem() {
                this.loading.delete = true;

                axios.delete(`/api/categories/${this.item.id}`).then(() => {
                    this.loading.delete = false;
                    this.dialog = false;
                    this.fetchData();

                    this.$notify({
                        type: 'success',
                        title: this.$t('general.notifications.success.title'),
                        texto: this.$t('general.notifications.success.server')
                    });
                })
                .catch(() => {
                    this.loading.delete = false;

                    this.$notify({
                        type: 'error',
                        title: this.$t('general.notifications.error.title'),
                        texto: this.$t('general.notifications.error.server')
                    });
                });
            }
        }
    }
</script>

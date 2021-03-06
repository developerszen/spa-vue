<template lang="pug">
    div
        //- App bar
        v-app-bar(color="primary" flat dark app)
            v-app-bar-nav-icon(@click="toggle()")
                v-icon(x-small) fas fa-bars

            v-toolbar-title.font-weight-bold Vue.js SPA

            v-spacer

            v-btn(
                color="secondary"
                :loading="loading"
                @click="logout()"
                fab small
            ): v-icon(small) fas fa-sign-out-alt

        //- Navigation Drawer
        v-navigation-drawer(
            v-model="show_navigation_drawer"
            color="primary"
            dark app floating
        )
            v-subheader.subtitle-2.secondary--text {{ $t('general.menu') }}

            //- List
            v-list(dense)
                v-list-item(v-for="(item, index) in items" :key="index" :to="item.to" link)
                    v-list-item-action: v-icon(small) {{ item.icon }}
                    v-list-item-content: v-list-item-title {{ item.title }}

        //- Body
        v-main: v-container: router-view

        //- Footer
        v-footer(color="secondary" inset app)
            v-row
                v-col.text-center.font-weight-bold.py-1.primary--text(cols="12")
                    | &copy; Zen Technology {{ new Date().getFullYear() }}
</template>

<script lang="ts">
    import axios from "axios";

    export default {
        data() {
            return {
                loading: false,
                show_navigation_drawer: true,
                items: [
                    {
                        icon: 'fas fa-home',
                        title: this.$t('admin.home.name'),
                        to: { name: 'admin.home' },
                    },
                    {
                        icon: 'fas fa-book',
                        title: this.$t('admin.book.name'),
                        to: { name: 'admin.book.list' },
                    },
                    {
                        icon: 'fas fa-pen-nib',
                        title: this.$t('admin.author.name'),
                        to: { name: 'admin.author.list' },
                    },
                    {
                        icon: 'fas fa-sitemap',
                        title: this.$t('admin.category.name'),
                        to: { name: 'admin.category.list' },
                    }
                ]
            }
        },
        methods: {
            logout() {
                this.loading = true;

                axios.post('/api/logout')
                .then(() => {
                    this.loading = false;

                    localStorage.setItem("token", '');

                    this.$notify({
                        type: "success",
                        title: this.$t('general.notifications.success.title'),
                        text: this.$t('auth.logout_successful'),
                    });

                    this.$router.push({ name: "auth.login" });
                })
                .catch(() => {
                    this.loading = false;

                    this.$notify({
                        type: "error",
                        title: this.$t('general.notifications.error.title'),
                        text: this.$t('general.notifications.error.server'),
                    })
                });
            },
            toggle() {
                this.show_navigation_drawer = !this.show_navigation_drawer;
            }
        }
    }
</script>

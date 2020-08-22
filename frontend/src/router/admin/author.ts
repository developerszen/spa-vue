import AdminAuthorLayout from "@/views/admin/author/layout.vue";
import AdminAuthorList from "@/views/admin/author/list.vue";
import AdminAuthorStore from "@/views/admin/author/store.vue";
import AdminAuthorShow from "@/views/admin/author/show.vue";
import AdminAuthorUpdate from "@/views/admin/author/update.vue";

export const author = [
    {
        path: "authors",
        component: AdminAuthorLayout,
        children: [
            {
                path: '',
                component: AdminAuthorList,
                name: 'admin.author.list',
                meta: {
                    auth: true,
                }
            },
            {
                path: 'store',
                component: AdminAuthorStore,
                name: 'admin.author.store',
                meta: {
                    auth: true,
                }
            },
            {
                path: 'show/:id',
                component: AdminAuthorShow,
                name: 'admin.author.show',
                meta: {
                    auth: true,
                },
                props: true,
            },
            {
                path: 'update/:id',
                component: AdminAuthorUpdate,
                name: 'admin.author.update',
                meta: {
                    auth: true,
                },
                props: true,
            }
        ]
    }
]

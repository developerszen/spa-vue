import AdminBookLayout from "@/views/admin/book/layout.vue";
import AdminBookList from "@/views/admin/book/list.vue";
import AdminBookStore from "@/views/admin/book/store.vue";
import AdminBookShow from "@/views/admin/book/show.vue";
import AdminBookUpdate from "@/views/admin/book/update.vue";

export const book = [
    {
        path: "books",
        component: AdminBookLayout,
        children: [
            {
                path: '',
                component: AdminBookList,
                name: 'admin.book.list',
                meta: {
                    auth: true,
                }
            },
            {
                path: 'store',
                component: AdminBookStore,
                name: 'admin.book.store',
                meta: {
                    auth: true,
                }
            },
            {
                path: 'show/:id',
                component: AdminBookShow,
                name: 'admin.book.show',
                meta: {
                    auth: true,
                },
                props: true,
            },
            {
                path: 'update/:id',
                component: AdminBookUpdate,
                name: 'admin.book.update',
                meta: {
                    auth: true,
                },
                props: true,
            }
        ]
    }
]

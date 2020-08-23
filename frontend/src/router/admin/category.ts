import AdminCategoryLayout from "@/views/admin/category/layout.vue";
import AdminCategoryList from "@/views/admin/category/list.vue";
import AdminCategoryStore from "@/views/admin/category/store.vue";
import AdminCategoryShow from "@/views/admin/category/show.vue";
import AdminCategoryUpdate from "@/views/admin/category/update.vue";

export const category = [
    {
        path: "categories",
        component: AdminCategoryLayout,
        children: [
            {
                path: '',
                component: AdminCategoryList,
                name: 'admin.category.list',
                meta: {
                    auth: true,
                }
            },
            {
                path: 'store',
                component: AdminCategoryStore,
                name: 'admin.category.store',
                meta: {
                    auth: true,
                }
            },
            {
                path: 'show/:id',
                component: AdminCategoryShow,
                name: 'admin.category.show',
                meta: {
                    auth: true,
                },
                props: true,
            },
            {
                path: 'update/:id',
                component: AdminCategoryUpdate,
                name: 'admin.category.update',
                meta: {
                    auth: true,
                },
                props: true,
            }
        ]
    }
]

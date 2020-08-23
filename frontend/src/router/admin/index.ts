import { author } from "@/router/admin/author";
import { home } from "@/router/admin/home";
import { category } from "@/router/admin/category";
import { book } from "@/router/admin/book";

export const admin = [...author, ...home, ...category, ...book];

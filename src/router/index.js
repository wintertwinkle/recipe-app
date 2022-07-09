import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/recipe/:slug",
        name: "Recipe",
        // dynamic imports avoid the JavaScript bundle become quite large.
        component: () => import("../views/Recipe.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useAuthStore } from "../stores/auth"

const router = createRouter({
    routes,
    history: createWebHistory(),
})

router.beforeEach(async (to, from) => {
    const store = useAuthStore()

    // check for user data
    if (!store.isUserFetched) {
        try {
            await store.fetchUser()
        } catch (error) {
            //
        }
    }

    if (to.meta.auth && !store.isLoggedIn) {
        return { name: "login", query: { redirect: to.fullPath } }
    } else if (to.meta.guest && store.isLoggedIn) {
        if (store.user.role === 'user') {
            return { name: "evaluations" }
        } else if (store.user.role === 'admin') {
            return { name: "admin.dashboard" }
        }
    } else if (!to.meta.guest && store.isLoggedIn) {
        if (store.user.role === 'user' && to.meta.admin) {
            return { name: "evaluations" }
        }
    }
})

export default router
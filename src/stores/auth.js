import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, logout, getUser, changePassword } from "../http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
    const user = ref(null)
    const errors = ref({})

    const isLoggedIn = computed(() => !!user.value)

    const fetchUser = async () => {
        try {
            const { data } = await getUser()
            user.value = data
        } catch (error) {
            user.value = null
        }
    }

    const handleLogin = async (credentials) => {
        try {
            await csrfCookie()
            await login(credentials)
            await fetchUser()
            errors.value = {}
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors
            }
        }
    }

    const handleLogout = async () => {
        await logout()
        user.value = null
    }

    const handleChangePassword = async (credentials) => {
        try {
            await changePassword(credentials)
            errors.value = {}
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors
            }
        }
    }

    return {
        user,
        errors,
        isLoggedIn,
        fetchUser,
        handleLogin,
        handleLogout,
        handleChangePassword
    }
})
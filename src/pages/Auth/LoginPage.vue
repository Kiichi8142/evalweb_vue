<template>
    <div class="flex justify-center h-screen">
        <div class="mt-44 w-96 lg:m-auto">
            <h1 class="font-semibold text-slate-950 dark:text-slate-50 text-center text-2xl">เข้าสู่ระบบ</h1>
            <form class="flex flex-col gap-y-2 p-8 rounded-md mx-auto" @submit.prevent="handleSubmit">
                <div class="flex flex-col">
                    <label class="text-slate-950 dark:text-slate-50 font-medium" for="email">Email</label>
                    <input placeholder="mail@example.com"
                        :class="{ 'border-2 border-red-600 dark:border-red-400': errors.email && errors.email[0] }"
                        class="rounded-md border p-2 text-slate-950 dark:text-slate-50 border-gray-200 dark:border-gray-800 dark:bg-slate-950"
                        type="text" id="email" v-model="form.email">
                    <div class="text-red-600 dark:text-red-400">
                        {{ errors.email && errors.email[0] }}
                    </div>
                </div>
                <div class="flex flex-col">
                    <label class="text-slate-950 dark:text-slate-50 font-medium" for="password">Password</label>
                    <input
                        :class="{ 'border-2 border-red-600 dark:border-red-400': errors.password && errors.password[0] }"
                        class="rounded-md border p-2 text-slate-950 dark:text-slate-50 border-gray-200 dark:border-gray-800 dark:bg-slate-950"
                        type="password" id="password" v-model="form.password">
                    <div class="text-red-600 dark:text-red-400">
                        {{ errors.password && errors.password[0] }}
                    </div>
                </div>
                <button type="submit"
                    class="px-2 py-2 mt-2 dark:bg-blue-400 dark:text-slate-950 bg-blue-600 text-gray-50 rounded-md hover:bg-blue-500">เข้าสู่ระบบ</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

import { useDark } from '@vueuse/core'

const isDark = useDark()

const router = useRouter()
const store = useAuthStore()
const { errors, isLoggedIn } = storeToRefs(store)
const { handleLogin } = store

const form = reactive({
    email: null,
    password: null
})

const handleSubmit = async () => {
    await handleLogin(form)
    if (isLoggedIn.value) {
        router.push({ name: 'evaluations' })
    }
}
</script>
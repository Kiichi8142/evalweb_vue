<template>
    <div v-if="store.isLoggedIn" class="border-b dark:border-slate-800">
        <div class="flex justify-between items-center max-w-7xl p-4 mx-auto">
            <div class="flex gap-10">
                <div>
                    <router-link class="font-semibold"
                        :class="[route.path.includes('/dashboard') ? 'text-blue-600 dark:text-slate-50' : 'text-slate-600 dark:text-slate-400']"
                        :to="{ name: 'dashboard' }">Dashboard</router-link>
                </div>
                <div>
                    <router-link class="font-semibold"
                        :class="[route.path.includes('/evaluations') ? 'text-blue-600 dark:text-slate-50' : 'text-slate-600 dark:text-slate-400']"
                        :to="{ name: 'evaluations' }">ประเมินผล</router-link>
                </div>
            </div>
            <div class="relative text-left items-center flex gap-4">
                <Dropdown :user-role="store.user.role" @logout="logout" :username="store.user.name" />
                <button class="text-center" @click="toggleDark(!isDark)">
                    <MoonIcon v-if="isDark" class="h-5 w-5 text-slate-50" />
                    <SunIcon v-else class="h-5 w-5 text-slate-950" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from '@/stores/auth';
import Dropdown from "./Dropdown.vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const logout = async () => {
    await store.handleLogout()
    router.push({ name: 'login' })
}

</script>
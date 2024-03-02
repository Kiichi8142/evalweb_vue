<template>
    <div class="border-b border-gray-200">
        <div class="flex justify-between items-center max-w-7xl p-4 mx-auto">
            <div class="font-semibold flex items-center gap-4">
                <router-link :class="[route.name === 'admin.dashboard' ? 'text-blue-600' : 'text-slate-600']"
                    :to="{ name: 'admin.dashboard' }">แดชบอร์ด</router-link>
                <router-link :class="[route.path.includes('/admin/manage') ? 'text-blue-600' : 'text-slate-600']"
                    :to="{ name: 'admin.teams' }">ข้อมูลทีม</router-link>
                <router-link :class="[route.path.includes('/admin/templates') ? 'text-blue-600' : 'text-slate-600']"
                    :to="{ name: 'admin.templates' }">ต้นฉบับ</router-link>
            </div>
            <div class="relative inline-block text-left">
                <div v-if="store.isLoggedIn">
                    <Dropdown @logout="logout" :username="store.user.name" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from '@/stores/auth';
import Dropdown from "./Dropdown.vue";

const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const logout = async () => {
    await store.handleLogout()
    router.push({ name: 'login' })
}
</script>
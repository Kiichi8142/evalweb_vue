<template>
    <div class="border-b border-gray-200">
        <div class="flex justify-between items-center max-w-7xl p-4 mx-auto">
            <div class="font-semibold flex items-center gap-4">
                <router-link class="text-gray-600" :class="{ 'text-gray-800': route.name === 'admin.dashboard' }"
                    :to="{ name: 'admin.dashboard' }">Dashboard</router-link>
                <router-link class="text-gray-600" :class="{ 'text-gray-800': route.name === 'admin.manage' }"
                    :to="{ name: 'admin.manage' }">Manage</router-link>
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
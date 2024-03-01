<template>
    <div v-if="store.isLoggedIn" class="border-b">
        <div class="flex justify-between items-center max-w-7xl p-4 mx-auto">
            <div class="flex gap-10">
                <div>
                    <router-link class="text-gray-600" :class="{ 'text-gray-950': route.path === '/dashboard' }"
                        :to="{ name: 'dashboard' }">Dashboard</router-link>
                </div>
                <div>
                    <router-link class="text-gray-600" :class="{ 'text-gray-950': route.path === '/evaluations' }"
                        :to="{ name: 'evaluations' }">ประเมินผล</router-link>
                </div>
            </div>
            <div class="relative inline-block text-left">
                <Dropdown @logout="logout" :username="store.user.name" />
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
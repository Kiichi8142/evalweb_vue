<template>
    <div v-if="store.isLoggedIn" class="bg-gray-800 text-gray-50">
        <div class="flex justify-between max-w-7xl p-6 mx-auto">
            <div class="flex gap-10">
                <div>
                    <router-link class="text-gray-400" :class="{ 'text-gray-50': route.path === '/dashboard' }"
                        :to="{ name: 'dashboard' }">Dashboard</router-link>
                </div>
                <div>
                    <router-link class="text-gray-400" :class="{ 'text-gray-50': route.path === '/evaluations' }"
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
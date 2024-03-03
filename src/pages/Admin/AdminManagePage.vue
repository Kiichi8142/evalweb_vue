<template>
    <div class="relative">
        <AdminNavbar />
        <div class="mx-auto max-w-7xl">
            <div class="p-4 lg:p-10 space-y-6">
                <div class="space-y-0.5">
                    <h1 class="text-2xl font-bold">Manage</h1>
                    <p class="text-gray-600">จัดการ แก้ไข หรือ เพิ่มข้อมูลได้ที่นี่</p>
                </div>
                <div class="border-b" />
                <div class="flex flex-col lg:flex-row gap-8">
                    <div class="flex lg:flex-col lg:w-1/4 space-y-0.5">
                        <router-link class="transition-all py-2 px-4 rounded-md font-medium hover:bg-blue-100/50"
                            :class="{ 'bg-blue-100/50': route.name === 'admin.teams' }" :to="{ name: 'admin.teams' }">
                            รายการทีม
                        </router-link>
                        <router-link class="transition-all py-2 px-4 rounded-md font-medium hover:bg-blue-100/50"
                            :class="{ 'bg-blue-100/50': route.name === 'admin.employees' }"
                            :to="{ name: 'admin.employees' }">
                            พนักงาน
                        </router-link>
                    </div>
                    <div class="lg:w-3/4">
                        <router-view />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AdminNavbar from '@/components/AdminNavbar.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useEmployeeStore } from '@/stores/employee';

const store = useEmployeeStore()
const { fetchAllEmployees, fetchAllTeams } = store
const route = useRoute()

onMounted(async () => {
    await fetchAllEmployees()
    await fetchAllTeams()
})

</script>
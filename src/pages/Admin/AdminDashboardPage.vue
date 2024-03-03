<template>
    <div class="relative">
        <AdminNavBar />
        <div class="mx-auto max-w-7xl">
            <div class="p-4 lg:p-10 space-y-6">
                <div class="space-y-0.5">
                    <h1 class="text-2xl font-bold">Dashboard</h1>
                    <p class="text-gray-600">ดูข้อมูลโดยรวมทั้งหมดของระบบ</p>
                </div>
                <div class="border-b" />
            </div>
        </div>
    </div>
</template>

<script setup>
import AdminNavBar from '@/components/AdminNavbar.vue'
</script>
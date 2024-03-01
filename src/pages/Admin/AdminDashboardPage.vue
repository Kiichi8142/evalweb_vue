<template>
    <div class="relative">
        <AdminNavBar />
        <div class="mx-auto">
            <div class="p-4 lg:p-10 space-y-6">
                <div class="space-y-0.5">
                    <h1 class="text-2xl font-bold">Dashboard</h1>
                    <p class="text-gray-600">จัดการ แก้ไข หรือ เพิ่มข้อมูลได้ที่นี่</p>
                </div>
                <div class="border-b" />
            </div>
        </div>
    </div>
</template>

<script setup>
import AdminNavBar from '@/components/AdminNavbar.vue'
</script>
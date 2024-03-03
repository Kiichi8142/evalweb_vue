<template>
    <AdminNavbar />
    <div class="relative">
        <div class="mx-auto max-w-7xl">
            <div class="p-4 lg:p-10 space-y-6">
                <div class="space-y-0.5">
                    <h1 class="text-2xl font-bold">แบบประเมิน</h1>
                    <p class="text-gray-600">จัดการ แก้ไข ข้อมูลแบบประเมิน</p>
                </div>
                <div class="border-b" />
                <div class="space-y-6">
                    <div class="space-y-0.5">
                        <h1 class="text-lg font-bold">รายการแบบประเมินต้นฉบับ</h1>
                        <p class="text-gray-600">รายชื่อแบบประเมินต้นฉบับทั้งหมด</p>
                    </div>
                    <div class="border-b" />
                    <TemplateDataTables :templates="templates" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AdminNavbar from '@/components/AdminNavbar.vue';
import TemplateDataTables from '@/components/TemplateDataTables.vue';

import { useTemplateStore } from '@/stores/template';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useTemplateStore()
const { templates } = storeToRefs(store)
const { fetchTemplates, fetchQuestions, fetchSections } = store

onMounted(async () => {
    await fetchTemplates()
    await fetchQuestions()
    await fetchSections()
})

</script>
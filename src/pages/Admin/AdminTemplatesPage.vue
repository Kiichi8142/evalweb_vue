<template>
    <AdminNavbar />
    <div class="relative">
        <div class="mx-auto max-w-7xl">
            <div class="p-4 lg:p-10 space-y-6">
                <div class="space-y-0.5">
                    <h1 class="text-2xl font-bold dark:text-slate-50">แบบประเมิน</h1>
                    <p class="text-gray-600 dark:text-slate-400">จัดการ แก้ไข ข้อมูลแบบประเมิน</p>
                </div>
                <div class="border-b dark:border-slate-800" />
                <div class="space-y-6">
                    <div class="space-y-0.5">
                        <h1 class="text-lg font-bold dark:text-slate-50">แบบประเมินต้นฉบับ</h1>
                        <p class="text-gray-600 dark:text-slate-400">รายชื่อแบบประเมินต้นฉบับทั้งหมด</p>
                    </div>
                    <div class="border-b dark:border-slate-800" />
                    <TemplateDataTables :templates="templates" />
                </div>
                <div class="space-y-6">
                    <div class="space-y-0.5">
                        <h1 class="text-lg font-bold dark:text-slate-50">หมวดหมู่</h1>
                        <p class="text-gray-600 dark:text-slate-400">รายชื่อหมวดหมู่ที่มี</p>
                    </div>
                    <div class="border-b dark:border-slate-800" />
                    <SectionDataTables :sections="sections" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AdminNavbar from '@/components/AdminNavbar.vue';
import TemplateDataTables from '@/components/TemplateDataTables.vue';
import SectionDataTables from '@/components/SectionDataTables.vue';

import { useTemplateStore } from '@/stores/template';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useTemplateStore()
const { templates, sections } = storeToRefs(store)
const { fetchTemplates, fetchQuestions, fetchSections } = store

onMounted(async () => {
    await fetchTemplates()
    await fetchQuestions()
    await fetchSections()
})

</script>
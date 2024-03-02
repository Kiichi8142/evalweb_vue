<template>
    <AdminNavbar />
    <div class="relative">
        <div class="mx-auto max-w-7xl">
            <div class="p-4 lg:p-10 space-y-6">
                <div class="space-y-0.5">
                    <h1 class="text-2xl font-bold">ต้นฉบับแบบประเมิน</h1>
                    <p class="text-gray-600">จัดการ แก้ไข ข้อมูลต้นฉบับแบบประเมิน</p>
                </div>
                <div class="border-b" />
                <TemplateDataTables :templates="templates" />
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
const { fetchTemplates, fetchQuestions } = store

onMounted(async () => {
    await store.fetchTemplates()
    await store.fetchQuestions()
})

</script>
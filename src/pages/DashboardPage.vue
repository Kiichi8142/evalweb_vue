<template>
    <Navbar></Navbar>
    <div class="max-w-7xl mx-auto">
        <div class="p-4 md:p-8 space-y-6">
            <div class="space-y-0.5">
                <h1 class="font-semibold text-2xl text-gray-900 dark:text-slate-50">Dashboard</h1>
                <p class="text-gray-600 dark:text-slate-400">ข้อมูลโดยรวมทั้งหมด</p>
            </div>
            <div class="border-b dark:border-slate-900" />
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div class="border shadow-sm p-4 rounded-md">
                    <p class="font-medium text-blue-600 dark:text-blue-400">ประเมินแล้ว</p>
                    <p class="text-2xl font-semibold dark:text-slate-50">{{ completedCount }} ฟอร์ม</p>
                </div>
                <div class="border shadow-sm p-4 rounded-md">
                    <p class="font-medium text-blue-600 dark:text-blue-400">ยังไม่ประเมิน</p>
                    <p class="text-2xl font-semibold dark:text-slate-50">{{ uncompletedCount }} ฟอร์ม</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { useEvaluationStore } from '@/stores/evaluation';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

const store = useEvaluationStore()
const { evaluations } = storeToRefs(store)

const completedCount = computed(() => evaluations.value.filter((evaluation) => evaluation.is_completed).length)
const uncompletedCount = computed(() => evaluations.value.filter((evaluation) => !evaluation.is_completed).length)

const { fetchAllEvaluations } = store

onMounted(async () => {
    await fetchAllEvaluations()
})
</script>
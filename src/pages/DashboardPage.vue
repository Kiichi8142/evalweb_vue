<template>
    <Navbar></Navbar>
    <div class="p-4 md:p-6">
        <div class="max-w-7xl bg-white mx-auto p-6 m-6 rounded-md">
            <h1 class="font-bold text-3xl">Dashboard</h1>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div class="border shadow-sm p-4 rounded-md">
                    <p class="font-medium">ประเมินแล้ว</p>
                    <p class="text-2xl font-bold">{{ completedCount }} ฟอร์ม</p>
                </div>
                <div class="border shadow-sm p-4 rounded-md">
                    <p class="font-medium">ยังไม่ประเมิน</p>
                    <p class="text-2xl font-bold">{{ uncompletedCount }} ฟอร์ม</p>
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
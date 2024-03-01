<template>
    <Navbar></Navbar>
    <div class="max-w-7xl mx-auto">
        <div class="p-4 md:p-8 space-y-6">
            <div>
                <p class="font-semibold text-2xl text-gray-950">รายการแบบประเมิน</p>
                <p class="text-gray-600">แบบประเมินทั้งหมดที่คุณมี</p>
            </div>
            <div class="border" />
            <div v-if="evaluations.length" class="max-w-7xl mx-auto rounded-md">
                <div class="flex flex-col gap-2 rounded-md p-2">
                    <div v-if="selfEvaluations.length" class="space-y-4">
                        <p class="text-gray-900">ประเมินตนเอง</p>
                        <Evaluation v-for="evaluation in selfEvaluations" :evaluation="evaluation" :key="evaluation.id" />
                    </div>
                    <div v-if="otherEvaluations.length">
                        <p class="text-gray-900">ประเมินผู้อื่น</p>
                        <Evaluation v-for="evaluation in otherEvaluations" :evaluation="evaluation" :key="evaluation.id" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Evaluation from '../components/evaluations/Evaluation.vue';
import { onMounted } from 'vue';
import { storeToRefs } from "pinia";

import { useEvaluationStore } from "../stores/evaluation";;

const store = useEvaluationStore()
const { evaluations, selfEvaluations, otherEvaluations } = storeToRefs(store)
const { fetchAllEvaluations } = store

onMounted(async () => {
    await fetchAllEvaluations()
})
</script>
<template>
    <div class="p-4 md:p-6">
        <div class="max-w-7xl mx-auto bg-white rounded-md p-6 m-6">
            <p class="font-semibold text-lg text-gray-950">รายการแบบประเมิน</p>
        </div>
        <div v-if="evaluations.length" class="max-w-7xl mx-auto m-6 bg-white rounded-md">
            <div class="flex flex-col gap-2 rounded-md bg-white divide-y-4">
                <div class="p-6" v-if="selfEvaluations.length">
                    <p class="font-semibold text-gray-600">ประเมินตนเอง</p>
                    <Evaluation v-for="evaluation in selfEvaluations" :evaluation="evaluation" :key="evaluation.id" />
                </div>
                <div class="p-6" v-if="otherEvaluations.length">
                    <p class="font-semibold text-gray-600">ประเมินผู้อื่น</p>
                    <Evaluation v-for="evaluation in otherEvaluations" :evaluation="evaluation" :key="evaluation.id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
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
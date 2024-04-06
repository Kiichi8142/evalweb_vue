<template>
    <Navbar></Navbar>
    <div class="max-w-7xl mx-auto">
        <div class="p-4 md:p-8 space-y-6">
            <div>
                <p class="font-semibold text-2xl text-slate-950 dark:text-slate-50">รายการแบบประเมิน</p>
                <p class="text-slate-600 dark:text-slate-400">แบบประเมินทั้งหมดที่คุณมี</p>
            </div>
            <div class="border-b dark:border-slate-900" />
            <div v-if="evaluations.length" class="max-w-7xl mx-auto rounded-md">
                <div class="flex flex-col gap-2 rounded-md">
                    <div v-if="selfEvaluations.length" class="space-y-4">
                        <p class="text-slate-900 dark:text-slate-100">ประเมินตนเอง</p>
                        <div class="flex flex-col gap-2">
                            <Evaluation v-for="evaluation in selfEvaluations" :evaluation="evaluation"
                                :key="evaluation.id" />
                        </div>
                    </div>
                    <div v-if="otherEvaluations.length">
                        <p class="text-slate-900 dark:text-slate-100">ประเมินผู้อื่น</p>
                        <div class="flex flex-col gap-2">
                            <Evaluation v-for="evaluation in otherEvaluations" :evaluation="evaluation"
                                :key="evaluation.id" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1 class="text-2xl text-slate-400/80 dark:text-slate-600/60">คุณยังไม่มีแบบประเมินใดๆในตอนนี้</h1>
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
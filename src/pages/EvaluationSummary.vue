<template>
    <Navbar></Navbar>
    <div v-if="evaluation">
        <div class="max-w-7xl mx-auto">
            <div class="p-4 lg:p-8 space-y-6">
                <div class="space-y-0.5">
                    <h1 class="font-semibold text-2xl text-slate-900 dark:text-slate-100">ผลการประเมิน</h1>
                    <p class="text-gray-600 dark:text-slate-400">รายละเอียดผลการประเมิน</p>
                </div>
                <div class="border-b border-slate-900 dark:border-slate-100" />
                <div class="space-y-0.5">
                    <h1 class="font-semibold text-lg text-gray-900 dark:text-slate-100">แบ่งตามหมวดหมู่</h1>
                </div>
                <div v-for="score in totalScoresBySection" class="space-y-0.5">
                    <div class="border dark:border-slate-900 p-4 rounded-md space-y-2">
                        <h1 class="font-semibold text-md text-slate-800 dark:text-slate-100">{{ score.section.name }}
                        </h1>
                        <div class="border-b dark:border-slate-900" />
                        <div class="grid grid-cols-1 lg:grid-cols-4">
                            <div class="grid grid-cols-2">
                                <p class="text-slate-600 dark:text-slate-600">คะแนนสูงสุด</p>
                                <p class="dark:text-slate-100">{{ score.section.max_score }}</p>
                            </div>
                            <div class="grid grid-cols-2">
                                <p class="text-slate-600 dark:text-slate-600">คะแนนที่ได้</p>
                                <p class="dark:text-slate-100">{{ score.totalScore.toFixed(2) }}</p>
                            </div>
                            <div class="grid grid-cols-2">
                                <p class="text-slate-600 dark:text-slate-600">จำนวนข้อ</p>
                                <p class="dark:text-slate-100">{{ score.items.length }}</p>
                            </div>
                            <div class="grid grid-cols-2">
                                <p class="text-slate-600 dark:text-slate-600">คะแนนต่อข้อ</p>
                                <p class="dark:text-slate-100">{{ (score.section.max_score /
        score.items.length).toFixed(2) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="space-y-0.5">
                    <h1 class="font-semibold text-lg text-slate-600 dark:text-slate-400">คะแนนรวมทั้งหมด</h1>
                    <p class="font-medium text-xl text-slate-900 dark:text-slate-100">{{ totalEvalScore.toFixed(2) }}
                        คะแนน</p>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-900 pb-32" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEvaluationStore } from "@/stores/evaluation";
import { useRoute } from "vue-router";

const store = useEvaluationStore();
const { evaluations } = storeToRefs(store)
const { fetchAllEvaluations } = store

const route = useRoute()
const id = parseInt(route.params.id)

const evaluation = computed(() => evaluations.value.find((element) => element.id === id))

function calculateItemScore(item, maxScore, numLevels) {
    return (maxScore / numLevels) * item.score;
}

const totalScoresBySection = computed(() => {
    return evaluation.value.sections.map((section) => {
        const sectionItems = evaluation.value.items.filter(item => item.section_id === section.id)
        const maxScorePerItem = section.max_score / sectionItems.length
        const sectionScore = sectionItems.reduce((total, item) => {
            return total + calculateItemScore(item, maxScorePerItem, 4);
        }, 0)

        return {
            section, // Include the whole section object
            items: sectionItems,
            totalScore: sectionScore
        }
    })
})

const totalEvalScore = computed(() => totalScoresBySection.value.reduce((acc, item) => {
    console.log(item)
    return acc + parseFloat(item.totalScore)
}, 0))

onMounted(async () => {
    await fetchAllEvaluations()
})
</script>
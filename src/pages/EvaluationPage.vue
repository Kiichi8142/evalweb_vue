<template>
    <Navbar></Navbar>
    <div v-if="evaluation">
        <div class="max-w-7xl mx-auto">
            <div class="p-4 lg:p-8 space-y-6">
                <div class="space-y-0.5">
                    <h1 class="font-semibold text-2xl text-gray-900 dark:text-slate-50">{{ evaluation.name }}</h1>
                    <p class="text-gray-600 dark:text-slate-400">{{ evaluation.description }}</p>
                </div>
                <div class="border-b dark:border-slate-800" />
                <EvaluationPersonInfo id="section" :assessor="evaluation.assessor" :employee="evaluation.employee" />
                <div class="space-y-6">
                    <div class="flex justify-between items-center">
                        <div class="space-y-0.5">
                            <h1 class="font-semibold text-2xl text-gray-900 dark:text-slate-50">ประเมินผล</h1>
                            <p class="text-gray-600 dark:text-slate-400">เลือกคะแนนตามหัวข้อประเมิน</p>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-xl font-medium dark:text-slate-50">
                                จำนวนข้อทั้งหมด {{ itemsCount }}
                            </p>
                            <p class="text-lg text-blue-600 dark:text-blue-400">
                                ประเมินแล้ว {{ itemsCompleted }} / {{ itemsCount }} ข้อ
                            </p>
                        </div>
                    </div>
                    <div class="border-b dark:border-slate-800" />
                    <div class="flex flex-col">
                        <!-- <div class="flex flex-row lg:flex-col lg:w-1/4 gap-1">
                            <button v-for="section in sections" @click="changeSection(section.id)"
                                :class="{ 'bg-gray-200 text-gray-950 dark:text-slate-50 dark:bg-slate-800': selectedSectionId === section.id }"
                                class="p-2 text-slate-600 hover:bg-gray-200 dark:hover:bg-slate-800 dark:text-slate-400 border rounded-md transition-all">
                                {{ section.name }}
                            </button>
                        </div> -->
                        <div class="flex flex-col items-center lg:items-start" v-for="section in sections"
                            :key="section.id">
                            <h1 class="font-semibold text-2xl text-blue-600 dark:text-blue-400 my-8">{{ section.name }}
                            </h1>
                            <div class="w-full flex flex-col gap-4">
                                <EvaluationItem class="border p-2 rounded-md border-slate-200 dark:border-slate-800"
                                    v-for="(question, index) in section.items" :number="index + 1" :key="question.id"
                                    :item="question" @update-item="updateItem" :ref-item="section.refItem[index]" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="itemsCompleted === itemsCount" class="flex justify-center">
                    <button @click="goToSummary"
                        class="bg-blue-600 dark:bg-blue-400 hover:dark:bg-blue-500 dark:text-slate-950 px-3 py-2 text-blue-50 rounded-md font-medium">ดูผลประเมิน</button>
                </div>
                <div v-else>
                    <p class="font-semibold text-center text-xl text-gray-400 dark:text-slate-600">
                        ประเมินให้ครบทุกข้อเพื่อดูผลการประเมิน
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="max-w-7xl mx-auto">
        <div class="p-6 lg:p-8 space-y-6">
            <div class="flex justify-center items-center gap-4 pt-32">
                <h1 class="text-4xl font-semibold dark:text-slate-50"></h1>
                <div class="flex flex-col gap-2">
                    <p class="dark:text-slate-50 text-xl">กำลังเช็คข้อมูล</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEvaluationStore } from "@/stores/evaluation";
import { useRoute, useRouter } from "vue-router";
import EvaluationItem from "@/components/evaluations/EvaluationItem.vue";
import EvaluationItemReference from "@/components/evaluations/EvaluationItemReference.vue";
import EvaluationPersonInfo from "@/components/evaluations/EvaluationPersonInfo.vue";

const store = useEvaluationStore();
const router = useRouter()
const { evaluations } = storeToRefs(store)
const { fetchAllEvaluations, handleUpdateItem } = store

const route = useRoute()
const id = parseInt(route.params.id)

const updateItem = async (item) => {
    await handleUpdateItem(id, item)
}

const goToSummary = () => {
    router.push({ name: 'evaluation.summary', params: { id: id } })
}

const evaluation = computed(() => evaluations.value.find((element) => element.id === id))

const itemsCount = computed(() => evaluation.value.items.length)
const itemsCompleted = computed(() => evaluation.value.items.filter(item => item.score > 0).length)

const sections = computed(() => evaluation.value.sections.map((item) => {
    return { id: item.id, name: item.name, items: evaluation.value.items.filter(question => question.section_id === item.id), refItem: evaluation.value.assessor_items.filter(question => question.section_id === item.id) }
}))

onMounted(async () => {
    await fetchAllEvaluations()
})
</script>
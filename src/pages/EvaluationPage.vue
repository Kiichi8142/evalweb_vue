<template>
    <Navbar></Navbar>
    <div v-if="evaluation">
        <div class="max-w-7xl mx-auto">
            <div class="p-4 lg:p-8 space-y-6">
                <div class="space-y-0.5">
                    <h1 class="font-semibold text-2xl text-gray-900 dark:text-slate-50">แบบประเมิน</h1>
                    <p class="text-gray-600 dark:text-slate-400">ประเมินบุคคลโดยให้คะแนนจากหัวข้อตามเหมาะสม</p>
                </div>
                <div class="border-b dark:border-slate-800" />
                <EvaluationPersonInfo id="section" :assessor="evaluation.assessor" :employee="evaluation.employee" />
                <div class="space-y-6">
                    <div class="flex justify-between items-center">
                        <div class="space-y-0.5">
                            <h1 class="font-semibold text-2xl text-gray-900 dark:text-slate-50">ส่วนประเมินผล</h1>
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
                    <div class="flex flex-col lg:flex-row gap-8">
                        <div class="flex flex-row lg:flex-col lg:w-1/4 gap-1">
                            <button v-for="section in sections" @click="changeSection(section.id)"
                                :class="{ 'bg-gray-200 text-gray-950 dark:text-slate-50 dark:bg-slate-800': selectedSectionId === section.id }"
                                class="p-2 text-slate-600 hover:bg-gray-200 dark:hover:bg-slate-800 dark:text-slate-400 border rounded-md transition-all">
                                {{ section.name }}
                            </button>
                        </div>
                        <div class="lg:w-3/4 space-y-4 grid grid-cols-2">
                            <EvaluationItem v-for="item in selectedSectionItems" :key="item.id" :item="item"
                                @update-item="updateItem" />
                        </div>
                    </div>
                </div>
                <div class="border-b dark:border-slate-800" />
                <div v-if="itemsCompleted === itemsCount" class="flex justify-center">
                    <button @click="goToSummary"
                        class="bg-blue-600 dark:bg-blue-400 hover:dark:bg-blue-500 dark:text-slate-950 px-3 py-2 text-blue-50 rounded-md font-medium">ดูผลประเมิน</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="max-w-7xl mx-auto">
        <div class="p-6 lg:p-8 space-y-6">
            <div class="flex justify-center items-center gap-4 pt-32">
                <h1 class="text-4xl font-semibold dark:text-slate-50">404</h1>
                <div class="flex flex-col gap-2">
                    <p class="dark:text-slate-50 text-xl">ไม่พบแบบประเมินที่คุณต้องการ</p>
                    <router-link :to="{ name: 'evaluations' }"
                        class="text-slate-50 dark:text-slate-950 px-3 py-1 bg-blue-600 dark:bg-blue-400 rounded-md w-fit">
                        <p>กลับไปหน้ารายการแบบประเมิน</p>
                    </router-link>
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
    return { id: item.id, name: item.name }
}))

const selectedSectionId = ref(1)
const selectedSectionItems = computed(() => evaluation.value.items.filter((item) => item.section_id === selectedSectionId.value))

const changeSection = (section_id) => {
    selectedSectionId.value = section_id
}

onMounted(async () => {
    await fetchAllEvaluations()
})
</script>
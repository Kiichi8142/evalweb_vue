<template>
    <Navbar></Navbar>
    <div v-if="evaluation">
        <div class="max-w-7xl mx-auto">
            <div class="p-4 lg:p-8 space-y-6">
                <div class="space-y-0.5">
                    <h1 class="font-semibold text-2xl text-gray-900">แบบประเมิน</h1>
                    <p class="text-gray-600">ประเมินบุคคลโดยให้คะแนนจากหัวข้อตามเหมาะสม</p>
                </div>
                <div class="border" />
                <EvaluationPersonInfo id="section" :assessor="evaluation.assessor" :employee="evaluation.employee" />
                <div class="space-y-6">
                    <div class="space-y-0.5">
                        <h1 class="font-semibold text-2xl text-gray-900">ส่วนประเมินผล</h1>
                        <p class="text-gray-600">เลือกคะแนนตามหัวข้อประเมิน</p>
                    </div>
                    <div class="border" />
                    <div class="flex flex-col lg:flex-row gap-8">
                        <div class="flex flex-row lg:flex-col lg:w-1/4 gap-1">
                            <button v-for="section in sections" @click="changeSection(section.id)"
                                :class="{ 'bg-gray-200 text-gray-950': selectedSectionId === section.id }"
                                class="p-2 text-gray-600 hover:bg-gray-200 border rounded-md transition-all">{{
                                    section.name
                                }}</button>
                        </div>
                        <div class="lg:w-3/4 space-y-4 divide-y">
                            <EvaluationItem v-for="item in selectedSectionItems" :key="item.id" :item="item"
                                @update-item="handleUpdateItem" />
                        </div>
                    </div>
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
import { useRoute } from "vue-router";
import EvaluationItem from "@/components/evaluations/EvaluationItem.vue";
import EvaluationPersonInfo from "@/components/evaluations/EvaluationPersonInfo.vue";

const store = useEvaluationStore();
const { evaluations } = storeToRefs(store)
const { fetchAllEvaluations, handleUpdateItem } = store

const route = useRoute()
const id = parseInt(route.params.id)

const evaluation = computed(() => evaluations.value.find((element) => element.id === id))

const totalSections = computed(() => evaluation.value.sections.length)
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
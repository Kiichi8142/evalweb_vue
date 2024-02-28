<template>
    <div v-if="evaluation" class="p-4 md:p-6">
        <EvaluationPersonInfo id="section" :assessor="evaluation.assessor" :employee="evaluation.employee" />
        <TabGroup :selected-index="selectedTab" @change="changeTab" as="div" class="max-w-7xl mx-auto bg-white rounded-md">
            <div class="p-6">
                <p class="font-semibold text-lg text-gray-900">แบบประเมิน</p>
                <p class="font-sm text-gray-600 font-medium">{{ evaluation.name }}</p>
            </div>
            <TabList class="flex rounded-md gap-x-1 border-b-2 shadow-md bg-gray-100">
                <Tab v-if="section_1.length" v-slot="{ selected }">
                    <div class="px-4 py-2 rounded-md font-medium"
                        :class="{ 'bg-gray-600 text-white': selected, 'text-gray-600': !selected }">
                        Section 1
                    </div>
                </Tab>
                <Tab v-if="section_2.length" v-slot="{ selected }">
                    <div class="px-4 py-2 rounded-md font-medium"
                        :class="{ 'bg-gray-600 text-white': selected, 'text-gray-600': !selected }">
                        Section 2
                    </div>
                </Tab>
                <Tab v-if="section_3.length" v-slot="{ selected }">
                    <div class="px-4 py-2 rounded-md font-medium"
                        :class="{ 'bg-gray-600 text-white': selected, 'text-gray-600': !selected }">
                        Section 3
                    </div>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <div class="flex flex-col mt-4">
                        <div class="grid grid-cols-1 divide-y-2 justify-items-center bg-white">
                            <EvaluationItem class="py-4" v-for="item in section_1" :item="item"
                                @update-item="handleUpdateItem" />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div class="flex flex-col mt-4">
                        <div class="grid grid-cols-1 divide-y-2 justify-items-center bg-white">
                            <EvaluationItem class="py-4" v-for="item in section_2" :item="item"
                                @update-item="handleUpdateItem" />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel v-if="section_3.length">
                    <div class="flex flex-col mt-4">
                        <div class="grid grid-cols-1 divide-y-2 justify-items-center bg-white">
                            <EvaluationItem class="py-4" v-for="item in section_3" :item="item"
                                @update-item="handleUpdateItem" />
                        </div>
                    </div>
                </TabPanel>
            </TabPanels>
            <div class="flex justify-center lg:justify-end gap-x-2 mt-4 p-6 m-6">
                <a href="#section" v-if="selectedTab > 0" @click="changeTab(selectedTab - 1)"
                    class="p-2 bg-gray-800 text-gray-50 hover:bg-gray-700 rounded-md">
                    ก่อนหน้า
                </a>
                <a v-else class="p-2 text-gray-600 rounded-md">
                    ก่อนหน้า
                </a>
                <a href="#section" v-if="selectedTab < maxPage" @click="changeTab(selectedTab + 1)"
                    class="p-2 bg-gray-800 text-gray-50 hover:bg-gray-700 rounded-md">
                    ถัดไป
                </a>
                <a v-else class="p-2 text-gray-600 rounded-md">
                    ถัดไป
                </a>
            </div>
        </TabGroup>
    </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
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

const selectedTab = ref(0)
const maxPage = ref(2)

function changeTab(index) {
    selectedTab.value = index
}

const section_1 = computed(() => evaluation.value.items.filter((item) => item.section_id === 1))
const section_2 = computed(() => evaluation.value.items.filter((item) => item.section_id === 2))
const section_3 = computed(() => evaluation.value.items.filter((item) => item.section_id === 3))

onMounted(async () => {
    await fetchAllEvaluations()
})
</script>
<template>
    <div v-if="template" class="space-y-6">
        <div>
            <h1 class="text-lg font-medium dark:text-slate-50">รายการหมวดหมู่</h1>
            <p class="text-gray-600 dark:text-slate-400">เพิ่ม ลบ หมวดหมู่</p>
        </div>
        <div class="border-b" />
        <div class="space-y-4 pb-32">
            <div class="flex justify-between items-center space-x-2">
                <input
                    class="rounded-lg border dark:bg-slate-900 border-gray-200 dark:border-slate-800 px-2 py-1 text-gray-800 dark:text-slate-200"
                    type="text" placeholder="ค้นหา..." v-model="searchTerm">
                <button @click="openAddModal"
                    class="bg-blue-600 dark:bg-blue-400 dark:text-slate-950 p-2 text-blue-50 rounded-md hover:bg-blue-500">เพิ่มหมวดหมู่</button>
            </div>
            <div class="border dark:border-slate-800 rounded-md">
                <table class="table-auto w-full">
                    <thead>
                        <tr class="border-b dark:border-slate-800">
                            <th
                                class="h-12 px-4 text-center align-middle font-medium text-gray-600 dark:text-slate-400">
                                รหัส</th>
                            <th class="h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-slate-400">
                                คำถาม</th>
                            <th class="h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-slate-400">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="question in filteredAndPaginatedItems" class="border-b dark:border-slate-800">
                            <td class="p-4 align-middle dark:text-slate-50 text-center">{{ question.id }}</td>
                            <td class="p-4 align-middle dark:text-slate-50">{{ question.name }}</td>
                            <td class="p-4 align-middle dark:text-slate-50">
                                <button class="text-blue-600 dark:text-blue-400"
                                    @click="removeSection(question.id)">ลบ</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-between items-center space-x-2">
                <div>
                    <p class="dark:text-slate-50">หน้า {{ currentPage }} ใน {{ totalPages }}</p>
                </div>
                <div class="flex space-x-8 items-center">
                    <p class="dark:text-slate-50">หน้าต่อแถว {{ itemsPerPage }}</p>
                    <div class="flex space-x-2 items-center">
                        <button @click="firstPage" class="border rounded-md p-1 dark:border-slate-800"
                            :disabled="currentPage === 1">
                            <ChevronDoubleLeftIcon class="h-5 w-5"
                                :class="{ 'text-gray-400 dark:text-slate-600': currentPage === 1 }" />
                        </button>
                        <button @click="prevPage" class="border rounded-md p-1 dark:border-slate-800"
                            :disabled="currentPage === 1">
                            <ChevronLeftIcon class="h-5 w-5"
                                :class="{ 'text-gray-400 dark:text-slate-600': currentPage === 1 }" />
                        </button>
                        <button @click="nextPage" class="border rounded-md p-1 dark:border-slate-800"
                            :disabled="currentPage === totalPages">
                            <ChevronRightIcon class="h-5 w-5"
                                :class="{ 'text-gray-400 dark:text-slate-600': currentPage === totalPages }" />
                        </button>
                        <button @click="lastPage" class="border rounded-md p-1 dark:border-slate-800"
                            :disabled="currentPage === totalPages">
                            <ChevronDoubleRightIcon class="h-5 w-5"
                                :class="{ 'text-gray-400 dark:text-slate-600': currentPage === totalPages }" />
                        </button>
                    </div>
                </div>
            </div>
            <AddSectionTemplateModal :template_id="id" :is-open="isAddModalOpen" @close-modal="closeModal" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router';
import AddSectionTemplateModal from '@/components/admin/AddSectionTemplateModal.vue';

import { useTemplateStore } from '@/stores/template';
import { storeToRefs } from 'pinia';

const store = useTemplateStore()
const { templates } = storeToRefs(store)
const { handleRemoveTemplateSection } = store

const route = useRoute()
const id = parseInt(route.params.id)

const template = computed(() => templates.value.find(item => item.id === id))

const itemsPerPage = ref(5)
const currentPage = ref(1)
const searchTerm = ref('')

const totalPages = computed(() => {
    return Math.ceil(template.value.sections.length / itemsPerPage.value);
});

const filteredItems = computed(() => {
    return template.value.sections.filter((item) => {
        // Example: Search by name (case-insensitive)
        return item.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    });
});

const filteredAndPaginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredItems.value.slice(start, end);
});

const firstPage = () => {
    currentPage.value = 1;
}

const lastPage = () => {
    currentPage.value = totalPages.value;
}

const prevPage = () => {
    currentPage.value = Math.max(1, currentPage.value - 1);
};

const nextPage = () => {
    currentPage.value = Math.min(totalPages.value, currentPage.value + 1);
};

const isAddModalOpen = ref(false)

const removeSection = async (sectionId) => {
    await handleRemoveTemplateSection(id, { sections: sectionId })
}

const openAddModal = () => {
    isAddModalOpen.value = true
}

const closeModal = () => {
    isAddModalOpen.value = false
}
</script>
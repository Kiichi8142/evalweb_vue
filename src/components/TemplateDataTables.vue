<template>
    <div>
        <div class="flex items-center p-2 justify-end">
            <button @click="openAddModal"
                class="bg-blue-600 dark:bg-blue-400 dark:text-slate-950 px-3 py-1 rounded-md text-blue-50">เพิ่มต้นแบบ</button>
        </div>
        <div class="border dark:border-slate-800 rounded-md">
            <table class="table-auto w-full">
                <thead>
                    <tr class="border-b dark:border-slate-800">
                        <th class="h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-slate-400">รหัส
                        </th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-slate-400">ชื่อ
                        </th>
                        <th class="h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-slate-400"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="template in filteredAndPaginatedItems" class="border-b dark:border-slate-800">
                        <td class="p-4 align-middle dark:text-slate-50">{{ template.id }}</td>
                        <td class="p-4 align-middle dark:text-slate-50">{{ template.name }}</td>
                        <td @click="view(template)"
                            class="p-4 align-middle text-blue-600 dark:text-blue-400 cursor-pointer">
                            ดูข้อมูล
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-between items-center space-x-2">
            <div>
                <p class="dark:text-slate-50">หน้า {{ currentPage }} ใน {{ totalPages }}</p>
            </div>
            <div class="flex space-x-8 items-center mt-2">
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
        <AddTemplateModal :is-open="isOpen" @close-modal="closeModal" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';
import AddTemplateModal from './admin/AddTemplateModal.vue';

const isOpen = ref(false)

const openAddModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
}

const router = useRouter()

const props = defineProps(['templates'])

const itemsPerPage = ref(5)
const currentPage = ref(1)
const searchTerm = ref('')

const totalPages = computed(() => {
    return Math.ceil(props.templates.length / itemsPerPage.value);
});

const filteredItems = computed(() => {
    return props.templates.filter((item) => {
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

const view = (template) => {
    router.push({ name: 'admin.template.detail', params: { id: template.id } })
}

</script>
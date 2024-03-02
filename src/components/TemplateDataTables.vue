<template>
    <div class="border rounded-md">
        <table class="table-auto w-full">
            <thead>
                <tr class="border-b">
                    <th class="h-12 px-4 text-left align-middle font-medium text-gray-600">รหัส</th>
                    <th class="h-12 px-4 text-left align-middle font-medium text-gray-600">ชื่อ</th>
                    <th class="h-12 px-4 text-left align-middle font-medium text-gray-600"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="template in filteredAndPaginatedItems" class="border-b">
                    <td class="p-4 align-middle">{{ template.id }}</td>
                    <td class="p-4 align-middle">{{ template.name }}</td>
                    <td @click="view(template)" class="p-4 align-middle text-blue-600 cursor-pointer">
                        View
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="flex justify-between items-center space-x-2">
        <div>
            <p>หน้า {{ currentPage }} ใน {{ totalPages }}</p>
        </div>
        <div class="flex space-x-8 items-center">
            <p>หน้าต่อแถว {{ itemsPerPage }}</p>
            <div class="flex space-x-2 items-center">
                <button @click="firstPage" class="border rounded-md p-1" :disabled="currentPage === 1">
                    <ChevronDoubleLeftIcon class="h-5 w-5" :class="{ 'text-gray-400': currentPage === 1 }" />
                </button>
                <button @click="prevPage" class="border rounded-md p-1" :disabled="currentPage === 1">
                    <ChevronLeftIcon class="h-5 w-5" :class="{ 'text-gray-400': currentPage === 1 }" />
                </button>
                <button @click="nextPage" class="border rounded-md p-1" :disabled="currentPage === totalPages">
                    <ChevronRightIcon class="h-5 w-5" :class="{ 'text-gray-400': currentPage === totalPages }" />
                </button>
                <button @click="lastPage" class="border rounded-md p-1" :disabled="currentPage === totalPages">
                    <ChevronDoubleRightIcon class="h-5 w-5" :class="{ 'text-gray-400': currentPage === totalPages }" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

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
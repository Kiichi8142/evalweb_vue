<template>
    <div class="space-y-6">
        <div>
            <h1 class="text-lg font-medium dark:text-slate-50">การจัดการพนักงาน</h1>
            <p class="text-gray-600 dark:text-slate-400">เพิ่ม แก้ไข ข้อมูลพนักงาน</p>
        </div>
        <div class="border-b dark:border-slate-800" />
        <div class="space-y-4 pb-32">
            <div class="flex justify-between items-center space-x-2">
                <input
                    class="rounded-lg border dark:bg-slate-900 border-gray-200 dark:border-slate-800 px-2 py-1 text-gray-800 dark:text-slate-200"
                    type="text" placeholder="ค้นหา..." v-model="searchTerm">
                <button @click="openAddModal"
                    class="bg-blue-600 dark:bg-blue-400 p-2 text-blue-50 dark:text-slate-950 rounded-md hover:bg-blue-500">เพิ่มพนักงาน</button>
            </div>
            <div class="border dark:border-slate-800 rounded-md">
                <table class="table-auto w-full">
                    <thead>
                        <tr class="border-b dark:border-slate-800">
                            <th class="h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-slate-400">
                                รหัส</th>
                            <th class="h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-slate-400">
                                ชื่อ</th>
                            <th class="h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-slate-400">
                                ทีม</th>
                            <th class="h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-slate-400">
                                ตำแหน่ง</th>
                            <th class="h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-slate-400">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="employee in filteredAndPaginatedItems" class="border-b dark:border-slate-800">
                            <td class="p-4 align-middle dark:text-slate-50">{{ employee.id }}</td>
                            <td class="p-4 align-middle dark:text-slate-50">{{ employee.firstname }} {{
                        employee.lastname }}</td>
                            <td v-if="employee.team" class="p-4 align-middle dark:text-slate-50">{{ employee.team.name
                                }}</td>
                            <td v-else class="p-4 align-middle dark:text-slate-50">No Team</td>
                            <td class="p-4 align-middle dark:text-slate-50">{{ employee.position }}</td>
                            <td class="p-4 align-middle dark:text-slate-50">
                                <button @click="editEmployee(employee)"
                                    class="text-blue-600 dark:text-blue-400">Edit</button>
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
                        <button @click="firstPage"
                            class="border rounded-md p-1 dark:border-slate-800 dark:text-slate-50"
                            :disabled="currentPage === 1">
                            <ChevronDoubleLeftIcon class="h-5 w-5"
                                :class="{ 'text-gray-400 dark:text-slate-600': currentPage === 1 }" />
                        </button>
                        <button @click="prevPage" class="border rounded-md p-1 dark:border-slate-800 dark:text-slate-50"
                            :disabled="currentPage === 1">
                            <ChevronLeftIcon class="h-5 w-5"
                                :class="{ 'text-gray-400 dark:text-slate-600': currentPage === 1 }" />
                        </button>
                        <button @click="nextPage" class="border rounded-md p-1 dark:border-slate-800 dark:text-slate-50"
                            :disabled="currentPage === totalPages">
                            <ChevronRightIcon class="h-5 w-5"
                                :class="{ 'text-gray-400 dark:text-slate-600': currentPage === totalPages }" />
                        </button>
                        <button @click="lastPage" class="border rounded-md p-1 dark:border-slate-800 dark:text-slate-50"
                            :disabled="currentPage === totalPages">
                            <ChevronDoubleRightIcon class="h-5 w-5"
                                :class="{ 'text-gray-400 dark:text-slate-600': currentPage === totalPages }" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <UpdateEmployeeModal @close-modal="closeModal" :is-open="isModalOpen" :employee="selectedEmployee" />
        <AddEmployeeModal :is-open="isAddModalOpen" @close-modal="closeModal" />
    </div>
</template>

<script setup>
import UpdateEmployeeModal from '@/components/admin/UpdateEmployeeModal.vue';
import { useEmployeeStore } from '@/stores/employee';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import AddEmployeeModal from './AddEmployeeModal.vue';

const store = useEmployeeStore()
const { employees } = storeToRefs(store)

const itemsPerPage = ref(5)
const currentPage = ref(1)
const searchTerm = ref('')

const totalPages = computed(() => {
    return Math.ceil(employees.value.length / itemsPerPage.value);
});

const filteredItems = computed(() => {
    return employees.value.filter((item) => {
        // Example: Search by name (case-insensitive)
        return item.firstname.toLowerCase().includes(searchTerm.value.toLowerCase())
            || item.lastname.toLowerCase().includes(searchTerm.value.toLowerCase())
            || item.position.toLowerCase().includes(searchTerm.value.toLowerCase())
            || item.team.name.toLowerCase().includes(searchTerm.value.toLowerCase());
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

const selectedEmployee = ref(0)

const isModalOpen = ref(false)
const isAddModalOpen = ref(false)

const openAddModal = () => {
    isAddModalOpen.value = true
}

const editEmployee = (employee) => {
    selectedEmployee.value = employee
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
    isAddModalOpen.value = false
}

</script>
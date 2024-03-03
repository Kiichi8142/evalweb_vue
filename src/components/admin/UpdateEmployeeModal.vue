<template>
    <div v-if="isOpen" class="relative z-50">
        <div as="div" class="fixed inset-0 flex w-screen items-center bg-black/[.4] justify-center p-4">
            <div class="rounded-xl border shadow-md max-w-3xl bg-white w-full">
                <div class="flex flex-col p-6 space-y-1.5">
                    <h1 class="font-semibold">Edit employee</h1>
                    <h1 class="text-gray-600">
                        Edit or update your employee information
                    </h1>
                </div>
                <div class="p-6 grid">
                    <form @submit.prevent="">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="grid gap-2">
                                <label for="firstname">Firstname</label>
                                <input class="border rounded-md px-3 py-1 h-9" type="text"
                                    v-model="employeeCopy.firstname">
                            </div>
                            <div class="grid gap-2">
                                <label for="lastname">Lastname</label>
                                <input class="border rounded-md px-3 py-1 h-9" type="text"
                                    v-model="employeeCopy.lastname">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="grid gap-2">
                                <label for="position">Position</label>
                                <input class="border rounded-md px-3 py-1 h-9" type="text"
                                    v-model="employeeCopy.position">
                            </div>
                            <div class="grid gap-2">
                                <label for="lastname">Team</label>
                                <TeamListBox :team="employeeCopy.team" @update:team="changeTeam" />
                            </div>
                        </div>
                    </form>
                </div>
                <div class="flex p-6 items-center justify-between gap-4">
                    <div>
                        <button @click="openConfirmModal"
                            class="text-red-600 hover:bg-red-100 font-medium p-2 rounded-md">Remove</button>
                    </div>
                    <div class="flex gap-4">
                        <button @click="$emit('closeModal')"
                            class="text-gray-950 hover:bg-gray-100 font-medium p-2 rounded-md">Cancel</button>
                        <button @click="updateEmployee"
                            class="bg-gray-900 hover:bg-gray-800 text-gray-50 font-medium p-2 rounded-md">Update</button>
                    </div>
                </div>
            </div>
        </div>
        <ConfirmationInputModal @confirm-delete="deleteEmployee" :description="confirmDescription"
            :confirm-txt="'confirmation'" :is-open="confirmModalOpen" @close-modal="closeConfirmModal" />
    </div>
</template>

<script setup>
import TeamListBox from './TeamListBox.vue';
import { useEmployeeStore } from '@/stores/employee';
import { reactive, ref, watch } from 'vue';
import ConfirmationInputModal from '../ConfirmationInputModal.vue';
const props = defineProps(['employee', 'isOpen'])
const emit = defineEmits(['closeModal'])

const confirmDescription = ref('Deleting employee will remove their account and evaluation.')
const store = useEmployeeStore()
const { handleUpdateEmployee, handleDeleteEmployee } = store

const confirmModalOpen = ref(false)

const closeConfirmModal = () => {
    confirmModalOpen.value = false
}

const openConfirmModal = () => {
    confirmModalOpen.value = true
}

const employeeCopy = reactive({});

watch(() => props.employee, (newEmployee) => {
    if (newEmployee) {
        // Overwrite properties within the reactive object
        Object.assign(employeeCopy, JSON.parse(JSON.stringify(newEmployee)));
    }
});

const changeTeam = (team) => {
    employeeCopy.team = team
}

const updateEmployee = async () => {
    await handleUpdateEmployee(employeeCopy.id, {
        'id': employeeCopy.id,
        'firstname': employeeCopy.firstname,
        'lastname': employeeCopy.lastname,
        'position': employeeCopy.position,
        'team_id': employeeCopy.team.id,
    })
    emit('closeModal')
}

const deleteEmployee = async () => {
    await handleDeleteEmployee(employeeCopy.id)
    emit('closeModal')
}
</script>
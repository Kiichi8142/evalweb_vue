<template>
    <div v-if="isOpen" class="relative z-50">
        <div as="div" class="fixed inset-0 flex w-screen items-center bg-black/[.4] justify-center p-4">
            <div class="rounded-xl border shadow-md max-w-3xl bg-white w-full">
                <div class="flex flex-col p-6 space-y-1.5">
                    <h1 class="font-semibold">Edit team</h1>
                    <h1 class="text-gray-600">
                        Edit or update your team information
                    </h1>
                </div>
                <div class="p-6 grid">
                    <form @submit.prevent="">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="grid gap-2">
                                <label for="firstname">Name</label>
                                <input id="team-name" class="border rounded-md px-3 py-1 h-9" type="text"
                                    v-model="teamCopy.name">
                            </div>
                            <div class="grid gap-2">
                                <label for="lastname">Department</label>
                                <input id="department" class="border rounded-md px-3 py-1 h-9" type="text"
                                    v-model="teamCopy.department">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="grid gap-2">
                                <label for="position">Manager</label>
                                <input id="manager-id" class="border rounded-md px-3 py-1 h-9" type="text"
                                    placeholder="Enter manager ID" v-model="teamCopy.manager.id">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="flex p-6 items-center justify-between gap-4">
                    <div>
                        <button @click="openDeleteTeamModal"
                            class="text-red-600 hover:bg-red-100 font-medium p-2 rounded-md">Remove</button>
                    </div>
                    <div class="flex gap-4">
                        <button @click="$emit('closeModal')"
                            class="text-gray-950 hover:bg-gray-100 font-medium p-2 rounded-md">Cancel</button>
                        <button @click="updateTeam"
                            class="bg-gray-900 hover:bg-gray-800 text-gray-50 font-medium p-2 rounded-md">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <DeleteTeamModalWarning :is-open="isDeleteModalOpen" @close-modal="closeDeleteModal" @confirm-delete="deleteTeam" />
</template>

<script setup>
import { useEmployeeStore } from '@/stores/employee';
import { reactive, watch, ref } from 'vue';
import DeleteTeamModalWarning from './DeleteTeamModalWarning.vue';
const props = defineProps(['team', 'isOpen'])
const emit = defineEmits(['closeModal'])

const store = useEmployeeStore()
const { handleUpdateTeam, handleDeleteTeam } = store

const teamCopy = reactive({});

const isDeleteModalOpen = ref(false)

watch(() => props.team, (newTeam) => {
    if (newTeam) {
        // Overwrite properties within the reactive object
        Object.assign(teamCopy, JSON.parse(JSON.stringify(newTeam)));
    }
});

const openDeleteTeamModal = async () => {
    isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
}

const deleteTeam = async () => {
    await handleDeleteTeam(teamCopy)
    isDeleteModalOpen.value = false
    emit('closeModal')
}

const updateTeam = async () => {
    await handleUpdateTeam(teamCopy.id, teamCopy)
    emit('closeModal')
}
</script>
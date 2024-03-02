<template>
    <div v-if="isOpen" class="relative z-50">
        <div as="div" class="fixed inset-0 flex w-screen items-center bg-black/[.4] justify-center p-4">
            <div class="rounded-xl border shadow-md max-w-3xl bg-white w-full">
                <div class="flex flex-col p-6 space-y-1.5">
                    <h1 class="font-semibold">Add team</h1>
                    <h1 class="text-gray-600">
                        Add a new team to your organization
                    </h1>
                </div>
                <div class="p-6 grid">
                    <form @submit.prevent="">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="grid gap-2">
                                <label for="firstname">Name</label>
                                <input class="border rounded-md px-3 py-1 h-9" type="text" placeholder="Team name"
                                    v-model="form.name">
                            </div>
                            <div class="grid gap-2">
                                <label for="lastname">Department</label>
                                <input class="border rounded-md px-3 py-1 h-9" type="text" placeholder="Department name"
                                    v-model="form.department">
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="grid gap-2">
                                <label for="position">Manager</label>
                                <input class="border rounded-md px-3 py-1 h-9" type="text" placeholder="Enter manager ID"
                                    v-model="form.manager_id">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="flex p-6 items-center justify-end gap-4">
                    <button @click="$emit('closeModal')"
                        class="text-gray-950 hover:bg-gray-100 font-medium p-2 rounded-md">Cancel</button>
                    <button @click="addTeam"
                        class="bg-gray-900 hover:bg-gray-800 text-gray-50 font-medium p-2 rounded-md">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useEmployeeStore } from '@/stores/employee';
import { reactive } from 'vue';
const props = defineProps(['isOpen'])
const emit = defineEmits(['closeModal'])

const form = reactive({
    "name": '',
    "department": '',
    "manager_id": ''
})

const store = useEmployeeStore()
const { handleAddTeam } = store

const addTeam = async () => {
    await handleAddTeam(form)
    emit('closeModal')
}
</script>
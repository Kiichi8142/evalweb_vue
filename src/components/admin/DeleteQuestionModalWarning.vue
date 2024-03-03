<template>
    <Dialog :open="isOpen" class="relative z-50">
        <DialogPanel as="div" class="fixed inset-0 flex w-screen items-center bg-black/[.4] justify-center p-4">
            <div class="rounded-xl border shadow-md max-w-3xl bg-white w-full">
                <div class="flex flex-col p-6 space-y-1.5">
                    <DialogTitle class="font-semibold text-red-600">Warning</DialogTitle>
                    <DialogDescription class="text-red-600">
                        Do you want to delete this question?
                    </DialogDescription>
                </div>
                <div class="p-6 grid">
                    <p>Deleting this question will make all evaluations item currently active gone.</p>
                    <p>And cannot be recover.</p>
                </div>
                <div class="flex p-6 items-center justify-end gap-4">
                    <button @click="$emit('closeModal')"
                        class="text-gray-950 hover:bg-gray-100 font-medium p-2 rounded-md">Cancel</button>
                    <button @click="deleteTeam"
                        class="text-red-50 bg-red-600 hover:bg-red-500 font-medium p-2 rounded-md">Confirm</button>
                </div>
            </div>
        </DialogPanel>
    </Dialog>
</template>

<script setup>
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
} from '@headlessui/vue'
const props = defineProps(['isOpen'])
const emit = defineEmits(['closeModal', 'confirmDelete'])

const deleteTeam = async () => {
    emit('confirmDelete')
}
</script>
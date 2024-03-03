<template>
    <Dialog :open="isOpen" class="relative z-50">
        <DialogPanel as="div" class="fixed inset-0 flex w-screen items-center bg-black/[.4] justify-center p-4">
            <div class="rounded-xl border shadow-md max-w-3xl bg-white w-full">
                <div class="flex flex-col p-6 space-y-1.5">
                    <DialogTitle class="font-semibold text-red-600">Confirm your command</DialogTitle>
                    <DialogDescription class="text-red-600">
                        {{ description }}
                    </DialogDescription>
                </div>
                <div class="p-6 grid">
                    <p>Enter the '{{ confirmTxt }}' to continue</p>
                    <input :class="{ 'border-red-500': errors }" class="border-2 rounded-md bg-slate-100 py-1 px-3"
                        type="text" v-model="confirmationText">
                    <p v-if="errors" class="text-red-500">{{ errors }}</p>
                </div>
                <div class="flex p-6 items-center justify-end gap-4">
                    <button @click="$emit('closeModal')"
                        class="text-gray-950 hover:bg-gray-100 font-medium p-2 rounded-md">Cancel</button>
                    <button @click="confirmDelete"
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
} from '@headlessui/vue';
import { ref } from 'vue';
const props = defineProps(['isOpen', 'description', 'confirmTxt'])
const emit = defineEmits(['closeModal', 'confirmDelete'])

const confirmationText = ref('')
const errors = ref('')

const confirmDelete = () => {
    if (confirmationText.value === props.confirmTxt) {
        errors.value = ''
        emit('confirmDelete')
    } else {
        errors.value = 'Incorrect confirmation word'
    }
}
</script>
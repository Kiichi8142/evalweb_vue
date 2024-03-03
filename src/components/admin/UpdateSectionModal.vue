<template>
    <div v-if="isOpen" class="relative z-50">
        <div as="div" class="fixed inset-0 flex w-screen items-center bg-black/[.4] justify-center p-4">
            <div class="rounded-xl border shadow-md max-w-3xl bg-white w-full">
                <div class="flex flex-col p-6 space-y-1.5">
                    <h1 class="font-semibold">แก้ไขหมวดหมู่</h1>
                    <h1 class="text-gray-600">
                        เปลี่ยนแปลงข้อมูลของหมวดหมู่
                    </h1>
                </div>
                <div class="p-6 grid">
                    <form @submit.prevent="">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="grid gap-2">
                                <label for="team-name">ชื่อหมวดหมู่</label>
                                <input id="team-name" class="border rounded-md px-3 py-1 h-9" type="text"
                                    v-model="sectionCpy.name">
                            </div>
                            <div class="grid gap-2">
                                <label for="max-score">คะแนนสูงสุด</label>
                                <input id="max-score" class="border rounded-md px-3 py-1 h-9" type="number"
                                    v-model="sectionCpy.max_score">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="flex p-6 items-center justify-between gap-4">
                    <div>
                        <button @click="openDeleteSectionModal"
                            class="text-red-600 hover:bg-red-100 font-medium p-2 rounded-md">Remove</button>
                    </div>
                    <div class="flex gap-4">
                        <button @click="$emit('closeModal')"
                            class="text-gray-950 hover:bg-gray-100 font-medium p-2 rounded-md">Cancel</button>
                        <button @click="updateSection"
                            class="bg-gray-900 hover:bg-gray-800 text-gray-50 font-medium p-2 rounded-md">Update</button>
                    </div>
                </div>
            </div>
        </div>
        <ConfirmationInputModal :confirm-txt="'confirm'" :description="deleteDescription" :is-open="isDeleteModalOpen"
            @confirm-delete="deleteSection" @close-modal="closeDeleteModal" />
    </div>
</template>

<script setup>
import { useTemplateStore } from '@/stores/template';
import { reactive, watch, ref } from 'vue';
const props = defineProps(['isOpen', 'section'])
const emit = defineEmits(['closeModal'])
import ConfirmationInputModal from '../ConfirmationInputModal.vue';

const deleteDescription = ref('ลบหมวดหมู่ ไม่ส่งผลอะไรหรอกเชื่อเถอะ')

const store = useTemplateStore()
const { handleUpdateSection, handleDeleteSection } = store

const sectionCpy = reactive({});

const isDeleteModalOpen = ref(false)

watch(() => props.section, (newSection) => {
    if (newSection) {
        // Overwrite properties within the reactive object
        Object.assign(sectionCpy, JSON.parse(JSON.stringify(newSection)));
    }
});

const openDeleteSectionModal = async () => {
    isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
}

const deleteSection = async () => {
    await handleDeleteSection(sectionCpy.id)
    isDeleteModalOpen.value = false
    emit('closeModal')
}

const updateSection = async () => {
    await handleUpdateSection(sectionCpy.id, sectionCpy)
    emit('closeModal')
}
</script>
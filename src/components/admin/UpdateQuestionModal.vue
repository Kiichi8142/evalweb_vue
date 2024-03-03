<template>
    <div v-if="isOpen" class="relative z-50">
        <div as="div" class="fixed inset-0 flex w-screen items-center bg-black/[.4] justify-center p-4">
            <div class="rounded-xl border shadow-md max-w-3xl bg-white w-full">
                <div class="p-6 space-y-6">
                    <div class="flex flex-col space-y-1.5">
                        <h1 class="font-semibold text-slate-950">แก้ไขคำถาม</h1>
                        <h1 class="text-slate-600">
                            เปลี่ยนแปลงชื่อ ข้อมูล หมวดของคำถาม หรือ ลบคำถาม
                        </h1>
                    </div>
                    <div class="grid">
                        <form @submit.prevent="">
                            <div class="grid grid-cols-1 gap-4">
                                <div class="grid gap-2">
                                    <label class="text-slate-950" for="question-name">ชื่อคำถาม</label>
                                    <input id="team-name" class="border rounded-md px-3 py-1 h-9" type="text"
                                        v-model="questionCopy.name">
                                </div>
                                <div class="grid gap-2">
                                    <label class="text-slate-950" for="lastname">คำอธิบาย</label>
                                    <textarea id="question-desc" class="border rounded-md px-3 py-1 h-9" type="text"
                                        v-model="questionCopy.description"></textarea>
                                </div>
                                <div>
                                    <label class="text-slate-950" for="question-section">หมวด</label>
                                    <SectionListBox :sections="sections" :selected-section="questionSection"
                                        @update:section="changeSection" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="flex items-center justify-between gap-4">
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
    </div>
    <DeleteQuestionModalWarning :is-open="isDeleteModalOpen" @close-modal="closeDeleteModal"
        @confirm-delete="deleteTeam" />
</template>

<script setup>
import { useTemplateStore } from '@/stores/template';
import { reactive, watch, ref, computed } from 'vue';
import DeleteQuestionModalWarning from './DeleteQuestionModalWarning.vue';
import SectionListBox from './SectionListBox.vue';
import { storeToRefs } from 'pinia';

const props = defineProps(['question', 'isOpen'])
const emit = defineEmits(['closeModal'])


const store = useTemplateStore()
const { sections } = storeToRefs(store)
const { handleUpdateQuestion, handleDeleteQuestion } = store

const questionCopy = reactive({});

const isDeleteModalOpen = ref(false)

watch(() => props.question, (newQuestion) => {
    if (newQuestion) {
        // Overwrite properties within the reactive object
        Object.assign(questionCopy, JSON.parse(JSON.stringify(newQuestion)));
    }
});

const changeSection = (section_id) => {
    questionCopy.section_id = section_id
}

const questionSection = computed(() => sections.value.find((item) => item.id === questionCopy.section_id))

const openDeleteTeamModal = async () => {
    isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
}

const deleteTeam = async () => {
    await handleDeleteQuestion(questionCopy.id)
    isDeleteModalOpen.value = false
    emit('closeModal')
}

const updateTeam = async () => {
    await handleUpdateQuestion(questionCopy.id, questionCopy)
    emit('closeModal')
}
</script>
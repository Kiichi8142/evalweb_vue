<template>
    <div class="space-y-6">
        <div class="space-y-0.5">
            <h1 class="text-2xl font-medium">ควบคุม</h1>
            <p class="text-slate-500">ควบคุมการทำงานของแบบประเมิน</p>
        </div>
        <div class="border-b" />
        <div class="space-y-4">
            <div class="space-y-0.5">
                <h1 class="text-md font-medium">สร้างแบบประเมิน</h1>
                <p class="text-slate-500">เพิ่มแบบประเมินให้ทุกคนในองค์กร</p>
            </div>
            <button @click="makeEval"
                class="bg-blue-600 hover:bg-blue-700 text-blue-50 py-1 px-3 rounded-md transition-colors">สร้างแบบประเมิน</button>
        </div>
        <div class="border-b" />
        <div class="space-y-4">
            <div class="space-y-0.5">
                <h1 class="text-md font-medium">ลบแบบประเมินต้นฉบับ</h1>
                <p class="text-slate-500">ลบแบบประเมินต้นฉบับจะทำให้แบบประเมินทั้งหมดที่อยู่ในรายการประเมินหาย</p>
            </div>
            <button @click="openDeleteModal"
                class="border border-red-500 hover:bg-red-600 hover:text-red-50 py-1 px-3 rounded-md transition-colors">ลบแบบประเมินต้นฉบับ</button>
        </div>
        <DeleteTemplateModalWarning @confirm-delete="confirmDelteModal" @close-modal="closeDeleteModal"
            :is-open="isDeleteModalOpen" />
        <ConfirmationInputModal @confirm-delete="modalConfirmed" @close-modal="handleCloseConfirmModal"
            :is-open="isConfirmModalOpen" confirm-txt="confirmation" />
    </div>
</template>

<script setup>
import DeleteTemplateModalWarning from '@/components/admin/DeleteTemplateModalWarning.vue';
import ConfirmationInputModal from '@/components/ConfirmationInputModal.vue';
import { useTemplateStore } from '@/stores/template';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useTemplateStore()
const { handleDeleteTemplate, handleMakeEvaluationForAllEmp } = store

const makeEval = async () => {
    await handleMakeEvaluationForAllEmp(id)
}

const route = useRoute()
const router = useRouter()
const id = parseInt(route.params.id)

const isDeleteModalOpen = ref(false)
const isConfirmModalOpen = ref(false)

const openDeleteModal = () => {
    isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
}

const confirmDelteModal = () => {
    isDeleteModalOpen.value = false
    isConfirmModalOpen.value = true
}

const handleCloseConfirmModal = () => {
    isConfirmModalOpen.value = false
}

const modalConfirmed = async () => {
    await handleDeleteTemplate(id)
    isConfirmModalOpen.value = false
    router.push({ name: "admin.templates" })
}
</script>
<template>
    <div v-if="isOpen" class="relative z-50">
        <div as="div" class="fixed inset-0 flex w-screen items-center bg-black/[.4] justify-center p-4">
            <div class="rounded-xl border shadow-md max-w-3xl bg-white w-full">
                <div class="flex flex-col p-6 space-y-1.5">
                    <h1 class="font-semibold">เพิ่มหมวดหมู่</h1>
                    <h1 class="text-gray-600">
                        ใส่ข้อมูลหมวดหมู่ที่คุณต้องการ
                    </h1>
                </div>
                <div class="p-6 grid">
                    <form @submit.prevent="">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="grid gap-2">
                                <label for="name">ชื่อ</label>
                                <input class="border rounded-md px-3 py-1 h-9" type="text" placeholder="ชื่อหมวดหมู่"
                                    v-model="form.name">
                            </div>
                            <div class="grid gap-2">
                                <label for="max-score">คะแนนสูงสุด</label>
                                <input class="border rounded-md px-3 py-1 h-9" type="number" placeholder="คะแนน"
                                    v-model="form.max_score">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="flex p-6 items-center justify-end gap-4">
                    <button @click="$emit('closeModal')"
                        class="text-gray-950 hover:bg-gray-100 font-medium p-2 rounded-md">ยกเลิก</button>
                    <button @click="addSection"
                        class="bg-gray-900 hover:bg-gray-800 text-gray-50 font-medium p-2 rounded-md">เพิ่ม</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTemplateStore } from '@/stores/template';
import { reactive } from 'vue';
const props = defineProps(['isOpen'])
const emit = defineEmits(['closeModal'])

const form = reactive({
    "name": '',
    "max_score": 50,
})

const store = useTemplateStore()
const { handleCreateSection } = store

const addSection = async () => {
    await handleCreateSection(form)
    emit('closeModal')
}
</script>
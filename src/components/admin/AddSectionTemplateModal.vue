<template>
    <div v-if="sections">
        <div v-if="isOpen" class="relative z-50">
            <div as="div" class="fixed inset-0 flex w-screen items-center bg-black/[.4] justify-center p-4">
                <div class="rounded-xl border shadow-md max-w-3xl bg-white w-full">
                    <div class="flex flex-col p-6 space-y-1.5">
                        <h1 class="font-semibold">เพิ่มคำถาม</h1>
                        <h1 class="text-gray-600">
                            เพิ่มคำถามลงในแบบประเมินต้นฉบับ
                        </h1>
                    </div>
                    <div class="p-6 grid">
                        <form @submit.prevent="">
                            <div class="grid grid-cols-1 gap-4">
                                <div class="grid gap-2">
                                    <label for="position">หมวดหมู่</label>
                                    <SectionListBox :sections="sections" :selected-section="form.section_id"
                                        @update:section="changeSection" />
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
    </div>
</template>

<script setup>
import SectionListBox from './SectionListBox.vue';
import { useTemplateStore } from '@/stores/template';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps(['isOpen'])
const emit = defineEmits(['closeModal'])

const route = useRoute()
const id = route.params.id

const store = useTemplateStore()
const { sections } = storeToRefs(store)
const { handleAddTemplateSection } = store

const form = reactive({
    "section_id": 1,
})

const changeSection = (newId) => {
    form.section_id = sections.value.find(item => item.id === newId)
}

const addTeam = async () => {
    if (form.section_id.id) {
        await handleAddTemplateSection(id, { sections: [form.section_id.id] })
        emit('closeModal')
    } else {
        return
    }
}
</script>
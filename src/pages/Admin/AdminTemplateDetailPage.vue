<template>
    <AdminNavbar />
    <div class="mx-auto max-w-7xl">
        <div class="p-4 lg:p-8 space-y-6">
            <div class="space-y-0.5">
                <h1 class="text-2xl text-slate-950 font-bold">Template</h1>
                <h1 class="text-slate-500 font-medium">Edit your template information here.</h1>
            </div>
            <div class="border" />
            <div as="div" class="flex gap-4">
                <div as="div" class="flex flex-col w-1/4 space-y-1">
                    <router-link class="transition-all py-2 px-4 rounded-md font-medium hover:bg-blue-100/50"
                        :class="{ 'bg-blue-100/50': route.name === 'admin.template.detail' }"
                        :to="{ name: 'admin.template.detail', params: { id: id } }">
                        ข้อมูล
                    </router-link>
                    <router-link class="transition-all py-2 px-4 rounded-md font-medium hover:bg-blue-100/50"
                        :class="{ 'bg-blue-100/50': route.name === 'admin.template.detail.sections' }"
                        :to="{ name: 'admin.template.detail.sections' }">
                        หมวดหมู่
                    </router-link>
                    <router-link class="transition-all py-2 px-4 rounded-md font-medium hover:bg-blue-100/50"
                        :class="{ 'bg-blue-100/50': route.name === 'admin.template.detail.questions' }"
                        :to="{ name: 'admin.template.detail.questions' }">
                        คำถาม
                    </router-link>
                    <router-link class="transition-all py-2 px-4 rounded-md font-medium hover:bg-blue-100/50"
                        :class="{ 'bg-blue-100/50': route.name === 'admin.template.detail.manage' }"
                        :to="{ name: 'admin.template.detail.manage' }">
                        ควบคุม
                    </router-link>
                </div>
                <div as="div" class="w-3/4">
                    <div v-if="template && route.name === 'admin.template.detail'" class="space-y-6">
                        <div>
                            <h1 class="text-lg text-slate-950 font-medium">ข้อมูลแบบสอบถาม</h1>
                            <p class="text-slate-500">ข้อมูล ชื่อ คำอธิบายของแบบประเมิน</p>
                        </div>
                        <div class="border" />
                        <div v-if="isEdit">
                            <form @submit.prevent="" class="flex flex-col space-y-4">
                                <div class="flex flex-col space-y-1">
                                    <label for="template-name" class="font-medium">ชื่อ</label>
                                    <input v-model="editForm.name" placeholder="template topic" id="template-name"
                                        type="text" class="rounded-md border py-1 px-3" autofocus>
                                    <p class="text-slate-500">ชื่อของแบบสอบถาม</p>
                                </div>
                                <div class="flex flex-col space-y-1">
                                    <label for="template-name" class="font-medium">คำอธิบาย</label>
                                    <textarea v-model="editForm.description" id="template-name" type="text"
                                        class="rounded-md border py-1 px-3"></textarea>
                                    <p class="text-slate-500">ใส่คำอธิบายเบื้องต้นเกี่ยวกับแบบสอบถามของคุณ
                                        ข้อมูลเกี่ยวกับแบบสอบถาม</p>
                                </div>
                                <div class="flex gap-4">
                                    <button @click="update"
                                        class="bg-blue-600 px-4 py-2 text-slate-50 rounded-md">อัพเดทข้อมูล</button>
                                    <button @click="cancelEdit"
                                        class="px-4 py-2 text-slate-950 rounded-md hover:bg-slate-200 font-medium">ยกเลิก</button>
                                </div>
                            </form>
                        </div>
                        <div v-else>
                            <div class="flex flex-col space-y-4">
                                <div class="flex flex-col space-y-1">
                                    <p class="font-medium">ชื่อ</p>
                                    <p class="rounded-md border py-1 px-3">{{ template.name }}</p>
                                    <p class="text-slate-500">ชื่อของแบบสอบถาม</p>
                                </div>
                                <div class="flex flex-col space-y-1">
                                    <label for="template-name" class="font-medium">คำอธิบาย</label>
                                    <div id="template-name" type="text" class="rounded-md border py-1 px-3">
                                        {{ template.description }}
                                    </div>
                                    <p class="text-slate-500">คำอธิบายเบื้องต้นเกี่ยวกับแบบสอบถามของคุณ
                                        ข้อมูลเกี่ยวกับแบบสอบถาม</p>
                                </div>
                                <div class="flex justify-end w-full">
                                    <button @click="edit"
                                        class="flex items-center gap-1 px-4 py-2 text-slate-950 rounded-md font-medium hover:bg-slate-200">
                                        <PencilSquareIcon class="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <router-view v-else></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AdminNavbar from '@/components/AdminNavbar.vue';
import { useRoute } from 'vue-router';
import { getTemplate, updateTemplate } from '@/http/template-api';
import { onMounted, reactive, ref } from 'vue';
import { PencilSquareIcon } from '@heroicons/vue/24/solid';

import { useTemplateStore } from '@/stores/template';
import { storeToRefs } from 'pinia';

const store = useTemplateStore()
const { templates } = storeToRefs(store)
const { fetchTemplates, fetchQuestions, fetchSections } = store

onMounted(async () => {
    await fetchTemplates()
    await fetchQuestions()
    await fetchSections()
})

const route = useRoute()
const id = route.params.id
const template = ref()

const isEdit = ref(false)
const editForm = reactive({
    "name": '',
    "description": ''
})

const update = async () => {
    const { data: updatedTemplate } = await updateTemplate(id, template.value)
    template.value = updatedTemplate.data
}

const edit = () => {
    isEdit.value = true
    editForm.name = template.value.name
    editForm.description = template.value.description
}

const cancelEdit = () => {
    isEdit.value = false
}

onMounted(async () => {
    const { data: resTemplate } = await getTemplate(id)
    template.value = resTemplate.data
})
</script>
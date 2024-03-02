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
                        Information
                    </router-link>
                    <router-link class="transition-all py-2 px-4 rounded-md font-medium hover:bg-blue-100/50"
                        :class="{ 'bg-blue-100/50': route.name === 'admin.template.detail.questions' }"
                        :to="{ name: 'admin.template.detail.questions' }">
                        Questions
                    </router-link>
                </div>
                <div as="div" class="w-3/4">
                    <div v-if="template && route.name === 'admin.template.detail'" class="space-y-6">
                        <div>
                            <h1 class="text-lg text-slate-950 font-medium">Information</h1>
                            <p class="text-slate-500">This is your template information</p>
                        </div>
                        <div class="border" />
                        <div>
                            <form @submit.prevent="" class="flex flex-col space-y-4">
                                <div class="flex flex-col space-y-1">
                                    <label for="template-name" class="font-medium">Name</label>
                                    <input v-model="template.name" placeholder="template topic" id="template-name"
                                        type="text" class="rounded-md border py-1 px-3">
                                    <p class="text-slate-500">This will be your topic name for this template</p>
                                </div>
                                <div class="flex flex-col space-y-1">
                                    <label for="template-name" class="font-medium">Description</label>
                                    <textarea v-model="template.description" id="template-name" type="text"
                                        class="rounded-md border py-1 px-3"></textarea>
                                    <p class="text-slate-500">Some explanation about this topic</p>
                                </div>
                                <div>
                                    <button @click="update"
                                        class="bg-blue-600 px-4 py-2 text-slate-50 rounded-md">Update</button>
                                </div>
                            </form>
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
import { onMounted, ref } from 'vue';

import { useTemplateStore } from '@/stores/template';
import { storeToRefs } from 'pinia';

const store = useTemplateStore()
const { questions } = storeToRefs(store)
const { fetchTemplates, fetchQuestions } = store

onMounted(async () => {
    await fetchTemplates()
    await fetchQuestions()
})

const route = useRoute()
const id = route.params.id
const template = ref()

const update = async () => {
    const { data: updatedTemplate } = await updateTemplate(id, template.value)
    template.value = updatedTemplate.data
}

onMounted(async () => {
    const { data: resTemplate } = await getTemplate(id)
    template.value = resTemplate.data
})
</script>
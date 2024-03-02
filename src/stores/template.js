import { defineStore } from "pinia";
import { allTemplates, allQuestions } from '@/http/template-api'
import { ref } from 'vue'

export const useTemplateStore = defineStore('templateStore', () => {
    const templates = ref([])
    const questions = ref([])

    const fetchTemplates = async () => {
        const { data } = await allTemplates();
        templates.value = data.data
    }

    const fetchQuestions = async () => {
        console.log('fetched')
        const { data } = await allQuestions();
        questions.value = data.data
    }

    return {
        templates,
        questions,
        fetchTemplates,
        fetchQuestions
    }
});


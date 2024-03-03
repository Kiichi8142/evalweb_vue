import { defineStore } from "pinia";
import { allTemplates, allQuestions, allSections, updateQuestion, deleteQuestion, removeTemplate, createQuestion } from '@/http/template-api'
import { ref } from 'vue'

export const useTemplateStore = defineStore('templateStore', () => {
    const templates = ref([])
    const questions = ref([])
    const sections = ref([])

    const fetchTemplates = async () => {
        const { data } = await allTemplates();
        templates.value = data.data
    }

    const fetchQuestions = async () => {
        const { data } = await allQuestions();
        questions.value = data.data
    }

    const fetchSections = async () => {
        const { data } = await allSections();
        sections.value = data.data
    }

    const handleUpdateQuestion = async (id, question) => {
        const { data: updatedQuestion } = await updateQuestion(id, question)
        const currentQuestion = questions.value.find(item => item.id === id)
        for (const key in updatedQuestion.data) {
            currentQuestion[key] = updatedQuestion.data[key];
        }
    }

    const handleAddQuestion = async (question) => {
        const { data: createdQuestion } = await createQuestion(question)
        questions.value.push(createdQuestion.data)
    }

    const handleDeleteQuestion = async (id) => {
        await deleteQuestion(id)
        const index = questions.value.findIndex(item => item.id === id)
        questions.value.splice(index, 1)
    }

    const handleDeleteTemplate = async (id) => {
        await removeTemplate(id)
        const index = templates.value.findIndex(item => item.id === id)
        templates.value.splice(index, 1)
    }

    return {
        templates,
        questions,
        sections,
        fetchTemplates,
        fetchQuestions,
        fetchSections,
        handleUpdateQuestion,
        handleDeleteQuestion,
        handleDeleteTemplate,
        handleAddQuestion
    }
});


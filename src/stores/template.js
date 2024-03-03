import { defineStore } from "pinia";
import {
    allTemplates,
    allQuestions,
    makeEvaluationForEmp,
    allSections,
    createTemplate,
    removeTemplateSection,
    addTemplateSection,
    updateQuestion,
    deleteQuestion,
    removeTemplate,
    createQuestion,
    createSection,
    updateSection,
    deleteSection
} from '@/http/template-api'
import { ref } from 'vue'
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()

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

    const handleCreateTemplate = async (template) => {
        const { data: createdTemplate } = await createTemplate(template)
        templates.value.push(createdTemplate.data)
    }

    const handleUpdateQuestion = async (id, question) => {
        const { data: updatedQuestion } = await updateQuestion(id, question)
        const currentQuestion = questions.value.find(item => item.id === id)
        for (const key in updatedQuestion.data) {
            currentQuestion[key] = updatedQuestion.data[key];
        }
    }

    const handleAddTemplateSection = async (id, sectionList) => {
        const { data: addedSections } = await addTemplateSection(id, sectionList)
        const currentTemplate = templates.value.find(item => item.id === parseInt(id))
        currentTemplate.sections = addedSections.data
    }

    const handleRemoveTemplateSection = async (id, sectionList) => {
        await removeTemplateSection(id, sectionList)
        const currentTemplate = templates.value.find(item => item.id === parseInt(id))
        const index = currentTemplate.sections.findIndex(item => item.id === id)
        currentTemplate.sections.splice(index, 1)
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

    const handleMakeEvaluationForAllEmp = async (id) => {
        const { data } = await makeEvaluationForEmp(id)
        notify({
            title: "Success",
            text: data.message,
        })
    }

    const handleCreateSection = async (section) => {
        const { data: createdSection } = await createSection(section)
        sections.value.push(createdSection.data)
    }

    const handleUpdateSection = async (id, section) => {
        const { data: updatedSection } = await updateSection(id, section)
        const currentSection = sections.value.find(item => item.id === id)
        for (const key in updatedSection.data) {
            currentSection[key] = updatedSection.data[key];
        }
    }

    const handleDeleteSection = async (id) => {
        await deleteSection(id)
        const index = sections.value.findIndex(item => item.id === id)
        sections.value.splice(index, 1)
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
        handleAddQuestion,
        handleAddTemplateSection,
        handleRemoveTemplateSection,
        handleCreateTemplate,
        handleMakeEvaluationForAllEmp,
        handleCreateSection,
        handleUpdateSection,
        handleDeleteSection
    }
});


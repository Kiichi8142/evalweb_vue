import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH;
const templateResource = apiPath + "/templates";
const questionResource = apiPath + "/questions";

export const allTemplates = () => api.get(templateResource)

export const getTemplate = (id) => api.get(`${templateResource}/${id}`)

export const createTemplate = template => api.post(templateResource, template)

export const updateTemplate = (id, template) => api.put(`${templateResource}/${id}`, template)

export const removeTemplate = (id) => api.delete(`${templateResource}/${id}`)

export const allQuestions = () => api.get(questionResource)

export const createQuestion = question => api.post(questionResource, question)

export const allSections = () => api.get(apiPath + "/sections")

export const updateQuestion = (id, question) => api.put(`${questionResource}/${id}`, question)

export const deleteQuestion = (id) => api.delete(`${questionResource}/${id}`)
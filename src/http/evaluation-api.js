import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH;
const resource = apiPath + "/evaluations";

export const allEvaluations = () => api.get(resource)

export const allItems = () => api.get(resource)

export const updateEvaluationItem = (id, item) => api.put(`${apiPath}/items/${id}`, item)
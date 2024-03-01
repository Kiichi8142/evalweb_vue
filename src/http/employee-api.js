import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH;
const empResource = apiPath + "/employees";
const teamResource = apiPath + "/teams";

export const allEmployees = () => api.get(empResource)

export const updateEmployee = (id, employee) => api.put(`${empResource}/${id}`, employee)

export const allTeams = () => api.get(teamResource)

export const getTeam = (id) => api.get(`${teamResource}/${id}`)

export const updateTeam = (id, team) => api.put(`${teamResource}/${id}`, team)

export const addTeam = (team) => api.post(teamResource, team)

export const deleteTeam = (id) => api.delete(`${teamResource}/${id}`)
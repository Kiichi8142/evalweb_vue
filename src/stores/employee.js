import { ref, computed } from "vue";
import { allEmployees, updateEmployee, allTeams, updateTeam, addTeam, deleteTeam } from "@/http/employee-api";
import { defineStore } from "pinia";

export const useEmployeeStore = defineStore('employeeStore', () => {
    const employees = ref([])
    const teams = ref([])

    const fetchAllEmployees = async () => {
        const { data } = await allEmployees();
        employees.value = data.data
    }

    const fetchAllTeams = async () => {
        const { data } = await allTeams();
        teams.value = data.data
    }

    const handleUpdateEmployee = async (id, employee) => {
        const { data: updatedEmployee } = await updateEmployee(id, employee)
        const currentEmployee = employees.value.find(item => item.id === id)
        for (const key in updatedEmployee.data) {
            currentEmployee[key] = updatedEmployee.data[key];
        }
    }

    const handleAddTeam = async (team) => {
        const { data: createdTeam } = await addTeam(team)
        teams.value.push(createdTeam.data)
    }

    const handleUpdateTeam = async (id, team) => {
        const { data: updatedTeam } = await updateTeam(id, team)
        const currentTeam = teams.value.find(item => item.id === id)
        for (const key in updatedTeam.data) {
            currentTeam[key] = updatedTeam.data[key];
        }
    }

    const handleDeleteTeam = async (team) => {
        await deleteTeam(team.id)
        const index = teams.value.findIndex(item => item.id === team.id)
        teams.value.splice(index, 1)
    }

    return {
        employees,
        teams,
        fetchAllEmployees,
        fetchAllTeams,
        handleUpdateEmployee,
        handleUpdateTeam,
        handleAddTeam,
        handleDeleteTeam
    }
});


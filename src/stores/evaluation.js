import { allEvaluations, updateEvaluationItem } from "@/http/evaluation-api";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAuthStore } from '@/stores/auth';

export const useEvaluationStore = defineStore('evaluationStore', () => {
    const authStore = useAuthStore()
    const evaluations = ref([])

    const fetchAllEvaluations = async () => {
        const { data } = await allEvaluations();
        evaluations.value = data.data
    }

    const handleUpdateItem = async (evalId, evalItem) => {
        const { data: updatedItem } = await updateEvaluationItem(evalItem.id, evalItem);
        const currentEvaluation = evaluations.value.find(item => item.id === evalId)
        const currentItem = currentEvaluation.items.find(item => item.id === evalItem.id)
        for (const key in updatedItem.data) {
            currentItem[key] = updatedItem.data[key];
        }
    }

    const selfEvaluations = computed(() => evaluations.value.filter(evaluation => evaluation.employee.id === authStore.user.employee_id))
    const otherEvaluations = computed(() => evaluations.value.filter(evaluation => evaluation.employee.id !== authStore.user.employee_id))

    return {
        evaluations,
        fetchAllEvaluations,
        handleUpdateItem,
        selfEvaluations,
        otherEvaluations
    }

});


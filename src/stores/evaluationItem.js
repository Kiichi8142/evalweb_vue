import { allEvaluations } from "@/http/evaluation-api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useEvaluationStore = defineStore('evaluationStore', () => {
    const evaluationItems = ref([])

    const fetchAllItems = async () => {
        const { data } = await allEvaluations();
        evaluations.value = data.data
        console.log("Fetched evals.")
    }

    return {
        evaluations,
        fetchAllEvaluations,
        handleUpdateItem
    }

});


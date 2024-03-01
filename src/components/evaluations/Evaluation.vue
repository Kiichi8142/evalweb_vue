<template>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 rounded-md md:items-center md:flex-row justify-between">
        <div class="flex flex-col">
            <div class="flex gap-1">
                <p class="font-semibold">{{ evaluation.employee.firstname }}</p>
                <p class="font-semibold">{{ evaluation.employee.lastname }}</p>
            </div>
            <div class="flex gap-1">
                <p class="text-gray-600">{{ evaluation.employee.team.name }}</p>
            </div>
        </div>
        <div class="md:col-span-2">
            <h1 class="font-medium text-gray-950">{{ evaluation.name }}</h1>
            <p class="text-gray-600">{{ evaluation.description }}</p>
        </div>
        <div>
            <p v-if="evaluation.is_completed" class="text-green-600 font-semibold md:text-center">ประเมินแล้ว</p>
            <p v-else class="text-red-600 font-semibold md:text-center">ยังไม่ประเมิน</p>
        </div>
        <router-link :to="{ name: 'evaluation', params: { id: evaluation.id } }"
            class="p-2 border hover:bg-gray-200 hover:text-gray-600 text-gray-950 font-medium rounded-md text-center transition-all">ดูแบบประเมิน</router-link>
    </div>
</template>

<script setup>
const props = defineProps({ evaluation: Object })
</script>
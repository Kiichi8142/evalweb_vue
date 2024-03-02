<template>
    <div class="space-y-6">
        <div>
            <h1 class="text-lg font-medium">การจัดการแบบประเมิน</h1>
            <p class="text-gray-600">เพิ่ม แก้ไข ข้อมูลแบบประเมิน</p>
        </div>
        <div class="border-b" />
        <div class="space-y-4">
            <div @click="toggleOpen"
                class="flex flex-col items-center justify-between bg-gray-100 rounded-md transition-all">
                <div :class="{ 'bg-blue-600': isOpen }"
                    class="flex items-center justify-between cursor-pointer hover:bg-blue-100/80 bg-blue-100 rounded-md w-full px-3 py-2">
                    <h1>Work performance assessments</h1>
                    <ChevronDownIcon class="h-5 w-5" />
                </div>
                <div v-if="isOpen" class="flex w-full p-4">
                    <p>Second time employee work performance evaluation</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

import { ref } from 'vue';

const isOpen = ref(false)

const toggleOpen = () => {
    isOpen.value = !isOpen.value
}

</script>
<template>
    <span class="relative rounded-full p-6 transition-all"
        :class="{ 'text-red-500': isActive, 'text-slate-400 dark:text-slate-600': !isActive }">
        <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
            {{ choiceValue }}
        </span>
    </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(['choiceValue', 'itemScore'])

const isActive = computed(() => props.choiceValue === props.itemScore ? true : false)
</script>
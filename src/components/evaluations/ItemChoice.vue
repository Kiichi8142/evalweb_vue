<template>
    <span @click="handleClick" class="relative rounded-full p-5 border-4 transition-all cursor-pointer"
        :class="{ 'border-blue-600 bg-blue-600 text-slate-50 dark:bg-blue-400 dark:border-blue-400': isActive, 'border-slate-400 hover:bg-slate-400 dark:border-slate-600 dark:hover:bg-slate-600': !isActive }">
        <span
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold dark:text-slate-50">
            {{ choiceValue }}
        </span>
    </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(['choiceValue', 'itemScore'])
const emit = defineEmits(['selected'])

const isActive = computed(() => props.choiceValue === props.itemScore ? true : false)

const handleClick = () => {
    emit('selected', props.choiceValue)
}

</script>
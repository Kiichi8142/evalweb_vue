<template>
    <span @click="handleClick" class="relative rounded-full p-5 border-4 transition-all cursor-pointer"
        :class="{ 'border-gray-600 bg-gray-600 text-gray-50': isActive, 'border-gray-400 hover:bg-gray-400': !isActive }">
        <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
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
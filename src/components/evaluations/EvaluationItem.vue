<template>
    <div class="grid grid-cols-1 space-y-2 justify-items-center lg:justify-items-start">
        <div class="space-y-0.5">
            <p class="font-medium text-slate-950 dark:text-slate-50">{{ itemData.name }}</p>
            <p class="text-slate-600 dark:text-slate-400">{{ itemData.description }}</p>
        </div>
        <div class="flex gap-4 h-fit">
            <ItemChoice v-for="n in 4" :item-id="itemData.id" :item-score="itemData.score" :choice-value="n"
                @selected="handleSelected" />
        </div>
    </div>
</template>

<script setup>
import ItemChoice from "@/components/evaluations/ItemChoice.vue";
import { ref } from "vue";

const props = defineProps(['item'])
const emit = defineEmits(['updateItem'])

const itemData = ref(props.item)

const handleSelected = (choice) => {
    if (itemData.value.score !== choice) {
        itemData.value.score = choice
        emit('updateItem', itemData.value)
    }
}

</script>
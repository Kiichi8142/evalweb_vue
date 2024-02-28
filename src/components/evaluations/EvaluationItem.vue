<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-4 p-4">
        <p class="font-medium text-gray-950">{{ itemData.name }}</p>
        <p class="text-gray-600">{{ itemData.description }}</p>
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
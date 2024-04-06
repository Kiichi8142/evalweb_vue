<template>
    <div class="space-y-2 grid grid-cols-1 lg:grid-cols-5 justify-items-center lg:justify-items-start">
        <p class="font-medium text-slate-800 dark:text-slate-200">{{ number }}. {{ itemData.name }}</p>
        <p class="text-slate-600 dark:text-slate-400 lg:col-span-2">{{ itemData.description }}</p>
        <div class="space-y-2 lg:col-span-2">
            <div class="grid grid-cols-2 gap-2 items-center">
                <p class="font-medium text-slate-400 dark:text-slate-600">คะแนนของคุณ</p>
                <div class="flex justify-between gap-1">
                    <ItemChoice v-for="n in 4" :item-id="itemData.id" :item-score="itemData.score" :choice-value="n"
                        @selected="handleSelected" />
                </div>
            </div>
            <div v-if="refItemData" class="grid grid-cols-2 gap-2 items-center">
                <p class="font-medium text-slate-400 dark:text-slate-600">คะแนนของผู้รับการประเมิน</p>
                <div class="flex justify-between gap-1">
                    <ItemChoiceReference v-for="n in 4" :item-id="refItemData.id" :item-score="refItemData.score"
                        :choice-value="n" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ItemChoice from "@/components/evaluations/ItemChoice.vue";
import ItemChoiceReference from "./ItemChoiceReference.vue";
import { ref } from "vue";

const props = defineProps(['item', 'number', 'refItem'])
const emit = defineEmits(['updateItem'])

const itemData = ref(props.item)
const refItemData = ref(props.refItem)

const handleSelected = (choice) => {
    if (itemData.value.score !== choice) {
        itemData.value.score = choice
        emit('updateItem', itemData.value)
    }
}

</script>
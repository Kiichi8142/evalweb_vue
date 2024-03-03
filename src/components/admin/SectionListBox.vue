<template>
    <div class="relative" v-if="selectedSection">
        <Listbox @update:model-value="handleChange">
            <ListboxButton as="div" class="border bg-white rounded-md px-3 py-1 h-9 flex items-center justify-between">
                <div class="space-x-2">
                    <span>{{ selectedSection.id }}</span>
                    <span>{{ selectedSection.name }}</span>
                </div>
                <span>
                    <ChevronUpDownIcon class="h-5 w-5" />
                </span>
            </ListboxButton>
            <ListboxOptions class="absolute bg-white border mt-1 max-h-60 overflow-auto rounded-md p-1">
                <ListboxOption v-slot="{ active, selected }" v-for="section in sections" :key="section.id"
                    :value="section">
                    <div class="flex justify-between items-center p-2 gap-4 pr-24"
                        :class="{ 'font-medium bg-slate-100': active }">
                        <div class="flex space-x-2">
                            <p class="font-normal">{{ section.id }}</p>
                            <p class="font-normal">
                                {{ section.name }}
                            </p>
                        </div>
                        <CheckIcon v-if="selected" class="h-4 w-4 text-black" />
                    </div>
                </ListboxOption>
            </ListboxOptions>
        </Listbox>
    </div>
</template>

<script setup>
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/16/solid';
import { toRefs } from 'vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'

const props = defineProps(['sections', 'selectedSection'])
const emit = defineEmits(['update:section'])

const { selectedSection } = toRefs(props)

const handleChange = (value) => {
    emit('update:section', value.id)
}

</script>
<template>
    <div class="relative">
        <Listbox v-model="selectedTeam">
            <ListboxButton as="div" class="border bg-white rounded-md px-3 py-1 h-9 flex items-center justify-between">
                <span>{{ selectedTeam.name }}</span>
                <span>
                    <ChevronUpDownIcon />
                </span>
            </ListboxButton>
            <ListboxOptions class="absolute bg-white border mt-1 max-h-60 overflow-auto rounded-md p-1">
                <ListboxOption v-slot="{ active, selected }" v-for="team in teams" :key="team.id" :value="team">
                    <div class="flex justify-between items-center" :class="{ 'font-medium bg-gray-100': active }">
                        <p class="font-normal py-2 pl-2 pr-20">
                            {{ team.name }}
                        </p>
                        <CheckIcon v-if="selected" class="h-4 w-4 text-black" />
                    </div>
                </ListboxOption>
            </ListboxOptions>
        </Listbox>
    </div>
</template>

<script setup>
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/16/solid';
import { ref, watch } from 'vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import { useEmployeeStore } from '@/stores/employee';
import { storeToRefs } from 'pinia';

const props = defineProps(['team'])
const emit = defineEmits(['update:team'])

const store = useEmployeeStore()
const { teams } = storeToRefs(store)

const selectedTeam = ref(0)

watch(selectedTeam, (newTeam) => {
    emit('update:team', newTeam)
})

</script>
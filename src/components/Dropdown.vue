<template>
    <Menu as="div" class="relative z-50 inline-block text-left">
        <div>
            <MenuButton
                class="inline-flex w-full justify-center rounded-md dark:text-slate-50 text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                {{ username }}
                <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 dark:text-slate-400 text-gray-600 hover:text-gray-600"
                    aria-hidden="true" />
            </MenuButton>
        </div>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-950 dark:divide-slate-900 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <router-link :to="{ name: 'account' }" :class="[
                    active ? 'bg-blue-600 text-white' : 'text-gray-900 dark:text-slate-100',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]">
                        <UserIcon :active="active" :class="{ 'text-white': active }" class="mr-2 h-5 w-5 text-gray-400"
                            aria-hidden="true" />
                        บัญชีผู้ใช้
                    </router-link>
                    </MenuItem>
                </div>

                <div v-if="userRole === 'admin'" class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <router-link :to="{ name: 'admin.teams' }" :class="[
                    active ? 'bg-blue-600 text-white' : 'text-gray-900 dark:text-slate-100',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]">
                        <UserIcon :active="active" :class="{ 'text-white': active }" class="mr-2 h-5 w-5 text-gray-400"
                            aria-hidden="true" />
                        Admin
                    </router-link>
                    </MenuItem>
                </div>

                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button @click.prevent="$emit('logout')" :class="[
                    active ? 'bg-blue-600 text-white' : 'text-gray-900 dark:text-slate-100',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]">
                        <ArrowRightEndOnRectangleIcon :active="active" :class="{ 'text-white': active }"
                            class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        ออกจากระบบ
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon, ArrowRightEndOnRectangleIcon, UserIcon } from "@heroicons/vue/24/solid";
defineProps(['username', 'userRole'])
defineEmits(['logout'])
</script>
<template>
    <Navbar></Navbar>
    <div class="p-4 lg:p-8">
        <div class="max-w-7xl mx-auto rounded-md p-6 space-y-6">
            <div>
                <p class="font-semibold text-2xl text-gray-950 dark:text-slate-100">รหัสผ่าน</p>
                <p class="text-gray-600 dark:text-slate-400">แก้ไขรหัสผ่านของคุณ</p>
            </div>
            <div class="border-b" />
            <div class="space-y-2">
                <form @submit.prevent="handleSubmit" class="grid grid-cols-1 space-y-2">
                    <div class="flex flex-col">
                        <label for="password"
                            class="font-semibold text-gray-600 dark:text-slate-400">รหัสผ่านปัจจุบัน</label>
                        <input
                            :class="{ 'border-2 border-red-600': errors.current_password && errors.current_password[0] }"
                            v-model="passwordForms.current_password" type="password" name="password" id="password"
                            class="rounded-md md:w-1/2 border px-4 py-1 border-gray-400 dark:border-slate-600 dark:bg-slate-900">
                        <div class="text-red-600">
                            {{ errors.current_password && errors.current_password[0] }}
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="new-password"
                            class="font-semibold text-gray-600 dark:text-slate-400">รหัสผ่านใหม่</label>
                        <input :class="{ 'border-2 border-red-600': errors.new_password && errors.new_password[0] }"
                            v-model="passwordForms.new_password" type="password" name="new-password" id="new-password"
                            class="rounded-md md:w-1/2 border px-4 py-1 border-gray-400 dark:border-slate-600 dark:bg-slate-900">
                        <div class="text-red-600">
                            {{ errors.new_password && errors.new_password[0] }}
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="new-password-confirm"
                            class="font-semibold text-gray-600 dark:text-slate-400">ยืนยันรหัสผ่านใหม่</label>
                        <input
                            :class="{ 'border-2 border-red-600': errors.new_password_confirmation && errors.new_password_confirmation[0] }"
                            v-model="passwordForms.new_password_confirmation" type="password"
                            name="new-password-confirm" id="new-password-confirm"
                            class="rounded-md md:w-1/2 border px-4 py-1 border-gray-400 dark:border-slate-600 dark:bg-slate-900">
                    </div>
                    <button
                        class="p-2 bg-blue-600 dark:bg-blue-400 rounded-md text-gray-50 dark:text-slate-950 w-fit">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { reactive } from 'vue';
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const router = useRouter()
const store = useAuthStore()
const { isLoggedIn, errors } = storeToRefs(store)
const { handleChangePassword } = store

const passwordForms = reactive({
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
})

const handleSubmit = async () => {
    await handleChangePassword(passwordForms)

}

</script>
<template>
    <div class="p-4 md:p-6">
        <div class="max-w-7xl mx-auto bg-white rounded-md p-6 m-6">
            <p class="font-semibold text-lg text-gray-950">บัญชีผู้ใช้</p>
            <p class="font-sm text-gray-600">แก้ไขข้อมูลบัญชีผู้ใช้ของคุณ</p>
        </div>
        <div class="max-w-7xl mx-auto bg-white rounded-md p-6 m-6">
            <p class="font-semibold text-lg text-gray-950">รหัสผ่าน</p>
            <p class="font-sm text-gray-600">แก้ไขรหัสผ่านบัญชีผู้ใช้ของคุณ</p>
            <form @submit.prevent="handleSubmit" class="mt-4 grid grid-cols-1 gap-2">
                <label for="password" class="font-semibold text-gray-600">รหัสผ่านปัจจุบัน</label>
                <input :class="{ 'border-2 border-red-600': errors.current_password && errors.current_password[0] }"
                    v-model="passwordForms.current_password" type="password" name="password" id="password"
                    class="rounded-md md:w-1/2 border-gray-400">
                <div class="text-red-600">
                    {{ errors.current_password && errors.current_password[0] }}
                </div>
                <label for="new-password" class="font-semibold text-gray-600">รหัสผ่านใหม่</label>
                <input :class="{ 'border-2 border-red-600': errors.new_password && errors.new_password[0] }"
                    v-model="passwordForms.new_password" type="password" name="new-password" id="new-password"
                    class="rounded-md md:w-1/2 border-gray-400">
                <div class="text-red-600">
                    {{ errors.new_password && errors.new_password[0] }}
                </div>
                <label for="new-password-confirm" class="font-semibold text-gray-600">ยืนยันรหัสผ่านใหม่</label>
                <input
                    :class="{ 'border-2 border-red-600': errors.new_password_confirmation && errors.new_password_confirmation[0] }"
                    v-model="passwordForms.new_password_confirmation" type="password" name="new-password-confirm"
                    id="new-password-confirm" class="rounded-md md:w-1/2 border-gray-400">
                <button class="p-2 bg-gray-800 rounded-md text-gray-50 w-fit">Update</button>
            </form>
        </div>
    </div>
</template>

<script setup>
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
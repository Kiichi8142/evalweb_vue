<template>
    <div class="flex justify-center h-screen bg-white">
        <div class="mt-44 w-96 lg:m-auto">
            <h1 class="font-semibold text-gray-950 text-center text-2xl">เข้าสู่ระบบ</h1>
            <form class="flex flex-col gap-y-2 p-8 rounded-md mx-auto" @submit.prevent="handleSubmit">
                <div class="flex flex-col">
                    <label class="text-gray-950 font-medium" for="email">Email</label>
                    <input placeholder="mail@example.com"
                        :class="{ 'border-2 border-red-600': errors.email && errors.email[0] }"
                        class="rounded-md border p-2 border-gray-200" type="text" id="email" v-model="form.email">
                    <div class="text-red-600">
                        {{ errors.email && errors.email[0] }}
                    </div>
                </div>
                <div class="flex flex-col">
                    <label class="text-gray-950 font-medium" for="password">Password</label>
                    <input :class="{ 'border-2 border-red-600': errors.password && errors.password[0] }"
                        class="rounded-md border p-2 border-gray-200" type="password" id="password" v-model="form.password">
                    <div class="text-red-600">
                        {{ errors.password && errors.password[0] }}
                    </div>
                </div>
                <button type="submit"
                    class="px-2 py-2 mt-2 bg-gray-800 text-gray-50 rounded-md hover:bg-gray-700">เข้าสู่ระบบ</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const router = useRouter()
const store = useAuthStore()
const { errors, isLoggedIn } = storeToRefs(store)
const { handleLogin } = store

const form = reactive({
    email: "",
    password: ""
})

const handleSubmit = async () => {
    await handleLogin(form)
    if (isLoggedIn.value) {
        router.push({ name: 'evaluations' })
    }
}
</script>
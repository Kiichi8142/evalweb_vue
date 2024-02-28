<template>
    <h1 class="absolute m-4 top-0 font-bold text-2xl text-gray-50">Assessment System</h1>
    <div class="bg-blue-950 h-screen w-full flex lg:justify-end">
        <div class="bg-gray-950 w-screen flex lg:w-auto lg:p-44 xl:p-60">
            <div class="flex flex-col justify-center p-2 m-auto text-center">
                <h1 class="m-4 text-gray-50 font-bold text-2xl">เข้าสู่ระบบเพื่อเข้าใช้งานต่อ</h1>
                <router-link :to="{ name: 'login' }"
                    class="py-4 px-20 bg-blue-600 text-gray-50 rounded-md">Login</router-link>
            </div>
        </div>
    </div>
</template>
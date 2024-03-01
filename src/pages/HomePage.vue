<template>
    <div class="bg-gray-900 h-screen w-full flex lg:justify-end">
        <div class="flex text-gray-50 font-medium text-lg items-center absolute p-8 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" class="mr-2 h-6 w-6">
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <h1>Evaluation system</h1>
        </div>
        <div class="bg-gray-950 w-screen flex lg:w-1/2">
            <div class="grid grid-cols-1 w-full lg:w-2/3 justify-center p-8 m-auto text-center">
                <h1 class="m-4 text-gray-50 font-bold text-2xl">เข้าใช้งาน</h1>
                <router-link :to="{ name: 'login' }"
                    class="py-4 px-20 bg-blue-600 text-gray-50 rounded-md">Login</router-link>
            </div>
        </div>
    </div>
</template>
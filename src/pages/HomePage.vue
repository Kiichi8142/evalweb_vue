<template>
    <div class="bg-slate-900 h-screen w-full flex lg:justify-end">
        <div class="flex text-gray-50 font-medium text-lg items-center absolute p-8 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="mr-2 h-6 w-6">
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <h1>Evaluation system</h1>
        </div>
        <div class="bg-slate-950 w-screen flex lg:w-1/2">
            <div class="grid grid-cols-1 w-full lg:w-2/3 justify-items-center p-8 m-auto text-center">
                <h1 class="m-4 text-gray-50 font-bold text-2xl">ระบบประเมิน</h1>
                <router-link :to="{ name: 'login' }"
                    class="py-3 w-full bg-blue-400 hover:bg-blue-500 font-semibold text-xl text-gray-950 rounded-md">เข้าสู่ระบบ</router-link>
            </div>
        </div>
    </div>
</template>
<template>
    <div class="dark:bg-slate-950 flex justify-center h-screen items-center">
        <div class="flex items-center gap-4">
            <h1 class="text-4xl font-semibold dark:text-slate-50">404</h1>
            <div class="flex flex-col gap-2">
                <p class="dark:text-slate-50 text-xl">This page could not be found</p>
                <router-link :to="{ name: 'home' }"
                    class="text-slate-50 dark:text-slate-950 px-3 py-1 bg-blue-600 dark:bg-blue-400 rounded-md w-fit">
                    <p>Back to home page</p>
                </router-link>
            </div>
        </div>
    </div>
</template>
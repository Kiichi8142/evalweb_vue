<template>
    <div class="max-w-7xl mx-auto space-y-4">
        <div class="space-y-0.5">
            <p class="text-gray-900 dark:text-slate-50 font-semibold text-lg">ข้อมูลบุคคล</p>
            <p class="text-gray-600 dark:text-slate-400">รายละเอียดของผู้ประเมินและผู้รับการประเมิน</p>
        </div>
        <div class="border dark:border-slate-800 p-4 rounded-md">
            <p class="text-gray-900 dark:text-slate-50 font-semibold mt-4">ข้อมูลผู้รับการประเมิน</p>
            <div class="grid grid-cols-1 md:grid-cols-2 mt-4 px-8">
                <div class="grid grid-cols-2">
                    <p class="text-gray-600 dark:text-slate-400">ชื่อ-นามสกุล</p>
                    <div class="flex gap-1">
                        <p class="text-gray-900 dark:text-slate-50 font-semibold">{{ employee.firstname }}</p>
                        <p class="text-gray-900 dark:text-slate-50 font-semibold">{{ employee.lastname }}</p>
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    <p class="text-gray-600 dark:text-slate-400">ตำแหน่ง</p>
                    <p class="text-gray-900 dark:text-slate-50 font-semibold">{{ employee.position }}</p>
                </div>
                <div class="grid grid-cols-2">
                    <p class="text-gray-600 dark:text-slate-400">Team</p>
                    <p class="text-gray-900 dark:text-slate-50 font-semibold">{{ employee.team.name }}</p>
                </div>
                <div class="grid grid-cols-2">
                    <p class="text-gray-600 dark:text-slate-400">Department</p>
                    <p class="text-gray-900 dark:text-slate-50 font-semibold">{{ employee.team.department }}</p>
                </div>
            </div>
            <p class="text-gray-900 dark:text-slate-50 font-semibold mt-4">ข้อมูลผู้ประเมิน</p>
            <div class="grid grid-cols-1 md:grid-cols-2 mt-4 px-8">
                <div class="grid grid-cols-2">
                    <p class="text-gray-600 dark:text-slate-400">ชื่อ-นามสกุล</p>
                    <div class="flex gap-1">
                        <p class="text-gray-900 dark:text-slate-50 font-semibold">{{ assessor.firstname }}</p>
                        <p class="text-gray-900 dark:text-slate-50 font-semibold">{{ assessor.lastname }}</p>
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    <p class="text-gray-600 dark:text-slate-400">ตำแหน่ง</p>
                    <p class="text-gray-900 dark:text-slate-50 font-semibold">{{ assessor.position }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['assessor', 'employee'])
</script>
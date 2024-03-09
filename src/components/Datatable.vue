<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.field">{{ column.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in data" :key="row.id">
                    <td v-for="column in columns" :key="column.field">{{ row[column.field] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
defineProps(['columns', 'data'])
</script>
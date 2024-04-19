<script lang="ts" setup>
const route = useRoute()
const routeName = route.name
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <v-card color="#4A4458" class="w-full h-[100vh] rounded-none sm:!rounded-xl sm:!h-fit sm:w-[30rem] !p-8">
            <div class="flex justify-between">
                <div class="flex items-center gap-3">
                    <Icon name="ant-design:message-twotone" class="text-4xl text-[#B2B1FF]"></Icon>
                    <span class="text-3xl text-[#E8DEF8] font-bold">soot</span>
                </div>

                <h1 class="text-3xl text-[#E8DEF8] font-bold">{{ routeName}}</h1>
            </div>
            <slot />
        </v-card>
    </div>
</template>
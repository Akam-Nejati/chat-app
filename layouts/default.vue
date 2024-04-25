<script setup lang="ts">
    

</script>


<template>
    <div class="w-full flex gap-4">
        <div class="flex gap-4">
            <div>
                <HomeSidebar />
            </div>
            <div class="h-fit flex flex-col gap-4">
                <div class="flex gap-4">
                    <HomeUserAvatar />
                    <HomeSearch />
                </div>
                <div>
                    <HomeChats />
                </div>
            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
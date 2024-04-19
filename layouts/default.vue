<template>
    <div class="w-full flex gap-4">
        <div class="flex gap-4">
            <div>
                <HomeSidebar />
            </div>
            <div class="h-fit flex items-center gap-4">
                <HomeUserAvatar />
                <HomeSearch />
            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
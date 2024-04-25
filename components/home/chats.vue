<script setup lang="ts">
interface ChatItems {
    userName: string,
    email: string
}

const props = defineProps<ChatItems>()
// const chatsList = useState<ChatItems[]>()
</script>


<template>
    <div class="flex flex-col gap-4">
        <div v-for="i in 8" class="flex gap-4 items-center border-b-2 pb-4 border-b-[#4A4458]">
            <div>
                <div class="relative w-16 h-16 rounded-full bg-[#332D41] flex justify-center items-center">
                    <Icon name="charm:person" class="text-3xl text-[#E6E1E5]" />
                    <div class="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-green-300 border-4 border-[#1C1B1F]">
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-between">
                <div class="flex flex-col gap-2">
                    <span class="text-xl text-[#E6E1E5] font-bold">Jone Doe</span>
                    <small class="text-[#E6E1E5]">Good morning</small>
                </div>
                <div class="flex flex-col gap-2 justify-between">
                    <small class="text-[#E6E1E5]">
                        9:00
                    </small>
                    <small class="w-5 h-5 flex justify-center items-center font-bold rounded-full bg-[#D0BCFF] text-[#381E72]">
                        6
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>
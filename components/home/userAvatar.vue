<script setup lang="ts">
interface Item {
    name: string,
    link: string,
    icon: string
}
const items = useState<Item[]>(() => [
    {
        name: "Setting",
        link: "",
        icon: "uiw:setting"
    },
    {
        name: "Setting",
        link: "",
        icon: "uiw:setting"
    },
    {
        name: "Setting",
        link: "",
        icon: "uiw:setting"
    },
    {
        name: "Setting",
        link: "",
        icon: "uiw:setting"
    }
])
</script>

<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <div v-bind="props"
                class="w-16 h-16 flex justify-center items-center text-2xl text-[#E8DEF8] bg-[#332D41] rounded-md shadow-xl cursor-pointer">
                @
            </div>
            <!-- <v-btn color="primary" v-bind="props">
                    Activator slot
                </v-btn> -->
        </template>
        <v-list class="mt-4 !rounded-md !bg-[#332D41]">
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                <v-list-item-title>
                    <div class="flex gap-3 items-center">
                        <Icon :name="item.icon" class="text-xl text-[#E8DEF8]" />
                        <span class="mt-1 text-xl text-[#E8DEF8]">{{ item.name }}</span>
                    </div>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup lang="ts">
interface SideBarItem {
    name: string,
    link: string,
    icon: string
}

const sideBarItems = useState<SideBarItem[]>(() => [
    {
        name: "All",
        link: "",
        icon: "flowbite:messages-solid"
    },
    {
        name: "Personal",
        link: "",
        icon: "fluent:person-12-filled"
    },
    {
        name: "Grops",
        link: "",
        icon: "mingcute:group-fill"
    },
    {
        name: "Chanels",
        link: "",
        icon: "openmoji:loudspeaker"
    },
])
</script>

<template>
    <div class="h-[calc(100dvh-2rem)] p-4 bg-[#232126] shadow-xl rounded-md flex flex-col gap-4">
        <template v-for="item in sideBarItems" :key="item.name">
            <v-tooltip :open-on-focus="false" :text="item.name">
                <template v-slot:activator="{ props }">
                    <Icon v-bind="props" :name="item.icon" class="text-[#E8DEF8] text-4xl cursor-pointer" />
                </template>
            </v-tooltip>
        </template>
    </div>
</template>
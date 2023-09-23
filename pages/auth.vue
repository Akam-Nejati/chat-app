<script setup lang="ts">
const tab = useState<number>()
</script>


<template>
    <v-card>
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
            <v-tab :value="1">Login</v-tab>
            <v-tab :value="2">Regester</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item :value="1">
                hello 1
            </v-window-item>
            <v-window-item :value="2">
                hello 2
            </v-window-item>
        </v-window>
    </v-card>
</template>
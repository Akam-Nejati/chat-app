<script setup lang="ts">
// import { io } from 'socket.io-client';

// const socket = io("http://localhost:3000");

// const messages = ref<string[]>([]);

// socket.on('message', (msg: string) => {
//   console.log(messages);

//   messages.value.push(msg);
// });

// function sendMessage(msg: string) {
//   socket.emit('send-msg', msg);
// }

const route = useRoute()
const isAuthPage = route.fullPath.includes("auth")
</script>

<template>
  <NuxtPwaManifest />
  <div v-if="!isAuthPage" class="p-4">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div v-else>
    <nuxt-page />
  </div>
</template>


<style>
html {
  background-color: #1C1B1F !important;
}
</style>
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
</script>

<template>
  <NuxtPwaManifest />
  <nuxt-page />
</template>


<style>
  html{
    background-color: #1C1B1F !important;
  }
</style>
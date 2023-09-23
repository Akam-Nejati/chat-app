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

import { useTheme } from 'vuetify'

const theme = useTheme()
theme.global.name.value = "dark"
</script>

<template>
  <nuxt-page />
</template>


<style>
  
</style>
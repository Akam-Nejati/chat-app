<script lang="ts" setup>
definePageMeta({
  middleware: "auth"
})


function send() {
  console.log("hello");
  
  useSocket().emit("search", {
    info: "320"
  })
}
</script>


<template>
  <button @click="send">send</button>
  <!-- no chat selected -->
</template>
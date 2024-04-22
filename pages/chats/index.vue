<script lang="ts" setup>
definePageMeta({
  middleware: "auth"
})

useSocket().emit("send", {
  sennder: "6620ce4b15ed6b340ce37eea",
  receiver: "6622e77fd6bf705ba5abbea1", 
  text: "hello"
})
</script>


<template>
  no chat selected
</template>
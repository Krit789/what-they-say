<script setup>
const route = useRoute();
const {
  data: messages,
  refresh: reMsg,
  error: reErr,
} = await useFetch("/api/get_message", {
  headers: {
    "x-secret-ref": route.query.key,
  },
});

if (reErr.value && reErr.value.statusCode >= 400) {
  navigateTo("/", { replace: true });
}
</script>

<template>
  <main
    class="flex flex-col max-w-screen-2xl w-full mx-auto 2xl:px-0 px-4 gap-y-4 text-white min-h-screen"
  >
    <h1 class="sm:text-5xl text-4xl font-bold mt-8 mx-auto drop-shadow-md">Your Response</h1>
    <div v-if="messages?.message.length < 1">
      <p>Your inbox is empty</p>
    </div>
    <Datacard v-for="i in messages?.message" :info="i"></Datacard>
  </main>
</template>
<style>
body {
  background: url('/monitorbg.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}
</style>
<script setup>
const route = useRoute();
// const message_id = useRoute().params.msg
const {
  data: messages,
  refresh: reMsg,
  error: reErr,
} = await useFetch("/api/get_message", {
  headers: {
    "x-secret-ref": route.query.key,
  },
  query: {
    m_id: route.params.msg,
  },
});

if (reErr.value && reErr.value.statusCode >= 400) {
  navigateTo("/", { replace: true });
}
</script>
<template>
  <div
    class="flex flex-col gap-y-4 border border-white/25 isolate bg-black/15 mt-32 text-white backdrop-blur-lg max-w-screen-md mx-auto sm:w-96 w-11/12 h-full rounded-xl bg-white-300/30 shadow-lg ring-1 ring-black/5 p-4 mb-6"
  >
    <div class="text-center font-bold text-xl">คำถาม</div>
    <hr class="border-white/15 border-[0.5px]" />
    <div class="text-center text-xl">{{ messages.message.message }}</div>
  </div>
</template>
<style>
body {
  background: url("/monitorbg.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}
</style>

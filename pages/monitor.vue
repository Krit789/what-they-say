<script setup>
const route = useRoute()
const { data: messages, refresh: reMsg, error: reErr } = await useFetch("/api/get_message", {headers: {
    'x-secret-ref': route.query.key
}});

if (reErr.value && reErr.value.statusCode >= 400) {
    navigateTo('/', {replace: true})
}

</script>

<template>
  <main
    class="flex flex-col max-w-screen-2xl w-full mx-auto 2xl:px-0 px-4 mt-8 gap-y-4"
  >
    <h1 class="text-5xl font-bold">Your Response</h1>
    <div v-if="messages?.message">
    <p>Your inbox is empty</p></div>
    <div
      class="flex flex-col gap-y-4 border border-white isolate backdrop-blur-sm w-full h-full rounded-xl bg-white-300/30 shadow-lg ring-1 ring-black/5 p-4"
      v-for="i in messages?.message"
    >
      <div
        class="absolute flex flex-col justify-center items-center whitespace-nowrap bg-red-400/25 rounded-full size-8 p-2"
      >
        {{ i.id }}
      </div>
      <div class="flex flex-row ml-12 mt-1">
        <span>{{ new Date(i.time).toLocaleString() }}</span>
      </div>
      <div class="flex flex-col p-4 border border-gray-600/40 rounded-md relative">
        <h2 class="absolute -top-4 bg-white font-bold text-2xl px-2 rounded-xl">Message</h2>
        <p class="whitespace-pre-line">{{ i.message }}</p>
      </div>
      <div class="flex flex-col px-4 py-3 rounded-md relative mt-4">
        <h2 class="absolute -top-3 font-bold text-lg px-2">User Agent</h2>
        <p class="whitespace-pre-line">{{ i.request_header["user-agent"] }}</p>
      </div>
      <div class="flex flex-col px-4 py-3 rounded-md relative">
        <h2 class="absolute -top-3 font-bold text-lg px-2">Origin</h2>
        <p class="whitespace-pre-line">{{ i.request_header["origin"] }}</p>
      </div>
      <div class="flex flex-col px-4 py-3 rounded-md relative">
        <h2 class="absolute -top-3 font-bold text-lg px-2">x-forwarded-for</h2>
        <p class="whitespace-pre-line">{{ i.request_header["x-forwarded-for"] }}</p>
      </div>
      <div class="flex flex-col px-4 py-3 rounded-md relative" v-if="i.geoip">
        <h2 class="absolute -top-3 font-bold text-lg px-2">GeoIP</h2>
        <p class="whitespace-pre-line">{{ i.geoip }}</p>
      </div>
    </div>
  </main>
</template>

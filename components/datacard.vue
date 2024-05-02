<script setup>
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
});

const showMore = ref(false);
</script>

<template>
  <div
    class="flex flex-col gap-y-4 border border-white/25 isolate bg-black/15 backdrop-blur-lg max-w-screen-md mx-auto w-full h-full rounded-xl bg-white-300/30 shadow-lg ring-1 ring-black/5 p-4 mb-6"
  >
    <div
      class="absolute flex flex-col justify-center items-center whitespace-nowrap bg-red-400/50 rounded-full size-8 p-2"
    >
      {{ info.id }}
    </div>
    <div class="flex flex-row ml-12 mt-1">
      <span>{{ new Date(info.time).toLocaleString() }}</span>
    </div>
    <div
      class="flex flex-col p-4 border border-white-600/40 rounded-md relative my-4"
    >
      <h2 class="absolute -top-4 bg-white text-black font-bold text-2xl px-2 rounded-xl">
        Message
      </h2>
      <p class="whitespace-pre-line">{{ info.message }}</p>
    </div>
    <div class="flex flex-col px-4 py-3 rounded-md relative mt-4">
      <h2 class="absolute -top-3 font-bold text-lg px-2">User Agent</h2>
      <p class="whitespace-pre-line">{{ info.request_header["user-agent"] }}</p>
    </div>
    <div class="flex flex-col px-4 py-3 rounded-md relative">
      <h2 class="absolute -top-3 font-bold text-lg px-2">Origin</h2>
      <p class="whitespace-pre-line">{{ info.request_header["origin"] }}</p>
    </div>
    <div class="flex flex-col px-4 py-3 rounded-md relative">
      <h2 class="absolute -top-3 font-bold text-lg px-2">x-forwarded-for</h2>
      <p class="whitespace-normal break-all">
        {{ info.request_header["x-forwarded-for"] }}
      </p>
    </div>
    <div class="flex flex-col px-4 py-3 rounded-md relative" v-if="info.geoip">
      <h2 class="absolute -top-3 font-bold text-lg px-2">GeoIP</h2>
      <p class="whitespace-pre-line">
        {{ info.geoip.city }}, {{ info.geoip.country }}
      </p>
      <p class="whitespace-pre-line">
        {{ info.geoip.ll[0] }}, {{ info.geoip.ll[1] }}
      </p>
      <div class="my-2">
        <button
          class="bg-blue-400 px-3 py-2 rounded-md text-white"
          @click="showMore = !showMore"
        >
          {{ showMore ? "Hide" : "Show More" }}
        </button>
      </div>
      <div class="flex" v-show="showMore">
        <pre class="bg-slate-100 px-4 py-2 rounded-md text-black">{{
          JSON.stringify(info.geoip, null, 2)
        }}</pre>
      </div>
    </div>
  </div>
</template>

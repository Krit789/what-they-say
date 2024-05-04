<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
const route = useRoute();
// const message_id = useRoute().params.msg
const {
  data: messages,
  refresh: reMsg,
  error: reErr,
} = await useFetch("/api/get_message", {
  headers: {
    "x-secret-ref": typeof route.query.key === "string" ? route.query.key : "",
  },
  query: {
    m_id: route.params.msg,
  },
});

if (reErr.value && reErr.value.statusCode && reErr.value.statusCode >= 400) {
  navigateTo("/", { replace: true });
}

const image = useLocalStorage<string>("bg-img", "");

onMounted(() => {
  if (image.value) pageBG.value.style.background = `url(${image.value})`;
});

function onFileChangedMat($event: Event) {
  const target = $event.target as HTMLInputElement;
  const reader = new FileReader();
  if (target && target.files) {
    reader.onloadend = () => {
      pageBG.value.style.background = `url(${reader.result})`;
      if (target.files && target.files[0].size / 1024 / 1024 < 10)
        image.value = reader.result?.toString();
    };
  }
  if (
    target.files &&
    target.files[0] &&
    target.files?.length === 1 &&
    ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
      target.files[0]?.type
    )
  ) {
    reader.readAsDataURL(target.files[0]);
  }
}

const inputElem = ref();
const pageBG = ref();
</script>
<template>
  <div class="page-bg" ref="pageBG"></div>
  <div class="flex flex-col justify-between gap-y-8 min-h-[99vh] h-full">
    <div
      class="flex flex-col gap-y-4 border border-white/25 isolate mt-32 bg-black/15 text-white backdrop-blur-lg max-w-screen-md mx-auto sm:w-96 w-11/12 h-full rounded-xl bg-white-300/30 shadow-lg ring-1 ring-black/5 p-4 mb-6"
    >
      <div class="text-center font-bold text-xl">คำถาม</div>
      <hr class="border-white/15 border-[0.5px]" />
      <div class="text-center text-xl">{{ messages?.message?.message }}</div>
    </div>
    <div class="flex flex-row text-white mx-auto">
      <a href="#" @click="inputElem.click()" class="text-white/25"
        >Swap Image</a
      >
      <input
        ref="inputElem"
        accept=".png,.jpg,.jpeg,.pdf,.webp"
        @change="onFileChangedMat"
        type="file"
        class="hidden"
      />
    </div>
  </div>
</template>
<style>
body {
  margin: 0;
  padding: 0;
}

.page-bg {
  position: absolute;
  z-index: -10;
  width: 100vw;
  height: 100vh;
  background: url("/monitorbg.webp");
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-attachment: fixed !important;
}
</style>

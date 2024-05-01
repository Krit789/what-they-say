<script setup lang="ts">
useHead({
  meta: [{ name: "format-detection", content: "telephone=no" }],
});
import type { Container } from "@tsparticles/engine";
const config = useRuntimeConfig()

const alreadySend = useCookie<boolean>(`hasSent-${config.public.hasSentHash}`) || false;
const message = ref("");
const errMsg = ref("");
const isSending = ref(false)
const isLoaded = ref(false);

async function sendMsg() {
  if (!message.value.length) {
    errMsg.value = "กรุณาใส่ข้อความ";
    return;
  }
  isSending.value = true
  await $fetch("/api/record_message", {
    method: "POST",
    body: {
      message: message.value,
    },
  }).then(() => {
    alreadySend.value = true;
    isSending.value = false
  }).catch(err => {
    console.error(err)
  });
}
const options = {
  background: {
    color: "#000",
  },
  particles: {
    number: {
      value: 100,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      random: true,
      speed: 0.1,
      straight: false,
    },
    opacity: {
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
      value: { min: 0.5, max: 1 },
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
};

const onLoad = (container: Container) => {
  // Do something with the container
  isLoaded.value = true;
};
</script>

<template>
  <main class="relative overflow-hidden">
    <Transition name="fade">
      <span
        class="absolute z-40 text-center w-full mt-8 text-white"
        :class="{ 'animate-pulse': !isLoaded }"
        v-show="!isLoaded"
        >Loading Background...</span
      >
    </Transition>
    <NuxtParticles
      class="absolute"
      id="tsparticles"
      :options="options"
      @load="onLoad"
    ></NuxtParticles>
    <section
      class="flex flex-col justify-center items-center w-full gap-4 h-screen min-h-[650px] bg-black text-white"
    >
      <Profilecard></Profilecard>
      <TransitionGroup name="fade">
        <div
          v-if="!alreadySend"
          key="notsend"
          class="flex flex-col p-6 isolate aspect-video sm:w-96 w-[324px] rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 backdrop-blur-sm text-white"
        >
          <span class="flex flex-row justify-between select-none">
            <span>อันนี้ผมไม่รู้ว่าใครส่งจริง ๆ นะ</span><span class="text-white/25 font-light">{{ message.length }}</span>
          </span>
          <textarea
            v-model="message"
            class="mt-4 bg-slate-100/20 w-full rounded-t-md resize-none focus:border-blue-600 p-4"
            cols="40"
            rows="5"
          ></textarea>
          <button
          :disabled="isSending"
            @click="sendMsg()"
            class="transition duration-200 bg-blue-600 p-2 text-white rounded-b-md hover:bg-blue-500 active:bg-blue-700 w-full border-white/20 border-t"
          >
            <span
              class="flex flex-row text-white justify-center gap-2 select-none"
            >
              <img width="24" height="24" alt="" :src="isSending ? '/icons/hourglass_top.svg' : '/icons/send.svg'" />
              <span>{{ isSending ? 'กำลังส่ง' : 'ส่ง'}}</span>
            </span>
          </button>
          <div class="h-6 flex flex-col">
            <Transition name="fade">
              <span
                class="mt-2 text-red-600 text-center"
                v-show="errMsg.length"
                >{{ errMsg }}</span
              >
            </Transition>
          </div>
        </div>
        <div
          v-else
          key="sent"
          class="flex flex-col p-6 isolate sm:w-96 w-[341px] rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 backdrop-blur-sm text-white"
        >
          <div class="flex flex-row items-center gap-2">
            <img alt="" width="24" height="24" src="/icons/check.svg" />
            <span>ได้รับคำถามแล้วจ้า</span>
          </div>
        </div>
      </TransitionGroup>
    </section>
  </main>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#tsparticles {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 0;
    margin: 0;
    z-index: 0; /* if you use -1 you have to set to `"window"` the interactivity.detectsOn property */
}
</style>

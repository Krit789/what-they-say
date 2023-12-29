<script setup>
const alreadySend = useCookie('hasSent') || false
const message = ref()

async function sendMsg(){
  await $fetch('/api/record_message', {
    method: 'POST',
    body: {
      message: message.value
    }
  }).then(() => {
    alreadySend.value = true
  })
}

</script>

<template>
    <main
      class="flex flex-col justify-center items-center w-full gap-4 h-screen"
    >
      <div>
        <div class="flex md:flex-row flex-col flex-wrap sm:w-full w-auto border rounded-md border-slate-100 shadow-xl justify-start items-center p-6 gap-5 sm:mx-0 mx-4">
          <div>
            <img src="/avatar.webp" class="w-16 h-16 rounded-full">
          </div>
          <div class="w-64">
            <div class="text-3xl font-bold">
              Send me a message before 2023 ends!
            </div>
            <span class="text-gray-400">A micro project by Jarukrit Sripaploen</span>
          </div>
        </div>
      </div>
      <div v-if="!alreadySend" class="shadow-xl p-6 rounded-md border border-slate-100 sm:mx-0 mx-4">
        <span class="font-medium"> I will keep this one private </span>
        <textarea v-model="message" class="mt-4 bg-slate-100 w-full rounded-md border border-blue-300 focus:border-blue-400 p-4" cols="40" rows="5"></textarea>
        <button
          @click="() => {sendMsg()}"
          class="mt-4 bg-blue-400 p-2 text-white rounded-md hover:bg-blue-500 active:bg-blue-700"
        >
          Send
        </button>
      </div>
      <div v-else class="shadow-xl p-6 border-slate-100 text-xl rounded-md sm:mx-0 mx-4">
        <span>Thanks for sending your message</span>
      </div>
    </main>
</template>
<style>
body {
  font-family: "IBM Plex Sans";
}
</style>

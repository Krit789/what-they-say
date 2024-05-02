<script setup lang="ts">
import { ref, computed } from "vue";
import { useMouseInElement } from "@vueuse/core";

const cardElem = ref();

const { elementX, elementY, isOutside, elementHeight, elementWidth } =
  useMouseInElement(cardElem);

const cardTransform = computed(() => {
  const MAX_ROTATION = -10;

  const rX = (
    MAX_ROTATION / 2 -
    (elementY.value / elementHeight.value) * MAX_ROTATION
  ).toFixed(2);
  const rY = (
    (elementX.value / elementWidth.value) * MAX_ROTATION -
    MAX_ROTATION / 2
  ).toFixed(2);
  return isOutside.value
    ? ""
    : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
});

onMounted(() => {
    cardElem.value.classList.add('drop');
    cardElem.value.classList.remove('opacity-0');
    cardElem.value.classList.add('flex');
})
</script>
<template>
  <div class="relative z-[1] object-cover aspect-video sm:w-96 w-auto select-none">
    <!-- <div id="light-sweep" class="absolute z-[2] bg-white/75 blur-lg"></div> -->
    <div
      class="card opacity-0"
      ref="cardElem"
      :style="{
        transform: cardTransform,
      }"
    >
      <div class="flex flex-row mt-2 gap-2">
        <div class="bg-white/25 rounded-full w-10 h-10 ml-2"></div>
        <div class="flex flex-col pr-2">
          <div
            class="flex flex-row items-center justify-between gap-2 sm:text-sm text-xs"
          >
            <span class="whitespace-nowrap"> บัตรประจำตัวประชาชน </span>
            <span class="en-card-text whitespace-nowrap">
              Thai National ID Card
            </span>
          </div>
          <div
            class="flex flex-row items-center gap-2 sm:text-[10px] sm:leading-3 text-[8px] leading-tight"
          >
            <div class="flex flex-col whitespace-nowrap">
              <span>เลขประจำตัวประชาชน</span>
              <span class="en-card-text">Identification Number</span>
            </div>
            <div class="flex flex-row sm:text-base text-sm">
              <span><a class="select-none" href="javascript: void(0)">1 1111 11111 11 1</a></span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row h-full w-full overflow-hidden">
        <div class="pt-2">
          <div class="flex flex-col bg-white/25 rounded-es-xl h-full w-8"></div>
        </div>
        <div class="flex flex-col grow">
          <div class="flex flex-row ml-2 items-center justify-start gap-2">
            <span class="text-[8px] pt-1"> ชื่อตัวและชื่อสกุล </span>
            <span class="text-sm leading-none"> นาย จารุกิตติ์ ศรีพาเพลิน </span>
          </div>
          <div class="flex flex-row justify-start gap-2">
            <div class="w-10 h-9 ml-1 mt-2 bg-yellow-500/25 rounded-lg"></div>
            <div
              class="flex flex-col leading-none sm:leading-[1.15] sm:text-[0.75rem] text-[10px] ml-2"
            >
              <div class="flex flex-row gap-2 en-card-text">
                <span class="text-[8px] sm:mt-[3px] mt-[1.5px]">Name</span
                ><span>Mr. Jarukrit</span>
              </div>
              <div class="flex flex-row gap-2 en-card-text">
                <span class="text-[8px] sm:mt-[3px] mt-[1.5px]">Last name</span
                ><span>Sripaploen</span>
              </div>
              <div class="flex flex-row gap-2 ml-2 mt-1">
                <span class="text-[8px] sm:mt-[3px] mt-[1.5px]">เกิดวันที่</span
                ><span>1 ม.ค. 2513</span>
              </div>
              <div class="flex flex-row gap-2 en-card-text ml-2">
                <span class="text-[8px] sm:mt-[3px] mt-[1.5px]"
                  >Date of Birth</span
                ><span>1 Jan. 1970</span>
              </div>
              <div class="flex flex-row gap-2 ml-2">
                <span class="text-[8px] sm:mt-[2px] mt-[1.5px]">ศาสนา</span
                ><span class="en-card-text">-</span>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col sm:text-[10px] text-[8px] ml-2 mt-1 leading-tight"
          >
            <span class="whitespace-normal"
              >ที่อยู่ 1 ซอย ฉลองกรุง 1 แขวงลาดกระบัง<br/>เขตลาดกระบัง กรุงเทพมหานคร 10520</span
            >
          </div>
          <div
            class="flex flex-row sm:text-[8px] text-[6px] ml-2 my-1 items-end justify-between pr-4 leading-none h-full"
          >
            <div class="flex flex-col">
              <span>1 ม.ค. 2513</span>
              <span>วันออกบัตร</span>
              <span class="en-card-text">1 Jan. 1970</span>
              <span class="en-card-text">Date of Issue</span>
            </div>
            <div class="flex flex-col items-center">
              <img alt="" width="20" src="/icons/signature.svg" />
              <span>(จอห์น โด)</span>
              <span class="text-blue-400">เจ้าพนักงานออกบัตร</span>
            </div>
            <div class="flex flex-col">
              <span>19 ม.ค. 2581</span>
              <span>วันบัตรหมดอายุ</span>
              <span class="en-card-text">19 Jan. 2038</span>
              <span class="en-card-text">Date of Expiry</span>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col justify-end items-start mr-2 mb-1 leading-3 select-none pointer-events-none"
        >
          <img
            src="/alt_avatar.webp"
            class="sm:w-20 w-16 rounded-md"
          />
          <span class="sm:text-[8px] text-[6px] w-16 overflow-hidden whitespace-nowrap">1111-11-11111111</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  -webkit-perspective: 0;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  visibility: visible;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;

  transform-style: preserve-3d;
  transform: perspective(384px);
  transition: transform 0.5s ease-out;

  @apply transition-transform delay-0 duration-200 ease-out isolate backdrop-blur-sm w-full h-full rounded-xl bg-sky-300/30 shadow-lg ring-1 ring-black/5  flex-col;
}
.en-card-text {
  @apply font-mono text-blue-400;
}
@keyframes drop-animation {
  0% {
    transform: translateY(250px) translateX(300px) translateZ(100px) rotateX(-50deg) rotateY(20deg) scale(2.5);
    opacity: 0;
  }
  
  100% {
    transform: translateY(0) translateX(0) translateZ(0) rotateX(0deg) rotateY(0deg) scale(1);
    opacity: 1;
  }
}

#light-sweep {
  transform: rotate(45deg);
  width: 2rem;
  
  animation: light-sweep-animation 2s infinite linear;
}

@keyframes light-sweep-animation {
  0% {
    height: 6rem;
    transform: translateY(-60px) translateX(-180px) rotate(55deg);
    opacity: 0;
  }
  
  40% {
    height: 18rem;
    opacity: 1;
  }

  60% {
    height: 18rem;
    opacity: 1;
  }
  
  100% {
    height: 6rem;
    transform: translateY(60px) translateX(180px) rotate(55deg);
    opacity: 0;
  }
}

.card.drop {
  animation: drop-animation 0.8s cubic-bezier(0.305, -0.040, 0.085, 1.030);
}
</style>

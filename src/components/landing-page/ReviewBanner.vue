<template>
  <div class="w-full rounded-lg">
    <div class="flex flex-row py-8 px-4 bg-gradient-to-b from-blue-500 to-blue-400 from-40% rounded-lg">
      <div class="flex flex-row w-1/2">
        <div class="flex flex-row space-x-4 items-center">
          <img v-if="!isMobile" :src=GLOBAL_ONBOARDING_2 class="w-[100px] h-[100px]"/>
          <div class="font-bold text-sm text-white">Ulasan berbelanja {{ productName }} di Itemku </div>
        </div>
      </div>
      <div class="flex flex-col w-1/2 self-end h-[100px] items-end justify-center space-y-1">
        <div class="flex flex-row space-x-1">
          <svg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M18.5002 6.87968C18.4386 6.6949 18.3245 6.53212 18.1717 6.41132C18.0189 6.29052 17.8342 6.21697 17.6402 6.19968L12.4802 5.74968L10.4202 0.999683C10.3434 0.819294 10.2152 0.665476 10.0516 0.55736C9.88803 0.449244 9.69628 0.391602 9.5002 0.391602C9.30412 0.391602 9.11238 0.449244 8.9488 0.55736C8.78523 0.665476 8.65705 0.819294 8.5802 0.999683L6.5802 5.73968L1.4102 6.19968C1.21621 6.21697 1.03148 6.29052 0.878705 6.41132C0.72593 6.53212 0.611756 6.6949 0.5502 6.87968C0.476511 7.0734 0.464836 7.28523 0.516789 7.48588C0.568742 7.68652 0.681755 7.86607 0.8402 7.99968L4.7502 11.3897L3.5802 16.3897C3.54343 16.5762 3.56059 16.7693 3.62966 16.9464C3.69874 17.1236 3.81686 17.2773 3.9702 17.3897C4.12854 17.5048 4.31716 17.5708 4.5127 17.5797C4.70823 17.5886 4.90208 17.5399 5.0702 17.4397L9.5002 14.7797L13.9302 17.4597C14.0856 17.5487 14.2611 17.5969 14.4402 17.5997C14.652 17.6004 14.8586 17.5339 15.0302 17.4097C15.1835 17.2973 15.3017 17.1436 15.3707 16.9664C15.4398 16.7893 15.457 16.5962 15.4202 16.4097L14.2402 11.4097L18.1502 7.99968C18.3191 7.87368 18.4439 7.69755 18.5067 7.49642C18.5696 7.29528 18.5673 7.07944 18.5002 6.87968Z' fill='#FFBF00' />
          </svg>
          <div class="font-bold text-sm text-white">{{ rating }} / 5.0</div>
        </div>
        <div class="font-bold text-sm text-white text-end">Dari Total {{ reviewCount }} Rating</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { GLOBAL_ONBOARDING_2 } from '@/constants/image';

const props = defineProps<{
  rating: string
  reviewCount: string
  productName: string
  isMobile: boolean
}>()

const { rating, reviewCount, productName, isMobile } = toRefs(props)
</script>
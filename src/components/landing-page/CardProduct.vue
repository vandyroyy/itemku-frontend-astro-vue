<template>
  <div class="flex flex-col w-full h-full min-h-48 cursor-pointer rounded-lg shadow-lg">
    <!-- image and ads-->
    <div class="w-full relative">
      <img 
        :src=productImage 
        alt="product-image"
        class="object-cover rounded-t-lg w-full h-32"
      />
      <p v-if="isAds" class="absolute bottom-1 right-2 text-white">Ads</p>
    </div>
    <!-- content -->
    <div class="flex flex-col w-full h-full p-4 space-y-2">
      <p class="text-xs font-bold line-clamp-3">{{ productName }}</p>
      <!-- price discount -->
      <div v-if="productDiscount" class="flex flex-row items-center space-x-1">
        <div class="bg-red-500 rounded-lg p-1 text-xs text-white">{{ productDiscount }}</div>  
        <div class="line-through text-gray-500 text-xs">{{ productOriginalPrice }}</div>  
      </div>
      <!-- price -->
      <p class="text-xl font-bold text-orange-600">{{ productDiscount ? productAdjustmentPrice : productOriginalPrice }}</p>
      <!-- delivery -->
      <div v-if="deliveryType === DeliveryType.INSTANT" class="flex flex-col">
        <p class="text-xs font-bold text-green-600">Pengiriman</p>
        <p class="text-xs font-bold text-green-600 mt">Instant</p>
      </div>
      <div v-else-if="deliveryType === DeliveryType.FAST" class="flex flex-col">
        <p class="text-xs font-bold text-green-600">10 menit kirim</p>
      </div>
      <!-- average delivery time and sold count -->
      <div class="flex flex-col space-y-0.5 h-auto grow justify-end">
        <p class="text-xs text-gray-500">Rata-rata Kirim: {{ averageDeliveryTime }}</p>
        <p class="text-xs text-gray-500">{{ soldCount }} Terjual</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref } from 'vue'
import { DeliveryType } from '@/types/delivery'

const props = defineProps<{
  productImage: string
  productName: string
  productOriginalPrice: string
  productDiscount?: string
  productAdjustmentPrice?: string
  averageDeliveryTime: string
  soldCount: number
  deliveryType: DeliveryType
  isAds: boolean
}>()

const { productImage, productName, productOriginalPrice, productDiscount, productAdjustmentPrice, averageDeliveryTime, soldCount, deliveryType, isAds } = toRefs(props)

</script>
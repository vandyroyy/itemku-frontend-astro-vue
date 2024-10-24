<template>
  <div class="flex flex-row space-x-5 items-center">
    <img :src=image alt="game-image" class="object-contain w-16 h-16" />
    <div class="flex flex-col space-y-2">
      <div class="text-[28px] font-bold">{{ title }}</div>
      <div class="text-sm">{{ description }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
  image: string
  title: string
  description: string
}>()

const { image, title, description } = toRefs(props)
</script>
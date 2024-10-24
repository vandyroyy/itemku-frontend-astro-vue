<template>
  <div class="flex flex-col space-y-2">
    <div class="text-sm font-bold">{{ title }}</div>
    <div class="flex flex-wrap items-center">
      <template v-for="(productName, index) in productNameList" :key="index">
        <div class="text-sm text-blue-300 cursor-pointer">{{ productName }}</div>
        <span v-if="index < productNameList.length - 1" class="mx-2">|</span>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
  title: string
  productNameList: string[]
}>()

const { title, productNameList } = toRefs(props)
</script>
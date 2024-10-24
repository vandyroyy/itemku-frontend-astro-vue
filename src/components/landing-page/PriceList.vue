<template>
  <div class='flex flex-col space-y-2'>
    <p class="text-sm font-bold">{{ title }}</p>
    <div v-for="item in list" :key="item.name" class="flex flex-row border-b border-light-grey py-2">
      <div class="flex-shrink-0 w-3/4 pr-4 overflow-hidden">
        <p class="text-xs text-gray-400 leading-tight whitespace-nowrap line-clamp-1">
          {{ item.name }}
        </p>
      </div>
      <div class="flex-shrink-0 w-1/4 flex justify-end">
        <p class="text-xs text-gray-400 leading-tight">
          {{ item.price }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
  title: string
  list: {name: string, price: string}[]
}>()

const { title,list } = toRefs(props)

</script>
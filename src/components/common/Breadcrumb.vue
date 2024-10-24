<template>
  <div class="flex flex-row space-x-3">
    <template v-for="(item, index) in list" :key="index">
      <span class="space-x-3" :class="{ 'cursor-pointer': index !== list.length - 1 }">
        <span
          :class="{
            'text-blue-500': index !== list.length - 1,
            'text-black': index === list.length - 1
          }"
        >
          {{ item }}
        </span>
        <span v-if="index !== list.length - 1" class="text-gray-500 mx-1">&gt;</span>
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">

import { toRefs } from 'vue'
const props = defineProps<{
  list: string[]
}>()

const { list } = toRefs(props)

</script>
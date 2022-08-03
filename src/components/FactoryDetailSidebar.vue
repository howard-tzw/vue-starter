<template>
  <div class="h-full py-4 px-3 bg-white">
    <div v-if="factory">
      <p>工廠狀態</p>
      <p>經緯度</p>
      <p>{{ factory.lng }}, {{ factory.lat }}</p>
      <p>工廠外部資訊</p>
      <p>{{ factory.name }}</p>
    </div>
    <div v-else>Error: factory is null</div>
  </div>
  <!-- toggle button -->
  <div class="absolute top-28 -left-4">
    <button @click="closeSidebar" class="btn btn-square btn-outline bg-white text-gray-500 btn-sm">></button>
  </div>
</template>

<script lang="ts" setup>
import { FactoryData } from '@/store/factory'

const props = defineProps<{
  factory: FactoryData | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeSidebar = () => {
  emit('close')
}
</script>

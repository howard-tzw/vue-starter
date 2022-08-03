<template>
  <div class="absolute bottom-6 flex w-full justify-center z-20">
    <button
      v-if="appState.pageState === PageState.INITIAL"
      @click="createFactory"
      class="btn btn-square btn-outline bg-white p-3 w-32"
    >
      新增地點
    </button>
    <button
      v-else-if="appState.pageState === PageState.CREATE_FACTORY_1"
      @click="selectLocation"
      class="btn btn-square btn-outline bg-white p-3 w-32"
    >
      選擇此地點
    </button>
  </div>

  <div v-if="appState.pageState === PageState.CREATE_FACTORY_2" class="absolute top-0 z-20 w-full h-full pt-16">
    <div class="w-full h-full bg-white">
      <ImageUploadStep />
    </div>
  </div>

  <div v-if="appState.pageState === PageState.CREATE_FACTORY_3" class="absolute top-0 z-20 w-full h-full pt-16">
    <div class="w-full h-full bg-white">
      <ConfirmFactoryStep />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppState, PageState } from '@/store/appState.js'
import ImageUploadStep from '@/components/ImageUploadStep.vue'
import ConfirmFactoryStep from '@/components/ConfirmFactoryStep.vue'

const appState = useAppState()
const createFactory = () => {
  appState.$patch({ pageState: PageState.CREATE_FACTORY_1 })
}
const selectLocation = () => {
  appState.$patch({ pageState: PageState.CREATE_FACTORY_2 })
}
</script>

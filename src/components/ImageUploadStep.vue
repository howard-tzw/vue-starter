<template>
  <div class="px-10 py-5">
    <p class="text-xl">上傳工廠照片</p>
    <p class="text-xl">工廠照片</p>

    <div>
      <button class="btn">
        <!-- <input type="file" class="opacity-0 invisible" /> -->
        新增照片
      </button>
    </div>

    <p class="text-xl">聯絡資訊（非必填）</p>
    <p class="text-xl">聯絡人暱稱</p>
    <input type="text" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs" />
    <p class="text-xl">聯絡方式 (email或電話)</p>
    <input type="text" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs" />
    <div>
      <button @click="nextStep" class="btn">下一步</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PageState, useAppState } from '@/store/appState.js'

const appState = useAppState()

const nextStep = () => {
  appState.$patch({ pageState: PageState.CREATE_FACTORY_3 })
}
</script>

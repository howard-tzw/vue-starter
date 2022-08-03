<template>
  <div v-if="appState.pageState === PageState.INITIAL" class="navbar bg-neutral text-neutral-content">
    <a class="btn btn-ghost normal-case text-xl">Disfactory v2 </a>
  </div>
  <!-- add relative and z-30 for overlap FactoryDetailPage -->
  <div v-else class="navbar bg-neutral text-neutral-content flex justify-between relative">
    <p class="p-3">新增可疑工廠</p>

    <div class="text-sm breadcrumbs">
      <ul>
        <li>選擇工廠位置</li>
        <li>上傳工廠照片</li>
        <li>確認及補充工廠資訊</li>
      </ul>
    </div>

    <button @click="cancel" class="btn text-white btn-outline hidden sm:block">取消新增</button>
    <button @click="cancel" class="btn sm:hidden"><mdicon name="close" /></button>
  </div>
</template>

<script lang="ts" setup>
import { PageState, useAppState } from '@/store/appState.js'

const appState = useAppState()
const cancel = () => {
  appState.$patch({
    pageState: PageState.INITIAL,
  })
}
</script>

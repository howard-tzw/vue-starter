<template>
  <div class="px-10 py-5">
    <p class="text-xl">確認及補充工廠資訊</p>
    <p>請確認工廠地點及照片，並補充工廠資訊。</p>

    <p class="text-xl">聯絡資訊（非必填）</p>

    <div>
      <button @click="submit" class="btn">確認送出</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PageState, useAppState } from '@/store/appState'

const appState = useAppState()

const submit = () => {
  appState.$patch({ pageState: PageState.INITIAL })
}
</script>

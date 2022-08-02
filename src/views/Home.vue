<template>
  <!-- layout refer to https://stackoverflow.com/a/24979148 -->
  <div class="h-full flex flex-col">
    <div class="grow-0 shrink basis-auto">
      <Header v-if="appState.pageState === PageState.INITIAL" />
      <AppBar v-else-if="appState.pageState === PageState.CREATE_FACTORY" />
    </div>

    <main class="h-full grow-1 shrink basis-auto">
      <Map />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Map from '@/components/Map.vue'
import { useAppState, PageState } from '@/store/appState'
import AppBar from '@/components/AppBar.vue'
const appState = useAppState()
</script>

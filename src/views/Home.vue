<template>
  <!-- layout refer to https://stackoverflow.com/a/24979148 -->
  <div class="h-full flex flex-col">
    <div class="grow-0 shrink basis-auto shadow-lg z-50">
      <AppBar />
    </div>

    <main class="h-full grow-1 shrink basis-auto">
      <Map />
      <CreateFactorySteps />
    </main>
  </div>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue'
import Map from '@/components/Map.vue'
import CreateFactorySteps from '@/components/CreateFactorySteps.vue'
</script>

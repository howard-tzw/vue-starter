<template>
  <div class="h-full">
    <div class="navbar fixed bg-neutral text-neutral-content">
      <a class="btn btn-ghost normal-case text-xl">Taiwan Map</a>
    </div>
    <main class="h-full pt-16 relative">
      <Map></Map>
    </main>
  </div>
</template>

<script lang="ts" setup>
import Map from "@/components/Map.vue";
</script>

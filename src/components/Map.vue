<template>
  <div id="map" class="w-full h-full"></div>
</template>

<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { onMounted } from 'vue'

let map: L.Map

onMounted(async () => {
  map = L.map('map').setView([23.6, 121], 8)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  }).addTo(map)
})
</script>

<style></style>

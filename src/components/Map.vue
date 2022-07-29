<template>
  <div id="map" class="h-full w-full z-10"></div>
  <div class="absolute pt-16 top-0 right-0 h-full w-80 z-20">
    <!-- drawer -->
    <div v-if="openDrawer" class="h-full py-4 px-3 bg-white">
      <div v-if="curFactoryInfo">
        <p>工廠狀態</p>
        <p>經緯度</p>
        <p>{{ curFactoryInfo.lng }}, {{ curFactoryInfo.lat }}</p>
        <p>工廠外部資訊</p>
        <p>{{ curFactoryInfo.name }}</p>
      </div>
    </div>
    <!-- toggle button -->
    <div class="absolute top-28" :class="openDrawer ? '-left-4' : 'right-0'">
      <button
        @click="toggleDrawer"
        class="btn btn-square btn-outline bg-white text-gray-500 btn-sm"
      >
        {{ openDrawer ? ">" : "<" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import L from "leaflet";
import "leaflet.markercluster";
import { onMounted, reactive, ref, watch } from "vue";
import { getFactories } from "@/api";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { FactoryData } from "@/types";

let map: L.Map;

const openDrawer = ref(false);

const toggleDrawer = () => {
  if (openDrawer.value) openDrawer.value = false;
  else openDrawer.value = true;
};

const curFactoryInfo = ref<FactoryData | null>(null);

onMounted(async () => {
  map = L.map("map").setView([23.6, 121], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  }).addTo(map);

  const markers = L.markerClusterGroup({
    chunkedLoading: true,
    disableClusteringAtZoom: 15,
    spiderfyOnMaxZoom: false,
    removeOutsideVisibleBounds: true,
    showCoverageOnHover: false,
  });

  const data = await getFactories(0.1, 120.48504632216294, 24.088258816482295);
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    const factory = data[i];
    const marker = L.marker(new L.LatLng(factory.lat, factory.lng));
    marker.on("click", (ctx) => {
      console.log("marker clicked", ctx);
      openDrawer.value = true;
      curFactoryInfo.value = factory;
    });
    // marker.bindPopup(
    //   `<p><strong style="font-size: 20px;">${factory.name}</strong></p>
    //   <strong style="font-size: 16px;">品牌: 品牌</br>
    //   </strong><br>
    //   地址: 地址<br>
    //   電話: 電話<br>
    //   備註: 備註<br>
    //   <small>最後更新時間: 更新時間</small><br>`
    // );
    markers.addLayer(marker);
  }

  map.addLayer(markers);
});
</script>

<style></style>

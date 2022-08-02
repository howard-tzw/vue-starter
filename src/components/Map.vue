<template>
  <!-- Map -->
  <div id="map" class="h-full w-full z-10"></div>

  <!-- Drawer -->
  <div v-if="openDrawer" class="absolute pt-16 top-0 right-0 h-full w-80 z-20">
    <div class="h-full py-4 px-3 bg-white">
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
      <button @click="toggleDrawer" class="btn btn-square btn-outline bg-white text-gray-500 btn-sm">
        {{ openDrawer ? '>' : '<' }}
      </button>
    </div>
  </div>

  <!-- Create Factory -->
  <div class="absolute bottom-6 flex w-full justify-center z-20">
    <button @click="createFactory" class="btn btn-square btn-outline bg-white p-3 w-32">新增地點</button>
  </div>
</template>

<script lang="ts" setup>
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { onMounted, ref } from 'vue'
import { getFactories } from '@/api'
import { FactoryData } from '@/types'
import { useAppState, PageState } from '@/store/appState'

let map: L.Map

const openDrawer = ref(false)

const toggleDrawer = () => {
  if (openDrawer.value) openDrawer.value = false
  else openDrawer.value = true
}

const curFactoryInfo = ref<FactoryData | null>(null)

const appState = useAppState()

appState.$subscribe((mutation, state) => {
  if (state.pageState === PageState.CREATE_FACTORY) {
  }
})

const createFactory = () => {
  appState.$patch({ pageState: PageState.CREATE_FACTORY })

  const selectedPoint = L.marker(new L.LatLng(120.496, 24.0912))
  selectedPoint.addTo(map)

  map.on('click', function (e) {
    console.log(e.latlng)
    selectedPoint.setLatLng(e.latlng)
  })
}

// 如何根據 state 轉換螢幕？
onMounted(async () => {
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  })

  // WMTS 農地圖層 from disfactory
  const wmts = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/nURBAN2/default/EPSG:3857/{z}/{y}/{x}', {
    attribution: '<a href="https://maps.nlsc.gov.tw/" target="_blank">國土測繪圖資服務雲</a>',
    maxZoom: 18,
  })

  map = L.map('map', { maxZoom: 30, layers: [osm] }).setView([24.088258816482295, 120.48504632216294], 14)

  map.addLayer(wmts)
  map.removeLayer(wmts)

  const markers = L.markerClusterGroup({
    chunkedLoading: true,
    disableClusteringAtZoom: 15,
    spiderfyOnMaxZoom: false,
    removeOutsideVisibleBounds: true,
    showCoverageOnHover: false,
  })

  const data = await getFactories(0.1, 120.48504632216294, 24.088258816482295)
  console.log(data)
  // issue: 把重疊的地點刪掉

  for (let i = 0; i < data.length; i++) {
    const factory = data[i]
    const marker = L.marker(new L.LatLng(factory.lat, factory.lng))
    marker.on('click', ctx => {
      console.log('marker clicked', ctx)
      openDrawer.value = true
      curFactoryInfo.value = factory
    })
    // marker.bindPopup(
    //   `<p><strong style="font-size: 20px;">${factory.name}</strong></p>
    //   <strong style="font-size: 16px;">品牌: 品牌</br>
    //   </strong><br>
    //   地址: 地址<br>
    //   電話: 電話<br>
    //   備註: 備註<br>
    //   <small>最後更新時間: 更新時間</small><br>`
    // );
    markers.addLayer(marker)
  }

  map.addLayer(markers)
})
</script>

<style></style>

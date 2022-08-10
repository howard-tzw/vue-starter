<template>
  <div id="map" class="h-full w-full z-10"></div>

  <!-- Sidebar -->
  <div v-if="isSidebarOpen" class="absolute pt-16 top-0 right-0 h-full w-80 z-20">
    <FactoryDetailSidebar @close="toggleSidebar" :factory="selectedFactory" />
  </div>

  <div class="absolute pt-16 top-10 left-20 z-20">
    <el-select v-model="value" class="m-2" placeholder="顯示設定" size="large">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { onMounted, ref } from 'vue'
import { FactoryData } from '@/types'
import { useAppState, PageState } from '@/store/appState'
import FactoryDetailSidebar from '@/components/FactoryDetailSidebar.vue'

let map: L.Map

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  if (isSidebarOpen.value) isSidebarOpen.value = false
  else isSidebarOpen.value = true
}

const selectedFactory = ref<FactoryData | null>(null)

const appState = useAppState()

let selectedMarker: L.Marker | null = null

// TileLayer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
})

// Web Map Tile Service (WMTS) 農地圖層 from disfactory
const wmts = L.tileLayer.wms('https://wmts.nlsc.gov.tw/wmts/nURBAN2/default/EPSG:3857/{z}/{y}/{x}', {
  layers: 'LUIMAP',
  format: 'image/png',
  styles: 'default',
  attribution: '<a href="https://maps.nlsc.gov.tw/" target="_blank">國土測繪圖資服務雲</a>',
  maxZoom: 18,
  transparent: true,
  opacity: 0.8,
})

appState.$subscribe((mutation, state) => {
  switch (state.pageState) {
    case PageState.INITIAL:
      if (map.listens('click')) {
        if (selectedMarker) {
          selectedMarker.remove()
          selectedMarker = null
        }
        map.off('click')
      }
      if (map.hasLayer(wmts)) {
        map.removeLayer(wmts)
      }
      break
    case PageState.CREATE_FACTORY_1:
      map.on('click', onMapClick)
      map.addLayer(wmts)
      break
  }

  function onMapClick(e: L.LeafletMouseEvent) {
    console.log('onMapClick')
    if (selectedMarker) {
      selectedMarker.setLatLng(e.latlng)
    } else {
      selectedMarker = L.marker(e.latlng, { draggable: true })
      selectedMarker.addTo(map)
    }
  }
})

// 如何根據 state 轉換螢幕？
onMounted(async () => {
  map = L.map('map', { layers: [osm] }).setView([24.088258816482295, 120.48504632216294], 14)

  const markers = L.markerClusterGroup({
    chunkedLoading: true,
    disableClusteringAtZoom: 17,
    spiderfyOnMaxZoom: false,
    removeOutsideVisibleBounds: true,
    showCoverageOnHover: false,
  })

  // @ts-ignore
  const data = (await import('../mockData/factories.json')).default as FactoryData[]
  console.log(data)

  // issue: 把重疊的地點刪掉

  for (let i = 0; i < data.length; i++) {
    const factory = data[i]
    const marker = L.marker(new L.LatLng(factory.lat, factory.lng))
    marker.on('click', ctx => {
      console.log('marker clicked', ctx)
      isSidebarOpen.value = true
      selectedFactory.value = factory
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

const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
]
</script>

<style></style>

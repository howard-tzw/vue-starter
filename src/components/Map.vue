<template>
  <div id="map" class="h-full w-full z-10"></div>

  <FactoryDetailSidebar v-if="isSidebarOpen" @close="toggleSidebar" :factory="selectedFactory" />

  <div class="absolute pt-16 top-3 left-20 z-20">
    <el-popover trigger="click" title="顯示農地範圍">
      <template #reference>
        <el-button>顯示設定</el-button>
      </template>
      <el-switch v-model="LUIMapVisable" />
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.tilelayer.colorfilter'
import { computed, onMounted, ref, unref } from 'vue'
import FactoryDetailSidebar from '@/components/FactoryDetailSidebar.vue'
import { FactoryData } from '@/store/factory'
import { useAppState, PageState } from '@/store/appState'
import { useMapState, osm } from '@/store/map'

let map: L.Map

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const LUIMapVisable = computed({
  get: () => mapState.isLUIMapVisable,
  set: val => {
    mapState.toggleLUILayer(map, val)
  },
})

const selectedFactory = ref<FactoryData | null>(null)

const appState = useAppState()
const mapState = useMapState()

let selectedMarker: L.Marker | null = null

appState.$subscribe((mutation, state) => {
  switch (state.pageState) {
    case PageState.INITIAL:
      if (mapState.isLUIMapVisable) {
        mapState.removeLUILayer(map)
      }
      if (map.listens('click')) {
        if (selectedMarker) {
          selectedMarker.remove()
          selectedMarker = null
        }
        map.off('click')
      }
      break
    case PageState.CREATE_FACTORY_1:
      if (!mapState.isLUIMapVisable) {
        mapState.addLUILayer(map)
      }
      map.on('click', onMapClick)
      break
  }

  function onMapClick(e: L.LeafletMouseEvent) {
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
</script>

<style></style>

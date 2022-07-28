<template>
  <div id="map" class="w-full h-full"></div>
</template>

<script lang="ts" setup>
import L from 'leaflet'
import 'leaflet.markercluster'
import { onMounted } from 'vue'
import { getData } from '@/api'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

let map: L.Map

const data = getData().features

class MarkerIcon extends L.Icon {
  constructor(iconUrl: string) {
    super({
      iconUrl: 'https://siongsng.github.io/Rapid-Antigen-Test-Taiwan-Map/' + iconUrl,
      iconSize: [30, 30],
      iconAnchor: [18, 36],
      popupAnchor: [0, -38],
    })
  }
}

onMounted(async () => {
  map = L.map('map').setView([23.6, 121], 8)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  }).addTo(map)

  const markers = L.markerClusterGroup({
    chunkedLoading: true,
    disableClusteringAtZoom: 15,
    spiderfyOnMaxZoom: false,
    removeOutsideVisibleBounds: true,
    showCoverageOnHover: false,
  })

  const icons = {
    green: new MarkerIcon('/assets/green_marker_icon.png'),
    yellow: new MarkerIcon('/assets/yellow_marker_icon.png'),
    red: new MarkerIcon('/assets/red_marker_icon.png'),
    grey: new MarkerIcon('/assets/grey_marker_icon.png'),
  }

  for (let i = 0; i < data.length; i++) {
    const pharmacy = data[i]
    const count = data[i].properties.count
    const coordinates: number[] = data[i].geometry.coordinates
    const lng = coordinates[0]
    const lat = coordinates[1]
    const marker = L.marker(new L.LatLng(lat, lng))

    marker.bindPopup(pharmacy.properties.name)
    if (count == 0) {
      markers.addLayer(generateMarker(pharmacy, icons.grey))
    } else if (count <= 10) {
      markers.addLayer(generateMarker(pharmacy, icons.red))
    } else if (count <= 40) {
      markers.addLayer(generateMarker(pharmacy, icons.yellow))
    } else {
      markers.addLayer(generateMarker(pharmacy, icons.green))
    }
  }

  map.addLayer(markers)
})

const generateMarker = (pharmacy: any, icon: MarkerIcon) => {
  const count = pharmacy.properties.count

  const marker = L.marker([pharmacy.geometry.coordinates[1], pharmacy.geometry.coordinates[0]], { icon: icon })
  marker.bindPopup(
    `<p><strong style="font-size: 20px;">${pharmacy.properties.name}</strong></p>
       <strong style="font-size: 16px;">品牌: ${pharmacy.properties.brands}</br>
      <strong style="font-size: 16px;">剩餘 
      ${count} 份 (每份五個)
      </strong><br>
      地址: ${pharmacy.properties.address}<br>
      電話: ${pharmacy.properties.phone}<br>
      備註: ${pharmacy.properties.note}<br>
      <small>最後更新時間: ${pharmacy.properties.updated_at}</small><br>`,
  )

  return marker
}
</script>

<style></style>

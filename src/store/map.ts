import { defineStore } from 'pinia'
import L from 'leaflet'

interface MapState {
  isLUIMapVisable: boolean
}

export const useMapState = defineStore({
  id: 'map',
  state: (): MapState => ({
    isLUIMapVisable: false,
  }),
  getters: {},
  actions: {
    addLUILayer(map: L.Map) {
      if (map.hasLayer(osm)) {
        map.removeLayer(osm)
      }
      map.addLayer(wmtsWithFilter)
      map.addLayer(osmWithFilter)
      this.isLUIMapVisable = true
    },
    removeLUILayer(map: L.Map) {
      if (map.hasLayer(wmtsWithFilter)) {
        console.log('removing wmtsWithFilter layer')
        map.removeLayer(wmtsWithFilter)
      }
      if (map.hasLayer(osmWithFilter)) {
        console.log('removing osmWithFilter layer')
        map.removeLayer(osmWithFilter)
      }
      map.addLayer(osm)
      this.isLUIMapVisable = false
    },
  },
})

export const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
})

// @ts-ignore
export const osmWithFilter = L.tileLayer.colorFilter('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  filter: [
    // make your own filter: https://xtk93x.github.io/Leaflet.TileLayer.ColorFilter.updateFilter/
    'brightness:100%',
    'contrast:100%',
    'grayscale:90%',
    'hue:0deg',
    'opacity:70%',
    'invert:100%',
    'saturate:100%',
  ],
})

export const wmts = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/nURBAN2/default/EPSG:3857/{z}/{y}/{x}', {
  attribution: '<a href="https://maps.nlsc.gov.tw/" target="_blank">國土測繪圖資服務雲</a>',
})

// @ts-ignore
export const wmtsWithFilter = L.tileLayer.colorFilter(
  'https://wmts.nlsc.gov.tw/wmts/nURBAN2/default/EPSG:3857/{z}/{y}/{x}',
  {
    attribution: '<a href="https://maps.nlsc.gov.tw/" target="_blank">國土測繪圖資服務雲</a>',
    filter: [
      // make your own filter: https://xtk93x.github.io/Leaflet.TileLayer.ColorFilter.updateFilter/
      'brightness:100%',
      'contrast:100%',
      'grayscale:0%',
      'hue:30deg',
      'opacity:100%',
      'invert:40%',
      'saturate:800%',
    ],
  },
)

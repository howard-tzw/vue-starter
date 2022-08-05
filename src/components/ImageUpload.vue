<template>
  <label class="btn" for="images-upload">上傳照片</label>
  <input @change="onChange" id="images-upload" type="file" accept="image/*" multiple hidden />
  <!-- images preview -->
  <div class="flex p-2">
    <div v-for="(src, i) in srcs" :key="i" class="relative mr-3">
      <button @click="removeImage(src)" class="absolute -right-2 -top-2 bg-white rounded-full w-6 border">
        &times;
      </button>
      <img :src="src" class="w-28" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import EXIF from '@disfactory/exif-js'

type Image = {
  file: File
  src: string
}

const images = ref<Image[]>([])
const srcs = computed(() => {
  return images.value.map(img => img.src)
})

const onChange = async (e: Event) => {
  const fileList = (e.target as HTMLInputElement).files
  if (!fileList) return
  for (let i = 0; i < fileList.length; i++) {
    images.value.push({
      file: fileList[i],
      src: URL.createObjectURL(fileList[i]),
    })
  }
}

const removeImage = (src: string) => {
  images.value = images.value.filter(img => {
    return img.src !== src
  })
}

// about exif
type ExifData = {
  DateTimeOriginal?: string
  GPSLatitude?: [number, number, number]
  GPSLongitude?: [number, number, number]
}
type AfterExifData = { Latitude?: number; Longitude?: number; DateTimeOriginal?: string }

function readImageExif(file: File): Promise<AfterExifData> {
  const fileReader = new FileReader()
  const convertTurple2Number = (input: [number, number, number]) => input[0] + input[1] / 60 + input[2] / 3600

  return new Promise(resolve => {
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target) {
        resolve({})
        return
      }
      const data: ExifData = EXIF.readFromBinaryFile(e.target.result)

      const result: AfterExifData = {}
      if (data.GPSLatitude) {
        result.Latitude = convertTurple2Number(data.GPSLatitude)
      }
      if (data.GPSLongitude) {
        result.Longitude = convertTurple2Number(data.GPSLongitude)
      }
      if (data.DateTimeOriginal) {
        result.DateTimeOriginal = data.DateTimeOriginal
      }

      resolve(result)
    }
    fileReader.readAsArrayBuffer(file)
  })
}
</script>

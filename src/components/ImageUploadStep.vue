<template>
  <div class="px-10 py-5">
    <p class="text-xl">上傳工廠照片</p>
    <p class="text-xl">工廠照片</p>

    <div>
      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="3"
        :on-exceed="handleExceed"
      >
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
        </template>
      </el-upload>
    </div>

    <p class="text-xl">聯絡資訊（非必填）</p>
    <p class="text-xl">聯絡人暱稱</p>
    <input type="text" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs" />
    <p class="text-xl">聯絡方式 (email或電話)</p>
    <input type="text" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs" />
    <div>
      <button @click="nextStep" class="btn">下一步</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PageState, useAppState } from '@/store/appState.js'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'

const appState = useAppState()

const nextStep = () => {
  appState.$patch({ pageState: PageState.CREATE_FACTORY_3 })
}

const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = uploadFile => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`,
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`Cancel the transfert of ${uploadFile.name} ?`).then(
    () => true,
    () => false,
  )
}
</script>

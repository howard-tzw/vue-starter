import { createApp } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
// mdi-vue
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(mdiVue, {
  icons: mdijs,
})
app.use(ElementPlus)

app.mount('#app')

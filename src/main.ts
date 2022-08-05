import { createApp } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
// mdi-vue
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(mdiVue, {
  icons: mdijs,
})

app.mount('#app')

import { createApp } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'
import App from './App.vue'
import './index.css'
import 'vue-final-modal/style.css'

const vfm = createVfm()
const app = createApp(App)

app.use(vfm)
app.use(router)
app.use(createPinia())

app.mount('#app')

import { createApp } from 'vue'
import router from '@/router'
import VueSelect from 'vue3-select'
import 'vue3-select/dist/vue-select.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.component('VSelect', VueSelect)

app.use(router)
app.use(createPinia())

app.mount('#app')

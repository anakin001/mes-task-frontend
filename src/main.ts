import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import mitt from 'mitt'

const app = createApp(App)
const emitter = mitt()
app.config.globalProperties.emitter = emitter
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || 'none',
    },
  },
})
app.use(ToastService)
app.use(router)

app.mount('#app')

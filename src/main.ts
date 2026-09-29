import { createApp } from 'vue'
import 'virtual:uno.css'
import './style.css'
import App from './App.vue'
import { setupI18n } from './i18n'

setupI18n().then(() => createApp(App).mount('#app'))

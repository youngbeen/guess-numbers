import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckDouble,
  faCut,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheckDouble)
library.add(faCut)
library.add(faTimes)

const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

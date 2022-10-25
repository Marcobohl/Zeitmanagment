import { createApp } from 'vue'
import App from './App.vue'
import Router from "./routs"

import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

createApp(App)
    .use(Router).use(bootstrap)
    .mount('#app')

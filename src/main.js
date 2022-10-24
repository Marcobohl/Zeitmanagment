import { createApp } from 'vue'
import App from './App.vue'
import Router from "./routs"

createApp(App)
    .use(Router)
    .mount('#app')

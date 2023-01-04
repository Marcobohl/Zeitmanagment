import { createApp } from 'vue'
import App from './App.vue'
import Router from "./routs"
import BootstrapVue from "bootstrap-vue-3";
import VueSessionStorage from "vue-sessionstorage";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

createApp(App, VueSessionStorage)
    .use(Router)
    .use(BootstrapVue)
    .mount('#app')

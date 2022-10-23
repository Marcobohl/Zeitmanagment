import { createApp } from 'vue'
import App from './App.vue'

import {createRouter, createWebHistory} from 'vue-router'
import login from "@/components/Login";
import fpassword from "@/components/fpassword";
import home from "@/components/Home";


const checkLogin = (to, from, next) =>{


    next();


  /*  if (localStorage.logtin == "bdp6j0y4q") {
         // next({name: "login"})
        next()
    } else {
    next({name: "login"})
    }
     //   next({name: "login"})
  */
}




const routes = [
    {path: '/',beforeEnter: checkLogin, component: login},
    {path: '/login', component: login, name:'login'},
    {path: '/Home',beforeEnter: checkLogin, component: home, name:'home'},
    {path: '/Login/reset', component: fpassword, name:'reset'},
    {path: '/:pathMatch(.*)*', component: login, name: 'NotFound'},


];


const Router = createRouter({

    history:createWebHistory(),
    routes
})

createApp(App)
    .use(Router)
    .mount('#app')

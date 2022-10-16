import { createApp } from 'vue'
import App from './App.vue'
// import mysql from "mysql"


import {createRouter, createWebHistory} from 'vue-router'
import login from "@/components/Login";
import fpassword from "@/components/fpassword";
import home from "@/components/Home";

/* const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodelogin'
}); */

const checkLogin = (to, from, next) =>{
    next({name: "login" })


}


const routes = [
    {path: '/',beforeEnter: checkLogin, component: login},
    {path: '/login', component: login, name:'login'},
    {path: '/Home',beforeEnter: checkLogin, component: home, name:'home'},
    {path: '/Login/reset', component: fpassword, name:'reset'},
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: login},


];


const Router = createRouter({
    history:createWebHistory(),
    routes
})

createApp(App)
    .use(Router)
    .mount('#app')

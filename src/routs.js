import {createRouter, createWebHistory} from 'vue-router'

import login from "@/components/Login";
import fpassword from "@/components/fpassword";
import home from "@/components/Home";
import fpasswordconfirm from "@/components/fpasswordconfirm";
import axios from "axios";

const resetcodeccheck = (to, from, next) =>{
    console.log(to.params.code)


    axios.post("/api/reset/code", {
        code: to.params.code,
    }).then((res)=> {
        console.log(res.data.msg)

        if (res.data.msg === "TMS:1006"){
            next({ name: 'reset' });
        }

        if (res.data.msg === "TMS:1007"){
            next();
        }

    });
}

const loginpage = (to, from, next) =>{
    next({ name: 'login' });
}

const checkLogin = (to, from, next) =>{
    next();

    /* if (checke login code.) {
        code wure in datenbank gefunden loge usere ein.
    } else {
        code wurde nicht gefunden leite usere zu anmeldung weiter.
    } */


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
    {path: '/',beforeEnter: loginpage, component: login},
    {path: '/Login', component: login, name:'login'},
    {path: '/Home',beforeEnter: checkLogin, component: home, name:'home'},
    {path: '/Login/reset', component: fpassword, name:'reset'},
    {path: '/:pathMatch(.*)*',beforeEnter: loginpage, component: login, name: 'NotFound'},
    {path: '/Login/reset/:code',beforeEnter: resetcodeccheck, component: fpasswordconfirm, name: "restpassword", props: true }
];


const Router = createRouter({

    history:createWebHistory(),
    routes
})

export default Router;

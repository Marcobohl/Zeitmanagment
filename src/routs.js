import {createRouter, createWebHistory} from 'vue-router'

import login from "@/components/Login";
import fpassword from "@/components/fpassword";
import home from "@/components/Home";
import fpasswordconfirm from "@/components/fpasswordconfirm";
import admin from "@/components/admin";
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
    if (localStorage.getItem("Scode") === null) {
        next("login")
    } else {
        axios.post("/api/login/logincode", {
            scode: localStorage.getItem("Scode"),
        }).then((res)=> {
            console.log(res.data.msg);

            if (res.data.msg === "TMS:1011" || res.data.msg === "TMS:1013") {

                if (to.path == "/login") {
                    next();
                } else {
                    next("login");
                }

            }

            if (res.data.msg === "TMS:1012") {
                if (to.path == "/home") {
                    next();
                } else {
                    next("home");

                    let codeback = res.data.code;
                    sessionStorage.setItem("Mail", codeback.semail)
                }

            }
        });
    }
}

const loginpageadmin = (to, from, next) =>{
    if (localStorage.getItem("Scode") === null) {
        next("login")
    } else {
        axios.post("/api/login/logincode/admin", {
            scode: localStorage.getItem("Scode"),
        }).then((res)=> {
            console.log(res.data.msg);

            if (res.data.msg === "TMS:1011" || res.data.msg === "TMS:1013") {

                if (to.path == "/login") {
                    next();
                } else {
                    next("login");
                }

            }

            if (res.data.msg === "TMS:1012") {

                let codeback = res.data.code;

                if (codeback.admin === "1") {
                    if (to.path == "/admin") {
                        next();
                    } else {
                        next("admin");
                    }
                } else {
                    next("home");
                }

                sessionStorage.setItem("Mail", codeback.semail)
            }
        });
    }
}

const logincheck = (to, from, next) =>{

    if (localStorage.getItem("Scode") === null) {
        if (to.path == "/login") {
            next();
        } else {
            next("login");
        }

    } else {

        axios.post("/api/login/logincode", {
            scode: localStorage.getItem("Scode"),
        }).then((res)=> {
            console.log(res.data.msg);

            if (res.data.msg === "TMS:1011" || res.data.msg === "TMS:1013") {

                if (to.path == "/login") {
                    next();
                } else {
                    next("login");
                }

            }

            if (res.data.msg === "TMS:1012") {
                next("home");
                let codeback = res.data.code;
                sessionStorage.setItem("Mail", codeback.semail)
            }
        });

    }
}

const routes = [
    {path: '/',beforeEnter: loginpage, component: login},
    {path: '/Login', beforeEnter: logincheck, component: login, name:'login'},
    {path: '/Home',beforeEnter: loginpage, component: home, name:'home'},
    {path: '/Login/reset', component: fpassword, name:'reset'},
    {path: '/:pathMatch(.*)*',beforeEnter: loginpage, component: login, name: 'NotFound'},
    {path: '/Login/reset/:code',beforeEnter: resetcodeccheck, component: fpasswordconfirm, name: "restpassword", props: true },
    {path: '/admin',beforeEnter: loginpageadmin, component: admin, name: "adminpage", props: true }
];


const Router = createRouter({

    history:createWebHistory(),
    routes
})

export default Router;

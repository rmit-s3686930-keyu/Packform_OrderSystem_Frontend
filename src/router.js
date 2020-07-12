import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Main from "./components/Main.vue";

Vue.use(Router)

export default new Router({
    mode:"history",
    routes:[
        {
            path: "/",
            query:{msg:'sai'},
            name: "HelloWorld",
            component: HelloWorld
        },
        {
            path: "/orders",
            name: "Main",
            component: Main
        }
    ]
})
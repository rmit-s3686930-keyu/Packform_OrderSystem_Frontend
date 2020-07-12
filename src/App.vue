<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
      <div>
          <router-link to="/">home</router-link>
            |
          <router-link to="/orders">orders</router-link>
      </div>

      <div>
          <router-view> </router-view>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import DateRangePicker from "@gravitano/vue-date-range-picker";



Vue.use(DateRangePicker);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
export default {
  name: 'App',

  // components: {
  //     Main
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

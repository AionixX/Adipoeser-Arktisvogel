import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router/router'
import firebase from 'firebase/app';
import 'firebase/firestore';
import VueClipboard from "vue-clipboard2";

export const db = firebase.firestore();

Vue.use(VueRouter);
Vue.use(VueClipboard);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

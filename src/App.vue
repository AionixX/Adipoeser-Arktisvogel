<template>
  <v-app id="app">
    <v-content class="background">
      <router-view @navigate-to="navigateTo"></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import firebase from 'firebase';
  import {firebaseConfig} from "./assets/firebaseConfig";

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default {
    name: 'App',
    data: () => ({
      //
    }),
    methods: {
      navigateTo(destiny){
        this.$router.push(destiny);
      }
    }
  };
</script>
<style>
  .background {
    background-color: #3C9FE8;
    /*background: linear-gradient(135deg, rgba(103,218,223,1) 0%, rgba(0,155,255,1) 100%);*/

  }
</style>

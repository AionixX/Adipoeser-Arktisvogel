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
    },
    mounted() {
      if(localStorage.getItem('AufDerBettkannte') == null){
        localStorage.setItem('AufDerBettkannte', 'true');
      }
      if(localStorage.getItem('Kontrollliste') == null){
        localStorage.setItem('Kontrollliste', 'true');
      }
      if(localStorage.getItem('EntwederOder') == null){
        localStorage.setItem('EntwederOder', 'true');
      }
      if(localStorage.getItem('Beziehungsfragen') == null){
        localStorage.setItem('Beziehungsfragen', 'true');
      }
      if(localStorage.getItem('DasLebenIstKurz') == null){
        localStorage.setItem('DasLebenIstKurz', 'true');
      }
      if(localStorage.getItem('KoerperUndSeele') == null){
        localStorage.setItem('KoerperUndSeele', 'true');
      }
    }
  };
</script>
<style>
  .background {
    background-color: #3C9FE8;
    /*background: linear-gradient(135deg, rgba(103,218,223,1) 0%, rgba(0,155,255,1) 100%);*/

  }
  .v-messages {
    display: none;
  }
</style>

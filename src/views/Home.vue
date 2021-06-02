<template>  
  <v-container class="white--text">
    <v-layout justify-center align-center class="text-center px-3">
      <v-card id="custom-card" class="white--text mt-15" :elevation="24">
        <v-img :src="require('../assets/logo.png')" class="translation mx-auto" />           
        <h1 id="title" class="font-weight-light mx-4 mb-2">
          Notes App with VueJS & MongoDB Atlas
        </h1>
        <p class="font-weight-light mx-4 paragraph">
          <i>Progressive Web Application</i> (PWA) to create notes developed with VueJS, authentication and use of MongoDB Atlas.
        </p>
        <hr class="mx-4">
        <p class="font-weight-light mx-4 my-4 paragraph">
          Developers can visit the documentation page to install the application on a server.            
        </p>
        <p class="font-weight-light mx-4 paragraph">Look and/or download the application code from <a id="link-color" href="https://github.com/emarifer/my-pwa-code" target="_blank" rel="noopener noreferrer">here</a>.
        </p>
        <v-card-actions>
          <a class="mx-auto" id="link-color" href="https://emarifer.github.io/curriculum/" target="_blank" rel="noopener noreferrer">
            My Site
          </a>              
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<style>
  #link-color {
    color: #BF360C;
    text-decoration: none;
  }

  .translation {
    transform: translate(0, -60px);
    width: 120px;
  }
</style>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Home',
    mounted() {
      this.setCustomAlert({ alert: false, message: '' });
    },
    methods: {
      ...mapActions(['setCustomAlert']),
    },
  }
</script>

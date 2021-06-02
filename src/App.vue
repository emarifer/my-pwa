<template>
  <v-app id="custom-background">
    <Navigation />
    <v-main>
      <section></section>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>

  #custom-background {
    background: #161623;
  }
  
  #custom-card {
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
  }

  section::before {
    content: "";
    position: fixed;
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    background: radial-gradient(farthest-corner at 1rem 1rem , #3eff04 15%, #147aee 55%);
    right: 1rem;
    bottom: 4rem;
  }

  section::after {
    content: "";
    position: fixed;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background: radial-gradient(farthest-corner at 12rem 12rem , #e5ff00 10%, #7e00c7 60%);
    left: -0.5rem;
    top: -0.1px;
  }

  #title {
    font-size: 1.85rem;
  }

  @media screen and (min-width: 450px) {
    #title {
      font-size: 3.5rem;
    }
    .paragraph {
      font-size: 1.4rem;
    }
  }
</style>

<script>
  import Navigation from './components/Navigation';

  export default {
    name: 'App',
    components: {
      Navigation,
    },
  };
</script>

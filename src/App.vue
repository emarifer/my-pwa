<template>
  <v-app id="custom-background">
    <Navigation />
    <v-main>
      <section></section>
      <router-view />
      <v-btn
        v-if="showBtn"
        @click="scrollToTop"
        id="btn-to-top"
        fab
        dark
        color="deep-purple darken-2"
      >
        <v-icon>
          mdi-arrow-up-bold
        </v-icon>
      </v-btn>
    </v-main>    
    <v-snackbar bottom right :value="updateExists" :timeout="-1" color="grey darken-3">
      An update is available!! 😀
      <v-btn text @click="refreshApp">
        Update
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<style>

  #btn-to-top {
    position: fixed;
    z-index: 100;
    bottom: 1rem; /* calc(1rem + 1vh); */
    right: 1rem; /* calc(1rem + 1vw); */
  }

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
    background: radial-gradient(farthest-corner at -35px -35px , #fbff00 18%, #073f80 70%, #001a4a 85%);
    right: 1rem;
    bottom: 4rem;
  }

  section::after {
    content: "";
    position: fixed;
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    background: radial-gradient(farthest-corner at 12rem 12rem , #e5ff00 10%, #7e00c7 60%, #2c005f 80%);
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
  import update from './mixins/update';

  export default {
    name: 'App',
    components: {
      Navigation,
    },
    data() {
      return {
        showBtn: false,
      }
    },
    mixins: [update],
    mounted() {
      this.detectScroll();
    },
    methods: {
      detectScroll() {
          window.addEventListener('scroll', (e) => { 
          const scrollTop = pageYOffset || window.document.documentElement.scrollTop; // Por si un navegador antiguo no detectara «pageYOffset»

          this.showBtn = scrollTop > 300 ? true : false;
        });
      },
      scrollToTop() {
        scrollTo({
          behavior: 'smooth',
          top: 0,
          // left: 0 // Si hubiese barra horizontal de desplazamiento
        });
      },
    },
  };
</script>

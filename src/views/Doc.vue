<template>
  <v-container class="white--text">
    <v-layout justify-center align-center class="px-3">
      <v-card id="custom-card" class="white--text mt-15" :elevation="24">
        <v-img :src="require('../assets/logo-pwa.png')" class="translation mx-auto" />

        <h1 id="title" class="font-weight-light mx-4 mb-2">Documentation</h1>

        <hr class="mx-4">
        
        <p class="font-weight-light ma-4 paragraph">
          <i>Progressive Web Application</i> (PWA) to create notes developed with VueJS.
        </p>
        <p class="font-weight-light ma-4 paragraph">Deployment in production:</p>
        
        <p class="font-weight-light mx-4 paragraph">In the first place, for the app to work it is necessary that a REST API is also deployed as a backend of this application. Said backend can be viewed and/or downloaded from <a id="link-color" href="https://github.com/emarifer/my-pwa-backend" target="_blank" rel="noopener noreferrer">here</a>.</p>

        <p class="font-weight-light ma-4 paragraph">
          To install the My PWA backend it is prerequisite to have installed nodejs. Also, an .env file is required that stores the environment variables corresponding to the database credentials in MongoDB Atlas. Likewise, in this file it is necessary to create the SECRET variable to store the secret key with which the backend digitally signs the JSON WEB TOKEN:
        </p>
        
        <Code :code="code_1" />

        <p class="font-weight-light ma-4 paragraph">
          Once this application is downloaded, you have to install the dependencies and compile it:
        </p>
        
        <Code :code="code_2" />
        
        <Code :code="code_3" />

        <p class="font-weight-light ma-4 paragraph">
          Once this is done we will deploy the application on a static file server.
        </p>

        <p class="font-weight-light ma-4 paragraph">
          In some servers it may be necessary to create a <i>404.html</i> with the same content as the <i>index.html</i> so that it does not give us an error when doing a fallback in the browser.
        </p>

        <p class="font-weight-light ma-4 paragraph">
          Look and/or download the application code from 
            <a id="link-color" href="https://github.com/emarifer/my-pwa-code" target="_blank" rel="noopener noreferrer">
              here
            </a>.
        </p>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex';
  import Code from '../components/Code';
  
  export default {
    name: 'Doc',
    components: {
      Code,
    },
    data() {
      return {
        code_1: `
          PORT=3500 (e.g)
          MONGODB_URI=mongodb+srv://XXXX:XXXX.4temp.mongodb.net/XXXX?retryWrites=true&w=majority
          SECRET=XXXX

          // Replace 'XXXX' with the corresponding values.`,
        code_2: `
          npm i`,
        code_3: `
          npm run build

          // 1. Vue CLI must be installed.`,
      }
    },
    mounted() {
      this.setCustomAlert({ alert: false, message: '' });
    },
    methods: {
      ...mapActions(['setCustomAlert']),
    },
  }
</script>

<!-- 
  IMPORTACION DE ASSETS EN EL COMPONENTE. VER:
  https://stackoverflow.com/questions/48426972/importing-javascript-file-for-use-within-vue-component
 -->
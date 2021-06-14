module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/' // /my-pwa/
      : '/',
    pages: {
      index: {
        entry: 'src/main.js',
        title: 'My PWA'
      },
      404: {
        entry: 'src/main.js',
        template: "public/index.html",
        filename: "404.html",
        title: 'My PWA'
      },
    },
    pwa: {
      name: 'My PWA', // my-pwa
      themeColor: '#9900aa',
      workboxPluginMode: "InjectManifest", // GenerateSW
      workboxOptions: {
        swSrc: "./src/service-worker.js"
      },
      manifestOptions: {
        background_color: "#9900aa"
      }
    }
}

/**
 * NOTA IMPORTANTE. HABILITAR EL MODO HISTORY EN OFFLINE WORKBOX:
 * https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode#59389816
 * SOBRE SKIPWAITING:
 * https://stackoverflow.com/questions/54145735/vue-pwa-not-getting-new-content-after-refresh
 * 
 * SOBRE CAMBIAR EL COLOR DE FONDO DEL SPLASH SCREEN:
 * https://github.com/vuejs/vue-cli/issues/4925#issuecomment-562988762
 * CONFIGURACION DE LAS CARACTERISTICAS DEL SPLASH SCREEN:
 * https://web.dev/splash-screen/#how-to-create-a-custom-splash-screen
 * GENERACION AUTOMATICA DE LOS ICONOS DE LA APLICACION (npx vue-pwa-asset-generator -a logo.png -o icons):
 * https://github.com/jcalixte/vue-pwa-asset-generator
 * 
 * SERVING A CUSTOM “PAGE NOT FOUND” 404 PAGE IN A MPA (MULTIPAGE APPLICATION) BY MODIFYING VUE.CONFIG.JS?. VER:
 * https://forum.vuejs.org/t/solved-serving-a-custom-page-not-found-404-page-in-a-mpa-multipage-application-by-modifying-vue-config-js/108202
 */

 /**
 * https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch#enviando_datos_json
 * 
 * https://cli.vuejs.org/core-plugins/pwa.html#vue-cli-plugin-pwa
 * https://smithgeek.com/pwa-caching-with-workbox-and-cloudflare/
 * https://livebook.manning.com/book/progressive-web-apps/chapter-3/53
 * 
 * https://programmerclick.com/article/76121571311/
 * https://medium.com/@mario.brendel1990/offline-post-requests-with-workbox-vuejs-4df0e9f93da9
 * https://developers.google.com/web/tools/workbox/modules/workbox-background-sync
 * 
 * https://developer.chrome.com/docs/devtools/storage/indexeddb/
 * 
 * IMPORTANTE. CACHEAR REQUEST FALLIDAS EN INDEXEDDB:
 * https://developers.google.com/web/tools/workbox/modules/workbox-background-sync#advanced_usage
 * https://github.com/GoogleChrome/workbox/issues/1480#issuecomment-579948965
 * https://github.com/GoogleChrome/workbox/issues/2044#issuecomment-564077155
 * 
 * MULTIPLE CONDITIONS FOR JAVASCRIPT .INCLUDES() METHOD:
 * https://stackoverflow.com/questions/37896484/multiple-conditions-for-javascript-includes-method#43615512
 */

/**
 * MANEJO DE ACTUALIZACIONES DEL SERVICE WORKER EN UNA PWA CON VUE.JS. VER:
 * https://dev.to/drbragg/handling-service-worker-updates-in-your-vue-pwa-1pip
 * 
 * UNA SOLUCION MENOS ELEGANTE (NO USA VUETIFY):
 * https://levelup.gitconnected.com/vue-pwa-example-298a8ea953c9
 * 
 * CÓMO PROPORCIONAR SU PROPIA EXPERIENCIA DE INSTALACIÓN EN LA APLICACIÓN. VER:
 * https://web.dev/customize-install/
 * 
 * COMANDO LINUX PARA ENTRAR DIRECTAMENTE EN LA CARPETA CREADA CON MKDIR:
 * https://unix.stackexchange.com/questions/125385/combined-mkdir-and-cd#125459
 */

 /**
  * 
  * ANTERIOR CONFIGURACION DE VUE.CONFIG.JS:
  * 
  * module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/my-pwa/'
      : '/',
    pages: {
      index: {
        entry: 'src/main.js',
        title: 'My PWA'
      }
    },
    pwa: {
      name: 'My PWA', // my-pwa
      themeColor: '#9900aa',
      workboxPluginMode: "GenerateSW", // InjectManifest
      workboxOptions: {
        // swSrc: "./src/service-worker.js"
        skipWaiting: true,
        navigateFallback: 'index.html',
        // importScripts : [ '/custom-service-worker.js' ]
      }
    }
}
  */

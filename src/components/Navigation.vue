<template>
    <div>
        <v-app-bar app class="secondary" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-img
                alt="My Logo"
                class="shrink mr-2"
                contain
                src="../assets/logo.png"
                transition="scale-transition"
                width="40"
            />
            <v-toolbar-title>My PWA</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="ml-2" href="https://github.com/emarifer/" target="_blank" text>
                My GitHub
                <img class="ml-2" src="../assets/img/github.png" style="max-width: 1.5rem" alt="My GitHub">
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" temporary dark>
            <v-layout mt-4 pl-4 column>
                <div v-if="!token.length > 0">
                    <v-icon class="text-h2 pink darken-1 mb-5">
                        mdi-account-off
                    </v-icon>
                    <p class="text-h6" style="color: #D81B60">{{ username }}</p>
                </div>
                <div v-else>
                    <v-icon class="text-h2 green accent-3 mb-5">
                        mdi-account-circle
                    </v-icon>
                    <p class="text-h6" style="color: #00E676">{{ username }}</p>
                </div>

                <hr style="width: 90%">

                <router-link class="decoration" to="/">
                    <v-icon class="mr-2">mdi-home</v-icon>
                    Home
                </router-link>
                <router-link class="decoration" to="/doc">
                    <v-icon class="mr-2">mdi-information</v-icon>
                    Documentation
                </router-link>
                <div v-if="!token.length > 0">                    
                    <router-link class="decoration" to="/login">
                        <v-icon class="mr-2">mdi-login</v-icon>
                        Login
                    </router-link>
                    <router-link class="decoration" to="/register">
                        <v-icon class="mr-2">mdi-account-plus</v-icon>
                        Register
                    </router-link>
                </div>
                <div v-else>
                    <router-link class="decoration" to="/notes">
                        <v-icon class="mr-2">mdi-note</v-icon>
                        Notes
                    </router-link>
                    <router-link class="decoration" to="/new-note">
                        <v-icon class="mr-2">mdi-note-plus</v-icon>
                        Add Note
                    </router-link>
                    <a @click="logout" class="decoration">
                        <v-icon class="mr-2">mdi-logout</v-icon>
                        Logout
                    </a>
                </div>
            </v-layout>
        </v-navigation-drawer>
    </div>

</template>

<style scoped>
    .decoration {
        text-decoration: none;
        color: white;
        display: block;
        margin: 0.5rem;
    }
</style>

<script>
    import decode from 'jwt-decode';
    import { mapActions } from "vuex";

    export default {
        name: 'Navigation',
        data() {
            return {                
                drawer: false,
            }
        },
        computed: {
            token() {
                return this.$store.state.token;
            },
            username() {
                return this.token.length > 0
                    ? decode(this.token).data.name
                    : 'You are not logged in.';
            },
        },
        methods: { 
            ...mapActions(['signOut']),
            logout() {
                this.signOut();
                this.$router.push({ name: 'Home' });
            },
        },
    }
</script>

<!-- https://stackoverflow.com/questions/50298751/vue-vuetify-unknown-custom-element-v-app-did-you-register-the-component-c#58184913 

    https://www.aprenderaprogramar.com/index.php?option=com_content&view=article&id=497:comentarios-en-html-lineas-separadoras-etiqueta-hr-atributos-deprecated-size-width-noshade-cu00716b&catid=69&Itemid=192-->
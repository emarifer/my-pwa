<template>
  <v-container>
    <v-alert
      v-model="alert"
      border="left"
      close-text="Close Alert"
      color="pink lighten-4"
      dismissible
      width="100%"
      >
      {{ message }}
    </v-alert>
    <v-layout class="pa-4">
        <v-card id="custom-card" class="card-width pa-4" :elevation="18">
          <v-card-title class="white--text">Sign Up</v-card-title>
          <v-form @submit.prevent="signUp" ref="form">
            <v-text-field dark label="Name" v-model="user.name" ref="autofocus" :counter="10" :rules="nameRules"></v-text-field>
            <v-text-field dark label="E-mail" type="email" v-model="user.email" :rules="emailRules"></v-text-field>
            <v-row class="px-3 py-6" align="center">
              <v-text-field dark label="Password" :type="type" v-model="user.pass" :rules="passRules"></v-text-field>
              <v-btn @click="showPassword" plain small class="ml-1 white--text">
                <v-icon>{{ icon }}</v-icon>
              </v-btn>
            </v-row>
            <v-btn type="submit" @keyup.enter="submit" block small color="light-blue accent-3" :elevation="10" class="white--text my-2">
              <v-icon class="mr-2">mdi-account-plus</v-icon>
              Sign Up
            </v-btn>
          </v-form>
        </v-card>
    </v-layout>
  </v-container>
</template>

<style scoped>
  .card-width {
    width: 100%;
  }
</style>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Register',
    data() {
      return {
        alert: false,
        message: '',
        user: {
          name: '',
          email: '',
          pass: '',
        },
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'E-mail must be valid',
        ],
        passRules: [
          v => !!v || 'Password is required',
          v => v.length >= 4 || 'Password must be at least 4 characters',
        ],
        type: 'password',
        icon: 'mdi-eye'
      }
    },
    mounted() {
      this.setCustomAlert({ alert: false, message: '' });
      this.inputFocus();
    },
    methods: {
      ...mapActions(['setToken', 'setCustomAlert']),
      signUp() {
        this.$refs.form.validate() ? this.createNewUser() : this.resetForm();
      },
      createNewUser() {
        if (navigator.onLine) {          
          this.axios.post('/new-user', this.user)
            .then(res => {
              this.setToken(res.data.token);
              this.setCustomAlert({ alert: false, message: '', color: '' });
              this.$router.push({ name: 'Notes' });
            })
            .catch(e => {
              this.alert = true;
              this.message = e.response.data.message;
              this.user = { name: '', email: '', pass: '' };
              this.$refs.form.resetValidation();
              this.inputFocus();
            });
        } else {
          this.alert = true;
          this.message = "You don't have an internet connection to sign up.";
          this.user = { name: '', email: '', pass: '' };
          this.$refs.form.resetValidation();
          this.inputFocus();          
        }
      },
      resetForm() {
        this.$refs.form.resetValidation();
        this.user = { name: '', email: '', pass: '' };
        this.alert = true;
        this.message = 'Some fields are empty or invalid.'
        this.inputFocus();
      },
      showPassword() {
        if (this.type === 'password') {
            this.type = 'text';
            this.icon = 'mdi-eye-off';
        } else {
            this.type = 'password';
            this.icon = 'mdi-eye';
        }
      },
      inputFocus() {
        this.$refs.autofocus.focus();
      },
    },
  }
</script>

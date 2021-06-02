<template>
    <v-container class="mt-4">
        <v-row class="pa-4">
          <v-alert
            v-model="alert"
            border="left"
            close-text="Close Alert"
            :color="color"
            dismissible
            width="100%"
            >
              {{ message }}
          </v-alert>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" v-for="(item, index) in notes" :key="index">
            <v-card id="custom-card" :elevation="18">
              <v-card-title class="white--text font-weight-light">
                {{ item.name }}
                <v-spacer />
                <v-btn @click="editNote(item._id, index)" class="white--text" outlined fab small>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="white--text font-weight-light">
                {{ item.description }}
              </v-card-text>
              <v-card-text class="white--text font-weight-light">
                {{ getDate(item.date) }}
              </v-card-text>
              <v-card-actions>
                <v-btn @click="removeNoteDialog(item._id, index)" block small color="red accent-3" :elevation="10" class="white--text mb-2">
                  <v-icon class="mr-2">mdi-delete</v-icon>
                  Delete
                </v-btn>                
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Dialog -->
        <v-dialog v-model="dialog" width="400" persistent>
          <v-card color="blue-grey darken-1" dark>
              <v-card-title class="headline blue-grey darken-3">
                My PWA
              </v-card-title>
              <v-divider />
              <v-card-text class="text-h6 font-weight-light text-center">
                Do you really want to delete this note?
              </v-card-text>
              <v-divider />
              <v-card-actions class="blue-grey lighten-4 px-10">
                <v-btn small @click="removeNote" color="pink" text>yes</v-btn>
                <v-spacer/>
                <v-btn small @click="dialog = false" color="info" text>no</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    </v-container>
</template>

<script>
  import { mapActions } from 'vuex';
  import date from "../helpers/date";

  export default {
    name: 'Notes',
    data() {
      return {
        notes: [],
        localNotes: this.$store.state.localNotes,
        alert: false,
        message: '',
        color: '',
        dialog: false,
        noteId: '',
        noteIndex: 0,
        config: {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        },
      }
    },
    mounted() {
      this.getAllNotes();
    },
    methods: {
      ...mapActions(['setCustomAlert', 'setNotes', 'signOut']),
      getDate: date.formattedDate,
      getAllNotes() {
        this.axios.get('/notes', this.config)
          .then(res =>  {
            this.notes = res.data;
            navigator.onLine ? this.setNotes(this.notes) : this.notes = this.localNotes;
            this.displayAlert();
          })
          .catch(e => {
            if (e.response.data.message === 'Unauthenticated user.') {                
              this.setCustomAlert({ alert: true, message: e.response.data.message, color: 'pink lighten-4' });
              this.signOut();
              this.$router.push({ name: 'Login' });
            } else {                
              console.error(e)
            }
          });
      },
      editNote(id, index) {
        const noteToEdit = this.notes[index];
        this.$router.push({ name: 'Edition', params: { id , noteToEdit } });
      },
      removeNoteDialog(id, index) {
        this.dialog = true;
        this.noteId = id;
        this.noteIndex = index;
      },
      removeNote() {
        this.dialog = false;
        this.axios.delete(`/note/${this.noteId}`, this.config)
          .then(res => {
            this.getAllNotes();
            this.setCustomAlert({ alert: true, message: 'Note successfully removed.',color: 'teal lighten-3' });
            this.displayAlert();
            this.noteId = '';
            this.noteIndex = 0;
          })
          .catch(e => {
            if (navigator.onLine) {              
              if (e.response.data.message === 'Unauthenticated user.') {                
                this.setCustomAlert({ alert: true, message: e.response.data.message, color: 'pink lighten-4' });
                this.signOut();
                this.$router.push({ name: 'Login' });
              } else {                
                console.error(e)
              }
            } else {
              this.localNotes.splice(this.noteIndex, 1);
              this.setNotes(this.localNotes);
              this.notes = this.localNotes;
              this.setCustomAlert({ alert: true, message: 'The note will be deleted to the database when you have an Internet connection.', color: 'blue lighten-3' });
              this.displayAlert();
              this.noteId = '';
              this.noteIndex = 0;
            }
          });
      },
      displayAlert() {
        this.alert = this.$store.state.customAlert.alert;
        this.message = this.$store.state.customAlert.message;
        this.color = this.$store.state.customAlert.color;
      },
    },
  }
</script>

<!-- 
  IMPORTANTE PASAR EL TOKEN CON "BEARER":
  https://youtu.be/OK9zmaXIISI?t=1113

  ENVIAR DATOS ENTRE COMPONENTES HERMANOS EN VUE.JS. VER:
  https://blog.pleets.org/article/enviar-datos-entre-componentes-hermanos-en-vuejs

  COLUMNAS EN VUETIFY. VER:
  https://stackoverflow.com/questions/59552177/how-to-output-7-or-8-column-grids-using-vuetitys-v-row-and-v-col

  HOW TO USE HELPER FUNCTIONS FOR IMPORTED MODULES IN VUEJS .VUE TEMPLATE?. VER:
  https://forum.vuejs.org/t/how-to-use-helper-functions-for-imported-modules-in-vuejs-vue-template/6266/2
 -->
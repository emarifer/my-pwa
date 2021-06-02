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
        You must complete the name field.
      </v-alert>
      <v-layout class="pa-4">
        <v-card id="custom-card" class="card-width pa-4" :elevation="18">
          <v-form @submit.prevent="confirmEdit" ref="form">
            <v-text-field dark label="Note Name" v-model="note.name" ref="autofocus" :rules="nameRules"></v-text-field>
            <v-textarea dark label="Note Description" v-model="note.description"></v-textarea>
            <v-btn type="submit" block small color="purple lighten-1" :elevation="10" class="white--text mb-2">
              <v-icon class="mr-2">mdi-pencil</v-icon>
              Update Note
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
      name: 'Edition',
      props: ['noteToEdit'],
      data() {
        return {
          alert: false,
          note: this.noteToEdit,
          localNotes: this.$store.state.localNotes,
          config: {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`
            }
          },
          nameRules: [
            v => !!v || 'The Note Name is required',
          ],
        }
      },
      mounted() {
        this.setCustomAlert({ alert: false, message: '' });
        this.inputFocus();
      },
      methods: {
        ...mapActions(['setCustomAlert', 'setNotes', 'signOut']),        
        confirmEdit() {
          this.$refs.form.validate() ? this.edit() : this.displayAlert();
        },
        edit() {
          const id = this.$route.params.id;
          this.axios.put(`/note/${id}`, this.note, this.config)
            .then(res => {
              this.setCustomAlert({ alert: true, message: 'Note successfully updated.', color: 'teal lighten-3' });
              this.$router.push({ name: 'Notes' });
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
                const index = this.localNotes.findIndex(el => el._id === id);
                this.localNotes[index].name = this.note.name;
                this.localNotes[index].description = this.note.description;
                this.setNotes(this.localNotes);
                this.setCustomAlert({ alert: true, message: 'The note will be updated in the database when you have Internet connection.', color: 'blue lighten-3' });
                this.$router.push({ name: 'Notes' });                
              }
            });
        },
        displayAlert() {
          this.$refs.form.resetValidation();
          this.alert = true;
          this.inputFocus();
        },
        inputFocus() {
          this.$refs.autofocus.focus();
        },
      },        
  }
</script>
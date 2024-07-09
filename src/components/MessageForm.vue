<script>
import axios from 'axios';
import { store } from '../store';

export default {
  name: 'MessageForm',
  data() {
    return {
      name: '',
      email: '',
      text: '',
      store,
      messageSent: false, // Aggiungiamo una variabile per gestire lo stato dell'invio del messaggio
      errorMessage: '', // Aggiungiamo una variabile per gestire eventuali errori
    };
  },
  methods: {
    async sendMessage() {
      try {
        const response = await axios.post(`${store.apiBaseUrl}/api/messages`, {
          name: this.name,
          email: this.email,
          text: this.text,
          apartment_id: store.apartment.id
        });
        if (response.data.success) {
          this.messageSent = true; // Imposta lo stato a true per mostrare il messaggio di successo
          this.name = ''; // Pulisce i campi dopo l'invio del messaggio
          this.email = '';
          this.text = '';
          // Puoi aggiornare lo store o fare altre azioni necessarie qui
        } else {
          this.errorMessage = 'Errore durante l\'invio del messaggio.';
        }
      } catch (error) {
        console.error('Errore:', error);
        this.errorMessage = 'Si è verificato un errore durante l\'invio del messaggio.';
      }
    },
    closeFlashMessage() {
      this.messageSent = false; // Nasconde il messaggio di successo
    }
  }
};
</script>


<template>
   <!-- messaggio invianto con successo -->
   <div v-if="messageSent" class="alert alert-success alert-dismissible fade show" role="alert">
        Messaggio inviato con successo!
        <button type="button" class="btn-close" @click="closeFlashMessage" aria-label="Close"></button>
   </div>
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Contatta l'host</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <p>Inserisci tutti i campi</p>
      <form @submit.prevent="sendMessage">
        <div class="mb-3">
          <label for="name" class="form-label">Nome e Cognome</label>
          <input type="text" class="form-control" id="name" placeholder="Giuseppe Amato" name="name" v-model="name"
            required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Indirizzo e-mail</label>
          <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email"
            v-model="email" required>
        </div>
        <div class="mb-3">
          <label for="text" class="form-label">Messaggio</label>
          <textarea class="form-control" id="text" rows="3" placeholder="Digita il messaggio" name="message"
            v-model="text" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="offcanvas">Invia Messaggio</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
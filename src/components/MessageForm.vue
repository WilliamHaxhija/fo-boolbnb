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
      store
    };
  },
  //   mounted() {
  //     // Simulazione di autocompletamento dell'email se l'utente è registrato
  //     const isRegisteredUser = true; // Simula che l'utente è registrato
  //     const registeredEmail = 'utente@esempio.com'; // Email dell'utente registrato

  //     if (isRegisteredUser) {
  //       this.email = registeredEmail;
  //     }
  //   },
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
          alert('Messaggio inviato con successo!');
        } else {
          alert('Errore durante l\'invio del messaggio.');
        }
      } catch (error) {
        console.error('Errore:', error);
        alert('Si è verificato un errore durante l\'invio del messaggio.');
      }
    }
  }
};
</script>

<template>
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Contatta l'host</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <p>Qui puoi contattare il proprietario dell'appartamento e chiedere informazioni in merito.</p>
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
        <button type="submit" class="btn btn-primary">Invia Messaggio</button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
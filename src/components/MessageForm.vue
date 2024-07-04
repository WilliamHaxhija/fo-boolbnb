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
        const response = await axios.post('http://localhost:8000/api/messages', {
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
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Contatta l'host</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p>Qui puoi contattare il proprietario dell'appartamento e chiedere informazioni in merito.</p>
            <form @submit.prevent="sendMessage">
                <div class="mb-3">
                    <label for="name" class="form-label">Nome e Cognome</label>
                    <input type="text" class="form-control" id="name" placeholder="Giuseppe Amato" name="name" v-model="name" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Indirizzo e-mail</label>
                    <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email" v-model="email" required>
                </div>
                <div class="mb-3">
                    <label for="text" class="form-label">Messaggio</label>
                    <textarea class="form-control" id="text" rows="3" placeholder="Digita il messaggio" name="message" v-model="text" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Invia Messaggio</button>
            </form>
            <!-- <form class="row g-3"> -->
  <!-- <div class="col-md-4">
    <label for="validationServer01" class="form-label">First name</label>
    <input type="text" class="form-control is-valid" id="validationServer01" value="Mark" required>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-4">
    <label for="validationServer02" class="form-label">Last name</label>
    <input type="text" class="form-control is-valid" id="validationServer02" value="Otto" required>
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-4">
    <label for="validationServerUsername" class="form-label">Username</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend3">@</span>
      <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required>
      <div id="validationServerUsernameFeedback" class="invalid-feedback">
        Please choose a username.
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <label for="validationServer03" class="form-label">City</label>
    <input type="text" class="form-control is-invalid" id="validationServer03" aria-describedby="validationServer03Feedback" required>
    <div id="validationServer03Feedback" class="invalid-feedback">
      Please provide a valid city.
    </div>
  </div>
  <div class="col-md-3">
    <label for="validationServer04" class="form-label">State</label>
    <select class="form-select is-invalid" id="validationServer04" aria-describedby="validationServer04Feedback" required>
      <option selected disabled value="">Choose...</option>
      <option>...</option>
    </select>
    <div id="validationServer04Feedback" class="invalid-feedback">
      Please select a valid state.
    </div>
  </div>
  <div class="col-md-3">
    <label for="validationServer05" class="form-label">Zip</label>
    <input type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required>
    <div id="validationServer05Feedback" class="invalid-feedback">
      Please provide a valid zip.
    </div>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" aria-describedby="invalidCheck3Feedback" required>
      <label class="form-check-label" for="invalidCheck3">
        Agree to terms and conditions
      </label>
      <div id="invalidCheck3Feedback" class="invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div> -->
<!-- </form> -->
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
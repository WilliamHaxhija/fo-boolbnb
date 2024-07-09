<script>
import axios from 'axios';
import { store } from '../store';
export default {
  name: 'AppFilter',
  data() {
    return {
      store,
      radius: 20,
      services: []
    };
  },
  methods: {
    getServicesFromApi() {
      let apiServicesUrl = `${store.apiBaseUrl}/api/services`;
      axios.get(apiServicesUrl).then(response => {
        this.services = response.data;
      }).catch(error => {
        console.error('Errore nel recupero dei servizi:', error);
      });
    },
    resetFilters() {
      this.store.numberOfRooms = null;
      this.store.numberOfBeds = null;
      this.store.numberOfBathrooms = null;
      this.store.selectSquareMeters = null;
      this.store.userRadius = null;
      this.store.selectedServices = [];
    },
    applyFilters() {
      this.$emit('advancedSearch');
    }
  },
  mounted() {
    this.getServicesFromApi();
  }
};
</script>



<template>
  <!-- Bottone per desktop e tablet -->
  <button class="ms_Btn p-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"
    aria-controls="offcanvasWithBothOptions">
    <i class="fa-solid fa-sliders"></i>
  </button>
  
  <!-- messaggio invianto con successo -->
  <!-- <div v-if="messageSent" class="alert alert-success alert-dismissible fade show" role="alert">
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
  </div> -->

  

  <div class="offcanvas offcanvas-start rounded-4 my-3" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
    aria-labelledby="staticBackdropLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="staticBackdropLabel">Filtra</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body p-3">
      <form class="rounded-4 overflow-auto">
        <div class="mb-3">
          <label class="form-label">Numero di stanze</label>
          <div class="btn-group" role="group" aria-label="Numero di stanze">
            <button type="button" class="btn btn-outline-primary" :class="{ 'active': store.numberOfRooms === 0 }"
              @click="store.numberOfRooms = 0">
              Qualsiasi
            </button>
            <button type="button" class="btn btn-outline-primary" v-for="n in 8" :key="'rooms-' + n"
              :class="{ 'active': store.numberOfRooms === n }" @click="store.numberOfRooms = n">
              {{ n }}
            </button>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Numero di letti</label>
          <div class="btn-group" role="group" aria-label="Numero di letti">
            <button type="button" class="btn btn-outline-primary" :class="{ 'active': store.numberOfBeds === 0 }"
              @click="store.numberOfBeds = 0">
              Qualsiasi
            </button>
            <button type="button" class="btn btn-outline-primary" v-for="n in 8" :key="'beds-' + n"
              :class="{ 'active': store.numberOfBeds === n }" @click="store.numberOfBeds = n">
              {{ n }}
            </button>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Numero di bagni</label>
          <div class="btn-group" role="group" aria-label="Numero di bagni">
            <button type="button" class="btn btn-outline-primary" :class="{ 'active': store.numberOfBathrooms === 0 }"
              @click="store.numberOfBathrooms = 0">
              Qualsiasi
            </button>
            <button type="button" class="btn btn-outline-primary" v-for="n in 8" :key="'bathrooms-' + n"
              :class="{ 'active': store.numberOfBathrooms === n }" @click="store.numberOfBathrooms = n">
              {{ n }}
            </button>
          </div>
        </div>
        <div class="mb-3">
          <label for="squareMeters" class="form-label">Mq</label>
          <input id="squareMeters" type="number" class="form-control" v-model="store.selectSquareMeters">
        </div>
        <div class="mb-3">
          <label for="userRadius" class="form-label">Raggio di km</label>
          <input id="userRadius" type="range" class="form-range mb-4" v-model="store.userRadius" min="0" max="100"
            step="1">
          <div>{{ store.userRadius }} km</div>
        </div>
        <div class="mb-3">
          <p class="mb-1">Seleziona Servizi:</p>
          <div v-for="service in services" :key="service.id" class="form-check">
            <input type="checkbox" :id="'service-' + service.id" class="form-check-input"
              v-model="store.selectedServices" :value="service.id">
            <label :for="'service-' + service.id" class="form-check-label">{{ service.name }}</label>
          </div>
        </div>
        <div class="d-grid gap-2">
          <button type="button" class="btn btn-primary" @click="applyFilters" data-bs-dismiss="offcanvas">Applica
            filtri</button>
          <button type="button" class="btn btn-danger" @click="resetFilters">Reset filtri</button>
        </div>
      </form>
    </div>
  </div>
</template>



<style lang="scss">
.ms_Btn {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: transparent;
  border-radius: 7px;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background-color: #0b1537;
    color: #fff;
  }
}

.btn-transparent {
  background-color: transparent;
  /* Sfondo trasparente */
  border-color: transparent;
  /* Bordo trasparente */
  color: inherit;
  /* Colore del testo ereditato */
}

.btn-transparent:hover {
  background-color: rgba(0, 123, 255, 0.1);
  /* Colore di sfondo al passaggio del mouse */
  border-color: rgba(0, 123, 255, 0.1);
  /* Colore del bordo al passaggio del mouse */
}

input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: #ddd;
  outline: none;
  opacity: 0.7;
  transition: opacity .2s;
}

input[type="range"]:hover {
  opacity: 1;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #007bff;
  cursor: pointer;
  border-radius: 50%;
}

input[type="range"]::-moz-range-thumb {
  width: 5px;
  height: 5px;
  background: #007bff;
  cursor: pointer;

}
</style>

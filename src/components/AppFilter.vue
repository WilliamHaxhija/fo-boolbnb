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
  <!-- Bottone per dispositivi mobili -->
  <button class="btn btn-transparent d-block d-md-none p-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
    <i class="fa-solid fa-gear"></i>
  </button>

  <!-- Bottone per desktop e tablet -->
  <button class="btn btn-primary d-none d-md-block p-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
    Filtri
  </button>

  <div class="offcanvas offcanvas-start rounded-4 my-3" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="staticBackdropLabel">Filtra</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body p-2">
      <form class="rounded-4">
        <div class="mb-3">
          <label class="form-label">Numero di stanze</label>
          <div class="btn-group" role="group" aria-label="Numero di stanze">
            <button type="button" class="btn btn-outline-primary" 
                    :class="{'active': store.numberOfRooms === 0}"
                    @click="store.numberOfRooms = 0">
              Qualsiasi
            </button>
            <button type="button" class="btn btn-outline-primary" 
                    v-for="n in 8" :key="'rooms-' + n" 
                    :class="{'active': store.numberOfRooms === n}"
                    @click="store.numberOfRooms = n">
              {{ n }}
            </button>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Numero di letti</label>
          <div class="btn-group" role="group" aria-label="Numero di letti">
            <button type="button" class="btn btn-outline-primary" 
                    :class="{'active': store.numberOfBeds === 0}"
                    @click="store.numberOfBeds = 0">
              Qualsiasi
            </button>
            <button type="button" class="btn btn-outline-primary" 
                    v-for="n in 8" :key="'beds-' + n" 
                    :class="{'active': store.numberOfBeds === n}"
                    @click="store.numberOfBeds = n">
              {{ n }}
            </button>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Numero di bagni</label>
          <div class="btn-group" role="group" aria-label="Numero di bagni">
            <button type="button" class="btn btn-outline-primary" 
                    :class="{'active': store.numberOfBathrooms === 0}"
                    @click="store.numberOfBathrooms = 0">
              Qualsiasi
            </button>
            <button type="button" class="btn btn-outline-primary" 
                    v-for="n in 8" :key="'bathrooms-' + n" 
                    :class="{'active': store.numberOfBathrooms === n}"
                    @click="store.numberOfBathrooms = n">
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
          <input id="userRadius" type="range" class="form-range mb-4" v-model="store.userRadius" min="0" max="100" step="1">
          <div>{{ store.userRadius }} km</div>
        </div>
        <div class="mb-3">
          <p class="mb-1">Seleziona Servizi:</p>
          <div v-for="service in services" :key="service.id" class="form-check">
            <input type="checkbox" :id="'service-' + service.id" class="form-check-input" v-model="store.selectedServices" :value="service.id">
            <label :for="'service-' + service.id" class="form-check-label">{{ service.name }}</label>
          </div>
        </div>
        <div class="d-grid gap-2">
          <button type="button" class="btn btn-primary" @click="applyFilters" data-bs-dismiss="offcanvas">Applica filtri</button>
          <button type="button" class="btn btn-danger" @click="resetFilters">Reset filtri</button>
        </div>
      </form>
    </div>
  </div>
</template>



<style lang="scss">
.btn-transparent {
  background-color: transparent; /* Sfondo trasparente */
  border-color: transparent; /* Bordo trasparente */
  color: inherit; /* Colore del testo ereditato */
}

.btn-transparent:hover {
  background-color: rgba(0, 123, 255, 0.1); /* Colore di sfondo al passaggio del mouse */
  border-color: rgba(0, 123, 255, 0.1); /* Colore del bordo al passaggio del mouse */
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


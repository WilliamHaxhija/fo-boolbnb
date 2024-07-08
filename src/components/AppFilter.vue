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
  <button class="btn btn-primary mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
    Filtra appartamenti
  </button>
  <div class="offcanvas ms-offcanvas-body offcanvas-start rounded-4 my-3" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="staticBackdropLabel">Filtra</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body ms-offcanvas-body p-4">
      <form class="bg-white p-1 rounded-4 shadow-sm ms-width">
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
          <input id="userRadius" type="number" class="form-control" v-model="store.userRadius">
        </div>
        <div class="mb-3">
          <p class="mb-1">Seleziona Servizi:</p>
          <div v-for="service in services" :key="service.id" class="form-check">
            <input type="checkbox" :id="'service-' + service.id" class="form-check-input" v-model="store.selectedServices" :value="service.id">
            <label :for="'service-' + service.id" class="form-check-label">{{ service.name }}</label>
          </div>
        </div>
        <div class="d-grid gap-2">
          <button type="button" class="btn btn-primary" @click="applyFilters">Applica filtri</button>
          <button type="button" class="btn btn-secondary" @click="resetFilters">Reset filtri</button>
        </div>
      </form>
    </div>
  </div>
</template>




<style lang="scss">
.ms-offcanvas-body{
  width: 500px !important; 
}
.ms-width{
  width: 400px;
}


</style>
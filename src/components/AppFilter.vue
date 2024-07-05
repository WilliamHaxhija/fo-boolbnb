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
    // Funzione per recuperare i servizi dall'API con gestione degli errori
    getServicesFromApi() {
      let apiServicesUrl = `${store.apiBaseUrl}/api/services`;
      axios.get(apiServicesUrl).then(response => {
        this.services = response.data;
      }).catch(error => {
        console.error('Errore nel recupero dei servizi:', error);
      });
    }
  },
  mounted() {
    // Richiamo della funzione per recuperare i servizi all'inizializzazione del componente
    this.getServicesFromApi();
  }
};
</script>


<template>
  <button class="btn btn-primary mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop"
     aria-controls="staticBackdrop">
  Filtra appartamenti
  </button>
  <div class="offcanvas offcanvas-start rounded-4 my-3" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop"
     aria-labelledby="staticBackdropLabel">
     <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="staticBackdropLabel">Ecco i nostri servizi</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
     </div>
     <div class="offcanvas-body">
        <div>
           <form>
              <ul>
                <li>
                  <label for="numberOfRooms">Numero di stanze</label>
                  <input id="numberOfRooms" type="number" class="small-input" v-model="store.numberOfRooms">
                </li>
                <li>
                  <label for="numberOfBeds">Numero di letti</label>
                  <input id="numberOfBeds" type="number" class="small-input" v-model="store.numberOfBeds">
                </li>
                <li>
                  <label for="numberOfBathrooms">Numero di bagni</label>
                  <input id="numberOfBathrooms" type="number" class="small-input" v-model="store.numberOfBathrooms">
                </li>
                <li class="d-flex align-items-center" v-for="service in services" :key="service.id">
                  <input type="checkbox" :id="'service-' + service.id" class="checkbox-input" v-model="store.selectedServices" :value="service.id">
                  <label :for="'service-' + service.id" class="ms-2">{{ service.name }}</label>
                </li>
                 
              </ul>
           </form>
           <button class="btn btn-primary mt-3" @click="$emit('advancedSearch')">Applica filtri</button>
           <button class="btn btn-secondary mt-3 close-filter" @click="$emit('resetFilters')">Rest
           filtri</button>
        </div>
     </div>
  </div>
</template>

<style lang="scss"></style>
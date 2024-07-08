<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { store } from '../store';

export default {
    name: 'AppMap',
    props: {
        apartmentInfo: Object
    },
    data() {
        return {
            store,
            map: null
        };
    },
    // Watcher che prima di richiamare si assicura che le coordinate non siamo null
    watch: {
        apartmentInfo(newVal) {
            if (newVal && newVal.lat && newVal.long) {
                this.getMapApi();
            }
        }
    },
    methods: {
        // Funzione che richiama la mappa
        getMapApi() {
            const apiKey = store.tomTomQueryParams.tomTomKey;
            const apartment = this.apartmentInfo
            const map = L.map('map').setView([apartment.lat, apartment.long], 14);

            L.tileLayer(`https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${apiKey}`, {
                attribution: '&copy; <a href="https://www.tomtom.com">TomTom</a> contributors'
            }).addTo(map);

            L.marker([apartment.lat, apartment.long]).addTo(map)
        }
    }
};
</script>

<template>
    <div class="container d-flex justify-content-center">
        <div class="card mb-5">
            <div  id="map">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card{
    width: 100%;
}
#map {
    height: 31.25rem;
    
}
</style>
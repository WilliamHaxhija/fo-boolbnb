<script>
import { store } from '../store';

export default {
    name: 'ApartmentCard',
    props: {
        apartmentInfo: Object
    },
    data() {
        return {
            store
        };
    },
    methods: {
        printImage(imageUrl) {
            return `${store.apiBaseUrl}/storage/${imageUrl}`;
        },
        getServiceIcon(serviceName) {
            switch (serviceName) {
                case 'WiFi':
                    return 'fa-wifi';
                case 'Posto Macchina':
                    return 'fa-car';
                case 'Piscina':
                    return 'fa-swimmer';
                case 'Portineria':
                    return 'fa-info-circle';
                case 'Sauna':
                    return 'fa-hot-tub';
                case 'Vista Mare':
                    return 'fa-water';
                case 'Lavatrice':
                    return 'fa-jug-detergent';
                case 'Animali':
                    return 'fa-paw';
                case 'Cucina':
                    return 'fa-utensils';
                case 'Lavastoviglie':
                    return 'fa-utensils';
                default:
                    return 'fa-question-circle'; // icona di default
            }
        }
    }
}
</script>

<template>
    <div class="col d-flex justify-content-center g-3">
        <div class="card">
            <img v-if="apartmentInfo.image" :src="printImage(apartmentInfo.image)" class="card-img-top"
                :alt="apartmentInfo.slug">
            <div class="card-body">
                <h5 class="card-title">{{ apartmentInfo.title }}</h5>
                <p class="card-text">{{ apartmentInfo.address }}</p>
                <p v-if="$route.name === 'single-apartment'" class="card-text">{{ apartmentInfo.description }}</p>
                <p v-if="$route.name === 'results'" class="card-text">A {{ Math.round(apartmentInfo.distance)
                    }} km dal punto cercato
                </p>
                <p v-if="$route.name === 'single-apartment'" class="card-text">Numero di stanze: {{
                    apartmentInfo.number_of_rooms }}</p>
                <p v-if="$route.name === 'single-apartment'" class="card-text">Numero di letti: {{
                    apartmentInfo.number_of_beds }}</p>
                <p v-if="$route.name === 'single-apartment'" class="card-text">Numero di bagni: {{
                    apartmentInfo.number_of_bathrooms }}
                </p>
                <p v-if="$route.name === 'single-apartment'" class="card-text">Metri quadri: {{
                    apartmentInfo.square_meters }}</p>
                <router-link v-if="$route.name === 'results'"
                    :to="{ name: 'single-apartment', params: { slug: apartmentInfo.slug } }">Info</router-link>
                <button v-if="$route.name === 'single-apartment'" class="btn btn-primary" type="button"
                    data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"
                    aria-controls="offcanvasWithBothOptions">Contatta l'host</button>
                <MessageForm></MessageForm>
                <p class="card-text">Distanza: {{ Math.round(apartmentInfo.distance) }}km</p>
                <p class="card-text">Bagni: {{ apartmentInfo.number_of_bathrooms }}</p>
                <p class="card-text">Mq:{{ apartmentInfo.square_meters }}</p>
                <!-- scorriamo l'array dei servizi e li stampiamo in pagina  -->
                <p class="card-text">
                <ul class="list-unstyled">
                    <li v-for="service in apartmentInfo.services" :key="service.id">
                        <i :class="['fas', getServiceIcon(service.name)]"></i>
                        {{ service.name }}
                    </li>
                </ul>
                </p>

                <router-link :to="{ name: 'single-apartment', params: { slug: apartmentInfo.slug } }">Info</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
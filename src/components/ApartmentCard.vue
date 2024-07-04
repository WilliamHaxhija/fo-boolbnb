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
        }
    }
}
</script>

<template>
    <div class="col d-flex justify-content-center g-3">
        <div class="card" style="width: 18rem;">
            <img v-if="apartmentInfo.image" :src="printImage(apartmentInfo.image)" class="card-img-top"
                :alt="apartmentInfo.slug">
            <div class="card-body">
                <h5 class="card-title">{{ apartmentInfo.title }}</h5>
                <p class="card-text">{{ apartmentInfo.address }}</p>
                <p v-if="$route.name === 'single-apartment'" class="card-text">{{ apartmentInfo.description }}</p>
                <p v-if="$route.name === 'results'" class="card-text">Distanza: {{ Math.round(apartmentInfo.distance)
                    }}km
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
                <a href="" v-if="$route.name === 'single-apartment'">Contatta l'host</a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
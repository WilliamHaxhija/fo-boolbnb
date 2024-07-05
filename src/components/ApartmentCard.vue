<script>
import { store } from '../store';
import MessageForm from './MessageForm.vue';

export default {
    name: 'ApartmentCard',
    components: {
        MessageForm
    },
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
            cosnso
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
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
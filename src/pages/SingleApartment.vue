<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'SingleApartment',
    data() {
        return {
            store,
            apartment: null
        }
    },
    methods: {
        getSingleApartment() {
            axios.get(`${store.apiBaseUrl}/Api/apartments/${this.$route.params.slug}`)
            .then((response) => {
                this.apartment = response.data.apartment;
                console.log(this.apartment);
            });
            
        },
        printImage(imageUrl) {
            return `${store.apiBaseUrl}/storage/${imageUrl}`;
        }
    },
     mounted() {
        this.getSingleApartment()
     }
}
</script>

<template>
    <div class="col d-flex justify-content-center g-3">
        <!-- <div class="card" style="width: 18rem;">
            <div v-if="apartment.image">
                <img :src="printImage(apartment.image)" class="card-img-top"
                :alt="apartment.slug">
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ apartment.title }}</h5>
                <p class="card-text">{{ apartment.address }}</p>
                <p class="card-text">Distanza: {{ Math.round(apartment.distance) }}km</p>
                <p class="card-text">Descrizione: {{ apartment.description }}</p>
            </div>
        </div> -->
    </div>
</template>

<style lang="scss"></style>
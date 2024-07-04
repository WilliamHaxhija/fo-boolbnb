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
                <p class="card-text">Distanza: {{ Math.round(apartmentInfo.distance) }}km</p>
                <router-link :to="{ name: 'single-apartment', params: { slug: apartmentInfo.slug } }">Info</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
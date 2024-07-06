<script>
import axios from 'axios';
import { store } from '../store';
import ApartmentCard from '../components/ApartmentCard.vue';
import AppMap from '../components/AppMap.vue';

export default {
    name: 'SingleApartment',
    components: {
        ApartmentCard,
        AppMap
    },
    data() {
        return {
            store
        }
    },
    methods: {
        getSingleApartment() {
            axios.get(`${store.apiBaseUrl}/api/apartments/${this.$route.params.slug}`)
                .then((response) => {
                    store.apartment = response.data.apartment;
                });
        }
    },
    mounted() {
        this.getSingleApartment()
    }
}
</script>

<template>
    <section class="container d-flex">
        <!-- foto e descrizione -->
        <div class="apartment col-6">

            <ApartmentCard v-if="store.apartment" :key="store.apartment.id" :apartmentInfo="store.apartment">
            </ApartmentCard>

        </div>
         <!-- mappa -->
        <div class="map pt-4 col-6">
            <AppMap :apartmentInfo="store.apartment"></AppMap>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>
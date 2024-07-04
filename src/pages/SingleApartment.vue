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
    <section class="apartment">
        <div class="container">
            <ApartmentCard v-if="store.apartment" :key="store.apartment.id" :apartmentInfo="store.apartment"></ApartmentCard>
            <div v-else>Ciao</div>
        </div>
    </section>
    <section class="map pt-4">
        <AppMap :apartmentInfo="store.apartment"></AppMap>
    </section>
</template>

<style scoped lang="scss"></style>
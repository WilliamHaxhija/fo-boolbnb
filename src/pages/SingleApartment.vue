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
            axios.get(`${store.apiBaseUrl}/api/apartments/${this.$route.params.slug}`)
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
    <section class="apartment">
        <div class="container">
            <ApartmentCard v-if="store.apartment" :key="store.apartment.id" :apartmentInfo="store.apartment">
            </ApartmentCard>
        </div>
    </section>
    <section class="map pt-4">
        <AppMap :apartmentInfo="store.apartment"></AppMap>
    </section>
</template>

<style scoped lang="scss"></style>
<script>
import axios from 'axios';
import { store } from '../store';
import ApartmentCard from '../components/ApartmentCard.vue';

export default {
    name: 'SingleApartment',
    components: {
        ApartmentCard
    },
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
        }
    },
    mounted() {
        this.getSingleApartment()
    }
}
</script>

<template>
    <ApartmentCard v-if="apartment" :key="apartment.id" :apartmentInfo="apartment"></ApartmentCard>
    <div v-else>Ciao</div>
</template>

<style scoped lang="scss"></style>
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
            store,
            ipAddress: null
        }
    },
    methods: {
        async getSingleApartment() {
            try {
                const response = await axios.get(`${store.apiBaseUrl}/api/apartments/${this.$route.params.slug}`);
                store.apartment = response.data.apartment;
            } catch (error) {
                console.error('Errore durante il recupero dell\'appartamento:', error);
            }
        },
        async getIpAddressFromApi() {
            try {
                const response = await axios.get('https://api.ipify.org/?format=json');
                this.ipAddress = response.data.ip;
            } catch (error) {
                console.error('Si è verificato un errore:', error);
            }
        },
        async sendIpAddressToBackend() {
            try {
                if (this.ipAddress && store.apartment && store.apartment.id) {
                    const response = await axios.post(`${store.apiBaseUrl}/api/visits`, {
                        ip_address: this.ipAddress,
                        apartment_id: store.apartment.id
                    });
                }
            } catch (error) {
                console.error('Errore:', error);
            }
        }
    },
    async mounted() {
        await this.getSingleApartment();
        await this.getIpAddressFromApi();
        this.sendIpAddressToBackend();
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

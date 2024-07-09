<script>
import axios from 'axios';
import { store } from '../store';
import ShowApartment from '../components/ShowApartment.vue';
import AppMap from '../components/AppMap.vue';

export default {
    name: 'SingleApartment',
    components: {
        ShowApartment,
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
    <section class="container d-flex flex-wrap flex-column">
        <!-- foto e descrizione -->
        <div class="">

            <ShowApartment v-if="store.apartment" :key="store.apartment.id" :apartmentInfo="store.apartment">
            </ShowApartment>

        </div>
        <!-- mappa -->

        <div class="pt-4">
            <AppMap :apartmentInfo="store.apartment"></AppMap>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>

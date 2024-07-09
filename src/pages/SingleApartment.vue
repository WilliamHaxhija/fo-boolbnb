<script>
import axios from 'axios';
import { store } from '../store';
import ShowApartment from '../components/ShowApartment.vue';


export default {
    name: 'SingleApartment',
    components: {
        ShowApartment,

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
    <section class="container d-flex flex-wrap flex-column">
        <!-- foto e descrizione -->
        <div class="">

            <ShowApartment v-if="store.apartment" :key="store.apartment.id" :apartmentInfo="store.apartment">
            </ShowApartment>

        </div>



    </section>
</template>

<style scoped lang="scss"></style>
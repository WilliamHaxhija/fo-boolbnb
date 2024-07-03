<script>
import axios from 'axios';
import { store } from '../store';
import AppSearch from '../components/AppSearch.vue';
export default {
    name: 'AppHero',
    components: {
        AppSearch
    },
    data() {
        return {
            store,
            radius: 20
        };
    },
    methods: {
        getSuggestionsAddressFromApi() {
            let apiTomTomSearch = `https://api.tomtom.com/search/2/search/${store.userInputSearch}.json?countrySet=${store.tomTomQueryParams.countrySet}&key=${store.tomTomQueryParams.tomTomKey}`
            if (store.userInputSearch !== '') {
                axios.get(apiTomTomSearch)
                    .then((response) => {
                        store.suggestedAddresses = response.data.results;
                    });
            }
        },
        getApartmentsFromApi() {
            let apiApartmentsSearch = `http://192.168.1.155:8000/api/apartments`
            axios.get(apiApartmentsSearch, {
                params: {
                    latitude: store.userSelection.position.lat,
                    longitude: store.userSelection.position.lon,
                    radius: this.radius
                }
            })
                .then((response) => {
                    store.searchedApartments = response.data.apartments;
                });
        }
    }
}
</script>

<template>
    <section class="py-4">
        <div class="container">
            <div class="row row-cols-1 row-cols-md-2">
                <div class="col">
                    <AppSearch @search="getSuggestionsAddressFromApi" @dbResults="getApartmentsFromApi">
                    </AppSearch>
                </div>
                <div class="col">
                    <!-- image -->
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>
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
            let apiApartmentsSearch = `${store.apiBaseUrl}/api/apartments`
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
    <section class="py-4 d-flex align-items-center" :class="$route.name === 'home' ? 'ms_hero' : ''">
        <div class="container">
            <div class="row" :class="$route.name === 'home' ? 'row-cols-1 row-cols-md-2' : ''">
                <div class="col">
                    <AppSearch @search="getSuggestionsAddressFromApi" @dbResults="getApartmentsFromApi">
                    </AppSearch>
                </div>
                <div v-if="$route.name === 'home'" class="col">
                    <!-- image -->
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.ms_hero {
    margin-top: -88px;
    min-height: 700px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(../assets/img/image_hero.webp);
    background-position: center;
}
</style>
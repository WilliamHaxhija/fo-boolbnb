<script>
import axios from 'axios';
import { store } from '../store';
import AppSearch from '../components/AppSearch.vue';
import AppFilter from './AppFilter.vue';
export default {
    name: 'AppHero',
    components: {
        AppSearch,
        AppFilter
    },
    data() {
        return {
            store,
          
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
    }
}
</script>

<template>
    <section class="py-4 d-flex align-items-center" :class="$route.name === 'home' ? 'ms_hero' : ''">
        <div class="container">
            <div class="row" :class="$route.name === 'home' ? 'row-cols-1 row-cols-md-2' : ''">
                <div class="col">
                    <AppFilter ></AppFilter>
                    <AppSearch  @search="getSuggestionsAddressFromApi" @dbResults="store.getApartmentsFromApi">
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
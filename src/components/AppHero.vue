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
            store
        };
    },
    methods: {
        getSuggestionsAddressFromApi() {
            let apiTomTomSearch = `https://api.tomtom.com/search/2/search/${store.userInputSearch}.json?countrySet=${store.queryParams.countrySet}&key=${store.queryParams.tomTomKey}`
            if (store.userInputSearch !== '') {
                axios.get(apiTomTomSearch)
                    .then((response) => {
                        store.suggestedAddresses = response.data.results;
                    });
            }
        }
    }
}
</script>

<template>
    <section class="py-4">
        <div class="container">
            <div class="row">
                <div class="col">
                    <AppSearch @search="getSuggestionsAddressFromApi"></AppSearch>
                </div>
                <div class="col">
                    <!-- image -->
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>
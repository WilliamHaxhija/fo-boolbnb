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
            radius: 20,
            // Città per il carosello
            cities: ['ROMA', 'LONDON', 'NEW YORK', 'TOKYO', 'PARIS', 'AMSTERDAM', 'PECHINO', 'MOSCA', 'MADRID'],
            currentIndex: 0,
            previousIndex: null,
            nextIndex: 1,
            // Fine Città per il carosello

        };
    },
    methods: {
        // Api per chiamata TomTom
        getSuggestionsAddressFromApi() {
            let apiTomTomSearch = `https://api.tomtom.com/search/2/search/${store.userInputSearch}.json?countrySet=${store.tomTomQueryParams.countrySet}&key=${store.tomTomQueryParams.tomTomKey}`;
            if (store.userInputSearch !== '') {
                axios.get(apiTomTomSearch)
                    .then((response) => {
                        store.suggestedAddresses = response.data.results;
                    })
                    .catch((error) => {
                        console.error('Errore nella ricerca suggerimenti:', error);
                    });
            }
        },
        // Api per chiamata degli appartamenti nel BO
        getApartmentsFromApi() {
            let params = {
                latitude: store.userSelection.position.lat,
                longitude: store.userSelection.position.lon,
                services: store.selectedServices,
                number_of_rooms: store.numberOfRooms,
                number_of_beds: store.numberOfBeds,
                number_of_bathrooms: store.numberOfBathrooms,
                square_meters: store.selectSquareMeters
            };

            if (store.userRadius !== 0) {
                params.radius = store.userRadius;
            } else {
                params.radius = this.radius; // Utilizza il valore di default 
            }

            let apiApartmentsSearch = `${store.apiBaseUrl}/api/apartments`;
            axios.get(apiApartmentsSearch, { params })
                .then((response) => {
                    store.searchedApartments = response.data.apartments;
                })
                .catch((error) => {
                    console.error('Errore nella richiesta API degli appartamenti:', error);
                });
        },
        // funzione per il tempo del carosello 
        startCityScroll() {
            setInterval(this.showNextCity, 1500);
        },
        // funzione per il carosello 
        showNextCity() {
            this.previousIndex = this.currentIndex;
            this.currentIndex = (this.currentIndex + 1) % this.cities.length;
            this.nextIndex = (this.currentIndex + 1) % this.cities.length;
        },

    },
    mounted() {
        // Richiama all'avvio la funzione del carosello
        this.startCityScroll();
    },
}
</script>

<template>

    <section class="py-4 d-flex align-items-center" :class="$route.name === 'home' ? 'ms_hero' : ''">
        <div class="container">
            <div class="row" :class="$route.name === 'home' ? 'row-cols-1 row-cols-md-2' : ''">
                <div class="col-6 py-5">
                    <!-- <AppFilter @advancedSearch="getApartmentsFromApi" @resetFilters="getApartmentsFromApi"></AppFilter> -->
                    <AppSearch @search="getSuggestionsAddressFromApi" @dbResults="getApartmentsFromApi">
                    </AppSearch>
                </div>
                <div v-if="$route.name === 'home'" class="col-6">
                    <div class="cities-container fs-1 fw-bolder d-flex align-items-center">
                        <div v-for="(city, index) in cities" :key="index"
                            :class="['city', { show: index === currentIndex, hide: index === previousIndex, next: index === nextIndex }]">
                            {{ city }}
                        </div>
                    </div>
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

.cities-container {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    color: white;

    .city {
        position: absolute;
        width: 100%;
        text-align: center;
        font-size: 24px;
        line-height: 50px;
        opacity: 0;
        transition: all 0.5s ease;
        font-size: 80px;
    }

    .city.show {
        opacity: 1;
        transform: translateY(0);
    }

    .city.hide {
        opacity: 0;
        transform: translateY(-50px);
    }

    .city.next {
        transform: translateY(50px);
    }
}
</style>
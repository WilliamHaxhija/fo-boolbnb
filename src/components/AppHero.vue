<script>
// Importa le dipendenze necessarie
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
    props: {
        // prop per mostrare il componente app filter 
        showFilter: {
            type: Boolean,
            default: false // impostiamo di default false per non mostrarlo nella home
        }
    },
    data() {
        return {
            store,
            radius: 20,
            // Elenco delle città per il carosello
            cities: ['ROMA', 'LONDON', 'NEW YORK', 'TOKYO', 'PARIS', 'PECHINO', 'MOSCA', 'MADRID'],
            currentIndex: 0,
            previousIndex: null,
            nextIndex: 1,
        };
    },
    methods: {
        // Funzione per ottenere suggerimenti di indirizzo dall'API TomTom
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
        // Funzione per ottenere appartamenti dall'API
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
                params.radius = this.radius; // Utilizza il valore di default se non specificato
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
        // Inizia il carosello delle città
        startCityScroll() {
            setInterval(this.showNextCity, 1500);
        },
        // Mostra la prossima città nel carosello
        showNextCity() {
            this.previousIndex = this.currentIndex;
            this.currentIndex = (this.currentIndex + 1) % this.cities.length;
            this.nextIndex = (this.currentIndex + 1) % this.cities.length;
        },
    },
    mounted() {
        // Avvia il carosello delle città al montaggio del componente
        this.startCityScroll();
    },
}
</script>

<template>
    <section class="py-4 d-flex align-items-center position-relative" :class="$route.name === 'home' ? 'ms_hero' : ''">
        <!-- Overlay nero trasparente -->
        <div class="overlay"></div>
        <div class="container position-relative">
            <div class="row" :class="$route.name === 'home' ? 'md-display-block' : ''">
                <div class="col-lg-6 col-12 order-2 order-lg-1">
                    <!-- Utilizza la prop showFilter per controllare la visibilità di AppFilter -->
                    <AppFilter v-if="showFilter" @advancedSearch="getApartmentsFromApi"
                        @resetFilters="getApartmentsFromApi"></AppFilter>
                    <AppSearch @search="getSuggestionsAddressFromApi" @dbResults="getApartmentsFromApi"></AppSearch>
                </div>
                <div v-if="$route.name === 'home'" class="col-lg-6 col-12 order-1 order-lg-2">
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
    background-image: url('../assets/img/image_hero.webp');
    background-position: center;
    position: relative; /* Assicura che il posizionamento assoluto dell'overlay sia relativo a questa sezione */

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.059));
        /* Cambia i valori di opacità e colori secondo necessità */
        z-index: 1;
    }

    .container {
        position: relative;
        z-index: 2;
    }
}

.cities-container {
    position: relative;
    overflow: hidden;
    height: 100px;
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

<script>
import axios from 'axios';
import { store } from '../store';
import AppSearch from '../components/AppSearch.vue';
import AppFilter from './AppFilter.vue';
import AppSponsorships from './AppSponsorships.vue';

export default {
    name: 'AppHero',
    components: {
        AppSearch,
        AppFilter,
        AppSponsorships
    },
    data() {
        return {
            store,
            radius: 20,
            cities: ['ROMA', 'LONDRA', 'NEW YORK', 'TOKYO', 'PARIGI', 'PECHINO', 'MOSCA', 'MADRID'],
            currentIndex: 0,
            previousIndex: null,
            nextIndex: 1,
            windowWidth: window.innerWidth, // Aggiunta per tenere traccia della larghezza della finestra
            sponsoredApartments: {}
        };
    },
    computed: {
        sectionClasses() {
            return this.windowWidth >= 992 ? 'ms-radius' : 'rounded-0'; // Restituisce 'ms-radius' se la larghezza della finestra è maggiore o uguale a 992px, altrimenti 'rounded-0'
        },
        overlayClasses() {
            return {
                'ms-radius': this.windowWidth >= 992 // Aggiunge 'ms-radius' all'overlay solo se la larghezza della finestra è maggiore o uguale a 768px
            };
        },
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize); // Rimuove il listener per l'evento 'resize' della finestra
    },
    methods: {
        handleResize() {
            this.windowWidth = window.innerWidth; // Aggiorna 'windowWidth' quando la finestra viene ridimensionata
        },
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
                params.radius = this.radius;
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
        startCityScroll() {
            setInterval(this.showNextCity, 1500);
        },
        showNextCity() {
            this.previousIndex = this.currentIndex;
            this.currentIndex = (this.currentIndex + 1) % this.cities.length;
            this.nextIndex = (this.currentIndex + 1) % this.cities.length;
        },
        getSponsoredApartmentsFromApi() {
            let sponsoredApartmentsUrl = `${store.apiBaseUrl}/api/apartments-sponsorships`;
            axios.get(sponsoredApartmentsUrl)
            .then((response) => {
                this.sponsoredApartments = response.data;
                console.log(this.sponsoredApartments);
            });
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize); // Aggiunge un listener per l'evento 'resize' della finestra
        this.startCityScroll();
        this.getSponsoredApartmentsFromApi();
    }
}
</script>

<template>
    <section :class="[sectionClasses, $route.name === 'home' ? 'ms_hero' : '']" class="py-4 d-flex align-items-center position-relative">
        <!-- Overlay nero trasparente -->
        <div :class="overlayClasses" class="overlay"></div>
        <div class="container position-relative">
            <div class="row" :class="$route.name === 'home' ? 'md-display-block' : ''">
                <div class="col-lg-6 col-12 order-2 order-lg-1">
                    <div v-if="$route.name === 'home'">
                        <AppSearch @search="getSuggestionsAddressFromApi" @dbResults="getApartmentsFromApi"></AppSearch>
                    </div>
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
    <!-- componente card sponsorizzazioni -->
    <div v-if="$route.name === 'home'">
        <AppSponsorships></AppSponsorships>
    </div>
</template>

<style scoped lang="scss">
.ms_hero {
    margin-top: -88px;
    min-height: 700px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('../assets/img/image_hero.webp');
    background-position: center;
    position: relative;
    box-shadow: 0px 11px 31px -10px #000000;
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.059));
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

.ms-radius {
    border-radius: 0px 0px 0px 1700px;
}

.rounded-0 {
    border-radius: 0 !important;
}
</style>
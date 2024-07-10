<script>
import axios from 'axios';
import { store } from '../store';
import AppSearch from '../components/AppSearch.vue';
import AppFilter from './AppFilter.vue';

export default {
    name: 'AppHeader',

    components: {
        AppSearch,
        AppFilter
    },
    data() {

        return {
            scrolled: false,
            store,
            radius: 20,
        };
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.scrolled = window.scrollY > 50;
        },
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
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
}
</script>

<template>
    <header :class="{ 'header-transparent': !scrolled, 'header-white': scrolled }" class="position-sticky top-0 z-3 mb-1">
        <div class="container-lg">
            <!-- Navbar -->
            <nav class="navbar navbar-light p-1 row align-items-center">
                <!-- Container wrapper -->

                <!-- Home Logo -->
                <div class="col-auto d-none d-md-block">
                    <router-link :to="{ name: 'home' }" class="navbar-brand mt-lg-0">
                        <img src="../assets/img/logo_bnb.png" height="70" alt="MDB Logo" loading="lazy" />
                    </router-link>
                </div>

                <!-- Logo per mobile quando siamo nella home-->
                <div v-if="$route.name === 'home'" class="col-auto d-block d-md-none">
                    <router-link :to="{ name: 'home' }" class="navbar-brand mt-lg-0">
                        <img src="../assets/img/logo_bnb.png" height="70" alt="MDB Logo" loading="lazy" />
                    </router-link>
                </div>

                <!-- Freccia indietro per mobile quando siamo in altre rotte -->
                <router-link v-if="$route.name === 'results'" :to="{ name: 'home' }"
                    class="col-auto navbar-brand mt-lg-0 d-block d-md-none">
                    <h5 class="text-small text-black"><i class="fa-solid fa-arrow-left"></i></h5>
                </router-link>
                <router-link v-else-if="$route.name === 'single-apartment'" :to="{ name: 'results' }"
                    class="col-auto navbar-brand mt-lg-0 d-block d-md-none">
                    <h5 class="text-small text-black"><i class="fa-solid fa-arrow-left"></i></h5>
                </router-link>

                <!-- componente searchbar -->
                <div v-if="$route.name === 'results'" class="col">
                    <AppSearch @search="getSuggestionsAddressFromApi" @dbResults="getApartmentsFromApi"></AppSearch>
                </div>

                <!-- componente filtro -->
                <div class="col-auto">
                    <AppFilter v-if="$route.name === 'results'" @advancedSearch="getApartmentsFromApi"></AppFilter>
                </div>

                <!-- admin log -->
                <div class="col-auto dropdown">
                    <!--Drop down For Login -->
                    <div class="dropdown d-flex">
                        <button class="ms_Btn mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="ms_svgContainer">
                                <div fill="white" height="1.6em">
                                    <i class="fa-solid fa-user text-white"></i>
                                </div>
                            </span>
                            <span class="ms_BG"></span>
                        </button>
                        <ul class="dropdown-menu ms-bg-drop-down px-2">
                            <li class=""><a class="text-white text-decoration-none"
                                    href="http://127.0.0.1:8000/login">Login</a></li>
                            <li><a class="text-white text-decoration-none"
                                    href="http://127.0.0.1:8000/register">Registrati</a></li>
                        </ul>
                    </div>
                </div>

            </nav>
        </div>
    </header>
</template>

<style scoped lang="scss">
// .ms-container{
//     width: 800px;
//     margin: 0 auto;
// }
.header-transparent {
    background-color: transparent;
    transition: background-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
    box-shadow: none;
}

.header-white {
    background-color: white;
    transition: background-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
    box-shadow: 0px 11px 31px -10px #000000;
}

.ms_Btn {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    position: relative;
    z-index: 1;
    border-radius: 7px;
    cursor: pointer;
    transition: all .3s;
}

.ms_svgContainer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    backdrop-filter: blur(0px);
    letter-spacing: 0.8px;
    border-radius: 10px;
    transition: all .3s;
}

.ms_BG {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background: #0b1537;
    z-index: -1;
    border-radius: 10px;
    pointer-events: none;
    transition: all .3s;
}

.ms_Btn:hover .ms_svgContainer {
    background-color: rgba(156, 156, 156, 0.466);
    backdrop-filter: blur(4px);
}

.ms_Btn:hover .ms_BG {
    transform: rotate(35deg);
    transform-origin: bottom;
}

.ms-bg-drop-down {
    background: #0b1537;
}

@media (max-width: 767px) {
    .navbar .container {
        flex-wrap: wrap;
    }

    .navbar-brand {
        margin-right: auto;
        margin-left: 0;
    }

    .navbar-toggler {
        display: block;
    }

    .navbar-collapse {
        background-color: white;
        /* Imposta il colore di sfondo del menu a bianco */
        position: absolute;
        /* Posiziona il menu sopra il contenuto */
        top: 100%;
        /* Posiziona il menu sotto la barra di navigazione */
        width: 100%;
        /* Occupa l'intera larghezza */
        left: 0;
        /* Allinea a sinistra */
        box-shadow: 0px 11px 31px -10px #000000;
        /* Aggiunge ombra */
        z-index: 1000;
        /* Assicura che il menu sia sopra gli altri contenuti */
    }

    .navbar-collapse .navbar-nav {
        flex-direction: column;
        /* Imposta la direzione della flessione a colonna */
    }
}
</style>

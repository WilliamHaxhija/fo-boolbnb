<script>
import { store } from '../store';
import MessageForm from './MessageForm.vue';
import AppMap from './AppMap.vue';

export default {
    name: 'ApartmentCard',
    components: {
        MessageForm,
        AppMap
    },
    props: {
        apartmentInfo: Object
    },
    data() {
        return {
            store
        };
    },
    methods: {
        printImage(imageUrl) {
            return `${store.apiBaseUrl}/storage/${imageUrl}`;
        },
        getServiceIcon(serviceName) {
            switch (serviceName) {
                case 'WiFi':
                    return 'fa-wifi';
                case 'Posto Macchina':
                    return 'fa-car';
                case 'Piscina':
                    return 'fa-swimmer';
                case 'Portineria':
                    return 'fa-info-circle';
                case 'Sauna':
                    return 'fa-hot-tub';
                case 'Vista Mare':
                    return 'fa-water';
                case 'Lavatrice':
                    return 'fa-jug-detergent';
                case 'Animali':
                    return 'fa-paw';
                case 'Cucina':
                    return 'fa-utensils';
                case 'Lavastoviglie':
                    return 'fa-tshirt';
                default:
                    return 'fa-question-circle'; // icona di default
            }
        }
    }
}
</script>

<template>
    <h5 class="fs-2 fw-semibold mt-5">{{ apartmentInfo.title }}</h5>

    <div class="wrapper">

        <!-- descrizione -->
        <div class="one">
            <template v-if="apartmentInfo.description">
                <p v-if="$route.name === 'single-apartment'" class="p-3 ms-bg-border rounded-4 ms-text-justify">
                    {{ apartmentInfo.description }}</p>
            </template>
            <template v-else>
                <p class="p-3 ms-bg-border rounded-4 ms-text-justify">
                    Nessuna descrizione</p>
            </template>
        </div>

        <!-- Immagine -->
        <div class="two">
            <!-- immagine -->
            <div v-if="apartmentInfo.image" class="rounded-4 overflow-hidden">
                <img :src="printImage(apartmentInfo.image)" class="card-img-top" :alt="apartmentInfo.slug">
            </div>
            <div class="rounded-4 overflow-hidden" v-else>
                <img src="../assets/img/image_hero.webp" class="card-img-top" alt="img-placeholder">
            </div>
        </div>

        <!-- servizi -->
        <div class="three">

            <p class="fs-4 fw-semibold">{{ apartmentInfo.address }}</p>
            <hr>
            <p v-if="$route.name === 'results'" class="">A {{
                Math.round(apartmentInfo.distance)
                }} km dal punto cercato
            </p>
            <p v-if="$route.name === 'single-apartment'" class="">Numero di stanze: {{
                apartmentInfo.number_of_rooms }}</p>
            <p v-if="$route.name === 'single-apartment'" class="">Numero di letti: {{
                apartmentInfo.number_of_beds }}</p>
            <p v-if="$route.name === 'single-apartment'" class="">Numero di bagni: {{
                apartmentInfo.number_of_bathrooms }}
            </p>
            <p v-if="$route.name === 'single-apartment'" class="">Metri quadri: {{
                apartmentInfo.square_meters }}</p>
            <hr>
            <!-- scorriamo l'array dei servizi e li stampiamo in pagina  -->
            <h5 class="fs-4 fw-semibold">
                Cosa troverai
            </h5>
            <p>
                <template v-if="apartmentInfo.services && apartmentInfo.services.length">
                    <ul class="list-unstyled services-grid d-flex flex-wrap gap-2">
                        <li v-for="service in apartmentInfo.services" :key="service.id">

                            <i :class="['fas', getServiceIcon(service.name)]" class="text-center m-2"></i>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <div>
                        Al momento nessun servizio disponibile
                    </div>
                </template>
            </p>

        </div>

        <!-- mappa -->
        <div class="four">
            <div class="pt-4">
                <AppMap :apartmentInfo="store.apartment"></AppMap>
            </div>
        </div>
    </div>

    <hr>
    <!-- Bottone per Contattare L Host -->
    <button v-if="$route.name === 'single-apartment'" class="btn contact-host-btn" type="button"
        data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
        <i class="fa-solid fa-envelope me-2"></i>
        Contatta l'host</button>

    <MessageForm></MessageForm>
    <hr class=" mb-5">


</template>


<style scoped lang="scss">
.wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    grid-auto-rows: minmax(250px, auto);

    .one {
        grid-column: 1 / 4;
        grid-row: 2 / 3;

        .ms-bg-border {
            border: 4px solid #0b1537c5;
            box-shadow: 0px 9px 18px 0px #00000076;
        }

        .ms-text-justify {
            text-align: justify;
        }

    }

    .two {
        grid-column: 1 / 2;
        grid-row: 1 / 2;

    }

    .three {
        grid-column: 2 / 4;
        grid-row: 1 / 2;
    }

    .four {
        grid-column: 1 / 4;
        grid-row: 3 / 4;
    }
}

.contact-host-btn {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1.2rem;
    font-weight: 500;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease;

}

.contact-host-btn i {
    font-size: 1.5rem;
}

.contact-host-btn:hover {
    background-color: #0b1537fc;
    color: white;
    transform: translateY(-2px);
}



// BUTTON
.button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 30px;
    gap: 15px;
    background-color: #007ACC;
    outline: 3px #007ACC solid;
    outline-offset: -3px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: 400ms;

}

.button .text {
    color: white;
    font-weight: 700;
    font-size: 1em;
    transition: 400ms;
    text-decoration: none;
}



.button:hover {
    background-color: transparent;
}

.button:hover .text {
    color: #007ACC;
}

/* Media query for tablets and below */
@media (max-width: 768px) {
    .wrapper {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, auto);
    }

    .wrapper .one {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
    }

    .wrapper .two {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }

    .wrapper .three {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }

    .wrapper .four {
        grid-column: 1 / 2;
        grid-row: 4 / 5;
    }
}
</style>
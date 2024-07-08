<script>
import { store } from '../store';
import MessageForm from './MessageForm.vue';

export default {
    name: 'ApartmentCard',
    components: {
        MessageForm
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
    <div class="ms_card rounded-4 row align-items-center p-2  ">
        <div class="col-lg-6 col-md-12">
            <h5 class="card-title fw-semibold">{{ apartmentInfo.title }}</h5>
            <div v-if="apartmentInfo.image" class="ms_img_contain rounded-4">
                <img :src="printImage(apartmentInfo.image)" class="ms_img" :alt="apartmentInfo.slug">
            </div>
            <div class="ms_img_contain rounded-4" v-else>
                <img class="ms_img" src="../assets/img/image_hero.webp" alt="">
            </div>
        </div>


        <div class="card-body col-lg-6 col-md-12 mt-3">
            <p class="card-text fw-semibold">{{ apartmentInfo.address }}</p>
            <p v-if="$route.name === 'single-apartment'" class="card-text text-black ">{{
                apartmentInfo.description }}</p>
            <p v-if="$route.name === 'results'" class="card-text text-body-tertiary fw-medium">A {{
                Math.round(apartmentInfo.distance)
            }} km dal punto cercato
            </p>
            <p v-if="$route.name === 'single-apartment'" class="card-text">Numero di stanze: {{
                apartmentInfo.number_of_rooms }}</p>
            <p v-if="$route.name === 'single-apartment'" class="card-text">Numero di letti: {{
                apartmentInfo.number_of_beds }}</p>
            <p v-if="$route.name === 'single-apartment'" class="card-text">Numero di bagni: {{
                apartmentInfo.number_of_bathrooms }}
            </p>
            <p v-if="$route.name === 'single-apartment'" class="card-text">Metri quadri: {{
                apartmentInfo.square_meters }}</p>

            <!-- scorriamo l'array dei servizi e li stampiamo in pagina  -->
            <p class="card-text">
                <template v-if="apartmentInfo.services && apartmentInfo.services.length">
                    <ul class="list-unstyled services-grid">
                        <li v-for="service in apartmentInfo.services" :key="service.id">
                            <i :class="['fas', getServiceIcon(service.name)]"></i>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <div>
                        Al momento nessun servizio disponibile
                    </div>
                </template>
            </p>

            <button class="button" v-if="$route.name === 'results'">
                <router-link :to="{ name: 'single-apartment', params: { slug: apartmentInfo.slug } }"
                    class="text">Info</router-link>
            </button>

            <button v-if="$route.name === 'single-apartment'" class="btn btn-primary mt-2" type="button"
                data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"
                aria-controls="offcanvasWithBothOptions">Contatta l'host</button>
            <MessageForm></MessageForm>
        </div>

    </div>
</template>


<style scoped lang="scss">
.ms_card {
    .ms_img_contain {
        width: 100%;
        height: 290px;
        margin-top: 1rem;
        overflow: hidden;

        .ms_img {
            object-fit: cover;
            height: 100%;
            max-width: 100%;
            overflow: hidden;
        }
    }

    .card-body {

        .services-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
            /* spazio tra gli elementi, puoi modificarlo come preferisci */
        }

        .services-grid li {
            display: flex;
            align-items: center;
        }

        .services-grid li i {
            margin-right: 8px;
            /* spazio tra l'icona e il testo */
        }
    }
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
</style>
import { reactive } from "vue";
import axios from 'axios';

export const store = reactive({
    tomTomQueryParams: {
        tomTomKey: import.meta.env.VITE_TOM_TOM_API_KEY,
        countrySet: 'ITA',
    },
    apiBaseUrl: import.meta.env.VITE_API_URL,
    userInputSearch: '',
    userSelection: null,
    suggestedAddresses: [],
    searchedApartments: [],
    radius: 20,

    // funzione che richiama tutti gli appartamenti
    getApartmentsFromApi() {
        let apiApartmentsSearch = `${store.apiBaseUrl}/api/apartments`
        axios.get(apiApartmentsSearch, {
            params: {
                latitude: store.userSelection.position.lat,
                longitude: store.userSelection.position.lon,
                radius: store.radius
            }
        })
            .then((response) => {
                store.searchedApartments = response.data.apartments;
            });
    }
    
});
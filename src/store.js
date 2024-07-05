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


});
import { reactive } from "vue";
import axios from 'axios';

export const store = reactive({
    tomTomQueryParams: {
        tomTomKey: import.meta.env.VITE_TOM_TOM_API_KEY,
        countrySet: 'ITA',
    },
    apartment: null,
    apiBaseUrl: import.meta.env.VITE_API_URL,
    userInputSearch: '',
    userSelection: null,
    suggestedAddresses: [],
    searchedApartments: [],
    selectedServices: [],
    numberOfRooms: 0,
    numberOfBeds: 0,
    numberOfBathrooms: 0,
    userRadius: 0,
    selectSquareMeters: 0
});
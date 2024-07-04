import { reactive } from "vue";

export const store = reactive({
    tomTomQueryParams: {
        tomTomKey: 'fUtGP9sbSFIvB3B4Rk2SmG2E8l5VZSRj',
        countrySet: 'ITA',
    },
    apiBaseUrl: 'http://localhost:8000',
    userInputSearch: '',
    userSelection: null,
    suggestedAddresses: [],
    searchedApartments: []
});
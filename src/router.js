import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import AppResults from './pages/AppResults.vue';
import SingleApartment from './pages/SingleApartment.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/results',
            name: 'results',
            component: AppResults
        },
        {
            path: '/apartments/:slug',
            name: 'single-apartment',
            component: SingleApartment
        }
    ]
});
export { router };
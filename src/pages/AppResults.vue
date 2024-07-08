<script>
import ApartmentCard from '../components/ApartmentCard.vue';
import AppHero from '../components/AppHero.vue';
import { store } from '../store';

export default {
    name: 'AppResults',
    components: {
        ApartmentCard,
        AppHero
    },
    data() {
        return {
            store
        };
    }
}
</script>

<template>
    <!-- Passa showFilter come true per mostrare AppFilter in AppHero -->
    <AppHero :showFilter="true"></AppHero>
    <section>
        <div class="container">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-between gap-4">
                <ApartmentCard v-for="apartment in store.searchedApartments" :apartmentInfo="apartment" :key="apartment.id"></ApartmentCard>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>
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
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div class="col d-flex" v-for="apartment in store.searchedApartments"
                    :key="apartment.id">
                    <ApartmentCard :apartmentInfo="apartment"></ApartmentCard>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>
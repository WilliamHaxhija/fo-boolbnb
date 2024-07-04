<script>
import { store } from '../store';
export default {
    name: 'AppSearch',
    emits: ['search', 'dbResults'],
    data() {
        return {
            store
        };
    },
    methods: {
        selectSuggestion(suggestion) {
            this.store.userInputSearch = suggestion.address.freeformAddress;
            this.store.userSelection = suggestion;
            this.store.suggestedAddresses = [];
        }
    }
}
</script>

<template>
    <div class="form-floating mb-1 d-flex align-items-center border rounded-pill">
        <input type="text" class="form-control border border-0 rounded-pill" id="floatingInput" placeholder="search"
            v-model="store.userInputSearch" @keyup="$emit('search')">
        <label for="floatingInput">Cerca destinazioni nel raggio di 20 km </label>
        <div class="search position-absolute cursor-pointer">
            <router-link :to="{ name: 'results' }" @click="$emit('dbResults')">
                <svg width=" 24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
            </router-link>
        </div>
    </div>
    <template v-if="store.userInputSearch !== ''">
        <ul class="list-group">
            <li v-for="suggestion in store.suggestedAddresses" class="list-group-item"
                :key="suggestion.address.freeformAddress" @click="selectSuggestion(suggestion)">
                {{
                    suggestion.address.freeformAddress }}</li>
        </ul>
    </template>
</template>

<style scoped lang="scss">
.search {
    top: 50%;
    transform: (translateY(-50%));
    right: 10px;
    cursor: pointer;
}

.list-group-item {
    cursor: pointer;
}
</style>
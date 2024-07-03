<script>
import { store } from '../store';
export default {
    name: 'AppSearch',
    data() {
        return {
            store,
            autocomplete: ''
        };
    },
    methods: {
        selectSuggestion(suggestion) {
            this.store.userInputSearch = suggestion.address.freeformAddress;
            this.store.suggestedAddresses = [];
        }
    }
}
</script>

<template>
    <div class="form-floating mb-3">
        <input type="search" class="form-control" id="floatingInput" placeholder="search"
            v-model="store.userInputSearch" @keyup="$emit('search')">
        <label for="floatingInput">Cerca destinazioni</label>
        <template v-if="store.userInputSearch !== ''">
            <ul v-for="suggestion in store.suggestedAddresses" class="list-group">
                <li class="list-group-item" :key="suggestion.address.freeformAddress"
                    @click="selectSuggestion(suggestion)">{{
                        suggestion.address.freeformAddress }}</li>
            </ul>
        </template>
    </div>
</template>

<style scoped lang="scss"></style>
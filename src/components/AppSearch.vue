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
    <div class="">

        <div class="position-relative ms_search">
            
            <div class="inputGroup">
                <input autocomplete="off" id="floatingInput" required="" type="text" v-model="store.userInputSearch" @keyup="$emit('search')">
                <label for="name">Cerca destinazioni nel raggio di 20 km</label>
            </div>

            <div class="search cursor-pointer position-absolute top-50 end-0 translate-middle">
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
.ms_search {
    height: 60px;

    .ms_search_bar {
        height: 100%;
    }
}

.inputGroup {
  font-family: 'Segoe UI', sans-serif;
  margin: 1em 0 1em 0;
  width: 100%;
  position: relative;

}

.inputGroup input {
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 2px solid rgb(200, 200, 200);
  background-color: transparent;
  border-radius: 20px;
  width: 100%;
}

.inputGroup label {
  font-size: 100%;
  position: absolute;
  top: -6px;
  left: 0;
  padding-top: 1.3em;
  margin-left: 0.5em;
  pointer-events: none;
  transition: all 0.3s ease;
  color: rgb(70, 70, 70);
}

.inputGroup :is(input:focus, input:valid)~label {
  transform: translateY(-50%) scale(.9);
  margin: 0em;
  margin-left: 1.3em;
  padding: 0.4em;
}

.inputGroup :is(input:focus, input:valid) {
  border-color: rgb(150, 150, 200);
}

.list-group-item {
    cursor: pointer;
}
</style>
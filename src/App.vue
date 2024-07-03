<script>
import AppHeader from "./components/AppHeader.vue";
import AppHome from "./pages/AppHome.vue";
export default {
  components: {
    AppHome,
    AppHeader
  }
}
</script>

<template>
  <AppHeader></AppHeader>
  <AppHome></AppHome>
</template>

<style lang="scss">
@use './style/generic.scss';
@use './style/partials/variables' as *;
</style>

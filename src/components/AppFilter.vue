<script>
export default {
    name:'AppFilter'
}
</script>

<template>
    <button class="btn btn-primary mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
        Filtra appartamenti
    </button>

    <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="staticBackdropLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div>
        I will not close if you click outside of me.
        </div>
    </div>
    </div>
</template>

<style lang="scss"></style>
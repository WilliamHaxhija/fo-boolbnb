<script>
export default {
    name: 'AppSponsorships'
}
</script>

<template>

    <section class="container mt-5">
        <h3 class="mb-5">Sponsorizzati</h3>
        <div class="d-flex gap-3 flex-wrap">
            <div class="card mb-5">
                <div class="img-container">
                    <!-- <img src="../assets/img/images.jpeg" alt=""> -->
                </div>
                <div class="textBox">
                    <p class="text head">Ethereum</p>
                    <span>Cryptocurrency</span>
                    <p class="text price">1.654,34€</p>
                </div>
            </div>
            <div class="card mb-5">
                <div class="img-container">
                    <!-- <img src="../assets/img/images.jpeg" alt=""> -->
                </div>
                <div class="textBox">
                    <p class="text head">Ethereum</p>
                    <span>Cryptocurrency</span>
                    <p class="text price">1.654,34€</p>
                </div>
            </div>
            

        </div>


    </section>

</template>

<style scoped lang="scss">
.card {
    width: 330px;
    height: 190px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    transition: 0.2s ease-in-out;
    overflow: hidden;
}

.img-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-image: url(../assets/img/images.jpeg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.img-container img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.textBox {
    position: absolute;
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    transition: 0.2s ease-in-out;
    z-index: 2;
}

.textBox>.text {
    font-weight: bold;
}

.textBox>.head {
    font-size: 20px;
}

.textBox>.price {
    font-size: 17px;
}

.textBox>span {
    font-size: 12px;
    color: lightgrey;
}

.card:hover>.textBox {
    opacity: 1;
}

.card:hover>.img-container {
    filter: blur(20px);
}

@keyframes anim {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }

    100% {
        transform: translateY(0);
    }
}
</style>
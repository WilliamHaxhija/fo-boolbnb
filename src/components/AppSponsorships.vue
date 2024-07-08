<script>

export default {
    name: 'AppSponsorships',
}
</script>

<template>

    <section class="container mt-5">
        <h3 class="mb-5">Sponsorizzati</h3>

        <!-- card -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
            <div class="col d-flex justify-content-center justify-content-sm-start">
                <div class="card">
                    <div class="img-container">
                        <img src="../assets/img/images.jpeg" alt="">
                    </div>
                    <div class="textBox">
                        <p class="text head">Ethereum</p>
                        <span>Cryptocurrency</span>
                        <p class="text price">1.654,34€</p>
                    </div>
                </div>
            </div>
            <div class="col d-flex justify-content-center justify-content-sm-start">
                <div class="card">
                    <div class="img-container">
                        <img src="../assets/img/images.jpeg" alt="">
                    </div>
                    <div class="textBox">
                        <p class="text head">Ethereum</p>
                        <span>Cryptocurrency</span>
                        <p class="text price">1.654,34€</p>
                    </div>
                </div>
            </div>
            <div class="col d-flex justify-content-center justify-content-sm-start">
                <div class="card">
                    <div class="img-container">
                        <img src="../assets/img/images.jpeg" alt="">
                    </div>
                    <div class="textBox">
                        <p class="text head">Ethereum</p>
                        <span>Cryptocurrency</span>
                        <p class="text price">1.654,34€</p>
                    </div>
                </div>
            </div>
            <div class="col d-flex justify-content-center justify-content-sm-start">
                <div class="card">
                    <div class="img-container">
                        <img src="../assets/img/images.jpeg" alt="">
                    </div>
                    <div class="textBox">
                        <p class="text head">Ethereum</p>
                        <span>Cryptocurrency</span>
                        <p class="text price">1.654,34€</p>
                    </div>
                </div>
            </div>
            <div class="col d-flex justify-content-center justify-content-sm-start">
                <div class="card">
                    <div class="img-container">
                        <img src="../assets/img/images.jpeg" alt="">
                    </div>
                    <div class="textBox">
                        <p class="text head">Ethereum</p>
                        <span>Cryptocurrency</span>
                        <p class="text price">1.654,34€</p>
                    </div>
                </div>
            </div>
        </div>
        

        <!-- /card -->






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

// BUTTON
.button {
    position: relative;
    background-color: transparent;
    color: #e8e8e8;
    font-size: 17px;
    font-weight: 600;
    border-radius: 10px;
    width: 150px;
    height: 30px;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(51, 51, 51, 0.2);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
}

.button::before {
    content: "Hello!";
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(135deg, #7b4397, #dc2430);
    transform: translate(0%, 90%);
    z-index: 99;
    position: relative;
    transform-origin: bottom;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.button::after {
    content: "Hover me";
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transform-origin: top;
    transform: translate(0%, -100%);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.button:hover::before {
    transform: translate(0%, 0%);
}

.button:hover::after {
    transform: translate(0%, -200%);
}

.button:focus {
    outline: none;
}

.button:active {
    scale: 0.95;
}
</style>
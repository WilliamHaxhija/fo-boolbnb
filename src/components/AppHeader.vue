<script>
export default {
    name: 'AppHeader'
}
</script>

<template>
    <section class="ms_hero">
        <header>
            <div>
                <!-- Navbar -->
                <nav class="navbar navbar-expand-lg navbar-light shadow-sm p-1 mb-5 rounded  ">
                    <!-- Container wrapper -->
                    <div class="container d-flex flex-wrap aligne-items-center justify-content-between">
                        <!-- Toggle button -->
                        <button data-mdb-collapse-init class="navbar-toggler" type="button"
                            data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <i class="fas fa-bars"></i>
                        </button>

                        <!-- Collapsible wrapper -->
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <!-- Our Logo -->
                            <a class="navbar-brand mt-2 mt-lg-0" href="#">
                                <img src="../assets/img/logo_bnb.png" height="70" alt="MDB Logo" loading="lazy" />
                            </a>

                        </div>
                        <!-- Collapsible wrapper -->

                        <!-- Right elements -->
                        <div class="d-flex align-items-center dropdown ">
                    
                            <!--Drop down For Login -->
                            <div class="dropdown">
                                <button class="btn btn-primary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="http://127.0.0.1:8000/login">Login</a></li>
                                    <li><a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrati</a></li>
                                </ul>
                            </div>
                        </div>


                        <!-- Right elements -->
                    </div>
                    <!-- Container wrapper -->
                </nav>
                <!-- Navbar -->
            </div>
        </header>
        <main class="container">
            
        </main>
    </section>

</template>

<style scoped lang="scss">
.ms_hero {
    min-height: 700px;
    background-image: url(../assets/img/image_hero.webp);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

}


</style>
<script>
export default {
    name: 'AppHeader'
}
</script>

<template>
    <header class="position-sticky top-0 z-1">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light p-1 rounded  ">
            <!-- Container wrapper -->
            <div class="container d-flex flex-wrap aligne-items-center justify-content-between">
                
                <!-- Home Logo -->
                <div>
                    <!-- Our Logo -->
                    <router-link :to="{ name: 'home' }" class="navbar-brand mt-2 mt-lg-0">
                        <img src="../assets/img/logo_bnb.png" height="70" alt="MDB Logo" loading="lazy" />
                    </router-link>

                </div>
                <!-- Collapsible wrapper -->

                <!-- Right elements -->
                <div class="d-flex align-items-center dropdown ">

                    <!--Drop down For Login -->
                    <div class="dropdown">
                        <button class="ms_Btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="ms_svgContainer">
                                <div fill="white" height="1.6em">
                                    <i class="fa-solid fa-user text-white"></i>
                                </div>
                            </span>
                            <span class="ms_BG"></span>
                        </button>
                        <ul class="dropdown-menu ms-bg-drop-down px-2">
                            <li class=""><a class="text-white text-decoration-none"
                                    href="http://127.0.0.1:8000/login">Login</a></li>
                            <li><a class="text-white text-decoration-none"
                                    href="http://127.0.0.1:8000/register">Registrati</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Right elements -->
            </div>
        </nav>
        <!-- Navbar -->
    </header>
</template>

<style scoped lang="scss">
.ms_Btn {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    position: relative;
    z-index: 1;
    /* overflow: hidden; */
    border-radius: 7px;
    cursor: pointer;
    transition: all .3s;
}

.ms_svgContainer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    backdrop-filter: blur(0px);
    letter-spacing: 0.8px;
    border-radius: 10px;
    transition: all .3s;
}

.ms_BG {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background: #0b1537;
    z-index: -1;
    border-radius: 10px;
    pointer-events: none;
    transition: all .3s;
}

.ms_Btn:hover .ms_svgContainer {
    background-color: rgba(156, 156, 156, 0.466);
    backdrop-filter: blur(4px);
}

.ms_Btn:hover .ms_BG {
    transform: rotate(35deg);
    transform-origin: bottom;
}

.ms-bg-drop-down {
    background: #0b1537;
}
</style>
<script>
export default {
    name:'AppHeader'
}
</script>

<template>
    <header>
       <div>
         <!-- Navbar -->
         <nav class="navbar navbar-expand-lg navbar-light ">
        <!-- Container wrapper -->
            <div class="container d-flex flex-wrap aligne-items-center justify-content-between">
                <!-- Toggle button -->
                <button
                data-mdb-collapse-init
                class="navbar-toggler"
                type="button"
                data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <i class="fas fa-bars"></i>
                </button>

                <!-- Collapsible wrapper -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Our Logo -->
                    <a class="navbar-brand mt-2 mt-lg-0" href="#">
                        <img
                        src="../assets/img/logo_bnb.png"
                        height="70"
                        alt="MDB Logo"
                        loading="lazy"
                        />
                    </a>
                
                </div>
                <!-- Collapsible wrapper -->

                <!-- Right elements -->
                <div class="d-flex align-items-center">

                    <!-- Notifications -->
                    <!-- Avatar -->
                    <div class="dropdown">
                        <a
                        data-mdb-dropdown-init
                        class="dropdown-toggle d-flex align-items-center hidden-arrow"
                        href="#"
                        id="navbarDropdownMenuAvatar"
                        role="button"
                        aria-expanded="false"
                        >
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                            class="rounded-circle"
                            height="25"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                        />
                        </a>
                        <ul
                        class="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarDropdownMenuAvatar"
                        >
                        <li>
                            <a class="dropdown-item" href="#">My profile</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Settings</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Logout</a>
                        </li>
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
</template>

<style scoped lang="scss">
 
</style>
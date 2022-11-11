<template>
  <div class="container-body">
    <aside class="aside">
      

      <ul>
        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="barbell-outline"></ion-icon>
            </span>
            <span class="title">Logo</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
                <ion-icon name="person-sharp"></ion-icon>
              
            </span>

            <router-link class="title" to="/SuperAdmin/Perfilsuper">perfil</router-link>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
                <ion-icon name="home-sharp"></ion-icon>
            </span>
            <router-link class="title" to="/SuperAdmin/Companies">companies</router-link>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="hand-right-outline"></ion-icon>
            </span>
            <router-link class="title" to="/Admin/Assists">new companie</router-link>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="bag-check-outline"></ion-icon>
            </span>
            <router-link class="title" to="/Admin/Sales">deudoras</router-link>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="bar-chart-outline"></ion-icon>
            </span>
            <router-link class="title" to="/Admin/Inventory"
              >......</router-link
            >
          </a>
        </li>
      </ul>
    </aside>
    <main>
        <router-view></router-view>
    </main>
  </div>
</template>
<style scoped>
@import "../../assets/css/superadmin.css";
</style>

<script>

</script>
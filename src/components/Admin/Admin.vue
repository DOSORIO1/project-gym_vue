<style scoped>
@import "../../assets/css/design.css";
</style>

<template>
  <div class="containers">
    <div class="navigation">
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
              <ion-icon name="home-sharp"></ion-icon>
            </span>

            <router-link class="title" to="/Admin/Home">home</router-link>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="person-sharp"></ion-icon>
            </span>
            <router-link class="title" to="/Admin/Clients">Clients</router-link>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="hand-right-outline"></ion-icon>
            </span>
            <router-link class="title" to="/Admin/Assists">Assists</router-link>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="bag-check-outline"></ion-icon>
            </span>
            <router-link class="title" to="/Admin/Sales">Sales</router-link>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="bar-chart-outline"></ion-icon>
            </span>
            <router-link class="title" to="/Admin/Inventory"
              >inventori</router-link
            >
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="lock-closed-sharp"></ion-icon>
            </span>
            <router-link class="title" to="/Admin/employed"
              >emplooyed</router-link
            >
           
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon">
              <ion-icon name="log-in-sharp"></ion-icon>
            </span>
            <router-link class="title" to="/Admin/Restoreclient"
              >Restore client</router-link
            >
          </a>
        </li>
      </ul>
    </div>
  </div>
  <!-- main -->
  <div class="main1">
    <div class="topbar">
      <div class="toggle">
        <ion-icon name="menu-outline"></ion-icon>
        <!-- search -->
      </div>
      <h4><b>{{user.name}}</b></h4>
      <!-- userImg -->
      <div class="dropdown">
        <img
          :src="user.image"
          type="button"
          class="user btn-secondary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <ul class="dropdown-menu">
          <li>
            <ion-icon name="person-circle"></ion-icon>
            <router-link class="title" to="/Admin/Home">My Profile</router-link>
          </li>
          <li><ion-icon name="pencil"></ion-icon>Edit Profile</li>
          <li><ion-icon name="chatbox-ellipses"></ion-icon>Inbox</li>
          <li @click="logout()"><ion-icon name="exit"></ion-icon>Sing Out</li>
        </ul>
      </div>
    </div>

    <div class="fondo">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// MenuToggle
export default {
  data() {
    return {
      token: null,
      user: {},
    };
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
      this.get_user();
    } else {
      this.$router.push({
        name: "Login",
        params: {
          message: "No esta autorizado para acceder a esta cuenta",
        },
      });
    }

    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main1");

    toggle.onclick = function () {
      navigation.classList.toggle("active");
      main.classList.toggle("actives");
    };
    //add hovered class in seleted list item
    let list = document.querySelectorAll(".navigation li");
    function activeLink() {
      list.forEach((item) => item.classList.remove("hovered"));
      this.classList.add("hovered");
    }
    list.forEach((item) => item.addEventListener("mouseover", activeLink));
  },
  methods: {
    async get_user() {
      try {
        const rs = await this.axios.get("/api/user", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = rs.data.user;
      } catch (e) {
        this.$router.push({
          name: "Login",
          params: {
            message: "No estas autorizado para acceder con esta cuenta",
          },
        });
      }
    },

    async logout() {
      try {
        const rs = await this.axios.get("/api/logout", {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        localStorage.clear();

        this.$router.push({
          name: "Login",
          params: {
            message: rs.data.message,
          },
        });
      } catch (e) {
        // console.log(e)
        this.$router.push({
          name: "Login",
          params: {
            message: e.response.data.message,
          },
        });
      }
    },
  },
};
</script>

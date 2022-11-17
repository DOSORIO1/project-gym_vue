<style scoped>
@import "../../assets/css/perfils.css";
</style>
<template>
  <div class="container-perfil">
    <section class="section1">
      <div id="perfil">
        <img id="foto" :src="user.image" alt="" />
        <p>{{ user.name }}</p>
        <p>Email: {{ user.email }}</p>

        <p>rol: {{ user.roles_id }} super admin</p>
        <p>companie: {{ user.companies_id }}</p>
        <button @click="logout()">Cerrar sesión</button>
      </div>
    </section>
  </div>
</template>


<script>
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

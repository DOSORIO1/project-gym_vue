<template>
  <div class="conta_body">
    <div class="cars">
      <div class="card" v-for="r in restor" :key="'restor' + r.id">
        <img :src="r.image" class="card-img-top" id="foto" />
        <div class="card-body">
          <span class="card-text">
            <p>{{ r.name }}</p>
            <p>{{ r.email }}</p>
            <p>date delete: {{ r.deleted_at }}</p>
            <button
          type="button"
          data-bs-target="#deleteUserModal"
          data-bs-toggle="modal"
          class="button btn material-symbols-outlined"
          @click="restore_client()"
        >
          restore
        </button>
          </span>
        </div>
        
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../../assets/css/restore.css";
</style>
<script>
export default {
  mounted() {
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
      this.form.user_id = this.user.id;
      this.form.companies_id = this.user.companies_id;
    } else {
      this.$router.push({
        name: "Login",
        params: { message: rs.data.message },
      });
    }

    this.restore();
    
  },
  data() {
    return {
      restor: [],
      alert: "",
      id: null,
      form: {
        image: "",
        name: "",
        email: "",
        companies_id: "",
        user_id: "",
      },
    };
  },

  methods: {
    async restore() {
      let companies_id = this.form.companies_id;

      try {
        let rs = await this.axios.get(
          `/api/clients/?companies_id=${companies_id}`

          // {
          //   headers: { Authorization: "Bearer " + this.token },
          // }
        );

        this.restor = rs.data.delete_list;
        console.log(rs.data.delete_list);
      } catch (e) {
        console.log(e);
      }
    },
    async restore_client() {
        

         try {
            const id = this.restor.id;
            const res = await this.axios.delete(`/api/clients/restore/${id}`, {
               headers: {
                  Authorization: "Bearer " + localStorage.token,
               },
            });
            this.restore();
            this.alert = res.data.message;

            
         } catch (e) {

         }
      },
  },
};
</script>

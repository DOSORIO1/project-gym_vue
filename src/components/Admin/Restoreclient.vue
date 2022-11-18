<template>
  <div class="bodyy">

    <div class="container">
      <div class="contenido">
        <div class="cards" v-for="r in restor" :key="'restor' + r.id">
          <div class="card">
            <div class="image">
              <span class="overly"></span>

              <div class="card-image">
                <img :src="r.image" alt="" class="card-img">
              </div>
            </div>
            <div class="card-content">
              <h2 class="name">{{ r.name }}</h2>
              <br>
              <p class="descrition"> Email: {{ r.email }}
              </p>
              <p>date delete: {{ r.deleted_at }}</p>
              <br>
              <span @click="edit(r)" class="btn material-symbols-outlined" data-bs-toggle="modal"
                data-bs-target="#restoreUserModal">
                restore
              </span>

            </div>
          </div>
        </div>
      </div>
    </div>

   

    <!-- Restore User Modal Start -->
    <div class="modal fade" id="restoreUserModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Restore Client</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h6>
              <p>¿Deseas restablecer a este cliente?:</p>
            </h6>
            <!-- Image management -->
            <section class="photo-container delete">
              <div class="photo-prev">
                <div v-if="form.url" class="preview">
                  <img :src="form.url" />
                </div>
                <span v-if="!form.url" class="material-symbols-outlined">
                  account_circle
                </span>
              </div>
            </section>
            <!-- Image management -->

            <p class="delete">{{ form.name }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="restore_client()">
              Restore
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Restore User Modal End -->
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
      form_copy: {},
      alert: "",
      id: null,
      modal: null,
      toast: null,
      errors: {},
      form: {
        name: "",
        email: "",
        companies_id: "",
        user_id: "",
        image: null,
        url: null,
        preview: null,
        updated: null,
      },
      loading: false,
      image_text: "Loading image...",
    };
  },

  methods: {
    prepare_elements(name) {
      const myModal = document.getElementById(name); //Nombre del modal
      const myAlert = document.querySelector(".toast");
      this.modal = bootstrap.Modal.getInstance(myModal);
      this.toast = new bootstrap.Toast(myAlert);
    },
    manage_error_messages(e) {
      console.log(e);
      this.errors = {};
      if (e.response.data.errors) this.errors = e.response.data.errors;
      else if (e.response.data.message == "Unauthenticated.") {
        this.$router.push({
          name: "Login",
          params: {
            message: "Tu sessión ha expirado, por favor intentalo de nuevo",
          },
        });
        this.modal.hide();
        this.toast.show();
      }
    },
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
    edit(r) {
      this.restor = r;
      this.form.preview = false;
      this.form.updated = null;
      this.form.url = this.form.image
        ? this.axios.defaults.baseURL + this.form.image
        : null;
      this.form_copy = Object.assign({}, this.form);

      this.image_text = "You profile photo";
      this.loading = false;
    },
    async restore_client() {
      this.prepare_elements("restoreUserModal");

      try {
        const id = this.restor.id;
        const res = await this.axios.delete(`/api/clients/restore/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        this.restore();
        this.alert = res.data.message;

        this.modal.hide();
        this.toast.show();
      } catch (e) {
        this.manage_error_messages(e);
      }
    },
  },
};
</script>

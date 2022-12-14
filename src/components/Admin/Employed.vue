<template>
  <div class="body">
    <div class="containere">
      <button
        id="btn"
        type="button"
        class="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#modal-create"
      >
        <i class="bi bi-person-plus-fill"></i>
      </button>
      <div class="content">
        <div class="cards" v-for="e in employed" :key="'employed' + e.id">
          <div class="card">
            <div class="image">
              <span class="overly"></span>
              <div class="imgBx">
                <!-- <img id="image" :src="c.image" class="img-fluid rounded-start" alt="..." /> -->

                <!-- Image client exist and is not loading a new image -->
                <img
                  v-if="e.image && !e.url"
                  :src="axios.defaults.baseURL + e.image"
                  class="imagenes image-profile"
                  :id="'client' + e.id"
                />
                <!-- Image client exist and uploaded a new image -->
                <img
                  v-if="e.url && !loading"
                  :src="e.url"
                  class="image-profile"
                  :id="'client' + e.id"
                />

                <!-- Image client not exist and is not loading a new image -->
                <span
                  v-if="!e.image && !loading"
                  :id="'client' + e.id"
                  class="material-symbols-outlined default-profile"
                >
                  account_circle
                </span>
              </div>
            </div>
            <div class="card-content">
              <h2 class="name">{{ e.name }}</h2>
              <br />
              <p class="descrition">Email: {{ e.email }}</p>
              <br />
              <div id="btn_funciones">
                <button
                  id="editar"
                  type="button"
                  class="material-symbols-outlined"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-edit"
                  @click="edit_clients(e)"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  id="editar"
                  type="button"
                  data-bs-target="#deleteUserModal"
                  data-bs-toggle="modal"
                  class="material-symbols-outlined"
                  @click="edit_clients(c)"
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal crear-->
  <div
    class="modal fade"
    id="modal-create"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" style="color: white">New client</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Image management -->
          <section class="photo-container">
            <div class="photo-prev">
              <input
                type="file"
                id="new-client-input"
                @change="show_image"
                style="display: none"
              />
              <!-- Image client exist and is not loading a new image -->
              <div class="preview" v-if="form.url && !loading">
                <span
                  class="material-symbols-outlined clear-image"
                  @click="clear_image('new-client-input')"
                >
                  close
                </span>
                <img
                  @click="open_browser('new-client-input')"
                  :src="form.url"
                />
              </div>
              <!-- Image client not exist and is not loading a new image -->
              <span
                v-if="!form.url && !loading"
                class="material-symbols-outlined"
                @click="open_browser('new-client-input')"
              >
                account_circle
              </span>

              <div
                v-if="loading"
                class="loading"
                @click="open_browser('new-client-input')"
              ></div>
              <!-- User can stop the image loading -->
              <span
                v-if="loading"
                class="image_text"
                :class="{ stop: loading }"
                @click="stop_loading()"
                @mouseover="image_text = 'Stop loading!'"
                @mouseleave="image_text = 'Loading...'"
                >{{ image_text }}</span
              >
              <span v-if="!loading" class="image_text">Your profile photo</span>
            </div>
            <div class="form-text" v-if="errors.image">
              {{ errors.image[0] }}
            </div>
          </section>
          <!-- Image management -->

          <form class="form-tarifas">
            <div id="izq">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  name="name"
                  v-model="form.name"
                  class="form-control"
                  id="floatingInput1"
                />
                <label for="floatingInput1">name</label>
                <span style="color: aliceblue" v-if="errors.name">
                  {{ errors.name }}</span
                >
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  v-model="form.email"
                  class="form-control"
                  id="floatingInput2"
                  placeholder="name@example.com"
                />
                <label for="floatingInput2"> email</label>
                <span style="color: aliceblue" v-if="errors.email">
                  {{ errors.email }}</span
                >
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  v-model="form.password"
                  class="form-control"
                  id="floatingInput3"
                  placeholder="password"
                />
                <label for="floatingInput3"> password</label>
                <span style="color: aliceblue" v-if="errors.password">
                  {{ errors.password }}</span
                >
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  v-model="form.password_confirmation"
                  class="form-control"
                  id="floatingInput4"
                  placeholder="password_confirmation"
                />
                <label for="floatingInput4">password confirmation</label>
                <span
                  style="color: aliceblue"
                  v-if="errors.password_confirmation"
                >
                  {{ errors.password_confirmation }}</span
                >
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="store()"
            data-bs-dismiss="modal"
          >
            created
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- modal editar -->
  <div
    class="modal fade"
    id="modal-edit"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" style="color: white">Edit client</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Image management -->
          <section class="photo-container">
            <div class="photo-prev">
              <input
                type="file"
                id="edit-client-input"
                @change="show_image"
                style="display: none"
              />

              <!-- Image client exist and is not loading a new image -->
              <div class="preview" v-if="form.url && !loading">
                <span
                  class="material-symbols-outlined clear-image"
                  @click="clear_image('edit-client-input')"
                >
                  close
                </span>
                <img
                  @click="open_browser('edit-client-input')"
                  :src="form.url"
                />
              </div>
              <!-- Image client not exist and is not loading a new image -->
              <span
                v-if="!form.url && !loading"
                class="material-symbols-outlined"
                @click="open_browser('edit-client-input')"
              >
                account_circle
              </span>
              <div
                v-if="loading"
                class="loading"
                @click="open_browser('edit-client-input')"
              ></div>
              <!-- User can stop the image loading -->
              <span
                v-if="loading"
                class="image_text"
                :class="{ stop: loading }"
                @click="stop_loading()"
                @mouseover="image_text = 'Stop loading!'"
                @mouseleave="image_text = 'Loading...'"
                >{{ image_text }}</span
              >
              <span v-if="!loading" class="image_text">Your profile photo</span>
            </div>
            <div class="form-text" v-if="errors.image">
              {{ errors.image[0] }}
            </div>
          </section>
          <!-- Image management -->
          <form class="form-tarifas">
            <div id="izq">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  name="name"
                  v-model="form.name"
                  class="form-control"
                  id="floatingInput1-edit"
                />
                <label for="floatingInput1-edit">name</label>
                <span style="color: aliceblue" v-if="errors.name">
                  {{ errors.name }}</span
                >
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  v-model="form.email"
                  class="form-control"
                  id="floatingInput2-edit"
                  placeholder="name@example.com"
                />
                <label for="floatingInput2-edit"> email</label>
                <span style="color: aliceblue" v-if="errors.email">
                  {{ errors.email }}</span
                >
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="update(e)"
          >
            update
          </button>

          <!-- <button type="button" class="btn btn-primary " @click="store()" data-bs-dismiss="modal"> created</button> -->
        </div>
      </div>
    </div>
  </div>
  <!-- Delete User Modal Start -->
  <div
    class="modal fade"
    id="deleteUserModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Delete Client</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h6>
            <p>¿Deseas eliminar a este empleado?:</p>
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
          <button type="button" class="btn btn-primary" @click="destroy">
            Delete Client
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Delete User Modal End -->
</template>
<style scoped>
@import "../../assets/css/employed.css";
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

    this.employe();
  },
  data() {
    return {
      employed: [],
      alert: "",
      id: null,
      user: null,
      toast: null,
      modal: null,
      form_copy: {},
      loading: false,
      image_text: "Loading image...",
      alert: "",
      modal_create: null,
      form: {
        name: "",
        email: "",
        roles_id: "",
        password: "",
        password_confirmation: "",
        companies_id: "",
        user_id: "",
        // images //
        image: "",
        url: null,
        preview: null,
        updated: null,
      },
      errors: {},
    };
  },

  methods: {
    reset_form() {
      this.form = {
        image: "",
        name: "",
        email: "",
        roles_id: this.form_copy.roles_id,
        password: "",
        password_confirmation: "",
        companies_id: this.form_copy.companies_id,
        user_id: null,
        // images //
        url: null,
        preview: null,
        updated: null,
      };
    },
    prepare_elements(name) {
      const myModal = document.getElementById(name); //Nombre del modal
      const myAlert = document.querySelector(".toast");
      this.modal = bootstrap.Modal.getInstance(myModal);
      this.toast = new bootstrap.Toast(myAlert);
    },

    error_message(e) {
      this.errors = {};
      if (e.response.data.errors) this.errors = e.response.data.errors;
      else if (e.response.data.message == "Unauthenticated.") {
        this.$router.push({
          name: "Admin",
          params: {
            message: "datos incorrestos vuelve a intentarlo",
          },
        });
        this.modal.hide();
        this.toast.show();
      }
    },
    async employe() {
      let companies_id = this.form.companies_id;

      try {
        let rs = await this.axios.get(
          `/api/clients/?companies_id=${companies_id}`,
          {
            headers: {
              // Authorization: "Bearer " + localStorage.token,
              "Content-Type": "multipart/form-data", //Permite enviar imágenes
            },
          }
        );

        this.employed = rs.data.employed_list;
        console.log(rs);
      } catch (e) {
        console.log(e);
      }
    },

    async store() {
      this.prepare_elements("modal-create");

      // console.log(this.form)

      try {
        let response = await this.axios.post("/api/empleado", this.form, {
          headers: {
            // Authorization: "Bearer " + localStorage.token,
            "Content-Type": "multipart/form-data", //Permite enviar imágenes
          },
        });
        this.employe();
        this.reset_form();
      } catch (e) {
        console.log(e);
        this.error_message(e);
      }
    },

    async update(cliente) {
      const modal1 = document.getElementById("modal-edit");
      this.modal_edit = bootstrap.Modal.getInstance(modal1);
      try {
        // console.log(this.form);
        const id = this.form.id;
        const res = await this.axios.post(
          `/api/client/update/${id}`,
          this.form,
          {
            headers: {
              //  Authorization: "Bearer " + localStorage.token,
              "Content-Type": "multipart/form-data", //Permite enviar imágenes
            },
          }
        );
        // console.log(res.data);
        this.employe();
        this.reset_form();
        this.modal_edit.hide();

        this.alert = res.data.message;
        this.clear_image("edit-client-input");

        this.modal.hide();
        this.toast.show();
      } catch (e) {
        this.error_message(e);
      }
    },
    async destroy() {
      this.prepare_elements("deleteUserModal");

      try {
        const id = this.form.id;
        console.log(this.form.id);
        const res = await this.axios.delete(`/api/clients/${id}`, {
          // headers: {
          //   Authorization: "Bearer " + localStorage.token,
          // },
        });
        this.employe();
        this.alert = res.data.message;

        this.modal.hide();
        this.toast.show();
      } catch (e) {}
    },

    edit_clients(e) {
      this.form = e;
      this.form.preview = false;
      this.form.updated = null;
      this.form.url = this.form.image
        ? this.axios.defaults.baseURL + this.form.image
        : null;
      this.form_copy = Object.assign({}, this.form);

      this.image_text = "You profile photo";
      this.loading = false;
    },
    cancel_form() {
      Object.assign(this.client, this.form_copy);
      this.loading = false;
      this.form.updated = null;
    },

    open_browser(input_name) {
      const input = document.getElementById(input_name);
      input.click();
      this.loading = true;
      this.form.updated = null;
      this.image_text = "Loading...";
    },

    show_image(e) {
      if (e.target.files[0]) {
        console.log("updated!");
        this.form.updated = true;

        this.form.image = e.target.files[0];
        this.form.url = URL.createObjectURL(e.target.files[0]);
      } else {
        console.log("No se seleccionó ninguna imagen!!");
        this.form.url = this.form_copy.url;
      }

      this.loading = false;
    },

    clear_image(input_name) {
      this.form.image = null;
      this.form.updated = true;
      this.form.url = null;
      document.getElementById(input_name).value = null; //clear input file
    },

    stop_loading() {
      console.log("cancelaste la carga!!");
      this.form.url = this.form_copy.url;
      this.loading = false;
    },
  },
};
</script>

<template>
  <div class="conta_iner">
    <div class="recentorders">
      <div class="cardHeader">
        <h2>CLIENTS</h2>
        <div class="search">
          <label>
            <input  v-model="search" @keyup="filtrar" type="search" placeholder="Search" />
            <ion-icon name="search-outline"  @click="filtrar" ></ion-icon>
          </label>
        </div>
        <button
          id="btn"
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#modal-create"
        >
          <i class="bi bi-person-plus-fill"></i>
        </button>
      </div>
      <div class="cr_tainer">
        <div v-for="c in clients" :key="'clients' + c.id" class="car">
          <div class="lines"></div>
          <div class="imgBx">
            <!-- <img id="image" :src="c.image" class="img-fluid rounded-start" alt="..." /> -->

            <!-- Image client exist and is not loading a new image -->
            <img
              v-if="c.image && !c.url"
              :src="axios.defaults.baseURL + c.image"
              class="image-profile"
              :id="'client' + c.id"
            />
            <!-- Image client exist and uploaded a new image -->
            <img
              v-if="c.url && !loading"
              :src="c.url"
              class="image-profile"
              :id="'client' + c.id"
            />

            <!-- Image client not exist and is not loading a new image -->
            <span
              v-if="!c.image && !loading"
              :id="'client' + c.id"
              class="material-symbols-outlined default-profile"
            >
              account_circle
            </span>
          </div>
          <div class="content">
            <div class="details">
              <h2>
                {{ c.name }}<br /><span>{{ c.email }}</span>
              </h2>
              <div class="data">
                <table class="table" style="  font-size: .6rem;">
                  <thead>
                    <tr>
                      <th scope="col">edad</th>
                      <th scope="col">weight</th>
                      <th scope="col">rates</th>
                      <th scope="col">price</th>
                      <th scope="col">fecha inicio</th>
                      <th scope="col">fecha final</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{{ c.age }}</th>
                      <td>{{ c.weight }}</td>
                      <td>{{ c.rates }}</td>
                      <td>{{ c.price }}</td>
                      <td>{{ c.fecha_inicio }}</td>
                      <td>{{ c.fecha_final }}</td>
                    </tr>
                  </tbody>
                </table>
               
              </div>
              <div class="actionBtn">
                <button
                  type="button"
                  class="material-symbols-outlined"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-edit"
                  @click="edit_clients(c)"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
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
              <div id="inpus" class="form-floating mb-3">
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
              <div id="inpus" class="form-floating mb-3">
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
              <div id="inpus" class="form-floating mb-3">
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
              <div id="inpus" class="form-floating mb-3">
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
              <div id="inpus" class="form-floating mb-3">
                <input
                  type="number"
                  name="age"
                  v-model="form.age"
                  class="form-control"
                  id="floatingInput5"
                  placeholder=""
                />
                <label for="floatingInput5">age</label>
                <span style="color: aliceblue" v-if="errors.age">
                  {{ errors.age }}</span
                >
              </div>
            </div>

            <div id="dere">
              <div id="inpus" class="form-floating mb-3">
                <input
                  type="number"
                  name="weight"
                  v-model="form.weight"
                  class="form-control"
                  id="floatingInput6"
                  placeholder=""
                />
                <label for="floatingInput6"> weight</label>
                <span style="color: aliceblue" v-if="errors.weight">
                  {{ errors.weight }}</span
                >
              </div>
              <div id="inpus" class="form-floating mb-3">
                <input
                  type="text"
                  name="nivel"
                  v-model="form.nivel"
                  class="form-control"
                  id="floatingInput7"
                  placeholder=""
                />
                <label for="floatingInput7"> nivel</label>
                <span style="color: aliceblue" v-if="errors.nivel">
                  {{ errors.nivel }}</span
                >
              </div>

              <div id="inpus" class="form-floating mb-3">
                <input
                  type="text"
                  name="injures"
                  v-model="form.injures"
                  class="form-control"
                  id="floatingInput8"
                  placeholder=""
                />
                <label for="floatingInput8"> injures</label>
                <span style="color: aliceblue" v-if="errors.injures">
                  {{ errors.injures }}</span
                >
              </div>
              <div id="inpus" class="form-floating mb-3">
                <input
                  type="date"
                  name="injures"
                  v-model="form.start_date"
                  class="form-control"
                  id="floatingInput9"
                  placeholder=""
                />
                <label for="floatingInput9"> start date</label>
                <span style="color: aliceblue" v-if="errors.start_date">
                  {{ errors.start_date }}</span
                >
              </div>
              <div id="inpus" class="form-floating mb-3">
                <input
                  type="date"
                  name="injures"
                  v-model="form.finish_date"
                  class="form-control"
                  id="floatingInput0"
                  placeholder=""
                />
                <label for="floatingInput0"> finish date</label>
                <span style="color: aliceblue" v-if="errors.finish_date">
                  {{ errors.finish_date }}</span
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
            data-bs-toggle="modal"
            data-bs-target="#modal-create-rates"
          >
            select pago
          </button>
          <!-- <button type="button" class="btn btn-primary " @click="store()" data-bs-dismiss="modal"> created</button> -->
        </div>
      </div>
    </div>
  </div>

  <!-- Modal crear rates -->
  <div
    class="modal fade"
    id="modal-create-rates"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="form-tarifas">
            <article
              class="active"
              id="article"
              v-for="t in rates_list"
              :key="'rates_list' + t.id"
              @click="select_rate(t)"
            >
              <p>
                {{ t.name }}
              </p>
              <p>${{ t.price }}</p>
            </article>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="store()"
          >
            crear
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal crear rates -->

  <!-- Modal editar-->
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
              <div class="form-floating mb-3">
                <input
                  type="number"
                  name="age"
                  v-model="form.age"
                  class="form-control"
                  id="floatingInput5-edit"
                  placeholder=""
                />
                <label for="floatingInput5-edit">age</label>
                <span style="color: aliceblue" v-if="errors.age">
                  {{ errors.age }}</span
                >
              </div>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  name="weight"
                  v-model="form.weight"
                  class="form-control"
                  id="floatingInput6-edit"
                  placeholder=""
                />
                <label for="floatingInput6-edit"> weight</label>
                <span style="color: aliceblue" v-if="errors.weight">
                  {{ errors.weight }}</span
                >
              </div>
            </div>

            <div id="dere">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  name="nivel"
                  v-model="form.nivel"
                  class="form-control"
                  id="floatingInput7-edit"
                  placeholder=""
                />
                <label for="floatingInput7-edit"> nivel</label>
                <span style="color: aliceblue" v-if="errors.nivel">
                  {{ errors.nivel }}</span
                >
              </div>

              <div class="form-floating mb-3">
                <input
                  type="text"
                  name="injures"
                  v-model="form.injures"
                  class="form-control"
                  id="floatingInput8-edit"
                  placeholder=""
                />
                <label for="floatingInput8-edit"> injures</label>
                <span style="color: aliceblue" v-if="errors.injures">
                  {{ errors.injures }}</span
                >
              </div>
              <div class="form-floating mb-3">
                <input
                  type="date"
                  name="injures"
                  v-model="form.start_date"
                  class="form-control"
                  id="floatingInput9-edit"
                  placeholder=""
                />
                <label for="floatingInput9-edit"> start date</label>
                <span style="color: aliceblue" v-if="errors.start_date">
                  {{ errors.start_date }}</span
                >
              </div>
              <div class="form-floating mb-3">
                <input
                  type="date"
                  name="injures"
                  v-model="form.finish_date"
                  class="form-control"
                  id="floatingInput0-edit"
                  placeholder=""
                />
                <label for="floatingInput0-edit"> finish date</label>
                <span style="color: aliceblue" v-if="errors.finish_date">
                  {{ errors.finish_date }}</span
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
            data-bs-toggle="modal"
            data-bs-target="#modal-edit-rates"
          >
            select pago
          </button>
          <!-- <button type="button" class="btn btn-primary " @click="store()" data-bs-dismiss="modal"> created</button> -->
        </div>
      </div>
    </div>
  </div>

  <!-- Modal editar rates -->
  <div
    class="modal fade"
    id="modal-edit-rates"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="form-tarifas">
            <article
              id="article"
              v-for="t in rates_list"
              :key="'rates_list_edit' + t.id"
              @click="select_rate(t)"
            >
              <p>
                {{ t.name }}
              </p>
              <p>${{ t.price }}</p>
            </article>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="update(t)"
            data-bs-dismiss="modal"
          >
            crear
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal editar rates -->

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
            <p>¿Deseas eliminar a este cliente?:</p>
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
@import "../../assets/css/clients.css";
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

    this.get_rates();
    this.get_clients();
  },
  data() {
    return {
      user: null,
      toast: null,
      modal: null,
      clients: [],
      form_copy: {},
      loading: false,
      image_text: "Loading image...",
      alert: "",
      mostrar_datos: [],
      search: "",

      rates_list: [],
      modal_create: null,
      modal_rates: null,
      modal_edit: null,
      modal_eliminar: null,
      modal_edit_rates: null,
      errors: {},
      form: {
        image: "",
        name: "",
        age: "",
        weight: "",
        nivel: "",
        email: "",
        injures: "",
        start_date: "",
        finish_date: "",
        rates_id: "",
        roles_id: 4,
        password: "",
        password_confirmation: "",
        companies_id: "",
        user_id: null,
        total: 0,
        // images //
        url: null,
        preview: null,
        updated: null,
      },
    };
  },

  methods: {
    reset_form() {
      this.form = {
        image: "",
        name: "",
        age: "",
        weight: "",
        nivel: "",
        email: "",
        injures: "",
        start_date: "",
        finish_date: "",
        rates_id: "",
        roles_id: this.form_copy.roles_id,
        password: "",
        password_confirmation: "",
        companies_id: this.form_copy.companies_id,
        user_id: null,
        total: 0,
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

    async get_clients() {
      let companies_id = this.form.companies_id;

      try {
        let rs = await this.axios.get(
          `/api/clients/?companies_id=${companies_id}`

          // {
          //   headers: { Authorization: "Bearer " + this.token },
          // }
        );

        this.clients = rs.data.clients_list;
      } catch (e) {
        console.log(e);
      }
    },

    async store() {
      const modal1 = document.getElementById("modal-create");
      const modal2 = document.getElementById("modal-create-rates");
      this.modal_create = bootstrap.Modal.getInstance(modal1);
      this.modal_rates = bootstrap.Modal.getInstance(modal2);

      console.log(this.form);

      try {
        let response = await this.axios.post("/api/clients", this.form, {
          headers: {
            // Authorization: "Bearer " + localStorage.token,
            "Content-Type": "multipart/form-data", //Permite enviar imágenes
          },
        });
        this.get_clients();
        this.reset_form();
        this.modal_create.hide();
        this.modal_rates.hide();
        this.reset_form();
      } catch (e) {
        console.log(e);
        this.error_message(e);
        this.modal_rates.hide();
        this.modal_create.show();
      }
    },
    //tarifa

    async get_rates() {
      const companies_id = this.user.companies_id;
      try {
        const rs = await this.axios.get(`api/companies/rates/${companies_id}`);
        this.rates_list = rs.data.rates_list;
        console.log(rs.data);
      } catch (e) {
        console.log(e);
      }
    },

    select_rate(tarifa) {
      this.form.rates_id = tarifa.id;
      this.form.total = tarifa.price;
    },

    //final tarifa

    edit_clients(c) {
      this.form = c;
      this.form.preview = false;
      this.form.updated = null;
      this.form.url = this.form.image
        ? this.axios.defaults.baseURL + this.form.image
        : null;
      this.form_copy = Object.assign({}, this.form);

      this.image_text = "You profile photo";
      this.loading = false;
    },

    async update(cliente, payment_id) {
      const modal1 = document.getElementById("modal-edit");
      const modal2 = document.getElementById("modal-edit-rates");
      this.modal_edit = bootstrap.Modal.getInstance(modal1);
      this.modal_edit_rates = bootstrap.Modal.getInstance(modal2);
      try {
        // console.log(this.form);
        const id = this.form.id;
        const res = await this.axios.post(
          `/api/clients/update/${id}`,
          this.form,
          {
            headers: {
              //  Authorization: "Bearer " + localStorage.token,
              "Content-Type": "multipart/form-data", //Permite enviar imágenes
            },
          }
        );
        // console.log(res.data);
        this.get_clients();
        this.reset_form();
        this.modal_edit.hide();
        this.modal_edit_rates.hide();
        this.alert = res.data.message;
        this.clear_image("edit-client-input");

        this.modal.hide();
        this.toast.show();
      } catch (e) {
        this.error_message(e);
        this.modal_edit_rates.hide();
        this.modal_edit.show();
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
        this.get_clients();
        this.alert = res.data.message;

        this.modal.hide();
        this.toast.show();
      } catch (e) {
        this.error_message(e);
      }
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
    filtrar() {
      this.clients = this.mostrar_datos.filter(
        (pro) =>
          (pro.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) |
          (pro.email.toString().indexOf(this.search) > -1)
      );
    },
  },
};
</script>

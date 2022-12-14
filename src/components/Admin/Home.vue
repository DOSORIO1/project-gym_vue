<template>
  <main class="main">
    <div class="perfil">
      <article>
        <img :src="axios.defaults.baseURL + user.image" id="foto_perfil" />
        <span id="texto">
          <p>{{ user.name }}</p>
          <p>{{ user.email }}</p>
          <button
            id="edit-profile"
            type="button"
            class="material-symbols-outlined"
            data-bs-toggle="modal"
            data-bs-target="#modal-edit"
            @click="edit_clients(user)"
          >
            <i class="bi bi-pencil-square"></i>
          </button>
        </span>
      </article>
    </div>
    <br />
    <div id="grafica">
      <canvas class="grafi" id="dimensions"></canvas>
      <canvas class="grafi1" id="acquisitions"></canvas>
    </div>
  </main>

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
                <span class="error-message" v-if="errors.name">
                  {{ errors.name[0] }}
                </span>
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
                <span class="error-message" v-if="errors.email">
                  {{ errors.email[0] }}
                </span>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="update(user)"
          >
            update
          </button>

          <!-- <button type="button" class="btn btn-primary " @click="store()" data-bs-dismiss="modal"> created</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/css/home.css";
</style>
<script>
import { Chart } from "../../../node_modules/chart.js/auto/auto";

export default {
  data() {
    return {
      token: null,
      user: {},
      modal: null,
      id: null,
      form_copy: {},
      loading: false,
      image_text: "Loading image...",
      form: {
        // images //
        image: "",
        url: null,
        preview: null,
        updated: null,
      },
      errors: {},
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
    if (this.$route.params.message) this.message = this.$route.params.message;

    // Obtener una referencia al elemento canvas del DOM
    const $grafica = document.querySelector("#dimensions");
    // Las etiquetas son las porciones de la gráfica
    const etiquetas = [
      "Ventas",
      "Donaciones",
      "Trabajos",
      "Publicidad",
      "Desempleo",
      "Entrega",
      "Diversa",
    ];
    // Podemos tener varios conjuntos de datos. Comencemos con uno
    const datosIngresos = {
      data: [7000, 4000, 7000, 4000, 7000, 5000, 3000], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
      // Ahora debería haber tantos background colors como datos, es decir, para este ejemplo, 4
      backgroundColor: [
        "rgba(163,221,203,2.2)",
        "rgba(232,233,161,2.2)",
        "rgba(230,181,102,2.2)",
        "rgba(229,112,126,2.2)",
        "rgba(132,212,166,2.2)",
        "rgba(222,241,29,2.2)",
        "rgba(27,229,223,2.2)",
      ], // Color de fondo
      borderColor: [
        "rgba(163,221,203,1)",
        "rgba(232,233,161,1)",
        "rgba(230,181,102,1)",
        "rgba(229,112,126,1)",
        "rgba(132,212,166,1)",
        "rgba(222,241,29,1)",
        "rgba(27,229,223,1)",
      ], // Color del borde
      borderWidth: 1, // Ancho del borde
    };
    new Chart($grafica, {
      type: "pie", // Tipo de gráfica. Puede ser dougnhut o pie
      data: {
        labels: etiquetas,
        datasets: [
          datosIngresos,
          // Aquí más datos...
        ],
      },
    });

    // Segunda tabla ////
    (async function () {
      const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 29 },
        { year: 2016, count: 28 },
      ];

      new Chart(document.getElementById("acquisitions"), {
        type: "bar",
        data: {
          labels: data.map((row) => row.year),
          datasets: [
            {
              label: "Acquisitions by year",
              data: data.map((row) => row.count),
            },
          ],
        },
      });
    })();
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
    ////// editar admin o empleado////////
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
        this.get_user();

        this.modal_edit.hide();

        this.modal.hide();
        this.toast.show();
      } catch (e) {
        (this.errors = {}), (this.message = null);

        if (e.response.data.errors) this.errors = e.response.data.errors;

        if (e.response.data.message) this.errors = e.response.data.message;
      }
    },
    edit_clients(user) {
      this.form = user;
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

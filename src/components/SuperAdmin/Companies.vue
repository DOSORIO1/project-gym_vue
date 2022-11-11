<template>
  <header>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-target="#modal-create"
      data-bs-toggle="modal"
      
      
    >
      <ion-icon name="bag-check-outline"></ion-icon> new company
    </button>

    <h1>Companies</h1>
  </header>

  <div class="contenedor-cards">
    <div class="scroll">
      <div
        v-for="co in companies"
        :key="'companie' + co.id"
        class="card mb-3"
        style="max-width: 540px"
      >
        <div class="row g-0">
          <div class="col-md-4">
            <img
              style="height: 150px"
              :src="co.logo"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ co.name }}</h5>
              <p class="card-text">addres: {{ co.address }}</p>
              <p class="card-text bottt">
                <small class="text-muted">phone: {{ co.numero }}</small>
                <span
                  ><button
                    type="button"
                    class="btn btn"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-edit"
                    @click="edit_clients()"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button type="button" class="btn">
                    <i class="bi bi-trash3"></i></button
                ></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal crear -->
  <div
    class="modal fade"
    id="modal-create"
   
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input
            id="floatingInput1-create"
            type="text"
            name="name"
            v-model="form.name"
          />
          <label for="floatingInput1-create">name</label>
          <input
            id="floatingInput1-create"
            type="text"
            name="logo"
            v-model="form.logo"
          />
          <label for="floatingInput1-create">logo</label>
          <input
            id="floatingInput1-create"
            type="text"
            name="address"
            v-model="form.address"
          />
          <label for="floatingInput1-create">address</label>
          <input
            id="floatingInput1-create"
            type="number"
            name="numero"
            v-model="form.numero"
          />
          <label for="floatingInput1-create">numero</label>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../../assets/css/companies.css";
</style>
<script>
export default {
  mounted() {
    this.get_companies();
  },
  data() {
    return {
      modal: null,
      companies: [],
      form: {
        name: "",
        logo: "",
        address: "",
        numero: "",
      },
    };
  },

  methods: {
    prepare_elements(name) {
      const modal1 = document.getElementById(name);

      this.modal = bootstrap.Modal.getInstance(modal1);
    },
    ///////asistencia///////
    async get_companies() {
      try {
        const rs = await this.axios.get(
          "/api/companies"
          // {
          //   headers: { Authorization: "Bearer " + this.token },
          // }
        );
        this.companies = rs.data.companies_list;
      } catch (e) {
        console.log(e);
      }
    },

    async store() {
      this.prepare_elements("modal-create");

      try {
        let response = await this.axios.post("/api/companies", this.form);
        this.get_companies();
        this.modal.hide();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

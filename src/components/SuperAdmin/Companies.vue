<template>
  <div class="contenedor">
    <header>
      <button type="button" class="btn btn-primary" data-bs-target="#modal-create" data-bs-toggle="modal">
        <ion-icon name="bag-check-outline"></ion-icon> new company
      </button>

      <h1>Companies</h1>
    </header>

    <div class="contenedor-cards">
      <div class="scroll">
        <div v-for="co in companies" :key="'companie' + co.id" class="card mb-3" style="max-width: 540px">
          <div class="row g-0">
            <div class="col-md-4">
              <img style="height: 150px" :src="co.logo" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ co.name }}</h5>
                <p class="card-text">addres: {{ co.address }}</p>
                <p class="card-text bottt">
                  <small class="text-muted">phone: {{ co.numero }}</small>
                  <span><button type="button" class="btn btn" data-bs-toggle="modal" data-bs-target="#modal-edit"
                      @click="edit_clients()">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" class="btn">
                      <i class="bi bi-trash3"></i></button></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- modal crear -->
  <div class="modal fade" id="modal-create">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label  for="floatingInput1-create1">name</label>
          <input class="form-control" id="floatingInput1-create1" type="text" name="name" v-model="form.name" />
          <label for="floatingInput1-create2">logo</label>
          <input class="form-control" id="floatingInput1-create2" type="text" name="logo" v-model="form.logo" />
          <label for="floatingInput1-create3">address</label>
          <input class="form-control" id="floatingInput1-create3" type="text" name="address" v-model="form.address" />
          <label for="floatingInput1-create4">numero</label>
          <input class="form-control" id="floatingInput1-create4" type="number" name="numero" v-model="form.numero" />
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="store()">Understood</button>
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
      edit_companie:null,
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
    ///////companie///////
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
        let response = await this.axios.post("/api/companies/", this.form);
        this.get_companies();
        this.modal.hide();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

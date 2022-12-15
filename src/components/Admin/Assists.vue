<template>
  <div class="details">
    <div class="recentorders">
      <div class="cardHeader">
        <h2>attendances of clients</h2>
        <div>
          <input type="number" v-model="form.dni"> <button><span class="material-symbols-outlined"
              data-bs-target="#registrarAsistencia" data-bs-toggle="modal" @click="show()">
              arrow_forward
            </span></button>
        </div>
        <div>
          <input id="lis" type="date" class="form-control" v-model="start_date" />
          <input id="lis" type="date" class="form-control" v-model="finish_date" />
          <input type="button" value="Listar" @click="get_asistencias()">
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td>photo</td>
            <td>Dni</td>
            <td>Name</td>
            <td>date</td>
            <td>time</td>
            <td>asiste</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in asistencias" :key="'asistencias' + a.id">
            <td><img :src="axios.defaults.baseURL + a.image" alt="" /></td>
            <td>{{ a.dni }}</td>
            <td>{{ a.name }}</td>
            <td>{{ a.date }}</td>
            <td>{{ a.time }}</td>
            <td>
              <span class="status delivered">{{ a.asiste }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="registrarAsistencia" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="client.name != ''">
            <img id="ftto" :src="axios.defaults.baseURL + client.image">
            
            <span id="ftto" >{{ client.name }}</span>
          </div>

          <div v-if="client.name == ''">
            <span>Cliente no encontrado!</span>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="store()">Registrar asistencia</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../../assets/css/Asistencia.css";
</style>

<script>
export default {
  mounted() {
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
      this.form.user_id = this.user.id;
      this.form.companies_id = this.user.companies_id;

      this.start_date = new Date().toISOString().substring(0, 10)
      this.finish_date = new Date().toISOString().substring(0, 10)

      this.form.date = new Date().toISOString().substring(0, 10);
      this.form.time = new Date().toLocaleTimeString();



    } else {
      this.$router.push({
        name: "Login",
        params: { message: rs.data.message },
      });
    }
    this.get_asistencias();
  },
  data() {
    return {
      asistencias: [],
      alert: "",
      start_date: "",
      finish_date: "",
      form: {
        id: "",
        dni: "",
        time: "",
        date: "",
        companies_id:"",
      },

      client: {
        image: "",
        name: ""
      }
    };
  },

  methods: {
    ///////asistencia///////
    async get_asistencias() {
      let companies_id = this.form.companies_id;
      try {
        const rs = await this.axios.get(
          `/api/attendances/?companies_id=${companies_id}&start_date=${this.start_date}&finish_date=${this.finish_date}`
          // {
          //   headers: { Authorization: "Bearer " + this.token },
          // }
        );
        this.asistencias = rs.data.attendances_list;
        console.log(this.asistencias)
      } catch (e) {
        console.log(e);
      }
    },

    async show() {
      console.log(this.form)

      try {
        let response = await this.axios.get(`/api/attendances/${this.form.dni}`, {
          headers: {
            // Authorization: "Bearer " + localStorage.token,
            "Content-Type": "multipart/form-data", //Permite enviar imágenes
          },
        });
        this.client = response.data.client
        console.log(this.client)
      } catch (e) {
        console.log(e);

      }
    },

    async store() {
      console.log(this.form)

      try {
        let response = await this.axios.post(`/api/attendances`, this.form, {
          headers: {
            // Authorization: "Bearer " + localStorage.token,
            "Content-Type": "multipart/form-data", //Permite enviar imágenes
          },
        });
        this.get_asistencias();
      } catch (e) {
        console.log(e);

      }
    },

  },
};
</script>

<template>
  <div class="contenedor">
    <article id="tab4">

      <h1>Asistencia de los clientes</h1>
      <div id="input"> 
        <input type="date" name="injures"  class="form-control" id="floatingInput9"
        placeholder="" />
      <input type="date" name="injures"  class="form-control" id="floatingInput9"
        placeholder="" />
      </div>
      
      <table>
        <thead>
          <tr>
            <th>nombre</th>
            <th>hora</th>
            <th>fecha</th>
            <th>asistencias</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in asistencias" :key="'asistencias' + a.id">
            <td>{{ a.name }}</td>
            <td>{{ a.time }}</td>
            <td>{{ a.date }}</td>
            <td>{{ a.asiste }}</td>
          </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>
<style scoped>
@import "../../assets/css/Asistencia.css";
</style>

<script>
export default {
  mounted() {
    this.get_asistencias();

  },
  data() {
    return {
      asistencias: [],
    };
  },

  methods: {

    ///////asistencia///////
    async get_asistencias() {
      try {
        const rs = await this.axios.get(
          "/api/attendances"
          // {
          //   headers: { Authorization: "Bearer " + this.token },
          // }
        );
        this.asistencias = rs.data.attendances_list;
      } catch (e) {
        console.log(e);
      }
    },



  },
};
</script>
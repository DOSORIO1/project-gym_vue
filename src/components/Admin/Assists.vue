<template>
  <div class="details">
    <div class="recentorders">
      <div class="cardHeader">
        <h2>Recent Order</h2>
        <div> <input type="date" class="form-control">
          <input type="date" class="form-control">
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td>photo</td>
            <td>Name</td>
            <td> date</td>
            <td>time</td>
            <td>asiste</td>
           
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in asistencias" :key="'asistencias' + a.id">
            <td><img :src="a.image" alt=""></td>
            <td>{{a.name}}</td>
            <td>{{a.date}}</td>
            <td>{{a.time}}</td>
            <td><span class="status delivered">{{a.asiste}}</span></td>
          </tr>
          

        </tbody>
      </table>
    </div>
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
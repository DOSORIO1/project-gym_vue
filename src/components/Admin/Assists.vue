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
            <td>Name</td>
            <td>Price</td>
            <td>Payment</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Star refrigeration</td>
            <td>$1200</td>
            <td>paid</td>
            <td><span class="status delivered">Delivered</span></td>
          </tr>
          <tr>
            <td>Star refrigeration</td>
            <td>$1200</td>
            <td>paid</td>
            <td><span class="status pending">Pending</span></td>
          </tr>
          <tr>
            <td>Star refrigeration</td>
            <td>$1200</td>
            <td>paid</td>
            <td><span class="status return">Return</span></td>
          </tr>
          <tr>
            <td>Star refrigeration</td>
            <td>$1200</td>
            <td>paid</td>
            <td><span class="status inprogress">InProgress</span></td>
          </tr>
          <tr>
            <td>Star refrigeration</td>
            <td>$1200</td>
            <td>paid</td>
            <td><span class="status delivered">Delivered</span></td>
          </tr>
          <tr>
            <td>Star refrigeration</td>
            <td>$1200</td>
            <td>paid</td>
            <td><span class="status pending">Pending</span></td>
          </tr>
          <tr>
            <td>Star refrigeration</td>
            <td>$1200</td>
            <td>paid</td>
            <td><span class="status return">Return</span></td>
          </tr>
          <tr>
            <td>Star refrigeration</td>
            <td>$1200</td>
            <td>paid</td>
            <td><span class="status inprogress">InProgress</span></td>
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
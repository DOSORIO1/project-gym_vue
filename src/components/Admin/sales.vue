<template>
  <div class="container-sales" >
    <div class="container-table"> 
    <table >
      <thead>
        <tr>
          <th>name</th>
          <th >subtotal</th>
          <th >total</th>
          <th >date</th>
          <th >reference</th>
          <th >cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in sales" :key="'sales' + s.id">
          <th scope="row">{{s.name}}</th>
          <td>{{s.subtotal}}</td>
          <td>{{s.total}}</td>
          <td>{{s.date}}</td>
          <td>{{s.reference}}</td>
          <td>{{s.cantidad}}</td>
        </tr>              
      </tbody>
    </table>
  </div>
</div>
</template>
<style scoped>
@import "../../assets/css/sales.css";
</style>
<script>
export default {
  mounted() {
    this.get_sales();

  },
  data() {
    return {
      sales: [],
    };
  },

  methods: {

    ///////asistencia///////
    async get_sales() {
      try {
        const rs = await this.axios.get(
          "/api/sales"
          // {
          //   headers: { Authorization: "Bearer " + this.token },
          // }
        );
        this.sales = rs.data.sales_list;
      } catch (e) {
        console.log(e);
      }
    },



  },
};
</script>
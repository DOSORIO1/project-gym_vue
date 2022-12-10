<template>
  <div class="container_sales">
    <div class="container_table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>name</th>
            <th>ventas del empleado</th>
            <th>reference</th>
            <th>venta local</th>
            <th>valor-uni</th>
            <th>total</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in sales" :key="'sales' + s.id">
            <th scope="row">{{ s.name }}</th>
            <td>{{ s.cantidad_ventas }}</td>
            <td>{{ s.reference }}</td>
            <td>{{ s.local_sale }}</td>
            <td>{{ s.unit_value }}</td>
            <td>{{ s.total }}</td>
            <td>{{ s.date }}</td>
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
    this.get_sales();
  },
  data() {
    return {
      user: null,
      sales: [],
      form: {
        companies_id: "",
        user_id: null,
      },
    };
  },

  methods: {
    ///////asistencia///////
    async get_sales() {
      let companies_id = this.form.companies_id;
      try {
        let rs = await this.axios.get(
          `/api/sales/?companies_id=${companies_id}`
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

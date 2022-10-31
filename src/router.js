import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Account from "./components/Account.vue";
import Home from "./components/Home.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import ResetPassword from "./components/ResetPassword.vue";
// admin routes 
import Aside from "./components/Admin/Aside.vue";
import Nav from "./components/Admin/Nav.vue";

import Clients from "./components/Admin/Clients.vue";
import Assists from "./components/Admin/Assists.vue";
import Inventory from "./components/Admin/Inventory.vue";
import Sales from "./components/Admin/Sales.vue";
import HomeAdmin from "./components/Admin/Home.vue";
import Admin from "./components/Admin/Admin.vue";




const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,

  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/Admin",
    name: "Admin",
    components: {
      main: Admin,
      sideBar: Aside,
      navBar: Nav
    },
    children: [
      {
        path: "Home",
        component: HomeAdmin,
      },
      {
        path: "Clients",
        component: Clients,
      },
      {
        path: "Assists",
        component: Assists,
      },
      {
        path: "Inventory",
        component: Inventory,
      },
      {
        path: "Sales",
        component: Sales,
      },
    ],
  },

];

const _router = createRouter({
  history: createWebHistory(),
  routes,
});

export default _router;

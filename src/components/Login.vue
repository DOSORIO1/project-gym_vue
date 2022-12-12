<template>
  <div class="todo">
    <video src="../assets/image/bg.mp4" autoplay muted loop type="mp4"></video>
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input
            type="text"
            name="name"
            v-model="form2.name"
            placeholder="name"
          />
          <span v-if="errors.name">{{ errors.name[0] }}</span>
          <input
            type="text"
            name="email"
            v-model="form2.email"
            placeholder="Email"
          />
          <span v-if="errors.email">{{ errors.email[0] }}</span>

          <input
            type="password"
            name="password"
            v-model="form2.password"
            placeholder="Password"
          />
          <span v-if="errors.password">{{ errors.password[0] }}</span>

          <input
            type="password"
            name="password"
            v-model="form2.password_confirmation"
            placeholder="confirm Password"
          />
          <span v-if="errors.password_confirmation">{{
            errors.password_confirmation[0]
          }}</span>

          <button @click="register()" type="button">Sign Up</button>
        </form>
      </div>
<!-- ///////////////////////// -->
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <span>or use your account</span>
          <input
            type="text"
            name="email"
            v-model="form.email"
            placeholder="Email"
          />
          <span class="error-message" v-if="errors.email">
            {{ errors.email[0] }}
          </span>

          <input
            type="password"
            name="password"
            v-model="form.password"
            placeholder="Password"
          />
          <span class="error-message" v-if="errors.password">
            {{ errors.password[0] }}
          </span>

          <p style="color: black" v-if="message">{{ message }}</p>

          <button
            class="btn btn-lg active"
            aria-pressed="true"
            type="button"
            @click="login()"
          >
            Sign In
          </button>
          <router-link class="link" to="/forgot-password"
            >Olvidaste tu contraseña?</router-link
          >
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost" id="signIn">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../assets/css/login.css";
</style>

<script>
export default {
  data() {
    return {
      message: null,
      form: {
        email: "",
        password: "",
      },
      form2: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: {},
    };
  },
  mounted() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    if (this.$route.params.message) this.message = this.$route.params.message;
  },

  methods: {
    async login() {
      try {
        const rs = await this.axios.post("/api/login", this.form);
        const role = rs.data.user.roles_id;

        switch (role) {
          case 1:
            this.$router.push({
              path: "/Superadmin/Perfilsuper",
              // params: {
              // token:rs.data.token,
              // }
            });
            break;

          case 2:
            this.$router.push({
              path: "/Admin/Home",
            });
            break;

          case 3:
            this.$router.push({
              name: "Employed",
            });
            break;

          case 4:
            this.$router.push({
              name: "Account",
            });
            break;

          default:
            this.$router.push({
              name: "Login",
            });
            break;
        }

        localStorage.token = rs.data.token;
        localStorage.user = JSON.stringify(rs.data.user);
      } catch (e) {
        (this.errors = {}), (this.message = null);

        if (e.response.data.errors) this.errors = e.response.data.errors;
        else e.response.data.message;
        this.message = e.response.data.message;

        console.log(e);
        this.errors = e.response.data.errors;
      }
    },

    async register() {
      try {
        const rs = await this.axios.post("/api/register", this.form2);
        this.$router.push({
          name: "Login",
          params: { message: rs.data.message },
        });
      } catch (e) {
        (this.errors = {}), (this.message = null);

        if (e.response.data.errors) this.errors = e.response.data.errors;

        if (e.response.data.message) this.errors = e.response.data.message;
      }
    },
  },
};
</script>

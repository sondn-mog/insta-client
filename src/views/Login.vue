<template>
  <div class="login-page">
    <header>
      <h3>INSTA<span>CLONE</span></h3>
    </header>
    <main>
      <input v-model="email" type="email" placeholder="Enter Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit" @click="login">Login</button>
      <div class="error" v-if="hasError">{{ error }}</div>
    </main>
    <footer>
      <p>Need an account?&nbsp;&nbsp;</p>
      <router-link to="/register" class="link">Register</router-link>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      hasError: false,
      error: ""
    };
  },
  methods: {
    login() {
      if (this.email == "" || this.password == "")
        return alert("Please fill all field");
      axios
        .post("http://localhost:3000/user/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res.data.auth) {
            // set jwt, return home page
            localStorage.setItem("jwt", res.data.token);
            this.$router.push("/");
          } else {
            this.hasError = true;
            this.error = res.data.msg;
          }
          // console.log(res.data);
        })
        .catch(err => {
          this.hasError = true;
          this.error = err;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

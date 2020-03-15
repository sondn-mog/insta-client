<template>
  <div class="register-page">
    <header>
      <h3>INSTA<span>CLONE</span></h3>
      <span class="register-text">Register</span>
    </header>
    <main>
      <input v-model="forename" type="email" placeholder="Forename" />
      <input v-model="surname" type="email" placeholder="Surname" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit" @click="register">Register</button>
      <div class="error" v-if="hasError">{{ error }}</div>
    </main>
    <footer>
      <p>Already have account?&nbsp;&nbsp;</p>
      <router-link to="/register" class="link">&nbsp;&nbsp;Login</router-link>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      forename: "",
      surname: "",
      email: "",
      password: "",
      hasError: false,
      error: ""
    };
  },
  methods: {
    register() {
      if (this.forename == "" || this.surname == "" || this.email == "" || this.password == ""){
        alert("Please fill all field");
        return;
      }
      axios
        .post("http://localhost:3000/user/register", {
          forename: this.forename,
          surname: this.surname,
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

<template>
  <div class="home">
    Hello, world!
    <button @click="logout">Logout</button>
  </div>
</template>
<script>
export default {
  methods: {
    logout(){
      localStorage.removeItem('jwt');
      this.$router.push('/login');
    }
  }
}
</script>

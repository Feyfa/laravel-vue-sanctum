<template>
  <header v-if="showNavbar()">
    <h1>Laravel Sanctum Vue Js</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <span @click="logout">logout</span>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .3rem 5rem .3rem 2rem;
  background-color: aqua;
}

span {
  color: rgb(35, 21, 126);
  cursor: pointer;
  text-decoration: underline;
  margin-left: 1rem
}

</style>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  methods: {
    showNavbar() {
      return !['/register', '/login'].includes(this.$route.path);
    },

    logout() {
      this.$store.dispatch('logout')
                 .then(response => {
                  // console.log(response);
                  if(response.status === 200 && response.data.message === 'logout success') {
                    localStorage.removeItem('token');
                    this.$router.push('/login');
                  }
                 })
                 .catch(error => {
                  console.error(error);
                 })
    }
  }
}
</script>



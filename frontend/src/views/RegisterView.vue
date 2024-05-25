<template>
  <div class="container">
    <form @submit.prevent="registerSubmit">
      <h1>Register</h1>
      <div class="row">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" placeholder="name">
      </div>
      <div class="row">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="text" placeholder="email">
      </div>
      <div class="row">
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" placeholder="password">
      </div>
      <div class="link">
        <RouterLink to="/login">login</RouterLink>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>

import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    clearForm() {
      this.form = {
        name: '',
        email: '',
        password: ''
      }
    },

    registerSubmit() {
      this.$store.dispatch('registerSubmit', {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
      })
      .then(response => {
        if(response.data.status === 201 && response.data.message === "register success") {
          this.clearForm();
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
}

</script>

<style scoped>
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: .2rem;
    padding: .5rem;
    justify-content: center;
    border: 1px solid black;
    width: 50%;
    box-shadow: 3px 3px 5px rgba(0,0,0,.2);
  }
  input {
    width: 100%;
    outline: none;
    border-radius: .2rem;
    border: 1px solid #444;
    padding: .8rem .5rem
  }
  button {
    width: 100%;
    padding: .8rem 0;
  }
  .link {
    width: 100%;
    text-align: end;
  }
  .row {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
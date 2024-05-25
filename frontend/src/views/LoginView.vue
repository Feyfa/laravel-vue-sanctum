<template>
  <div class="container">
    <form @submit.prevent="loginSubmit">
      <h1>Login</h1>
      <div class="row">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="text" placeholder="email">
      </div>
      <div class="row">
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" placeholder="password">
      </div>
      <div class="link">
        <RouterLink to="/register">register</RouterLink>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>

import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    clearForm() {
      this.form = {
        email: '',
        password: ''
      }
    },

    loginSubmit() {
      this.$store.dispatch('loginSubmit', {
        email: this.form.email,
        password: this.form.password,
      })
      .then(response => {
        console.log(response);
        
        if(response.data.status === 401 && response.data.message === 'invalid login details') {
          alert(response.data.message)
        }
        else if(response.data.status === 200 && response.data.message === 'login success') {
          alert(response.data.message);

          localStorage.setItem('token', response.data.token);
          
          this.clearForm();
          this.$router.push('/');
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
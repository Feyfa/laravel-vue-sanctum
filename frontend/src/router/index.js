import axios from '@/axios';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {public: true}
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {public: true}
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {public: false}
    },
  ]
})

router.beforeEach((to, from, next) => {
  // ambil token
  const token = localStorage.getItem('token');

  // kondisi ketika belum login token masih belum ada
  if(!to.meta.public && !token) {
    console.log('block1');
    next({name: 'login'});
  }
  // jika path di url mengarahkan ke /register dan /login
  // kondisi ketika mau ke url register dan login
  else if (to.path === '/register' || to.path === '/login') {
    // kondisi sudah ada token, mau ke url register dan login, 
    if(token) {
      // cek validasi tokennya
      axios.get('/tokenvalidation')
           // jika token valid, maka paksa di ke wilayah yang udah di autentikasi
           .then(response => {
            // console.log(response)
            if(response.status === 200 && response.data.message === 'token valid') {
              next({name: 'home'})
            }
           })
           // jika token tidak valid, maka yaudah biarkan saja ke halaman register atau login 
           .catch(error => {
            // console.error(error);
            if(error.response.status === 401 && error.response.data.message === 'Unauthenticated.') 
             next();
           }); 
    }
    // kondisi ketika belum ada token, mau ke url register atau login
    else {
      next();
    }
  }
  // kondisi masuk ke url selain /register dan /login dan memliki token
  else {
    // cek validasi tokennya
    axios.get('/tokenvalidation')
         // jika token valid, maka yaudah biarkan saja ke halaman yang dia ingin tuju
         .then(response => {
          // console.log(response)
          if(response.status === 200 && response.data.message === 'token valid')
            next();
         })
         // jika token tidak valid, maka paksa di ke wilayah yang belm di autentikasi
         .catch(error => {
          // console.error(error);
          if(error.response.status === 401 && error.response.data.message === 'Unauthenticated.') 
            next({name: 'login'});
         });  
  }
});

export default router

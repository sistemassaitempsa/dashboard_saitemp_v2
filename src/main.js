import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSignature from "vue-signature-pad";

// Bibliotecas de terceros
import VueCryptojs from 'vue-cryptojs';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Countdown from "vue3-flip-countdown";

// Echo y Pusher
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_WEBSOCKETS_KEY,
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  cluster: 'mt1',
  forceTLS: false,
  disableStats: true,
  // authEndpoint :'http://127.0.0.1:8000/api/broadcasting/auth',
  // auth:{
  //     headers: {
  //         Authorization: 'Bearer '+ localStorage.getItem ('access_token'), 
  //     }
  // },
});

// Crear la instancia de la aplicación
const app = createApp(App);

// Usar los plugins y configuraciones
app.use(router);
app.use(VueAxios, axios);
app.use(VueCryptojs);
app.use(VueSweetalert2);
app.use(VueSignature);
app.component('flip-countdown', Countdown);

// Montar la aplicación
app.mount('#app');

<template>
  <div class="containerPrincipal">
    <div class="videoContainer">
      <video
        src="../assets/video.mp4"
        autoplay
        muted
        loop
        class="videoBackground"
      ></video>
    </div>
    <transition name="fadeOutUpBig" appear>
      <div v-if="toogleLogin" :class="classCardLogin">
        <div class="logo">
          <img src="@/assets/logo1.png" alt="" />
        </div>
        <h2>Acceso candidatos</h2>
        <form>
          <div class="row mb-3">
            <div class="col">
              <label for="exampleInputEmail1" class="form-label"
                >Usuario/correo electrónico:</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                autocomplete="username"
                aria-describedby="prueba"
                v-model="email"
              />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label for="exampleInputPassword1" class="form-label"
                >Contraseña:</label
              >
              <i class="fa fa-search"></i>
              <div class="positionRelative">
                <input
                  :type="!contraseña ? 'password' : 'text'"
                  class="form-control"
                  autocomplete="current-password"
                  id="exampleInputPassword1"
                  v-model="password"
                />
                <div class="positionAbsolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="input-icon password"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    @click="contraseña = !contraseña"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <h6 for="exampleInputPassword1" class="labelPassword">
              ¿Olvidó su contraseña?
            </h6>
          </div>
          <div class="row mb-3">
            <div class="col">
              <button class="btn btn-success" @click="login()">Ingresar</button>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <label for=""
                >¿Aún no tiene cuenta?
                <span
                  @click="toogleRegisterHandler"
                  for="exampleInputPassword1"
                  class="spanRegister"
                >
                  Registrese aquí
                </span></label
              >
            </div>
          </div>
        </form>
      </div>
    </transition>
    <div v-if="toogleRegister">
      <RegistroCandidatos></RegistroCandidatos>
    </div>
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
import { Alerts } from "../Mixins/Alerts.js";
import { Token } from "../Mixins/Token.js";
import RegistroCandidatos from "./RegistroCandidatos.vue";

export default {
  components: {
    RegistroCandidatos,
  },
  mixins: [Token, Alerts],
  data() {
    return {
      classCardLogin: "card animate__animated fadeInDownBig",
      email: "",
      password: "",
      URL_API: process.env.VUE_APP_URL_API,
      contraseña: false,
      RegistroCandidatos,
      toogleRegister: false,
      toogleLogin: true,
    };
  },
  created() {
    this.urlExterna();
    var hashActual = window.location.hash;
    var nuevoHash = "?" + hashActual;
    history.replaceState(null, null, nuevoHash);
  },
  methods: {
    toogleRegisterHandler() {
      this.toogleLogin = false;
      this.toogleRegister = true;
    },
    async login() {
      let self = this;
      let username = { email: this.email, password: this.password };
      try {
        const response = await axios.post(
          self.URL_API + "api/v1/loginCandidatos",
          username
        );
        if (response.data.access_token != undefined) {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("marca_temporalnc", response.data.marca);
          localStorage.setItem("user_type", response.data.user_type);
          self.$router.push("/navbar/landing");
        } else if (response.data.status == "error") {
          self.showAlert(response.data.message, response.data.status);
        }
      } catch (error) {
        console.log(error);
        self.showAlert(error.status, error.message);
      }
    },
  },
};
</script>
<style scoped>
.containerPrincipal {
  padding: 0px;
  height: 100vh;
  position: relative;
  overflow: hidden;
  width: 100vw;
}
.card {
  width: 30em;
  margin: auto;
  margin-top: 5vh;
  padding: 2.5em;
  background-color: rgba(239, 237, 237, 1);
  min-width: 350px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  position: absolute;
  z-index: 100;
  left: 35%;
  animation: fadeInDownBig; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s;
}

label {
  float: left;
  text-align: left;
}

.form-control {
  background-color: white;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}
video {
  width: 100%;
}
button {
  width: 100%;
}
.positionRelative {
  position: relative;
}
.logo {
  width: 150px;
  margin: auto;
  border-radius: 15px;
}
.logoRegister {
  width: 80px;
  margin-top: 0px;
}
.logo img {
  width: 100%;
  border-radius: 15px;
}

#emailHelp {
  color: red;
}
.labelPassword {
  text-align: right;
  color: rgb(67, 151, 196);
  text-decoration: underline;
}
.labelPassword:hover {
  text-align: right;
  color: rgb(45, 93, 117);
  text-decoration: underline;
  cursor: pointer;
}
.spanRegister {
  color: rgb(67, 151, 196);
  text-decoration: underline;
  cursor: pointer;
}
.spanRegister:hover {
  color: rgb(45, 93, 117);
  text-decoration: underline;
  cursor: pointer;
}
.input-icon {
  color: #191919;

  width: 20px;
  height: 20px;
}
.positionAbsolute {
  position: absolute;
  left: 92%;
  top: 2.5em;
}
.input-icon.password {
  left: unset;
  right: 40px;
  top: unset;
  bottom: 110px;
  cursor: pointer;
}
.videoContainer {
  z-index: 0;
  position: absolute;

  width: 100%;
  opacity: 0.3;
}
.fadeOutUpBig-enter-active {
  animation: fadeInDownBig 1s; /* Animate.css: animación de entrada */
}
.fadeOutUpBig-leave-active {
  animation: fadeOutUpBig 1s; /* Animate.css: animación de salida */
}
</style>

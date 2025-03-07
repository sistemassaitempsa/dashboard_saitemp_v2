<template>
  <div class="containerPrincipal">
    <div class="videoContainer">
      <!--      <video
        src="../assets/video.mp4"
        autoplay
        muted
        loop
        class="videoBackground"
      ></video>
      <div class="background_color"></div> -->
      <img
        src="@/assets/imgLogin2.jpg"
        alt=""
        class="imgLogin"
        v-if="toogleRegister == false"
      />
      <img src="@/assets/imgLogin3.jpg" alt="" class="imgLogin" v-else />
      <div
        :class="
          toogleRegister == false
            ? 'background_color'
            : 'background_color background_color_register'
        "
      ></div>
    </div>
    <div v-if="toogleLogin" :class="classCardLogin">
      <div class="logosContainer">
        <div class="logo saitemp">
          <img src="@/assets/logo1.png" alt="" />
        </div>
        <div class="logo">
          <img src="@/assets/logoAlInstante.png" alt="" />
        </div>
      </div>
      <h2 class="mb-5">Iniciar sesión</h2>
      <form>
        <div class="row mb-4">
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

        <div class="row mb-4">
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
        <div class="row mb-4">
          <router-link to="/recuperarcontrasena">
            <h6
              for="exampleInputPassword1"
              class="labelPassword"
              @click="goToRecoverPassword"
            >
              ¿Olvidó su contraseña?
            </h6>
          </router-link>
        </div>
        <div class="row mb-4">
          <div class="col">
            <button class="btn btn-success" @click="login()">Ingresar</button>
          </div>
        </div>
        <div class="row">
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

    <div class="registerContainer" v-if="toogleRegister">
      <RegistroCandidatos
        @toogleRegisterChild="toogleLoginrHandler"
      ></RegistroCandidatos>
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
      classCardLogin: "card animate__animated animate__fadeInDownBig",
      email: "",
      password: "",
      URL_API: process.env.VUE_APP_URL_API,
      contraseña: false,
      RegistroCandidatos,
      toogleRegister: false,
      toogleLogin: true,
    };
  },
  async mounted() {
    const token_confirmacion = this.$route.query.token;
    const email_confirmacion = this.$route.query.email;
    const self = this;
    if (token_confirmacion && email_confirmacion) {
      try {
        const clienteConfirmacion = {
          token: token_confirmacion,
          email: email_confirmacion,
        };
        const response = await axios.post(
          self.URL_API + "api/v1/verificarCorreo",
          clienteConfirmacion
        );
        this.showAlertConfirm(response.data.message, response.data.status);
      } catch (error) {
        this.showAlert(
          "Error al verificar el correo, contacte con el administrador",
          "error"
        );
      }
    }
  },
  created() {
    this.urlExterna();
    var hashActual = window.location.hash;
    var nuevoHash = "?" + hashActual;
    history.replaceState(null, null, nuevoHash);
  },
  methods: {
    toogleRegisterHandler() {
      this.toogleLogin = !this.toogleLogin;
      this.toogleRegister = !this.toogleRegister;
    },
    toogleLoginrHandler() {
      this.toogleRegister = !this.toogleRegister;
      this.toogleLogin = !this.toogleLogin;
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
          console.log(response.data.tipo_usuario_id);
          if (
            response.data.tipo_usuario_id &&
            response.data.tipo_usuario_id == "3"
          ) {
            self.$router.push("/navbar/formularioinfocandidato");
          } else {
            self.$router.push("/navbar/landing");
          }
        } else if (response.data.status == "error") {
          self.showAlert(response.data.message, response.data.status);
        }
      } catch (error) {
        console.log(error);
        self.showAlert(error.response.data.message, "error");
      }
    },
  },
};
</script>
<style scoped>
.btn-success {
  background: linear-gradient(
    90deg,
    rgba(0, 107, 63, 1) 0%,
    rgba(19, 114, 148, 1) 51%,
    rgba(26, 148, 56, 1) 100%
  );
  transition: all 0.5s ease-out;
  border: none;
  color: white;
  position: relative;
  overflow: hidden;
}

.btn-success:hover {
  background: linear-gradient(
    90deg,
    rgba(0, 107, 63, 1) 0%,
    rgba(19, 114, 148, 1) 100%
  );
  background-size: 200% auto;
  background-position: right center;
}
.btn-success::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.btn-success:hover::before {
  left: 100%;
}
.containerPrincipal {
  display: flex;
  min-height: 100vh;
  position: relative;
  justify-content: center;
  align-items: center;
}
.card {
  right: -25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 30em;
  margin: auto;
  padding: 4em;
  padding-top: 4em;
  padding-bottom: 4em;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  position: relative;
  z-index: 100;
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
  box-sizing: content-box;
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
  margin-bottom: 1em;
}
.logoRegister {
  width: 80px;
  margin-top: 0px;
}
.logo img {
  width: 100%;
}

#emailHelp {
  color: red;
}
.imgLogin {
  width: 100%;
  box-sizing: content-box;
  position: absolute;
  right: 0%;
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
  height: 100%;
  width: 100%;
  overflow: hidden;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.background_color {
  height: 180%;
  width: 100%;
  position: absolute;
  top: -20%;
  left: 45%;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.479) 0%,
    rgba(255, 255, 255, 0.623) 10%,
    rgba(255, 255, 255, 1) 20%,
    rgba(255, 255, 255, 1) 100%
  );
}
.background_color_register {
  left: -45%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 70%,
    rgba(255, 255, 255, 0.623) 80%,
    rgba(255, 255, 255, 0.479) 90%,
    rgba(255, 255, 255, 0.479) 100%
  );
}
.fadeOutUpBig-enter-active {
  animation: fadeInDownBig 1s; /* Animate.css: animación de entrada */
}
.fadeOutUpBig-leave-active {
  animation: fadeOutUpBig 1s; /* Animate.css: animación de salida */
}

.fadeInUpBig-enter-active {
  animation: fadeInUpBig 1s; /* Animate.css: animación de entrada */
}
.fadeInUpBig-leave-active {
  animation: fadeOutDownBig 1s; /* Animate.css: animación de salida */
}
.registerContainer {
  width: 60%;
}
@media (max-width: 1100px) {
  .card {
    right: 0;
  }
  .imgLogin {
    object-fit: fill;
    right: 0;
    position: relative;
  }
  .background_color {
    top: 0%;
    left: 0%;
    border-radius: 0%;
    background: linear-gradient(
      90deg,
      rgba(0, 107, 62, 0.712) 10%,
      rgba(19, 114, 148, 0.616) 20%,
      rgba(26, 148, 56, 0.562) 100%
    );
  }
}
@media (max-width: 768px) {
  .containerPrincipal {
    overflow: auto;
  }
  .registerContainer {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .containerPrincipal {
    overflow: auto;
  }
}
.videoBackground {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.logosContainer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0;
  width: 90%;
}
.saitemp {
  width: 100px;
}
</style>

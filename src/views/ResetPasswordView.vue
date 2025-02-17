<template>
  <div class="containerPrincipal">
    <!-- Contenedor del Video de Fondo -->
    <div class="videoContainer">
      <img src="@/assets/imgLogin4.jpg" alt="" class="imgLogin" />
      <div class="background_color"></div>
    </div>

    <!-- Contenedor de la Tarjeta para Recuperar Contraseña -->
    <div class="containerRecoverPassword card">
      <div class="logosContainer mb-3">
        <div class="logo saitemp">
          <img src="@/assets/logo1.png" alt="Logo Saitemp" />
        </div>
        <div class="logo">
          <img src="@/assets/logoAlInstante.png" alt="Logo Al Instante" />
        </div>
      </div>

      <h2>Recuperar contraseña</h2>

      <div class="row completeWidth">
        <p class="row_p">Ingrese su nueva clave y confírmela.</p>
      </div>

      <form @submit.prevent="cambiarContrasena">
        <div class="row mb-3">
          <div class="col">
            <label for="password" class="form-label">Contraseña nueva</label>
            <input
              :type="contraseña ? 'password' : 'text'"
              class="form-control"
              v-model="cliente.password"
              @focus="isFocusPassword = true"
              @input="validatePassword(cliente.password)"
              @blur="isFocusPassword = false"
              :class="{ 'is-invalid': passwordError }"
              required
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
            <div v-if="passwordError" class="invalid-feedback">
              {{ passwordError }}
            </div>
          </div>
        </div>

        <div class="row mb-4 nom_border">
          <div class="col">
            <label for="confirmPassword" class="form-label"
              >Confirme contraseña</label
            >

            <input
              id="confirmPassword"
              :type="confirmContraseña ? 'password' : 'text'"
              class="form-control"
              v-model="cliente.password_confirmation"
              required
              @focus="isFocusPasswordConfirmation = true"
              @blur="isFocusPasswordConfirmation = false"
              @input="validatePasswordConfimation"
              @paste.prevent
              :class="{ 'is-invalid': errorConfirmationPassword }"
            />
            <div class="positionAbsolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="input-icon password"
                viewBox="0 0 20 20"
                fill="currentColor"
                @click="confirmContraseña = !confirmContraseña"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              v-show="errorConfirmationPasswordStyle"
              class="invalid-feedback"
            >
              {{ errorConfirmationPassword }}
            </div>
          </div>
        </div>

        <div class="row nom_border">
          <div class="col">
            <button
              :disabled="disabledButton"
              class="btn btn-success w-100"
              type="submit"
              @click="cambiarContrasena"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// imports
import { ref, reactive, onBeforeMount } from "vue";
import { useValidation } from "../composables/useValidations";
import { useRoute, useRouter } from "vue-router";
import { useAlerts } from "@/composables/useAlerts";
import axios from "axios";

//variables
const URL_API = process.env.VUE_APP_URL_API;
const { passwordError, validatePassword } = useValidation();
const { showAlert } = useAlerts();
const errorConfirmationPassword = ref("");
const route = useRoute();
const router = useRouter();
const errorConfirmationPasswordStyle = ref(true);
const cliente = reactive({
  email: route.query.email,
  password: "",
  password_confirmation: "",
  token: route.query.token,
});
const disabledButton = ref(true);
const contraseña = ref(true);
const confirmContraseña = ref(true);

// Metodos
const diableButtonHandle = () => {
  if (
    validatePassword(cliente.password) &&
    errorConfirmationPasswordStyle.value == false
  ) {
    disabledButton.value = false;
  }
};
const validatePasswordConfimation = () => {
  if (cliente.password_confirmation == "") {
    errorConfirmationPassword.value = "Campo requerido";
    errorConfirmationPasswordStyle.value = true;
  } else if (cliente.password_confirmation != cliente.password) {
    errorConfirmationPassword.value = "Las contraseñas deben ser idénticas";
    errorConfirmationPasswordStyle.value = true;
  } else {
    errorConfirmationPassword.value = "";
    errorConfirmationPasswordStyle.value = false;
  }
  diableButtonHandle();
};

const limpiarFormulario = () => {
  (cliente.email = route.query.email),
    (cliente.password = ""),
    (cliente.password_confirmation = ""),
    (cliente.token = route.query.token),
    (errorConfirmationPasswordStyle.value = true);
  errorConfirmationPassword.value = "";
  disabledButton.value = true;
};
// Función para enviar el formulario
const cambiarContrasena = async () => {
  if (!cliente.token || !cliente.email) {
    showAlert(
      "Ingrese nuevamente al link enviado al correo asociado a la cuenta",
      "error"
    );
    return;
  }
  if (
    validatePassword(cliente.password) &&
    errorConfirmationPasswordStyle.value == false
  ) {
    try {
      const response = await axios.post(
        URL_API + "api/v1/recuperarcontrasena",
        cliente
      );
      showAlert(response.data.message, response.data.status);
      limpiarFormulario();

      if (response.data.status == "success") {
        router.push("/logincandidatos");
      }
    } catch (error) {
      showAlert("Ha ocurrido un error al procesar la solcitud", "error");
    }
  }
};

//ciclo de vida
onBeforeMount(() => {
  validatePassword(cliente.password);
  validatePasswordConfimation();
});
</script>

<style scoped>
/* Ajustes Generales */
label {
  float: left;
}
.completeWidth {
  width: 105%;
}

/* Botón con degradado y efecto hover */
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

.positionAbsolute {
  position: absolute;
  left: 98%;
  top: 2.5em;
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

/* Contenedor Principal */
.containerPrincipal {
  display: flex;
  min-height: 100vh;
  position: relative;
  justify-content: center;
  align-items: center;
}

/* Tarjeta (Recuperar Contraseña) */
.card {
  width: 30em;
  margin: auto;
  padding: 4em;
  background-color: rgb(255, 255, 255);
  min-width: 350px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  position: relative;
  z-index: 100;
  right: -25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeInDownBig; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s;
}

/* Líneas divisorias en los .row (opcional) */
.row {
  border-top: solid rgb(206, 206, 206) 1px;
}

.nom_border {
  border: 0;
}

/* Texto dentro de .row */
.row_p {
  margin-top: 1.5em;
  text-align: center;
}

/* Espaciado en las columnas */
.col {
  margin-top: 1.5em;
  position: relative;
}
.input-icon {
  color: #191919;
  width: 20px;
  height: 20px;
}
.input-icon.password {
  left: unset;
  right: 40px;
  top: unset;
  bottom: 110px;
  cursor: pointer;
}
/* Logotipos */
.logosContainer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

.logo {
  width: 150px;
  margin-bottom: 1em;
}

.imgLogin {
  width: 100%;
  box-sizing: content-box;
  position: absolute;
  right: 0%;
}
.logo img {
  width: 100%;
}

.saitemp {
  width: 100px;
}
/* Video de Fondo */
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

.videoBackground {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
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

/* Responsividad */
@media (max-width: 768px) {
  .containerPrincipal {
    overflow-y: scroll;
  }
  .card {
    width: 90%;
    padding: 3em;
    margin-top: 2vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .logosContainer {
    flex-direction: column;
    gap: 1em;
  }

  .logo {
    width: 120px;
  }
}

@media (max-width: 480px) {
  .card {
    width: 95%;
    padding: 2em;
  }

  .logo {
    width: 100px;
  }
}
</style>

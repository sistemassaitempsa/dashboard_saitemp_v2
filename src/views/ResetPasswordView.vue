<template>
  <div class="containerPrincipal">
    <!-- Contenedor del Video de Fondo -->
    <div class="videoContainer">
      <video
        src="../assets/video.mp4"
        autoplay
        muted
        loop
        class="videoBackground"
      ></video>
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
  padding: 0;
  height: 100vh;
  position: relative;
  width: 100%;
  overflow: hidden; /* Evita scroll inesperado por el video */
}

/* Tarjeta (Recuperar Contraseña) */
.card {
  max-width: 500px; /* Máximo ancho para la tarjeta */
  width: 90%; /* Ocupa el 90% del ancho de la pantalla */
  padding: 4em;
  background-color: #fff;
  margin: auto;
  margin-top: 5vh;
  min-width: 300px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  border-radius: 10px;
  position: absolute;
  top: 45%; /* Ubicación vertical en el medio */
  left: 50%; /* Ubicación horizontal en el medio */
  transform: translate(-50%, -50%); /* Centra la tarjeta */
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  width: 100%;
  height: 100%;
  opacity: 0.8;
  overflow: hidden;
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
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 107, 62, 0.8) 0%,
    rgba(19, 114, 148, 0.8) 51%,
    rgba(26, 148, 56, 0.8) 100%
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

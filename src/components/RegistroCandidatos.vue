<template>
  <transition name="fadeInUpBig" appear>
    <div class="cardRegister">
      <div class="principalContainerRegister">
        <div class="logosContainer">
          <div class="logo saitemp">
            <img src="@/assets/logo1.png" alt="" />
          </div>
          <div class="logo">
            <img src="@/assets/logoAlInstante.png" alt="" />
          </div>
        </div>
        <form class="formRegister" action="">
          <h2 class="mb-5">Crea tu cuenta</h2>
          <div class="row mb-4">
            <div class="col">
              <label for="" class="form-label">Nombres:*</label>
              <input
                type="text"
                v-model="cliente.nombre"
                class="form-control"
                @focus="isFocusNombre = true"
                @blur="isFocusNombre = false"
                required
                :class="{ 'is-invalid': !cliente.nombre }"
              />

              <div v-if="cliente.nombre == ''" class="invalid-feedback">
                {{ error }}
              </div>
            </div>
            <div class="col">
              <label for="" class="form-label">Apellidos:*</label>
              <input
                type="text"
                class="form-control"
                v-model="cliente.apellidos"
                @focus="isFocusApellidos = true"
                @blur="isFocusApellidos = false"
                :class="{ 'is-invalid': !cliente.apellidos }"
                required
              />

              <div v-if="cliente.apellidos == ''" class="invalid-feedback">
                {{ error }}
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <label for="" class="form-label">Teléfono celular:*</label>
              <input
                type="text"
                class="form-control"
                v-model="cliente.telefono"
                @focus="isFocusTel = true"
                @blur="isFocusTel = false"
                :class="{ 'is-invalid': !cliente.telefono }"
                maxlength="10"
              />

              <div v-if="cliente.telefono == ''" class="invalid-feedback">
                {{ error }}
              </div>
            </div>
            <div class="col">
              <label for="" class="form-label">Tipo de documento:*</label>
              <select
                class="form-select"
                name=""
                id=""
                v-model="cliente.doc_tip_id"
              >
                <option
                  v-for="tipo_doc in tiposDocumentos"
                  :value="tipo_doc.cod_tip"
                  :key="tipo_doc.cod_tip"
                >
                  {{ tipo_doc.des_tip }}
                </option>
              </select>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <label for="" class="form-label">Numero de documento:*</label>
              <input
                type="text"
                class="form-control"
                v-model="cliente.numero_documento"
                @focus="isFocusNumDoc = true"
                @input="validateNumeroDocumento(cliente.numero_documento)"
                @blur="isFocusNumDoc = false"
                :class="{ 'is-invalid': numeroDocumentoError }"
                required
              />

              <div v-if="numeroDocumentoError" class="invalid-feedback">
                {{ numeroDocumentoError }}
              </div>
            </div>
            <div class="col">
              <label for="" class="form-label"
                >Confirme número de documento:*</label
              >
              <input
                type="text"
                class="form-control"
                v-model="numero_documento_confirmation"
                @focus="isFocusNumDocConfirmation = true"
                @input="validateNumeroDocConfimation"
                @blur="isFocusNumDocConfirmation = false"
                @paste.prevent
                :class="{ 'is-invalid': errorConfirmationStyle }"
                required
              />

              <div v-if="errorConfirmationStyle" class="invalid-feedback">
                {{ errorConfirmationNumDoc }}
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col">
              <label for="" class="form-label">Correo electónico:*</label>
              <input
                type="text"
                class="form-control"
                v-model="cliente.email"
                @focus="isFocusEmail = true"
                @input="validateEmail(cliente.email)"
                @blur="isFocusEmail = false"
                :class="{ 'is-invalid': emailError }"
                required
              />
              <div v-if="emailError" class="invalid-feedback">
                {{ emailError }}
              </div>
            </div>
            <div class="col">
              <label for="" class="form-label"
                >Confirme correo electrónico</label
              >
              <input
                type="text"
                class="form-control"
                v-model="email_confirmation"
                @focus="isFocusEmailConfirmation = true"
                @input="validateEmailConfimation"
                @blur="isFocusEmailConfirmation = false"
                @paste.prevent
                :class="{ 'is-invalid': errorConfirmationEmail }"
                required
              />
              <div v-if="errorConfirmationEmailStyle" class="invalid-feedback">
                {{ errorConfirmationEmail }}
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <label for="" class="form-label">Contraseña:*</label>
              <input
                type="password"
                class="form-control"
                v-model="cliente.password"
                @focus="isFocusPassword = true"
                @input="validatePassword(cliente.password)"
                @blur="isFocusPassword = false"
                :class="{ 'is-invalid': passwordError }"
                required
              />

              <div v-if="passwordError" class="invalid-feedback">
                {{ passwordError }}
              </div>
            </div>
            <div class="col">
              <label for="" class="form-label">Confirme contraseña:*</label>
              <input
                type="password"
                class="form-control"
                v-model="cliente.password_confirmation"
                @focus="isFocusPasswordConfirmation = true"
                @blur="isFocusPasswordConfirmation = false"
                @input="validatePasswordConfimation"
                @paste.prevent
                required
                :class="{ 'is-invalid': errorConfirmationPassword }"
              />

              <div
                v-show="errorConfirmationPasswordStyle"
                class="invalid-feedback"
              >
                {{ errorConfirmationPassword }}
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  :checked="autorizacion"
                  type="checkbox"
                  class="form-check-input"
                  name=""
                  id=""
                  v-model="autorizacion"
                />He leído y acepto la
                <span class="spanRegister"
                  >Política de Tratamiento de Datos Personales de Saitemp
                  S.A.</span
                >, autorizando el uso de mis datos conforme a lo establecido en
                dicha política.
              </label>
            </div>
          </div>
          <div class="row mb-4 mb-4">
            <div class="col">
              <button class="btn btn-success" @click="saveForm">
                Registrarse
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for=""
                >¿Ya se encuentra registrado?
                <span
                  @click="emitLoginToggle"
                  for="exampleInputPassword1"
                  class="spanRegister"
                >
                  Ingrese aquí
                </span></label
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>
<script setup>
//imports
import { defineEmits } from "vue";
import { ref } from "vue";
import axios from "axios";
import { onMounted, onBeforeMount } from "vue";
import { reactive } from "vue";
import { useAlerts } from "@/composables/useAlerts";
import { useValidation } from "../composables/useValidations";

//variables
const {
  emailError,
  numeroDocumentoError,
  passwordError,
  validateEmail,
  validatePassword,
  validateNumeroDocumento,
  validateForm,
} = useValidation();
const { showAlert } = useAlerts();
const URL_API = process.env.VUE_APP_URL_API;
const emit = defineEmits(["toogleRegisterChild"]);
const tiposDocumentos = ref([]);
const numero_documento_confirmation = ref("");
const email_confirmation = ref("");
let cliente = reactive({
  nombre: "",
  apellidos: "",
  numero_documento: "",
  email: "",
  password: "",
  password_confirmation: "",
  telefono: "",
  doc_tip_id: "01",
});
const autorizacion = ref(false);
const error = "Campo requerido";
const errorConfirmationNumDoc = ref("");
const errorConfirmationEmail = ref("");
const errorConfirmationPassword = ref("");
const errorConfirmationPasswordStyle = ref(true);
const errorConfirmationEmailStyle = ref(true);
const errorConfirmationStyle = ref(true);
const isFocusNombre = ref(false);
const isFocusApellidos = ref(false);
const isFocusNumDoc = ref(false);
const isFocusNumDocConfirmation = ref(false);
const isFocusTel = ref(false);
const isFocusEmail = ref(false);
const isFocusEmailConfirmation = ref(false);
const isFocusPassword = ref(false);
const isFocusPasswordConfirmation = ref(false);

//funciones
const emitLoginToggle = () => {
  emit("toogleRegisterChild");
};
const getTiposDocumento = async () => {
  const response = await axios.get(URL_API + "api/v1/tipoIdFormularioEmpleado");
  tiposDocumentos.value = response.data;
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
};
const validateEmailConfimation = () => {
  if (email_confirmation.value == "") {
    errorConfirmationEmail.value = "Campo requerido";
    errorConfirmationEmailStyle.value = true;
  } else if (email_confirmation.value != cliente.email) {
    errorConfirmationEmail.value = "Los correos deben ser idénticos";
    errorConfirmationEmailStyle.value = true;
  } else {
    errorConfirmationEmail.value = "";
    errorConfirmationEmailStyle.value = false;
  }
};

const validateNumeroDocConfimation = () => {
  if (numero_documento_confirmation.value == "") {
    errorConfirmationNumDoc.value = "Campo requerido";
    errorConfirmationStyle.value = true;
  } else if (numero_documento_confirmation.value != cliente.numero_documento) {
    errorConfirmationNumDoc.value =
      "Los números de documento deben ser idénticos";
    errorConfirmationStyle.value = true;
  } else {
    errorConfirmationNumDoc.value = "";
    errorConfirmationStyle.value = false;
  }
};
const limpiarFormulario = () => {
  numero_documento_confirmation.value = "";
  email_confirmation.value = "";
  cliente = {
    nombre: "",
    apellidos: "",
    numero_documento: "",
    email: "",
    password: "",
    password_confirmation: "",
    telefono: "",
    doc_tip_id: "01",
  };
  autorizacion.value = false;
  errorConfirmationNumDoc.value = "";
  errorConfirmationEmail.value = "";
  errorConfirmationPassword.value = "";
  errorConfirmationPasswordStyle.value = true;
  errorConfirmationEmailStyle.value = true;
  errorConfirmationStyle.value = true;
  isFocusNombre.value = false;
  isFocusApellidos.value = false;
  isFocusNumDoc.value = false;
  isFocusNumDocConfirmation.value = false;
  isFocusTel.value = false;
  isFocusEmail.value = false;
  isFocusEmailConfirmation.value = false;
  isFocusPassword.value = false;
  isFocusPasswordConfirmation.value = false;
  validateEmail(cliente.email);
  validatePassword(cliente.password);
  validateNumeroDocumento(cliente.numero_documento);
  validatePasswordConfimation();
  validateEmailConfimation();
  validateNumeroDocConfimation();
};
const saveForm = async () => {
  if (autorizacion.value) {
    if (
      validateForm(cliente) &&
      errorConfirmationPasswordStyle.value == false &&
      errorConfirmationEmailStyle.value == false &&
      errorConfirmationStyle.value == false &&
      cliente.nombre != "" &&
      cliente.apellidos != "" &&
      cliente.telefono != ""
    ) {
      try {
        const response = await axios.post(
          URL_API + "api/v1/registerCandidatos",
          cliente
        );
        limpiarFormulario();
        showAlert(response.data.message, response.data.status);
        emitLoginToggle();
      } catch (error) {
        if (error.status == 422) {
          showAlert(error.response.data.message, "error");
          console.log(error);
        }
      }
    } else {
      showAlert("Verifique los campos necesarios", "error");
    }
  } else {
    showAlert("Debe aceptar la politica de tratamiento de datos", "error");
  }
};

//ciclo de vida
onBeforeMount(() => {
  getTiposDocumento();
  validateEmail(cliente.email);
  validatePassword(cliente.password);
  validateNumeroDocumento(cliente.numero_documento);
  validatePasswordConfimation();
  validateEmailConfimation();
  validateNumeroDocConfimation();
});
onMounted(() => {});
</script>

<style scoped>
/* Contenedor Principal */
label {
  float: left;
}
.cardRegister {
  right: -30%;
  width: 80%;
  max-width: 1000px;
  margin: 1vh auto;
  padding: 4em;
  padding-top: 4em;
  padding-bottom: 4em;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  border-radius: 10px;
  z-index: 100;
  position: relative;
}
.btn-success {
  background: linear-gradient(
    90deg,
    rgba(0, 107, 63, 1) 0%,
    rgba(19, 114, 148, 1) 51%,
    rgba(26, 148, 56, 1) 100%
  );
  transition: all 0.5s ease-out; /* Cambiado a 0.5s */
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
  background-position: right center; /* Crea efecto de movimiento */
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
  transition: all 0.5s;
}

.btn-success:hover::before {
  left: 100%;
}
/* Contenedor del Logo y Formulario */
.principalContainerRegister {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.logosContainer {
  display: flex;
  gap: 20%;
}

/* Logo */
.logo {
  width: 200px;
  margin: auto;
  margin-bottom: 1em;
}

.logo img {
  width: 100%;
}
.saitemp {
  width: 150px;
}
/* Formulario */
.formRegister {
  width: 100%;
}

/* Fila y Columna */

.col {
  flex: 1;
  min-width: 250px;
  padding: 0 0.5rem;
}

/* Grupo de Etiqueta Flotante */
.floating-label-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.floating-label-group .form-control,
.floating-label-group .form-select {
  width: 100%;
  padding: 12px 12px;
  font-size: 16px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

.floating-label-group .form-control:focus,
.floating-label-group .form-select:focus {
  border-color: #4285f4;
  outline: none;
}

.floating-label-group label {
  position: absolute;
  left: 15px;
  top: 12px;
  color: #aaa;
  font-size: 16px;
  background-color: white;
  padding: 0 5px;
  transition: 0.2s ease all;
  pointer-events: none;
}

.floating-label-group label.active {
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: #333;
}

/* Botón de Registro */

/* Enlace a Login */
.spanRegister {
  color: #4397c4;
  text-decoration: underline;
  cursor: pointer;
}

.spanRegister:hover {
  color: #2d5d75;
}

/* Alertas de Validación */
.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875em;
  margin-top: 0.25rem;
}

/* Animaciones */
.fadeInUpBig-enter-active {
  animation: fadeInUpBig 1s;
}

.fadeInUpBig-leave-active {
  animation: fadeOutDownBig 1s;
}

/* Animaciones Personalizadas (Puedes ajustar o eliminar estas animaciones según tus necesidades) */
@keyframes fadeInUpBig {
  from {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeOutDownBig {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

/* Responsividad */
@media (max-width: 768px) {
  .logosContainer {
    width: 80%;
  }
  .logo {
    width: 150px;
    margin: auto;
    margin-bottom: 1em;
  }
  .saitemp {
    width: 100px;
  }
  .cardRegister {
    left: 5%;
  }
  .principalContainerRegister {
    flex-direction: column;
    gap: 2em;
  }
  .row mb-4 {
    flex-direction: column;
  }

  .col {
    padding: 0;
    margin-bottom: 1rem;
  }

  .formRegister {
    padding: 0 1rem;
  }

  .cardRegister {
    padding: 2em 1em;
  }
}

@media (max-width: 480px) {
  .floating-label-group label.active {
    left: 8px;
  }

  .floating-label-group .form-control,
  .floating-label-group .form-select {
    padding: 10px 10px;
  }
}
</style>

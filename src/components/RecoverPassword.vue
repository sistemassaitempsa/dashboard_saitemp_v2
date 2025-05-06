<template>
  <div class="containerPrincipal">
    <Loading :loading="loading" />
    <div class="videoContainer">
      <img src="@/assets/imgLogin4.jpg" alt="" class="imgLogin" />
      <div class="background_color"></div>
    </div>
    <div class="containerRecoverPassword card">
      <div class="logosContainer mb-3">
        <div class="logo saitemp">
          <img src="@/assets/logo1.png" alt="" />
        </div>
        <div class="logo">
          <img src="@/assets/logoAlInstante.png" alt="" />
        </div>
      </div>
      <h2>Recuperar contaseña</h2>
      <div class="row">
        <p class="row_p">
          Ingrese su número de documento de identidad y el tipo de documento.
        </p>
      </div>
      <form action="">
        <div class="row mb-4 nom_border">
          <div class="col">
            <label for="" class="form-label">Tipo de documento:</label>
            <select
              name=""
              id=""
              class="form-select"
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
        <div class="row mb-3">
          <div class="col">
            <label for="" class="form-label">Número de documento:</label>
            <input
              type="text"
              class="form-control"
              required
              v-model="cliente.num_doc"
              @input="validateNumeroDocumento(cliente.num_doc)"
              :class="{ 'is-invalid': numeroDocumentoError }"
            />
          </div>
        </div>

        <div class="row nom_border">
          <div class="col">
            <button class="btn btn-success" @click="recuperarContrasenaHandle">
              Recuperar contraseña
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
//imports
import { ref, reactive, onBeforeMount } from "vue";
import axios from "axios";
import { useValidation } from "@/composables/useValidations";
import { useAlerts } from "@/composables/useAlerts";
import Loading from "./Loading.vue";

//variables

const { showAlert, showAlertConfirm } = useAlerts();
const URL_API = process.env.VUE_APP_URL_API;
const { validateNumeroDocumento, numeroDocumentoError } = useValidation();
const cliente = reactive({
  num_doc: "",
  doc_tip_id: "",
});
const tiposDocumentos = ref([]);
const loading = ref(false);

//metodos

const limpiarFormulario = () => {
  cliente.num_doc = "";
  cliente.doc_tip_id = "";
};
const recuperarContrasenaHandle = async () => {
  loading.value = true;
  const response = await axios.post(
    `${URL_API}api/v1/enviartoken/${cliente.num_doc}`,
    cliente
  );
  if (response.data.status == "success") {
    showAlertConfirm(
      "Verifique el correo electrónico asociado a su cuenta",
      "success"
    );
    limpiarFormulario();
    loading.value = false;
    return;
  }
  loading.value = false;
  showAlert(
    "Error al intentar recuperar esta cuenta, verifique los datos",
    "error"
  );
};
const getTiposDocumento = async () => {
  const response = await axios.get(URL_API + "api/v1/tipoIdFormularioEmpleado");
  tiposDocumentos.value = response.data;
};

//ciclo de vida
onBeforeMount(() => {
  getTiposDocumento();
  validateNumeroDocumento();
});
</script>
<style scoped>
label {
  float: left;
}
.btn-success {
  background: linear-gradient(
    90deg,
    rgba(22, 119, 115, 1) 0%,
    rgba(48, 159, 128, 1) 50%,
    rgba(4, 66, 105, 1) 100%
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
.row {
  border-top: solid rgb(206, 206, 206) 1px;
}
.nom_border {
  border: 0;
}
.row_p {
  margin-top: 1.5em;
  text-align: left;
}
.col {
  margin-top: 1.5em;
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
video {
  box-sizing: content-box;
}
.imgLogin {
  width: 100%;
  box-sizing: content-box;
  position: absolute;
  right: 0%;
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

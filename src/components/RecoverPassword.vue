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
        <div class="row nom_border">
          <div class="col">
            <button class="btn btn-success">Recuperar contraseña</button>
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

//variables
const URL_API = process.env.VUE_APP_URL_API;
const { validateNumeroDocumento, numeroDocumentoError } = useValidation();
const cliente = reactive({
  num_doc: "",
  doc_tip_id: "",
});
const tiposDocumentos = ref([]);

//metodos
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
  transition: 0.5s;
}

.btn-success:hover::before {
  left: 100%;
}
.containerPrincipal {
  padding: 0px;
  height: 100vh;
  position: relative;
  width: 100%;
}
.card {
  width: 30em;
  margin: auto;
  margin-top: 5vh;
  padding: 4em;
  background-color: rgb(255, 255, 255);
  min-width: 350px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  position: absolute;
  z-index: 100;
  left: 35%;
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
.videoContainer {
  z-index: 0;
  position: absolute;
  width: 100%;
  overflow: hidden;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
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
.background_color {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 107, 62, 0.801) 0%,
    rgba(19, 114, 148, 0.815) 51%,
    rgba(26, 148, 56, 0.801) 100%
  );
}
</style>

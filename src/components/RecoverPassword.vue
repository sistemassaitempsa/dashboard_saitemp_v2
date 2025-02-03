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
    <div class="containerRecoverPassword card">
      <div class="logo">
        <img src="@/assets/logo1.png" alt="" />
      </div>
      <h2>Recuperar contaseña</h2>
      <div class="row">
        <p class="row_p">
          Ingrese su número de documento de identidad y el tipo de documento.
        </p>
      </div>
      <form action="">
        <div class="row">
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
.containerPrincipal {
  padding: 0px;
  height: 100vh;
  position: relative;
  width: 100%;
}
.card {
  width: 30em;
  margin: auto;
  margin-top: 10vh;
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
video {
  box-sizing: content-box;
}
.videoContainer {
  z-index: 0;
  position: absolute;
  width: 100%;
  overflow: hidden;
  opacity: 0.3;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

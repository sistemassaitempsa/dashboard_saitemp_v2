<template>
  <div class="container">
    <h2>{{ titulo }}</h2>
    <form class="was-validated" @submit.prevent="save">
      <button class="btn btn-success btn-sm" type="submit">Guardar</button>
      <div v-for="(item, index) in asignacion_estados" :key="item.id">
        <div class="row">
          <div class="col input">
            <label class="form-label">{{ item.nombre_modulo_solicitd }}</label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="fecha_expedicion"
              aria-describedby="emailHelp"
              v-model="item.descripcion_solicitud"
              disabled
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <SearchList
              :nombreCampo="item.nombre_modulo_estados"
              @getEstadosOrdenServicio="getEstadosOrdenServicio"
              eventoCampo="getEstadosOrdenServicio"
              nombreItem="nombre"
              :consulta="consulta_estado_ingreso1"
              :registros="estados_ingreso"
              :orden-campo="index"
              placeholder="Seleccione una opción"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SearchList from "./SearchList.vue";
import axios from "axios";
import { useConfig } from "../composables/token";
import { Alerts } from "../composables/Alerts";

const { URL_API, configHeader } = useConfig();
const { showAlert } = Alerts();



let titulo = ref("Asignación de estados");
let mensaje_error = ref("¡Este campo debe ser diligenciado!");
let consulta_estado_ingreso1 = ref("");
let estados_ingreso = ref([]);
let asignacion_estados = ref([]);

getEstadosOrdenServicio();
getAsignacionEstados();

function getEstadosOrdenServicio(item = null, orden) {
  if (item != null && orden != undefined) {
    asignacion_estados.value[orden].estado_id = item.id;
  }
  axios
    .get(URL_API.value + "api/v1/estadosingresos", configHeader())
    .then(function (result) {
      estados_ingreso.value = result.data;
    });
}
function getAsignacionEstados() {
  axios
    .get(URL_API.value + "api/v1/asignacionestados", configHeader())
    .then(function (result) {
      asignacion_estados.value = result.data;
    });
}
function save() {
  axios
    .put(
      URL_API.value + "api/v1/asignacionestados",
      asignacion_estados.value,
      configHeader()
    )
    .then(function (result) {
      showAlert(result.data.message, result.data.status);
    });
}
</script>

<style scoped>
.input {
  margin-top: 20px;
}

label {
  float: left;
}
</style>

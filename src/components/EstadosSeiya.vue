<template>
  <div class="container">
    <h2>{{ titulo }}</h2>
    <div class="card col-xs-12 col-md-6">
      <h5>{{ accion }}</h5>
      <form class="was-validated" @submit.prevent="save()">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Nombre:</label>
          <input
            type="text"
            required
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="nombre"
          />
          <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
        </div>
        <div class="row">
          <div class="col mb-3" v-if="campo_posicion">
            <label for="exampleInputEmail1" class="form-label">Posición:</label>
            <input
              type="number"
              min="1"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="posicion"
            />
          </div>
          <div class="col-6 mb-3">
            <label for="exampleInputEmail1" class="form-label">Color:</label>
            <input
              type="color"
              required
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="color"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Descripción:</label>
          <div class="mb-3">
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              v-model="descripcion"
            ></textarea>
          </div>
        </div>
        <button type="submit" class="btn btn-success">
          {{ !actualizar ? "Guardar" : "Actualizar" }}
        </button>
        <button type="submit" class="btn btn-warning" @click="clear">
          Limpiar
        </button>
      </form>
    </div>
    <Tabla
      :datos="datos"
      :tabla="tabla"
      :endpoint="endpoint"
      :editar="true"
      :eliminar="true"
      @response="response"
      @clear="clear"
      :checked="false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Tabla from "./Tabla.vue";
import axios from "axios";
import { useConfig } from "../composables/token";
import { Alerts } from "../composables/Alerts";

const { URL_API, configHeader } = useConfig();
const { showAlert } = Alerts();

let mensaje_error = ref('¡Este campo debe ser diligenciado!');
let titulo = ref("Estados orden de servicio");
let nombre = ref("");
let descripcion = ref("");
let id = ref("");
let accion = ref("");
let color = ref("#ffffff");
let posicion = ref("");
let campo_posicion = ref(false);
let endpoint = ref("estadosingresos");
let actualizar = ref(false);
let datos = ref([]);
let tabla = ref([
  { nombre: "#", orden: "DESC" },
  {
    nombre: "Nombre",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "color",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Posición",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Descripción",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
]);

getItems();
function clear() {
  nombre.value = "";
  descripcion.value = "";
  posicion.value = "";
  id.value = "";
  color.value = "#ffffff";
  campo_posicion.value = false
}
function save() {
  let estado = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    color: color.value,
    posicion: posicion.value,
  };
  let url;
  if (id.value != "") {
    url = URL_API.value + "api/v1/estadosingresos/" + id.value;
  } else {
    url = URL_API.value + "api/v1/estadosingresos";
  }
  axios.post(url, estado, configHeader()).then(function (result) {
    clear();
    getItems();
    showAlert(result.data.message, result.data.status);
  });
}
function getItems() {
  axios
    .get(URL_API.value + "api/v1/estadosingresos/10", configHeader())
    .then(function (result) {
      datos.value = result;
      accion.value = "Insertar estado";
    });
}

function response(item) {
  nombre.value = item.nombre;
  color.value = item.color;
  posicion.value = item.posicion;
  descripcion.value = item.descripcion;
  id.value = item.id;
  accion.value = "Actualizar estado";
  campo_posicion.value = true
}
</script>

<style scoped>
.card {
  margin: 40px 0px 40px 0px;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

label {
  float: left;
}

.card button {
  margin: 15px;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}
</style>

<template>
  <div class="container">
    <h2>{{ titulo }}</h2>
    <div class="card col-xs-12 col-md-6">
      <h5>{{ accion }}</h5>
      <form class="was-validated" @submit.prevent="save()">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Nombre</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
            v-model="nombre"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Descripción</label>
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
//import { ref, onMounted } from 'vue'
import Tabla from "./Tabla.vue";
import axios from "axios";
//import { defineProps } from 'vue'
import { useConfig } from "../composables/token";
import { Alerts } from "../composables/Alerts";
//import { useRoute, useRouter } from 'vue-router'


const { URL_API, configHeader } = useConfig();
//const route = useRoute();
//const router = useRouter();
const { showAlert } = Alerts();

// const props = defineProps({
// userlogued: { type: Object, default: () => {} },
// });

// let mensaje_error = ref('¡Este campo debe ser diligenciado!');
let titulo = ref("Estados candidato servicio");
let nombre = ref("");
let descripcion = ref("");
let id = ref("");
let accion = ref("");
let endpoint = ref("estadocandidatoserviciotabla");
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
  id.value = "";
}
function save() {
  let estado = {
    nombre: nombre.value,
    descripcion: descripcion.value,
  };
  let url;
  if (id.value != "") {
    url = URL_API.value + "api/v1/estadocandidatoservicio/" + id.value;
  } else {
    url = URL_API.value + "api/v1/estadocandidatoservicio";
  }
  axios.post(url, estado, configHeader()).then(function (result) {
    clear();
    getItems();
    showAlert(result.data.message, result.data.status);
  });
}
function getItems() {
  axios
    .get(URL_API.value + "api/v1/estadocandidatoserviciotabla", configHeader())
    .then(function (result) {
      datos.value = result;
      accion.value = "Insertar estado";
    });
}

function response(item) {
  nombre.value = item.nombre;
  descripcion.value = item.descripcion;
  id.value = item.id;
  accion.value = "Actualizar estado";
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

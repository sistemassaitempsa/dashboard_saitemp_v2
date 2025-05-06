<template>
  <div class="container">
    <h2>{{ titulo }}</h2>
    <Tabla
      :datos="datos"
      :tabla="tabla"
      :userlogued="props.userlogued"
      :endpoint="endpoint"
      :endpointexport="endpointexport"
      :filtro_multiple="true"
      :checked="false"
      :acciones="acciones"
      @accion="accion"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
//import { ref, onMounted } from 'vue'
import axios from "axios";
import { defineProps } from "vue";
import { useConfig } from "../composables/token";
//import { Alerts } from '../composables/Alerts'
//import { useRoute, useRouter } from 'vue-router'
import Tabla from "./Tabla.vue";

const { URL_API, configHeader } = useConfig();
//const route = useRoute();
//const router = useRouter();
//const { showAlert, confirmAlert, confirmSaveAlert } = Alerts();

const props = defineProps({
  userlogued: { type: Object, default: () => {} },
});

// let mensaje_error = ref('¡Este campo debe ser diligenciado!');
let titulo = ref("Exportar servicios no conformes");
let datos = ref([]);
let first_page_url = ref("");
let endpoint = ref("sncseiya");
let endpointexport = ref("exportsncseiya");


let tabla = ref([
  { nombre: "#", orden: "DESC" },
  { nombre: "Cliente", orden: "DESC", tipo: "texto", calculado: "false" },
  { nombre: "Radicado seiya", orden: "DESC", tipo: "texto", calculado: "false" },
  { nombre: "Responsable", orden: "DESC", tipo: "texto", calculado: "false" },
  {
    nombre: "Descripción novedad",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Subsanado",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  { nombre: "Proceso", orden: "DESC", tipo: "texto", calculado: "false" },
  {
    nombre: "tipo de novedad",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Fecha creación",
    orden: "DESC",
    tipo: "fecha",
    calculado: "false",
  },
  {
    nombre: "Fecha correción",
    orden: "DESC",
    tipo: "fecha",
    calculado: "false",
  },
  {
    nombre: "Correción aplicada",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Corrigió novedad",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
]);
let acciones = ref([]);


getItems();

function accion() {
  console.log("accion");
}

function getItems() {
  axios
    .get(URL_API.value + "api/v1/sncseiya/" + 50, configHeader())
    .then(function (result) {
      first_page_url.value = result.data.first_page_url.replace('"');
      datos.value = result;
    });
}
</script>

<style scoped></style>

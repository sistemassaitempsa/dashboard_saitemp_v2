<template>
  <div class="container">
    <Loading :loading="loading" />
    <NotificacionesSocket />
    <h2>Servicios no conformes debida diligencia</h2>
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
import axios from "axios";
import Tabla from "./Tabla.vue";
import Loading from "./Loading.vue";
import { defineProps, ref } from "vue";
/* import { Token } from "../Mixins/Token.js";
import { Alerts } from "../Mixins/Alerts.js"; */
import { useConfig } from "../composables/token";
import NotificacionesSocket from "./NotificacionSocket.vue";

const loading = ref(false);
const datos = ref([]);
const endpoint = "clientes";
const endpointexport = "novedadesddexport";
const { URL_API, configHeader } = useConfig();
const props = defineProps({
  userlogued: { type: Object, default: () => {} },
});
const first_page_url = ref("");
const acciones = ref([]);
const tabla = [
  { nombre: "#", orden: "DESC" },
  {
    nombre: "Razon social",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Radicado DD",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Responsable",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Descripción  ",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Usuario generó",
    orden: "DESC",
    tipo: "fecha",
    calculado: "false",
  },
  {
    nombre: "Fecha creación",
    orden: "DESC",
    tipo: "fecha",
    calculado: "false",
  },
];

const accion = () => {
  console.log("accion");
};

const getItems = async () => {
  const response = await axios.get(
    URL_API.value + "api/v1/sncdd/" + 50,
    configHeader()
  );
  first_page_url.value = response.data.first_page_url.replace('"');
  datos.value = response;
  console.log(response.data);
};
getItems();
</script>
<style scoped></style>

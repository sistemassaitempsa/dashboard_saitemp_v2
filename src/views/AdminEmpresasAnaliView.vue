<template>
  <AdminProfesionalEmpresa
    :endpoint="'analistaempresa'"
    :idConsultaRol="rolAnalistaId"
    :tabla="tabla"
    :titulo="'Analista por empresas'"
    :search-list-title="'Analistas de contratación'"
  />
</template>
<script setup>
import AdminProfesionalEmpresa from "@/components/AdminProfesionalEmpresa.vue";
import { ref } from "vue";
const rolAnalistaId = process.env.VUE_APP_ROL_ID_ANALISTA;

const tabla = ref([
  { nombre: "#", orden: "DESC" },
  {
    nombre: "Analista",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Nit",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Razón social",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
]);
</script>
<style scoped></style>

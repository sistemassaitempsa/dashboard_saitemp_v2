<template>
  <AdminProfesionalEmpresa
    :endpoint="'profesionalempresa'"
    :idConsultaRol="rolPiscologaId"
    :tabla="tabla"
    :titulo="'Profesionales por empresas'"
  />
</template>
<script setup>
import AdminProfesionalEmpresa from "@/components/AdminProfesionalEmpresa.vue";
import { ref } from "vue";
const rolPiscologaId = process.env.VUE_APP_ROL_ID_PSICOLOGA;

const tabla = ref([
  { nombre: "#", orden: "DESC" },
  {
    nombre: "Profesional",
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

<template>
  <div class="container">
    <h2>Lista servicios</h2>
    <FiltrosTabla
      @enviarFiltros="aplicarFiltro"
      :filtros="filtros"
      @borrarBusqueda="aplicarFiltro"
      @descargarExcel="descargarExcel"
    />
    <div class="col animationHistorico">
      <TablaHistoricoEstados
        :columnasocultas="columnasocultas"
        :datosformateados="datosformateados"
        :total_registros="total_registros_pie"
        :columnas="columnas"
        :acciones="acciones"
        :linkRegistro="'/navbar/debida-diligencia/formulario-clientes/'"
        @cantidadRegistros="cantidadRegistrosLista"
      ></TablaHistoricoEstados>
      <TablaPaginador
        :pagination="pagination"
        @navigate="(url, page_label) => getDatos(url, page_label)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref, computed } from "vue";
import axios from "axios";
import { useConfig } from "../composables/token"; // Asegúrate de ajustar la ruta
import TablaHistoricoEstados from "./TablaHistoricoEstados.vue";
import TablaPaginador from "./TablaPaginador.vue";
import FiltrosTabla from "./FiltrosTabla.vue";
import { useRoute } from "vue-router";

const { URL_API, configHeader } = useConfig();
// const items = ref([]); // Tu lista de items
let datos = ref([]);
let columnas = ref([
  "Número radicado",
  "Fecha radicado",
  "Radicador",
  "Fecha inicio",
  "Fecha fin",
  "linea_servicio",
  "ciudad prestacion_servicio",
  // "Nombre contacto",
  // "Teléfono contacto",
  // "Cargo",
  "Motivo servicio",
]);
// const page_label = ref("");
const pagination = ref({});
// const historicoToggle = ref(true);
const filtros = ref([
  {
    value: "radicado",
    label: "Radicado",
    opciones: ["Igual a", "Contiene"],
    type: "text",
  },
  //   {
  //     value: "responsable_final",
  //     label: "Responsable",
  //     opciones: ["Contiene"],
  //     type: "select",
  //     opciones_select: [],
  //   },
  //   {
  //     value: "nombre_estado",
  //     label: "Estado",
  //     opciones: ["Igual a"],
  //     type: "select",
  //     opciones_select: [],
  //   },
  //   {
  //     value: "created_at",
  //     label: "Fecha creación",
  //     opciones: ["Igual a", "Entre"],
  //     type: "date",
  //   },
  //   {
  //     value: "updated_at",
  //     label: "Fecha finalización",
  //     opciones: ["Igual a", "Entre"],
  //     type: "date",
  //   },
  //   {
  //     value: "tiempo",
  //     label: "Tiempo",
  //     opciones: ["Igual a", "Entre"],
  //     type: "text",
  //   },
  //   {
  //     value: "oportuno",
  //     label: "Oportuno",
  //     opciones: ["Igual a"],
  //     type: "select",
  //     opciones_select: ["Si", "No", "Estado pendiente"],
  //   },
]);

onMounted(() => {
  const route = useRoute();
  let url;
  if (route.params.id != "") {
    url = URL_API.value + "api/v1/ordenservicio/" + route.params.id;
  } else {
    url = URL_API.value + "api/v1/ordenservicio";
  }
  axios.get(url, configHeader()).then(function (result) {
    datos.value = result.data;
  });
});

const columnasocultas = computed(() =>
  datos.value.map((item) => ({
    id: item.id,
  }))
);

const datosformateados = computed(() =>
  datos.value.map((item) => ({
  numero_radicado: item.numero_radicado,
  fecha_radicado: formatearFecha(item.created_at),
  radicador: item.radicador,
  fecha_inicio: formatearFecha(item.fecha_inicio),
  fecha_fin: formatearFecha(item.fecha_fin),
  linea_servicio: item.linea_servicio,
  ciudad_prestacion_servicio: item.ciudad_prestacion_servicio,
  motivo_servicio: item.motivo_servicio,
  nombre_contacto: item.nombre_contacto,
  telefono_contacto: item.telefono_contacto,
  cargo: item.Cargo,
  }))
);

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString();
};


</script>
<style scoped>
.card {
  /* height: 520px; */
  margin: auto;
  padding: 20px;
  /* background-color: rgba(239, 237, 237, 0.642); */
  min-width: 350px;
  margin-bottom: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}
</style>

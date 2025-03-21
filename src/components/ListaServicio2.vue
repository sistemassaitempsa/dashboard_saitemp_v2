<template>
  <div class="container">
    <h2>Lista servicios</h2>
    <FiltrosTabla @enviarFiltros="aplicarFiltro" :filtros="filtros" @borrarBusqueda="aplicarFiltro"
      @descargarExcel="descargarExcel" />
    <div class="col animationHistorico">
      <div class="row animationHistorico">
        <div class="col-xs-12 col-md-12">
          <h5 class="h5paginate" v-if="datos.length > 0">
            Mostrando {{ datos.length }} de
            {{ total_registros_pie }} registros - página
            {{ page_label }}
          </h5>
        </div>
      </div>
      <TablaHistoricoEstados :columnasocultas="columnasocultas" :datosformateados="datosformateados"
        :total_registros="total_registros_pie" :columnas="columnas" :acciones="acciones"
        :linkRegistro="'/navbar/debida-diligencia/formulario-clientes/'" @cantidadRegistros="consultaRegistros">
      </TablaHistoricoEstados>
      <TablaPaginador :pagination="pagination" @navigate="(url, page_label) => consultaRegistros(url, page_label)" />
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

const route = useRoute(); 
const { URL_API, configHeader } = useConfig();
// const items = ref([]); // Tu lista de items
let datos = ref([]);
let total_registros_pie = ref(0);
let page_label = ref('');
let columnas = ref([
  "Número radicado",
  "Fecha radicado",
  "Radicador",
  "Fecha inicio",
  "Fecha fin",
  "linea_servicio",
  "ciudad prestacion_servicio",
  "Motivo servicio",
  "Acciones",
]);
// const page_label = ref("");
let pagination = ref({});
// const historicoToggle = ref(true);
const filtros = ref([
  {
    value: "radicado",
    label: "Radicado",
    opciones: ["Igual a", "Contiene"],
    type: "text",
  },
  {
    value: "created_at",
    label: "Fecha radicado",
    opciones: ["Contiene"],
    type: "select",
    opciones_select: [],
  },
  {
    value: "radicador",
    label: "Radicador",
    opciones: ["Igual a", "Contiene"],
    type: "select",
    opciones_select: [],
  },
  {
    value: "fecha_inicio",
    label: "Fecha inicio",
    opciones: ["Igual a", "Entre"],
    type: "date",
  },
  {
    value: "fecha_fin",
    label: "Fecha fin",
    opciones: ["Igual a", "Entre"],
    type: "date",
  },
  {
    value: "linea_servicio",
    label: "Linea servicio",
    opciones: ["Igual a", "Contiene"],
    type: "text",
  },
  {
    value: "munipio_prestacion_servicio",
    opciones: ["Igual a", "Contiene"],
    type: "select",
    opciones_select: ["Si", "No", "Estado pendiente"],
  },
]);
const acciones = ref([
  {
    nombre: "ver registro",
    url: "orden-servicio/"
  },

]);

onMounted(() => {
  consultaRegistros()
});

const columnasocultas = computed(() =>
  datos.value.map((item) => ({
    id: item.id,
  }))
);

function consultaRegistros(url = `${URL_API.value}api/v1/ordenserviciolista/10`, page = 1) {
  axios.get(url, configHeader()).then(function (result) {
    datos.value = result.data.data;
    total_registros_pie.value = result.data.total;
    page_label.value = page;
    const linksFiltered = result.data.links.filter((link) => {
      return (
        link.label !== "Next &raquo;" && link.label !== "&laquo; Previous"
      );
    });

    pagination = {
      links: linksFiltered,
      prev_page_url: result.data.prev_page_url,
      next_page_url: result.data.next_page_url,
    };
  });
}

// async function getDatos(
//   url = `${URL_API.value}api/v1/ordenserviciolista/10`,
//   page = 1
// ) {
//   // this.loading = true;
//   try {
//     const config = configHeader();
//     // const filtros = filtrosAplicados || [];
//     const response = await axios.get(url, config);
//     datos = response.data.data || [];
//     total_registros_pie.value = response.data.total;
//     page_label.value = page
//     const linksFiltered = response.data.links.filter((link) => {
//       return (
//         link.label !== "Next &raquo;" && link.label !== "&laquo; Previous"
//       );
//     });

//     pagination = {
//       links: linksFiltered,
//       prev_page_url: response.data.prev_page_url,
//       next_page_url: response.data.next_page_url,
//     };
//     // loading = false;
//   } catch {
//     // showAlert("Error al cargar los datos", "error");
//     // loading = false;
//   }
// }

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
    // nombre_contacto: item.nombre_contacto,
    // telefono_contacto: item.telefono_contacto,
    // cargo: item.Cargo,
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

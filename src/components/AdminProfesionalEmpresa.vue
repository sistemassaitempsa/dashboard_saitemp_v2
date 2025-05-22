<template>
  <div>
    <div class="container">
      <Loading :loading="loading" />
      <h2>{{ titulo }}</h2>
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <SearchList
            :nombreCampo="searchListTitle"
            :valida_campo="false"
            nombreItem="nombres"
            eventoCampo="getProfesionalsector"
            :consulta="consulta_codigo_ciiu"
            :registros="profesionales"
            @getProfesionalsector="getProfesionalsector"
            @setProfesionalSector="setProfesionalSector"
            :ordenCampo="1"
            placeholder="Seleccione una opción"
          />
        </div>
        <div class="col-xs-12 col-md-3">
          <SearchList
            nombreCampo="Empresa*"
            :valida_campo="false"
            nombreItem="nombre"
            eventoCampo="getEmpresas"
            :consulta="consulta_clientes"
            :registros="clientes"
            @getEmpresas="getEmpresas"
            placeholder="Seleccione una opción"
            :index="1"
          />
        </div>
        <button
          type="button"
          id="newNews"
          class="col-xs-12 col-md-2 btn btn-sm btn-success"
          @click="asignar()"
          style="margin-top: 33px"
        >
          <i class="bi bi-file-earmark-plus"></i> Asignar
        </button>
      </div>
      <div class="row">
        <div class="mb-3" v-if="asignar_profesionales.length > 0">
          <span>Profesionales</span>
          <div
            class="mb-3"
            style="
              padding: 10px;
              border: solid #d5dbdb 0.5px;
              border-radius: 10px;
            "
          >
            <button
              type="button"
              style="margin: 10px 10px 5px 10px"
              id="btnMenu"
              class="btn btn-sm"
              data-bs-toggle="button"
              v-for="(item, index) in asignar_profesionales"
              :key="index"
            >
              {{ item.nombres }} {{ item.apellidos }}
              <i
                class="bi bi-x"
                @click="asignar_profesionales.splice(index, 1)"
              ></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="mb-3" v-if="asignar_clientes.length > 0">
          <span>Empresas</span>
          <div
            class="mb-3"
            style="
              padding: 10px;
              border: solid #d5dbdb 0.5px;
              border-radius: 10px;
            "
          >
            <button
              type="button"
              style="margin: 10px 10px 5px 10px"
              id="btnMenu"
              class="btn btn-sm"
              data-bs-toggle="button"
              v-for="(item, index) in asignar_clientes"
              :key="index"
            >
              {{ item.nombre }}
              <i class="bi bi-x" @click="asignar_clientes.splice(index, 1)"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <SearchList
            :nombreCampo="searchListTitle"
            :valida_campo="false"
            nombreItem="nombres"
            eventoCampo="getProfesionalsector"
            :consulta="consulta_codigo_ciiu"
            :registros="profesionales"
            @getProfesionalsector="getProfesionalsector"
            @setProfesionalSector="setProfesionalSector"
            :ordenCampo="2"
            placeholder="Seleccione una opción"
          />
        </div>
        <div class="col-xs-12 col-md-3">
          <SearchList
            nombreCampo="Empresa*"
            :valida_campo="false"
            nombreItem="nombre"
            eventoCampo="getEmpresas"
            :consulta="consulta_clientes"
            :registros="clientes"
            @getEmpresas="getEmpresas"
            placeholder="Seleccione una opción"
            :index="2"
          />
        </div>
        <button
          type="button"
          id="reset"
          class="col-xs-12 col-md-2 btn btn-success btn-sm"
          style="margin-top: 33px"
          @click="getProfesionalClienteTabla()"
        >
          <i class="bi bi-arrow-counterclockwise"></i> Borrar busqueda
        </button>
      </div>
      <Tabla
        :datos="sectores_profesionales_tabla"
        :tabla="tabla"
        :endpoint="endpoint"
        :checked="true"
        :eliminar="true"
      />
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted, defineProps } from "vue";
import { useConfig } from "../composables/token";
import { Alerts } from "../composables/Alerts";
import SearchList from "./SearchList.vue";
import Tabla from "./Tabla.vue";
import Loading from "./Loading.vue";

const { endpoint, tabla, titulo, idConsultaRol, searchListTitle } = defineProps(
  [
    "endpoint",
    "tabla",
    "tipo_consulta",
    "titulo",
    "idConsultaRol",
    "searchListTitle",
  ]
);
const { URL_API, configHeader } = useConfig();
const { showAlert } = Alerts();
/* const sectores_economicos = ref([]); */
const clientes = ref([]);
const asignar_clientes = ref([]);
const consulta_clientes = ref("");
const profesionales = ref([]);
const asignar_profesionales = ref([]);
const sectores_profesionales_tabla = ref([]);
const consulta_codigo_ciiu = ref("");
const cantidad = ref(10);
const loading = ref(true);

onMounted(() => {
  getEmpresas();
  getProfesionalsector();
  getProfesionalClienteTabla();
});

const getEmpresas = async (item = null, index) => {
  console.log(index);
  if (index == 1) {
    if (
      item != null &&
      !asignar_clientes.value.some((array) => array.id === item.id)
    ) {
      /*    asignar_clientes.value.splice(0, 1, item); */
      asignar_clientes.value.push(item);
    }
  } else if (index == 2) {
    getProfesionalClienteByClienteTabla(item.id);
  }

  const response = await axios.get(
    URL_API.value + "api/v1/empresascliente",
    configHeader()
  );
  clientes.value = response.data;
};

const getProfesionalsector = async () => {
  const response = await axios.get(
    URL_API.value + `api/v1/usuariointernorol/${idConsultaRol}`,
    configHeader()
  );
  profesionales.value = response.data;
};

const getProfesionalClienteTabla = async (id = null) => {
  let url = URL_API.value + `api/v1/${endpoint}/` + cantidad.value;
  if (id != null) {
    url = URL_API.value + `api/v1/${endpoint}byid/` + id;
  }
  const response = await axios.get(url, configHeader());
  console.log(response);
  sectores_profesionales_tabla.value = response;
  loading.value = false;
};

const getProfesionalClienteByClienteTabla = async (id = null) => {
  let url = URL_API.value + `api/v1/${endpoint}/` + cantidad.value;
  if (id != null) {
    url = URL_API.value + `api/v1/${endpoint}bycliente/` + id;
  }
  const response = await axios.get(url, configHeader());
  console.log(response);
  sectores_profesionales_tabla.value = response;
  loading.value = false;
};

const setProfesionalSector = (item = null, campo = null) => {
  console.log(item);
  if (item != null) {
    switch (campo) {
      case 1:
        if (item != null) {
          asignar_profesionales.value.splice(0, 1, item);
        }
        break;
      case 2:
        getProfesionalClienteTabla(item.id);
        break;
    }
  }
};

const asignar = async () => {
  loading.value = true;
  let cliente = {
    cliente: asignar_clientes.value,
    profesionales: asignar_profesionales.value[0],
  };
  if (
    asignar_clientes.value.length <= 0 ||
    asignar_profesionales.value.length <= 0
  ) {
    showAlert(
      "Debe seleccionar por lo menos una empresa y un usuario",
      "error"
    );
    loading.value = false;
    return;
  }
  const response = await axios.post(
    URL_API.value + `api/v1/${endpoint}`,
    cliente,
    configHeader()
  );

  getProfesionalClienteTabla();
  showAlert(response.data.message, response.data.status);
};
</script>
<style scoped>
.container {
  animation: fadeIn;
  animation-duration: 2s;
}

.row {
  margin: 30px 0px 30px 0px;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}

label {
  float: left;
}

#btnMenu {
  background-color: rgb(56, 125, 134);
  color: white;
}
</style>

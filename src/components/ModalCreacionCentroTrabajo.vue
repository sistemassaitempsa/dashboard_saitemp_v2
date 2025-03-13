<template>
  <div class="modal-overlay">
    <div class="modal-content" @click.stop>
      <Loading :loading="loading" />
      <div class="container">
        <div class="d-flex justify-content-end">
          <button class="btn btn-danger btn-sm" @click="close" type="button">
            X
          </button>
        </div>
        <h3>Crear centro de trabajo</h3>
        <div class="row">
          <div class="col mt-3">
            <label for="" class="form-label">Nombre:*</label
            ><input type="text" class="form-control" v-model="nombre" />
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Riesgo de la empresa: (ARL):"
              eventoCampo="getRiesgosLaborales"
              nombreItem="nombre"
              :disabled="true"
              :registros="riesgos_laborales"
              :consulta="consulta_riesgo_cliente"
              @getRiesgosLaborales="getRiesgosLaborales"
              placeholder="Seleccionar"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <SearchList
              nombreCampo="Código ciiu: *"
              @getCodigosCiiu="getCodigosCiiu"
              eventoCampo="getCodigosCiiu"
              nombreItem="codigo"
              :registros="codigos_ciiu"
              :consulta="consulta_codigo_ciiu"
              @getActividadesCiiu="getActividadesCiiu"
              placeholder="Seleccione una opción"
            />
          </div>
          <div class="col mb-3">
            <SearchTable
              nombreCampo="Actividad ciiu: *"
              eventoCampo="setActividadesCiiu"
              @setActividadesCiiu="setActividadesCiiu"
              endpoint="actividadciiu/filetr"
              :consulta="consulta_actvidad_ciiu"
              :nombreItem="campos_actividad_ciiu"
              :datos="actividades_ciiu"
              placeholder="Seleccione una opción"
              :disabled="actividad_ciiu_disabled"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <button class="btn btn-danger" type="button" @click="close">
              Cancelar
            </button>
          </div>
          <div class="col">
            <button
              class="btn btn-success"
              type="button"
              @click="crearCentroTrabajoHandler"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { useToken } from "@/composables/useToken";
import axios from "axios";
import Loading from "./Loading.vue";
import SearchTable from "./SearchTable.vue";
import SearchList from "./SearchList.vue";
import { useAlerts } from "@/composables/useAlerts";
import { useRoute } from "vue-router";

const route = useRoute();
const emit = defineEmits(["closeModalCentrosTrabajo"]);
const { showAlert } = useAlerts();
const actividad_ciiu_disabled = ref(true);
const codigo_ciiu_id = ref("");
const consulta_codigo_ciiu = ref("");
const actividades_ciiu = ref([]);
const consulta_actvidad_ciiu = ref("");
const actividad_ciiu = ref("");
const riesgo_laboral = ref("");
const consulta_riesgo_cliente = ref("");
const riesgos_laborales = ref([]);
const codigos_ciiu = ref([]);
const campos_actividad_ciiu = ref(["codigo_actividad", "descripcion"]);
const URL_API = process.env.VUE_APP_URL_API;
const { configHeader } = useToken();
const nombre = ref("");
const loading = ref(false);

const getRiesgosLaborales = async (item = null, index = null) => {
  if (item != null && index != null) {
    console.log("pasé por riesgos");
  }
  if (item != null && index == null) {
    riesgo_laboral.value = item.id;
  }
  if (riesgos_laborales.value.length <= 0) {
    const config = configHeader();
    axios.get(URL_API + "api/v1/riesgolaboral", config).then(function (result) {
      riesgos_laborales.value = result.data;
    });
  }
};

const setActividadesCiiu = (item) => {
  if (item != null) {
    consulta_actvidad_ciiu.value = item;
    actividad_ciiu.value = item.split(" ")[0];
    riesgos_laborales.value.forEach(function (item) {
      if (item.id == actividad_ciiu.value.split("")[0]) {
        riesgo_laboral.value = actividad_ciiu.value.split("")[0];
        consulta_riesgo_cliente.value = item.nombre;
      }
    });
  }
};

const getActividadesCiiu = async (item = null) => {
  var id = "";
  if (item != null && item.codigo != undefined) {
    actividad_ciiu_disabled.value = false;
    codigo_ciiu_id.value = item.id;
    consulta_codigo_ciiu.value = item.codigo;
    id = item.id;
  } else {
    id = item;
  }

  let config = configHeader();
  axios
    .get(URL_API + "api/v1/actividadciiu/" + id, config)
    .then(function (result) {
      actividades_ciiu.value = result.data;
    });
};
const crearCentroTrabajoHandler = async () => {
  if (
    actividad_ciiu.value == "" ||
    codigo_ciiu_id.value == "" ||
    nombre.value == ""
  ) {
    showAlert("Debe diligenciar los campos requeridos", "error");
    return;
  }
  const config = configHeader();

  try {
    const infoCentroTrabajo = {
      cliente_id: route.params.id,
      actividad_ciiu: actividad_ciiu.value,
      nombre: nombre.value,
    };
    const response = await axios.post(
      `${URL_API}api/v1/centrosdetarabajo`,
      infoCentroTrabajo,
      config
    );

    showAlert(response.data.message, response.data.status);
    close();
  } catch (error) {
    showAlert(error.response.data.message, error.response.data.status);
  }
};

const getCodigosCiiu = async () => {
  if (codigos_ciiu.value.length >= 0) {
    let config = configHeader();
    axios.get(URL_API + "api/v1/codigociiu", config).then(function (result) {
      codigos_ciiu.value = result.data;
    });
  }
};
const close = () => {
  emit("closeModalCentrosTrabajo");
};

onMounted(() => {
  getRiesgosLaborales();
});
</script>

<style scoped>
label {
  float: left;
  font-weight: 500;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 70%;
  width: 100%;
  animation: fadeIn 0.3s ease;
}
</style>

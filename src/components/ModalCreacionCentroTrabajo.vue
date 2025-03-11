<template>
  <div class="modal-overlay">
    <div class="modal-content" @click.stop>
      <Loading :loading="loading" />
      <div class="container">
        <div class="d-flex justify-content-end">
          <button class="btn btn-danger btn-sm" @click="close">X</button>
        </div>
        <h3>Crear centro de trabajo</h3>
        <div class="row">
          <div class="col">
            <label for="" class="form-label">Nombre:*</label
            ><input type="text" class="form-control" />
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
          <div class="col"><button>Cancelar</button></div>
          <div class="col"><button>Guardar</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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

const getRiesgosLaborales = async (item = null, index = null) => {
  if (item != null && index != null) {
  }
  if (item != null && index == null) {
    riesgo_laboral.value = item.id;
  }
  if (riesgos_laborales.value.length <= 0) {
    config = configHeader();
    axios.get(URL_API + "api/v1/riesgolaboral", config).then(function (result) {
      riesgos_laborales.value = result.data;
    });
  }
};

const setActividadesCiiu = (item) => {
  if (item != null) {
    consulta_actvidad_ciiu.value = item;
    actividad_ciiu.value = item.split(" ")[0];
    riesgos_laborales.forEach(function (item) {
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

const getCodigosCiiu = async () => {
  if (codigos_ciiu.value.length >= 0) {
    let config = configHeader();
    axios.get(URL_API + "api/v1/codigociiu", config).then(function (result) {
      codigos_ciiu.value = result.data;
    });
  }
};
</script>

<style scoped>
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

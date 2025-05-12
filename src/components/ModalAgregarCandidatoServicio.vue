<template>
  <div class="modal-overlay">
    <div class="modal-content" @click.stop>
      <div class="container">
        <Loading :loading="loading" />
        <div class="d-flex justify-content-end">
          <button class="btn btn-danger btn-sm" @click="close">X</button>
        </div>
        <h3>Añadir candidato a servicio</h3>
        <div class="row">
          <div class="col">
            <SearchList
              nombreCampo="Servicio:"
              @getServicios="getServicios"
              eventoCampo="getServicios"
              nombreItem="numero_radicado"
              :consulta="servicio_radicado"
              :registros="lista_servicios"
              placeholder="Seleccione una opción"
            />
          </div>
          <div class="col mt-3">
            <label for="" class="form-label">Empresa:</label>
            <input
              type="text"
              class="form-control"
              disabled
              v-model="razon_social"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <SearchList
              nombreCampo="Estado: *"
              @getEstadosIngreso="getEstadosIngreso"
              eventoCampo="getEstadosIngreso"
              nombreItem="nombre"
              :consulta="consulta_estado_ingreso"
              :registros="estados_ingreso"
              placeholder="Seleccione una opción"
            />
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Responsable: "
              @getEncargados="getEncargados"
              eventoCampo="getEncargados"
              nombreItem="nombre"
              :consulta="consulta_responsable_ingreso"
              :registros="lista_encargados"
              placeholder="Seleccione una opción"
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <button class="btn btn-danger" @click="close">Cancelar</button>
          </div>
          <div class="col">
            <button class="btn btn-success" type="button" @click="save">
              Agregar candidato
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, defineProps, defineEmits } from "vue";
import { useAlerts } from "@/composables/useAlerts";
import { useToken } from "../composables/useToken";
import Loading from "./Loading.vue";
import SearchList from "./SearchList.vue";

//variables
const { showAlert } = useAlerts();
const { candidato_id } = defineProps(["candidato_id"]);
const emit = defineEmits(["closeModalAgregaraServicio"]);
const URL_API = process.env.VUE_APP_URL_API;
const loading = false;
const servicio_radicado = ref("");
const servicio_id = ref("");
const lista_servicios = ref([]);
const consulta_responsable_ingreso = ref("");
const estado_ingreso_id = ref("");
const consulta_estado_ingreso = ref("");
const consulta_encargado = ref("");
const encargado_id = ref("");
const lista_encargados = ref([]);
const lista_encargados_corregir = ref([]);
const estados_ingreso = ref([]);
const razon_social = ref("");
const { configHeader } = useToken();

const getServicios = async (item = null) => {
  if (item != null) {
    servicio_radicado.value = item.numero_radicado;
    servicio_id.value = item.id;
    razon_social.value = item.razon_social;
  }
  let config = configHeader();
  const response = await axios.get(
    URL_API + "api/v1/ordenservicioclientebyprofesional",
    config
  );

  lista_servicios.value = response.data;
};

const getEstadosIngreso = async (item = null) => {
  if (item != null) {
    consulta_responsable_ingreso.value = "";
    estado_ingreso_id.value = item.id;
    consulta_estado_ingreso.value = item.nombre;
    consulta_encargado.value = "";
    encargado_id.value = "";
    lista_encargados.value = [];
    lista_encargados_corregir.value = [];
    getEncargados(null, item.id);
  }
  let config = configHeader();
  const response = await axios.get(URL_API + "api/v1/estadosingresos", config);

  estados_ingreso.value = response.data;
};

const getEncargados = async (item = null, id = null) => {
  if (item != null) {
    encargado_id.value = item.usuario_id;
    consulta_encargado.value = item.nombre;
    consulta_responsable_ingreso.value = item.nombre;
  }
  if (id != null) {
    let config = configHeader();
    const response = await axios.get(
      URL_API + "api/v1/responsableingresos/" + id,
      config
    );

    lista_encargados.value = response.data;
  }
};
const close = () => {
  emit("closeModalAgregaraServicio");
};

const crearObjetoDatos = () => {
  const objetoEnviar = {
    id_candidato: candidato_id,
    id_servicio: servicio_id.value,
    estado_id: estado_ingreso_id.value,
    responsable_id: Number(encargado_id.value),
    nombre_responsable: consulta_encargado.value,
  };
  return objetoEnviar;
};
const save = async () => {
  if (
    servicio_id.value == "" ||
    estado_ingreso_id.value == "" ||
    encargado_id.value == ""
  ) {
    showAlert("Debe diligenciar los campos requeridos", "error");
    return;
  }
  const config = configHeader();
  try {
    const data = crearObjetoDatos();
    const response = await axios.post(
      `${URL_API}api/v1/addcandidatoservicio`,
      data,
      config
    );
    showAlert(response.data.message, response.data.status);
    close();
  } catch (error) {
    showAlert(error.response.data.message, error.response.data.status);
  }
};
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

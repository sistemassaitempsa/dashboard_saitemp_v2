<template>
    <div class="container">
      <h2>{{ titulo }}</h2>
      <form @submit.prevent="save()">
        <div class="row listas">
          <div class="col">
            <SearchList
              nombreCampo="Estado solicitud servicio:"
              @getUsuarios="getUsuarios"
              eventoCampo="getUsuarios"
              nombreItem="nombre"
              :consulta="consulta_usuario"
              :registros="usuarios"
              placeholder="Seleccione una opción"
              :valida_campo="false"
            />
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Estado orden servicio:"
              @getEstados="getEstados"
              eventoCampo="getEstados"
              nombreItem="nombre"
              :consulta="consulta_estado"
              :registros="estados"
              placeholder="Seleccione una opción"
              :valida_campo="false"
            />
          </div>
          <div class="col">
            <button type="submit" class="btn btn-success">
              Asignar estados
            </button>
          </div>
        </div>
        <div class="row">
          <div class="mb-3" v-if="estados_solicitud_servicio.length > 0">
            <span>Estados solicitud servicio</span>
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
                v-for="(item, index) in estados_solicitud_servicio"
                :key="index"
              >
                {{ item.nombre }}
                <i class="bi bi-x" @click="estados_solicitud_servicio.splice(index, 1)"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mb-3" v-if="estados_orden_servicio.length > 0">
            <span>Estados orden servicio</span>
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
                v-for="(item, index) in estados_orden_servicio"
                :key="index"
              >
                {{ item.nombre }}
                <i class="bi bi-x" @click="estados_orden_servicio.splice(index, 1)"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
      <Tabla
        :datos="datos"
        :tabla="tabla"
        :endpoint="endpoint"
        :eliminar="true"
        @response="response"
        @clear="clear"
        :acciones="acciones"
        :filtro_multiple="true"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import SearchList from "./SearchList.vue";
  import Tabla from "./Tabla.vue";
  import axios from "axios";
  import { useConfig } from "../composables/token";
  import { Alerts } from "../composables/Alerts";
  
  const { URL_API, configHeader } = useConfig();
  
  const { showAlert } = Alerts();
  
  let titulo = ref("Estados solicitud servicio - orden servicio");
  let usuarios = ref([]);
  let estados_solicitud_servicio = ref([]);
  let estados_orden_servicio = ref([]);
  let estados = ref([]);
  let estado_id = ref("");
  let consulta_estado = ref("");
  let usuario_id = ref("");
  let consulta_usuario = ref("");
  let datos = ref([]);
  let tabla = ref([
    { nombre: "#", orden: "DESC" },
    {
      nombre: "Estado solicitud de servicio",
      orden: "DESC",
      tipo: "texto",
      calculado: "false",
    },
    {
      nombre: "Estado orden de servicio",
      orden: "DESC",
      tipo: "texto",
      calculado: "false",
    },
  ]);
  let endpoint = ref("estadocandidatoordenservicio");
  
  getItems();
  
  function save() {
      let estado_responsable = [];
      estado_responsable.push(this.estados_solicitud_servicio);
      estado_responsable.push(this.estados_orden_servicio);
    axios
      .post(
        URL_API.value + "api/v1/estadocandidatoordenservicio",
        estado_responsable,
        configHeader()
      )
      .then(function (result) {
        getItems()
        showAlert(result.data.message, result.data.status);
      });
  }
  
  function getUsuarios(item = null) {
    if (item != null) {
      usuario_id.value = item.id;
      consulta_usuario.value = item.nombre;
      const usuario_existe = estados_solicitud_servicio.value.some(
        (usuario) => usuario.id === item.id
      );
      if (!usuario_existe) {
        estados_solicitud_servicio.value.push({ id: item.id, nombre: item.nombre });
      }
    }
    axios
      .get(URL_API.value + "api/v1/estadocandidatoservicio", configHeader())
      .then(function (result) {
        usuarios.value = result.data;
      });
  }
  function getEstados(item = null) {
    if (item != null) {
      // console.log(item)
      estado_id.value = item.id;
      consulta_estado.value = item.nombre;
      const usuario_existe = estados_orden_servicio.value.some(
        (usuario) => usuario.id === item.id
      );
      if (!usuario_existe) {
        estados_orden_servicio.value.push({ id: item.id, nombre: item.nombre });
      }
    }
    axios
      .get(URL_API.value + "api/v1/estadosingresos", configHeader())
      .then(function (result) {
        estados.value = result.data;
      });
  }
  
  function getItems() {
    axios
      .get(URL_API.value + "api/v1/estadocandidatoordenservicio/10", configHeader())
      .then(function (result) {
        datos.value = result;
      });
  }
  
  function response() {}
  function clear() {}
  </script>
  
  <style scoped>
  .listas {
    display: flex;
    align-items: center;
  }
  #btnMenu {
    background-color: rgb(28, 146, 77);
    color: white;
  }
  </style>
  
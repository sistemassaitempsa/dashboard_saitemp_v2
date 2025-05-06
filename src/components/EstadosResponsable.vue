<template>
  <div class="container">
    <h2>{{ titulo }}</h2>
    <form @submit.prevent="save()">
      <div class="row listas">
        <div class="col">
          <SearchList
            nombreCampo="Responsable:"
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
            nombreCampo="Estado:"
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
            Asignar reponsable
          </button>
        </div>
      </div>
      <div class="row">
        <div class="mb-3" v-if="asignar_usuarios.length > 0">
          <span>Usuarios a asignar</span>
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
              v-for="(item, index) in asignar_usuarios"
              :key="index"
            >
              {{ item.nombre }}
              <i class="bi bi-x" @click="asignar_usuarios.splice(index, 1)"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="mb-3" v-if="asignar_estados.length > 0">
          <span>Estados a asignar</span>
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
              v-for="(item, index) in asignar_estados"
              :key="index"
            >
              {{ item.nombre }}
              <i class="bi bi-x" @click="asignar_estados.splice(index, 1)"></i>
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

let titulo = ref("Estados y responsables (Orden de servicio)");
let usuarios = ref([]);
let asignar_usuarios = ref([]);
let asignar_estados = ref([]);
let estados = ref([]);
let estado_id = ref("");
let consulta_estado = ref("");
let usuario_id = ref("");
let consulta_usuario = ref("");
let datos = ref([]);
let tabla = ref([
  { nombre: "#", orden: "DESC" },
  {
    nombre: "Usuario",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
  {
    nombre: "Estado",
    orden: "DESC",
    tipo: "texto",
    calculado: "false",
  },
]);
let endpoint = ref("estadoresponsable");

getItems();

function save() {
    let estado_responsable = [];
    estado_responsable.push(this.asignar_usuarios);
    estado_responsable.push(this.asignar_estados);
  axios
    .post(
      URL_API.value + "api/v1/estadoresponsable",
      estado_responsable,
      configHeader()
    )
    .then(function (result) {
      showAlert(result.data.message, result.data.status);
    });
}

function getUsuarios(item = null) {
  if (item != null) {
    // console.log(item)
    usuario_id.value = item.id;
    consulta_usuario.value = item.nombre;
    const usuario_existe = asignar_usuarios.value.some(
      (usuario) => usuario.id === item.id
    );
    if (!usuario_existe) {
      asignar_usuarios.value.push({ id: item.id, nombre: item.nombre });
    }
  }
  axios
    .get(URL_API.value + "api/v1/userslist", configHeader())
    .then(function (result) {
      usuarios.value = result.data;
    });
}
function getEstados(item = null) {
  if (item != null) {
    // console.log(item)
    estado_id.value = item.id;
    consulta_estado.value = item.nombre;
    const usuario_existe = asignar_estados.value.some(
      (usuario) => usuario.id === item.id
    );
    if (!usuario_existe) {
      asignar_estados.value.push({ id: item.id, nombre: item.nombre });
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
    .get(URL_API.value + "api/v1/estadoresponsable/10", configHeader())
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

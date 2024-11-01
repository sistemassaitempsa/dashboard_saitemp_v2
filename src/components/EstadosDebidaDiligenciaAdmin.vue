<template>
  <div class="container">
    <Loading :loading="loading" />
    <h2>Administrar estados Debida Diligencia</h2>
    <div class="row">
      <div class="col">
        <SearchList
          nombreCampo="Estados"
          nombreItem="nombre"
          @getEstados="getEstados"
          eventoCampo="getEstados"
          :consulta="nombre"
          :registros="estados"
          placeholder="Seleccione una opción"
        />
      </div>
      <div class="col pt-5">
        <button
          type="button"
          class="btn btn-success"
          style="float: left"
          @click="crearNuevoEstado"
        >
          Añadir nuevo estado
        </button>
      </div>
    </div>
    <form action="save" @submit.prevent="save()" class="was-validated">
      <div class="row">
        <div class="col-6 mb-3">
          <label class="form-label labelLeft">Nombre: </label>
          <input
            :disabled="disabled"
            type="text"
            class="form-control"
            autocomplete="off"
            id="nombreEstado"
            aria-describedby="inputName"
            v-model="nombre"
          />
          <div class="invalid-feedback">
            {{ mensaje_error }}
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col">
              <label class="form-label labelLeft">Tiempo: </label>
            </div>
          </div>
          <div class="row d-flex align-items-center">
            <div class="col">
              <div class="form-check form-check-inline">
                <input
                  :disabled="disabled"
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="minutos"
                  v-model="tipo_tiempo"
                  @change="tipo_tiempo"
                />
                <label class="form-check-label" for="inlineRadio1"
                  >Minutos</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  :disabled="disabled"
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="horas"
                  v-model="tipo_tiempo"
                  @change="tipo_tiempo"
                />
                <label class="form-check-label" for="inlineRadio2">Horas</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  :disabled="disabled"
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  value="dias"
                  v-model="tipo_tiempo"
                  @change="tipo_tiempo"
                />
                <label class="form-check-label" for="inlineRadio3">Dias</label>
              </div>
            </div>
            <div class="col">
              <input
                :disabled="disabled"
                type="number"
                class="form-control"
                autocomplete="off"
                id="tiempoEstado"
                aria-describedby="inputTiempo"
                v-model="tiempo_respuesta"
              />
            </div>
          </div>
        </div>
        <div class="row border rounded">
          <label for="" class="labelLeft">Responsables:</label>
          <div class="col">
            <SearchList
              nombreCampo=""
              :valida_campo="false"
              nombreItem="nombre"
              eventoCampo="getUsuarios"
              :consulta="usuario"
              :registros="usuarios"
              @getUsuarios="getUsuarios"
              placeholder="Seleccione una opción"
              :index="1"
              :disabled="disabled"
            />
            <div class="row mt-4">
              <div class="col-2">
                <label class="form-label labelLeft">Color: </label>
              </div>
              <div class="col-2 d-flex align-items-center">
                <input
                  :disabled="disabled"
                  type="color"
                  class="form-control"
                  autocomplete="off"
                  id="nombreEstado"
                  aria-describedby="inputName"
                  v-model="color"
                />
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
          </div>
          <div class="col">
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
                v-for="(usuario, index) in asignar_usuarios"
                :key="index"
              >
                {{ usuario.nombre }}
                <i
                  class="bi bi-x"
                  @click="asignar_usuarios.splice(index, 1)"
                ></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-6"></div>
          <div class="col-6">
            <button
              id="btnGroupDrop1"
              type="submit"
              class="btn btn-success"
              aria-expanded="false"
            >
              Guardar Estado
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import SearchList from "./SearchList.vue";
import Loading from "./Loading.vue";
import axios from "axios";
import { Token } from "../Mixins/Token.js";
import { Alerts } from "../Mixins/Alerts.js";
export default {
  components: {
    Loading,
    SearchList,
  },
  mixins: [Token, Alerts],
  data() {
    return {
      mensaje_error: "",
      URL_API: process.env.VUE_APP_URL_API,
      usuario: "",
      usuarios: [],
      estados: [],
      color: "#9EAEAC",
      id_estado: "",
      loading: false,
      tiempo_respuesta: 0,
      nombre: "",
      disabled: true,
      tipo_tiempo: "minutos",
      asignar_usuarios: [
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
        { id: 1, nombre: "Daniel Botache" },
      ],
    };
  },
  watch: {
    $route() {
      this.limpiarFormulario();
    },
  },
  methods: {
    getEstados(item = null) {
      if (item != null) {
        this.color = item.color;
        this.nombre = item.nombre;
        this.id_estado = item.id;
        this.disabled = false;
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/estadosfirma", config)
        .then(function (result) {
          self.estados = result.data;
        });
    },
    getUsuarios(item = null, index = null) {
      if (item != null) {
        switch (index) {
          case 1:
            this.asignar_usuarios.push({
              id: item.id,
              nombre: item.nombre,
            });

            break;
          case 2:
            this.cierra_pqrsf_id = item.id;
            this.consulta_cierra_pqrsf = item.nombre;
            break;
          case 3:
            this.visitante_id = item.id;
            this.visitante = item.nombre;
            break;
        }
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/userslist", config)
        .then(function (result) {
          self.usuarios = result.data;
        });
    },
    limpiarFormulario() {
      this.id = "";
      this.nombre = "";
      this.color = "#9EAEAC";
      this.tiempo_respuesta = 0;
      this.tipo_tiempo = "minutos";
      this.asignar_usuarios = [];
    },
    crearNuevoEstado() {
      this.limpiarFormulario();
      this.disabled = false;
    },
    save() {
      let self = this;
      if (this.id_estado == "") {
        const estadoForm = {
          nombre: this.nombre,
          color: this.color,
          tiempo_respuesta: this.tiempo_respuesta,
          responsables: this.asignar_usuarios,
        };
        let config = this.configHeader();
        axios
          .post(self.URL_API + "api/v1/estadosfirma", estadoForm, config)
          .then((result) => {
            self.showAlert(result.data.message, result.data.status);
          });
      }
    },
  },
};
</script>

<style scoped>
.container {
  animation: fadeIn;
  animation-duration: 2s;
}
.labelLeft {
  float: left;
  margin: 20px 0px 5px 0px;
  text-align: left;
}
#btnMenu {
  background-color: rgb(28, 146, 77);
  color: white;
}
</style>

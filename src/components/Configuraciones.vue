<template>
  <div class="container">
    <h2>Configuraciones adicionales</h2>

    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div class="card">
          <h5>Ventana modal</h5>
          <form class="was-validated" @submit.prevent="saveModal()">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="titulo"
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Descripción</label
              >
              <div class="mb-3">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="descripcion"
                  required
                ></textarea>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    v-model="modal_visible"
                    @input="alerta = false"
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault"
                    >Modal visible</label
                  >
                </div>
              </div>
              <div class="col">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    v-model="alerta"
                    @input="modal_visible = false"
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault"
                    >Alerta</label
                  >
                </div>
              </div>
              <div class="col">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    v-model="recarga_navegador"
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault"
                    >Recargar navegador</label
                  >
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-success">Guardar</button>
          </form>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <div class="card">
          <h5>Conteo regresivo</h5>
          <form class="was-validated" @submit.prevent="saveContador()">
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >mensaje</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="mensaje_navbar"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Fecha y hora actualización</label
                  >
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="fecha_hora"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Estilo texto</label
                  >
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      v-model="estilo_span"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Color contador</label
                  >
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      v-model="estilo_contador"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Tamaño contador</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="tamano_contador"
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Tamaño texto contador</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="tamano_texto_contador"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    v-model="contador_visible"
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault"
                    >Contador visible</label
                  >
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-success">Guardar</button>
          </form>
        </div>
      </div>
      <div class="col-xs-12 col-md-6">
        <button
          type="button"
          @click="borrarCache"
          class="btn btn-success"
          style="float: left; margin-bottom: 50px"
        >
          Clic para borrar caché
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Token } from "../Mixins/Token.js";
import { Alerts } from "../Mixins/Alerts.js";

export default {
  components: {},
  mixins: [Token, Alerts],
  props: {
    actualizacion: {
      type: Boolean,
    },
    menu: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      actualizar: false,
      modal_visible: false,
      recarga_navegador: false,
      titulo: "",
      descripcion: "",
      id_modal: "",
      id_contador: "",
      mensaje_navbar: "",
      fecha_hora: "",
      estilo_span: "",
      estilo_contador: "",
      tamano_contador: "",
      tamano_texto_contador: "",
      contador_visible: false,
      alerta: false,
    };
  },
  computed: {},
  watch: {
    actualizacion() {
      if (this.actualizacion == false) {
        this.ocultaContador();
      }
    },
  },
  mounted() {
    this.getModal();
    this.getActualizacionprogramada();
  },
  methods: {
    borrarCache() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/clear-cache", config)
        .then(function (result) {
          if (result.data == "0000") {
            self.showAlert("Caché limpiada exitosamente", "success");
          }
        });
    },
    getModal() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/modalprincipal", config)
        .then(function (result) {
          self.titulo = result.data.titulo;
          self.descripcion = result.data.contenido;
          self.modal_visible = result.data.visible == "1" ? true : false;
          self.id_modal = result.data.id;
        });
    },
    getActualizacionprogramada() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/actualizacionprogramada", config)
        .then(function (result) {
          self.mensaje_navbar = result.data.mensaje_navbar;
          self.fecha_hora = self.formatearFecha(result.data.fecha_hora);
          self.estilo_span = result.data.estilo_span;
          self.estilo_contador = result.data.estilo_contador;
          self.tamano_contador = result.data.tamano_contador;
          self.tamano_texto_contador = result.data.tamano_texto_contador;
          self.contador_visible = result.data.visible == "1" ? true : false;
          self.id_contador = result.data.id;
        });
    },
    formatearFecha(fechaOriginal) {
      if (fechaOriginal != null) {
        var fecha = new Date(fechaOriginal);
        var year = fecha.getFullYear();
        var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
        var day = ("0" + fecha.getDate()).slice(-2);
        var hour = ("0" + fecha.getHours()).slice(-2);
        var minute = ("0" + fecha.getMinutes()).slice(-2);
        var formattedDate = `${year}-${month}-${day}T${hour}:${minute}`;
        return formattedDate;
      }
    },
    saveModal() {
      let self = this;
      let config = this.configHeader();
      var form = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        recarga_navegador: this.recarga_navegador == false ? 0 : 1,
        modal_visible: this.modal_visible == false ? 0 : 1,
        alerta: this.alerta == false ? 0 : 1,
      };
      axios
        .post(
          self.URL_API + "api/v1/modalprincipal/" + self.id_modal,
          form,
          config
        )
        .then(function (result) {
          self.showAlert(result.data.message, result.data.status);
        });
    },
    saveContador() {
      let self = this;
      let config = this.configHeader();
      var form = {
        mensaje_navbar: self.mensaje_navbar,
        fecha_hora: self.fecha_hora,
        estilo_span: self.estilo_span,
        estilo_contador: self.estilo_contador,
        tamano_contador: self.tamano_contador,
        tamano_texto_contador: self.tamano_texto_contador,
        contador_visible: self.contador_visible == false ? 0 : 1,
      };
      axios
        .post(
          self.URL_API + "api/v1/actualizacionprogramada/" + self.id_contador,
          form,
          config
        )
        .then(function (result) {
          self.showAlert(result.data.message, result.data.status);
        });
    },
    ocultaContador() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/ocultacontador", config)
        .then(function (result) {
          self.contador_visible = result.data == "1" ? true : false;
          self.modal_visible = 1;
        });
    },
  },
};
</script>
<style scoped>
.card {
  margin: 40px 0px 0px 0px;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

label {
  float: left;
}

.card button {
  margin: 15px;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}
</style>

<template>
  <div id="container2">
    <div class="container">
      <h2>Administrar Usuarios Directorio Activo</h2>
      <div
        class="row"
        id="container"
        style="float: left; clear: both; color: #d06519"
      >
        <div class="col-xs-12 col-md-12">
          <h5>
            Mostrando {{ Object.values(this.users).length }} de
            {{ totalRegistros }} registros - página {{ paginaActual }}
          </h5>
        </div>
      </div>
      <div
        v-if="users.length > 0 || listaCantidad.length > 0"
        class="row"
        style="clear: both; margin-bottom: 20px"
      >
        <div class="col-xs-3 col-md-4">
          <label for="exampleFormControlInput1" class="form-label"
            >Cantidad de registros a listar</label
          >
          <select
            class="form-select form-select-sm"
            @change="getUsersDA()"
            v-model="cantidad"
            aria-label="Default select example"
          >
            <option>20</option>
            <option v-if="result.data.total > 50">50</option>
            <option v-if="result.data.total > 100">100</option>
            <option v-if="result.data.total > 500">300</option>
            <option v-if="result.data.total > 1000">500</option>
          </select>
        </div>
      </div>
      <div class="row" style="width: 80%">
        <div class="col-xs-4 col-md-6">
          <label endpointEmpleadosfor="exampleInputEmail1" class="form-label"
            >Buscar usuario</label
          >
          <input
            type="text"
            class="form-control"
            autocomplete="off"
            id="exampleInputEmail1"
            placeholder="Escriba nombre o usuario"
            aria-describedby="emailHelp"
            v-model="usuario"
          />
        </div>
        <div class="col-xs-4 col-md-3">
          <button
            v-if="usuario != ''"
            type="button"
            style="margin-top: 35px"
            @click="getUser(usuario), (check = [])"
            class="btn btn-success btn-sm"
          >
            Buscar
          </button>
        </div>
        <div class="col-xs-4 col-md-3">
          <button
            v-if="usuario != ''"
            type="button"
            style="margin-top: 35px"
            @click="getUsersDA(), (usuario = '')"
            class="btn btn-success btn-sm"
          >
            Borrar búsqueda
          </button>
        </div>
      </div>
      <form class="was-validated" @submit.prevent="save()">
        <div class="row" style="clear: both; text-align: left; width: 70%">
          <div class="col-xs-3 col-md-3 mt-2">
            <button
              type="button"
              style="margin-top: 31px"
              @click="selectAll((select_all = !select_all))"
              class="btn btn-success"
            >
              Seleccionar todo
            </button>
          </div>
          <div v-if="check.length > 0" class="col-xs-3 col-md-3">
            <SearchList
              nombreCampo="Asignar rol: *"
              nombreItem="nombre"
              eventoCampo="getRoles"
              :consulta="consulta_rol"
              :registros="roles"
              @getRoles="getRoles"
              placeholder="Seleccione una opción"
            />
          </div>
          <div v-if="check.length > 0" class="col-xs-3 col-md-3">
            <SearchList
              nombreCampo="Asignar rol interno: *"
              nombreItem="nombre"
              eventoCampo="getRolesInternos"
              :consulta="consulta_rol_interno"
              :registros="roles_internos"
              @getRolesInternos="getRolesInternos"
              placeholder="Seleccione una opción"
            />
          </div>
          <div
            v-if="
              check.length > 0 &&
              consulta_rol != '' &&
              consulta_rol_interno != ''
            "
            class="col-xs-3 col-md-3 mt-2"
          >
            <button
              type="submit"
              style="margin-top: 31px"
              class="btn btn-success"
            >
              Guardar usuarios
            </button>
          </div>
        </div>
      </form>
      <div v-if="spinner">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h5>Cargando por favor espere un momento.</h5>
      </div>
      <div v-else class="table-responsive">
        <table
          class="table align-middle table-bordered table-striped table-hover"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Seleccionar</th>
              <th scope="col">Nombre</th>
              <th scope="col">Usuario</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in users" :key="index" ref="elements">
              <th scope="row">{{ index }}</th>
              <td>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    v-model="check"
                    type="checkbox"
                    :value="item"
                  />
                </div>
              </td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.usuario }}</td>
              <td>
                <button
                  v-if="item.rol != 'S. Administrador'"
                  type="button"
                  :class="
                    item.registrado == true
                      ? 'btn btn-warning btn-sm'
                      : 'btn btn-success btn-sm'
                  "
                >
                  <i
                    :class="
                      item.registrado == false
                        ? 'bi bi-person-plus'
                        : 'bi bi-person'
                    "
                  ></i>
                  {{
                    item.registrado == false
                      ? "Usuario sin registrar"
                      : "Usuario registrado"
                  }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PiePagina
        @response="response"
        :actualiced="actualiced"
        :cantidad="cantidad"
        :result="result"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import PiePagina from "./PiePagina.vue";
import { Alerts } from "../Mixins/Alerts.js";
import { Token } from "../Mixins/Token.js";
import SearchList from "./SearchList.vue";
export default {
  components: {
    PiePagina,
    SearchList,
  },
  props: {
    menu: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  mixins: [Alerts, Token],
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      users: [],
      actualiced: false,
      cantidad: 10,
      result: [],
      check: [],
      select_all: false,
      roles: [],
      roles_internos: [],
      rol_select: "",
      rolId_: "",
      totalRegistros: "",
      paginaActual: "",
      listaCantidad: "",
      usuario: "",
      ruta: "",
      mensajeBoton: "",
      usersSystem: [],
      exist: false,
      spinner: true,
      rol_id: "",
      consulta_rol: "",
      rol_interno_id: "",
      consulta_rol_interno: "",
    };
  },
  mounted() {
    this.ruta = this.$route.path.substring(1);
  },
  created() {
    this.getUsers();
    this.getUsersDA();
    this.getRoles();
    this.getRolesInternos();
  },
  methods: {
    boton(item) {
      let self = this;
      self.spinner = false;
      self.totalRegistros = item.data.total;
      self.paginaActual = item.data.current_page;
      Object.values(item.data.data).forEach(function (item) {
        item.registrado = false;
        self.usersSystem.forEach(function (item2) {
          if (item.usuario == item2.email) {
            item.registrado = true;
          }
        });
      });
      this.users = Object.values(item.data.data);
      self.result = item;
    },
    getUsersDA() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/ldapusers/" + self.cantidad, config)
        .then(function (result) {
          self.boton(result);
        });
    },
    getUser(user) {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/ldapuserfilter/" + user, config)
        .then(function (result) {
          self.boton(result);
        });
    },

    getUsers() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/userslist", config)
        .then(function (result) {
          self.usersSystem = result.data;
        });
    },
    getRoles(item = null) {
      if (item != null) {
        this.rol_id = item.id;
        this.consulta_rol = item.nombre;
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/roleslista", config)
        .then(function (result) {
          self.roles = result.data;
        });
    },
    getRolesInternos(item = null) {
      if (item != null) {
        this.rol_interno_id = item.id;
        this.consulta_rol_interno = item.nombre;
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/rolusuariointerno", config)
        .then(function (result) {
          self.roles_internos = result.data;
        });
    },
    response(response) {
      this.users = [];
      this.boton(response);
      this.checks = [];
    },
    save() {
      let self = this;
      let config = this.configHeader();
      let roles = { rol_id: this.rol_id, rol_interno_id: this.rol_interno_id };
      this.check.splice(0, 0, roles);
      axios
        .post(self.URL_API + "api/v1/ldapusers", this.check, config)
        .then(function (result) {
          self.showAlert(result.data.message, result.data.status);
          self.check = [];
          self.rol_id = "";
          self.consulta_rol = "";
          self.consulta_rol_interno = "";
          self.rol_interno_id = "";
        });
    },
    selectAll() {
      let self = this;
      if (this.select_all) {
        document
          .querySelectorAll(".form-check input[type=checkbox]")
          .forEach(function (checkElement) {
            checkElement.checked = true;
          });
        self.users.forEach(function (item) {
          self.check.push(item);
        });
      } else {
        document
          .querySelectorAll(".form-check input[type=checkbox]")
          .forEach(function (checkElement) {
            checkElement.checked = false;
          });
        self.users.forEach(function (item) {
          self.check.pop(item);
        });
        this.check = [];
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

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}

.table-responsive {
  clear: both;
}

label {
  float: left;
}

button {
  /* float: left; */
  margin-bottom: 20px;
}

#scroll {
  color: white;
  background: #e67e22;
  font-size: 1.3rem;
}

/*spiner*/
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-top: 50px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid rgb(10, 10, 10);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: rgb(199, 195, 195) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* fin spinner*/
</style>

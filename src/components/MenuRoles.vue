<template>
  <div>
    <div class="container">
      <Loading :loading="loading" />
      <h2>Roles y menús</h2>
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <label style="width: 250px; margin-top: 10px; text-align: left">Roles</label>
          <select id="inputState1" class="form-select" v-model="rol_select" @change="rolId(rol_select)">
            <option v-for="(item, index) in roles" :key="index">
              {{ item.nombre }}
            </option>
          </select>
        </div>
        <div class="col-xs-12 col-md-3">
          <label style="width: 250px; margin-top: 10px; text-align: left">Menús</label>
          <select id="inputState1" class="form-select" :disabled="checks.length > 1" v-model="menu_select"
            @change="menuId(menu_select)">
            <option ref="item_select" v-for="(item, index) in menus" :key="index">
              {{ item.nombre }}
            </option>
          </select>
        </div>
        <button type="button" id="newNews" class="col-xs-12 col-md-2 btn btn-success" @click="asignarMenu()"
          style="margin-top: 33px">
          <i class="bi bi-file-earmark-plus"></i> Asignar menú
        </button>
      </div>
      <div class="row">
        <div class="mb-3" v-if="asignar_roles.length > 0">
          <span>Roles a asignar</span>
          <div class="mb-3" style="
              padding: 10px;
              border: solid #d5dbdb 0.5px;
              border-radius: 10px;
            ">
            <button type="button" style="margin: 10px 10px 5px 10px" id="btnMenu" class="btn btn-sm"
              data-bs-toggle="button" v-for="(item, index) in asignar_roles" :key="index">
              {{ item.nombre }}
              <i class="bi bi-x" @click="asignar_roles.splice(index, 1)"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="mb-3" v-if="asignar_menus.length > 0">
          <span>Menús a asignar</span>
          <div class="mb-3" style="
              padding: 10px;
              border: solid #d5dbdb 0.5px;
              border-radius: 10px;
            ">
            <button type="button" style="margin: 10px 10px 5px 10px" id="btnMenu" class="btn btn-sm"
              data-bs-toggle="button" v-for="(item, index) in asignar_menus" :key="index">
              {{ item.nombre }}
              <i class="bi bi-x" @click="asignar_menus.splice(index, 1)"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <label style="width: 250px; margin-top: 10px; text-align: left">filtrar por rol</label>
          <select id="inputState1" class="form-select" v-model="rol" @change="filtroRol(rol)">
            <option v-for="(item, index) in rolesunicos" :key="index">
              {{ item.rol }}
            </option>
          </select>
        </div>
        <button type="button" id="reset" class="col-xs-12 col-md-2 btn btn-success" style="margin-top: 33px"
          @click="getItems(), (rol = '')">
          <i class="bi bi-arrow-counterclockwise"></i> Borrar busqueda
        </button>
      </div>
      <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :massiveUpdate="massiveUpdate" :campos="campos"
        :eliminar="permisos[10].autorizado" @response="response" @clear="clear" @check="check"
        @getMenuNavbar="getMenuNavbar" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Tabla from "./Tabla.vue";
import { Alerts } from "../Mixins/Alerts.js";
import { Token } from "../Mixins/Token.js";
import Loading from "./Loading.vue";
import { Scroll } from "../Mixins/Scroll.js";
import { Permisos } from "../Mixins/Permisos.js";

export default {
  props: {
    menu: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  mixins: [Token, Alerts, Scroll, Permisos],
  components: {
    Tabla,
    Loading,
  },
  data() {
    return {
      rolesmenu: [],
      permisos_roles: [],
      menus: [],
      rolesunicos: [],
      roles: [],
      rol_select: "",
      menu_select: "",
      rolId_: "",
      menuId_: "",
      rol: "",
      URL_API: process.env.VUE_APP_URL_API,
      roluserlogued: "",
      result: [],
      actualiced: false,
      loading: false,
      currentUrl: "",
      cantidad: 10, // Cantidad de datos a listar por defecto en el componente tabla
      // Campos formulario
      codigo: "",
      item: "",
      unidad_medida: "",
      valor_unitario: "",
      descripcion: "",
      // Fin campos formulario
      // Info enviada al componente tabla por props
      datos: [],
      endpoint: "rolmenu",
      tabla: [
        { nombre: "#", orden: "DESC" },
        {
          nombre: "Nombre rol",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        { nombre: "Menu", orden: "DESC", tipo: "texto", calculado: "false" },
      ],
      // Fin info enviada al componente tabla por props
      checks: [],
      massiveUpdate: false,
      campos: {},
      ruta: "",
      asignar_menus: [],
      asignar_roles: [],
      actualizar_menu: false,
    };
  },
  mounted() {
    this.ruta = this.$route.path.substring(1);
  },
  created() {
    this.getItems();
    this.getMenu();
    this.getRoles();
    this.getRolesMenu();
  },
  methods: {
    getMenuNavbar() {
      this.$emit("getMenu");
    },
    getItems() {
      let self = this;
      let urlEndPoint = "";
      urlEndPoint = self.URL_API + "api/v1/rolmenu/" + self.cantidad;
      if (this.currentUrl != "") {
        urlEndPoint = this.currentUrl;
      }
      let config = this.configHeader();
      axios.get(urlEndPoint, config).then(function (result) {
        self.datos = result;
      });
    },
    response(response) {
      this.actualizar_menu = true;
      this.currentUrl = response.currentUrl;
      this.rol_select = response.rol;
      this.menu_select = response.menu;
      this.idItem = response.id;
      this.actualizar = true;
      this.menuId(response.menu);
      this.rolId(response.rol);
      this.checks = [];
    },
    getMenu() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/menuslista", config)
        .then(function (result) {
          try {
            self.menus = result.data;
          } catch (error) {
            console.log(error);
          }
        });
    },
    getRoles() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/roleslista", config)
        .then(function (result) {
          self.roles = result.data;
        });
    },
    getRolesMenu() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/rolesConMenu", config)
        .then(function (result) {
          self.rolesunicos = result.data;
        });
    },
    messageDelete(id) {
      let self = this;
      this.$swal
        .fire({
          title: "Estas seguro de elimiar el resgistro?",
          text: "Esta operación no se puede revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            self.eliminar(id);
          }
        });
    },
    eliminar(id) {
      let self = this;
      let config = this.configHeader();
      axios
        .delete(self.URL_API + "api/v1/rolmenu/" + id, config)
        .then(function (result) {
          self.getRolesMenu();
          self.showAlert(result.data.message, result.data.status);
        });
    },
    asignarMenu() {
      let self = this;
      this.loading = true;
      this.scrollTop();
      if (this.checks.length > 0) {
        // validación para realizar actualización masiva
        this.massiveUpdate = !this.massiveUpdate;
        this.campos.rol_id = this.rolId_;
      } else {
        let urlEndPoint = "";
        let menu_rol = [];
        menu_rol.push(this.asignar_roles);
        menu_rol.push(this.asignar_menus);
        if (self.actualizar) {
          urlEndPoint = self.URL_API + "api/v1/rolmenu/" + self.idItem;
        } else {
          urlEndPoint = self.URL_API + "api/v1/rolmenu";
        }
        let config = this.configHeader();
        axios.post(urlEndPoint, menu_rol, config).then(function (result) {
          self.loading = false;
          self.showAlert(result.data.message, result.data.status);
          self.getItems();
          self.clear();
          self.getRolesMenu();
          self.$emit("getMenu");
        });
      }
    },
    rolId(rol) {
      let self = this;
      var cont = 0;
      this.roles.forEach(function (element) {
        if (rol == element.nombre) {
          self.rolId_ = element.id;
          if (!self.actualizar_menu) {
            const rol_existe = self.asignar_roles.some(
              (rol) => rol.id === element.id
            );
            if (!rol_existe) {
              self.asignar_roles.push({
                id: element.id,
                nombre: element.nombre,
              });
            }
          } else {
            self.asignar_menus = [];
            self.actualizar_menu = false;
          }
          cont++;
        }
      });
      if (cont <= 0) {
        self.rolId_ = "";
      }
    },
    filtroRol(rol) {
      let self = this;
      this.roles.forEach(function (element) {
        if (rol == element.nombre) {
          let config = self.configHeader();
          axios
            .get(self.URL_API + "api/v1/rolmenuporid/" + element.id, config)
            .then(function (result) {
              self.datos = result;
            });
        }
      });
    },
    menuId(menu) {
      let self = this;
      var cont = 0;
      this.menus.forEach(function (element) {
        if (menu == element.nombre) {
          self.menuId_ = element.id;
          if (!self.actualizar_menu) {
            const menu_existe = self.asignar_menus.some(
              (menu) => menu.id === element.id
            );
            if (!menu_existe) {
              self.asignar_menus.push({
                id: element.id,
                nombre: element.nombre,
              });
            }
          } else {
            self.asignar_menus = [];
            self.actualizar_menu = false;
          }
          cont++;
        }
      });
      if (cont <= 0) {
        self.menuId_ = "";
      }
    },
    clear() {
      this.rol_select = "";
      this.menu_select = "";
      this.idItem = "";
      this.actualizar = false;
    },
    check(check) {
      this.checks = check;
    },
  },
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
  background-color: rgb(28, 146, 77);
  color: white;
}
</style>

<template>
  <div v-if="autoriced">
    <NotificacionesSocket />
    <nav class="navbar navbar-expand-lg navbar-dark gradient-background">
      <div class="container-fluid">
        <a class="navbar-brand" href="">
          <!-- <img
              v-bind:src="URL_API + logo.imagen"
              :alt="logo.titulo"
              :width="logo.ancho"
              class="d-inline-block align-text-top"
            /> -->
          <img
            src="@/assets/logo2.png"
            width="60px"
            class="d-inline-block align-text-top"
            alt=""
          />
          <!-- Acá va el nombre-->
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="collapese"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          :class="
            collapse
              ? 'collapse navbar-collapse show'
              : 'collapse navbar-collapse'
          "
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li
              class="nav-item"
              @click="collapese"
              :style="actualizacion ? 'padding-top: 15px' : ''"
            >
              <router-link class="nav-link active" to=""
                >{{ saludo }} {{ nombre }}</router-link
              >
            </li>
            <li>
              <CuentaRegresiva @timeElapsed="actualizacion = false" />
            </li>
            <li
              class="nav-item contrasena"
              id="menu-lateral"
              @click="ocultarMenu(), collapese()"
            >
              <i
                :class="
                  menu_lateral
                    ? 'bi bi-text-indent-right'
                    : 'bi bi-text-indent-left'
                "
              ></i>

              {{
                menu_lateral ? "Ocultar menú lateral" : "Mostrar menú lateral"
              }}
            </li>
            <li
              class="nav-item contrasena"
              :style="actualizacion ? 'padding-top: 15px' : ''"
              id="contrasena"
              @click="actualizar()"
            >
              <i class="bi bi-person-circle"></i> Editar usuario
            </li>
            <li
              class="nav-item logout"
              :style="actualizacion ? 'padding-top: 15px' : ''"
              id="logout"
              @click="logout"
            >
              <i class="bi bi-box-arrow-left"></i> Cerrar sesión
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="aside" :style="{ top: this.scrolled ? '0px' : '85px' }">
      <div class="accordion-item" v-for="(item, index) in menu" :key="index">
        <h2 class="accordion-header" :id="'flush-heading' + option[index]">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#flush-collapse' + option[index]"
            aria-expanded="false"
            :aria-controls="'flush-collapse' + option[index]"
          >
            <i :class="item.icon"></i><span>{{ item.categoria }}</span>
          </button>
        </h2>
        <div
          :id="'flush-collapse' + option[index]"
          class="accordion-collapse collapse"
          :aria-labelledby="'flush-heading' + option[index]"
          data-bs-parent="#accordionFlushExample"
        >
          <div
            v-for="(item, index) in menu[index].opciones"
            :key="index"
            class="accordion-body"
          >
            <router-link
              v-if="item.urlExterna == '0'"
              class="nav-link active"
              :to="
                item.powerbi != ''
                  ? '/' + item.url + '/' + item.nombre
                  : item.url != ''
                  ? '/' + item.url
                  : '/navbar'
              "
              :style="{ 'pointer-events': item.disabled ? 'none' : 'auto' }"
            >
              <i :class="item.icon"></i
              ><span>{{
                item.nombre == "rol" ? "Rol: " + userlogued.rol : item.nombre
              }}</span>
            </router-link>
            <a
              v-else
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              style="color: white; text-decoration: none"
              class="nav-link active"
              :style="{ 'pointer-events': item.disabled ? 'none' : 'auto' }"
            >
              <i :class="item.icon"></i> <span>{{ item.nombre }}</span>
            </a>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <ModalPrincipal
      @actualizacion="actualizacion = true"
      :modal="actualizacion"
    />
    <router-view
      :class="{ ancho_componente: anchocomponente }"
      :userlogued="userlogued"
      :menu="menu"
      :user_type="user_type"
      @getMenu="getMenu"
      :actualizacion="actualizacion"
    />
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import { Token } from "../Mixins/Token";
import { Permisos } from "../Mixins/Permisos";
import { Alerts } from "@/Mixins/Alerts";
import CuentaRegresiva from "../components/CuentaRegresiva";
import ModalPrincipal from "../components/ModalPrincipal";
import NotificacionesSocket from "./NotificacionSocket.vue";
export default {
  components: {
    name: "Navbar",
    CuentaRegresiva,
    ModalPrincipal,
    NotificacionesSocket,
  },
  mixins: [Token, Alerts, Permisos],
  data() {
    return {
      scrolled: false,
      user_type: "",
      username: "",
      collapse: false,
      expand: false,
      saludo: "Bienvenido",
      ruta: "",
      menu: [],
      nombre: "",
      userlogued: { nombres: "", rol: "" },
      logo: [],
      user_id: "",
      URL_API: process.env.VUE_APP_URL_API,
      autoriced: false,
      option: [],
      categoria_menu: [],
      menu_lateral: true,
      anchocomponente: false,
      ruta: "",
      labelscountdown: {
        days: "Días",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos",
      },
      actualizacion: true,
      documento_identidad: "",
    };
  },
  watch: {
    $route() {
      this.validaAnchoTabla();
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  created() {
    this.urlExterna();
    this.userLogued();
    this.validaRuta();
    this.validaAnchoTabla();
  },
  destroyed() {
    localStorage.removeItem("access_token");
  },
  methods: {
    validaAnchoTabla() {
      this.ruta = this.$route.path;
      if (
        this.ruta.includes("gestion-ingresosl") ||
        this.ruta.includes("debida-diligencia/clientes") ||
        this.ruta.includes("ingresos-pendientes") ||
        this.ruta.includes("correo-novedades-nomina") ||
        this.ruta.includes("crm-seguimiento") ||
        this.ruta.includes("crm-pendientes") ||
        this.ruta.includes("indicadores-seiya") ||
        this.ruta.includes("lista-riesgos")
      ) {
        this.anchocomponente = true;
      } else {
        this.anchocomponente = false;
      }
    },
    validaRuta() {
      // valida si el usuario tiene acceso a la ruta o menú consultado, incluir los módulos que no están en el menú
      var self = this;
      var rutaAnterior = "";
      var regex = /\/navbar\/(.*)/;
      this.$watch(
        () => this.$route.path,
        (newPath, oldPath) => {
          var bandera = false;
          this.menu.forEach(function (item) {
            item.opciones.forEach(function (item2) {
              if (
                newPath.includes(item2.url.split("/")[1]) ||
                newPath.includes("empleado") ||
                newPath.includes("editarUsuario") ||
                newPath.includes("timeLine") ||
                newPath.includes("landing") ||
                newPath.includes("formularioinfocandidato")
              ) {
                bandera = true;
              }
            });
          });
          if (!bandera) {
            self.$router.push(oldPath.match(regex)[1]);
          }
          bandera = false;
        }
      );
    },
    collapese() {
      this.collapse = !this.collapse;
    },
    logout() {
      if (this.userlogued.tipo_usuario_id == "3") {
        this.$router.push({ name: "loginCandidatos" });
      } else {
        this.$router.push({ name: "login" });
      }
      localStorage.removeItem("access_token");
    },
    ocultarMenu() {
      var menu = document.getElementsByClassName("aside")[0];

      if (this.menu_lateral) {
        menu.style.display = "none"; // Ocultar el menú
      } else {
        menu.style.display = "block"; // Mostrar el menú
      }
      this.menu_lateral = !this.menu_lateral;
      localStorage.setItem("menu_lateral", this.menu_lateral);
    },
    handleScroll() {
      this.scrolled = window.scrollY > 70;
    },
    actualizar() {
      this.$router.push({
        name: "editarUsuario",
        params: { tipo: this.user_type, id: this.user_id },
      });
    },
    async userLogued() {
      let self = this;
      let config = this.configHeader();
      try {
        const response = await axios.get(
          self.URL_API + "api/v1/userlogued",
          config
        );
        if (response.data) {
          self.configuraUsuario(response.data);
        } else {
          self.$router.push("/");
        }
      } catch (error) {
        console.log(error);
        self.$router.push("/");
      }
    },
    configuraUsuario(data) {
      let self = this;
      if (data.tipo_usuario_id == "3") {
        self.nombre = data.primer_nombre + " " + data.primer_apellido;
      } else if (data.tipo_usuario_id == "1") {
        self.nombre = data.nombres + " " + data.apellidos;
      } else {
        self.nombre = data.nombres;
      }
      self.userlogued = data;
      self.user_type = data.tipo_usuario_id;
      self.user_id = data.usuario_id;
      self.autoriced = true;
      self.getMenu();
    },
    getMenu() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/categoriaMenu", config)
        .then(function (result) {
          self.menu = result.data;
          self.menu.forEach(function (item, index) {
            self.option.push(index);
          });
        });
    },
    asideExpand() {
      this.expand = !this.expand;
    },
  },
};
</script>
<style scoped>
.navbar {
  box-shadow: 3px 3px 4px 2px rgba(26, 25, 25, 0.338);
}

.navbar-brand {
  margin-left: 50px;
}

.aside {
  width: 50px;
  height: 100vh;
  background-color: rgba(22, 119, 115, 1);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  color: white;
  transition: width 1s, top 0.3s ease;
  overflow-x: hidden;
  font-size: 1rem;
  padding: 10px;
  text-align: left;
  border-bottom-right-radius: 5px;
  box-shadow: 3px 3px 4px 2px rgba(26, 25, 25, 0.338);
  pointer-events: auto;
}

.aside i {
  font-size: 1.2rem;
}

.aside:hover::-webkit-scrollbar-thumb {
  visibility: visible;
  transition: width 1s;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(22, 119, 115, 1);
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(22, 119, 115, 1);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(22, 119, 115, 1);
}

::-webkit-scrollbar-thumb {
  visibility: hidden;
}

.aside i {
  position: absolute;
  left: 7px;
}

.aside .accordion-collapse i {
  position: absolute;
  left: 15px;
}

.aside .accordion-collapse {
  margin-top: 10px;
}

.aside .accordion-collapse .nav-link {
  padding: 10px;
}

.aside .accordion-body:hover {
  color: #000000;
  background-color: rgba(255, 255, 255, 0.808);
  border-radius: 5px;
  padding: 5px;
  transition: background-color 1s ease;
}

.accordion-item button.accordion-button {
  pointer-events: none;
}

.accordion-item:hover button.accordion-button {
  pointer-events: auto;
}

.aside span {
  position: relative;
  margin-left: 40px;
  white-space: nowrap;
}

.aside:hover {
  width: 280px;
}

/* .aside2 {
    width: 300px;
    height: 1000px;
    background-color: rgb(190, 32, 24);
    position: absolute;
    z-index: 100;
    color: white;
    transition: width 1s;
  } */
/* .aside p:not(:hover) {
    font-size: 0px;
  }  */
.aside h1 i {
  cursor: pointer;
}

.aside #icon {
  margin-left: 10px;
}

#logout {
  position: absolute;
  right: 15px;
  color: white;
  padding: 5px;
  cursor: pointer;
}

#contrasena {
  position: absolute;
  right: 160px;
  color: white;
  padding: 5px;
  cursor: pointer;
}

#menu-lateral {
  position: absolute;
  right: 300px;
  color: white;
  padding: 5px;
  cursor: pointer;
  visibility: hidden;
}

@media screen and (max-width: 991px) {
  #logout {
    position: relative;
    right: 0px;
  }

  #contrasena {
    position: relative;
    right: 0px;
  }

  #menu-lateral {
    position: relative;
    right: 0px;
    visibility: visible;
  }

  /* #menucolapsed{
      display:block;
    } */
}

@media screen and (min-width: 991px) {
  .navbar #menucolapsed {
    display: none;
  }
}

/* #item-menu:hover{
  background-color: rgb(0, 0, 0);
  border-radius: 15px;
  color: #7be4b8;
  padding: 0;
} */

.accordion {
  background-color: rgba(22, 119, 115, 1);
  outline: none;
}

.accordion-button {
  background-color: rgba(22, 119, 115, 1);
  color: rgb(255, 255, 255);
  outline: none;
}

.accordion-item {
  background-color: rgba(22, 119, 115, 1);
  color: rgb(255, 255, 255);
  outline: none;
}

/* .accordion-button:not(.collapsed) {
    background-color: transparent !important;
} */

.accordion-button:focus {
  outline: none !important;
  box-shadow: none !important;
}

.gradient-background {
  /* Fallback para navegadores que no admiten degradados */
  /* background: rgb(0, 107, 63);
  background: linear-gradient(90deg, rgba(0, 107, 63, 1) 6%, rgba(26, 150, 56, 1) 16%, rgba(22, 119, 115, 1) 47%, rgba(117, 165, 176, 1) 56%, rgba(4, 66, 105, 1) 66%); */
  background: rgb(0, 107, 63);
  background: rgba(22, 119, 115, 0.01);
  background: linear-gradient(
    90deg,
    rgba(22, 119, 115, 1) 0%,
    rgba(48, 159, 128, 1) 50%,
    rgba(4, 66, 105, 1) 100%
  );
  /* Para navegadores que no admiten degradados */
  /* background-image: url('ruta/a/una/imagen-de-fondo.jpg'); */
  /* En caso de que el navegador no admita degradados, proporciona una imagen de fondo */

  /* Otras propiedades de estilo */
  /* width: 100%; */
  /*height: 100vh;  Altura del viewport */
  /* Puedes ajustar estas propiedades según tus necesidades */
}

.ancho_componente {
  margin: 60px;
  min-width: 95%;
}
</style>

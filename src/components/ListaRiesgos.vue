<template>
  <div>
    <div class="container">
      <NotificacionesSocket />
      <h2>Lista riesgos</h2>
      <Tabla
        :datos="datos"
        :tabla="tabla"
        :userlogued="userlogued"
        :endpoint="endpoint"
        :listas="listas"
        :endpointexport="endpointexport"
        :estados_ingreso="estados_ingreso"
        @actualizaEstado="actualizaEstado"
        @actualizaResponsable="actualizaResponsable"
        @filtrando="filtrando"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Token } from "../Mixins/Token.js";
import Tabla from "./Tabla.vue";
export default {
  components: {
    Tabla,
  },
  mixins: [Token],
  props: {},
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      show_table: false,
      endpoint: "formularioingreso",
      endpointexport: "exportaformularioingreso",
      datos: [],
      tabla: [
        { nombre: "#", orden: "DESC" },
        {
          nombre: "Radicado",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
      ],
      filtro_gestion_ingresos: false,
    };
  },
  computed: {},
  created() {
    this.getItems();

    var self = this;
    this.interval = setInterval(() => {
      if (!self.filtro_gestion_ingresos) {
        self.getItems(this.pagina_filtro); // Llama a la función que quieres ejecutar cada 30 segundos
      }
    }, 300000);
  },
  watch: {},
  mounted() {},
  methods: {
    getItems(url = null) {
      let self = this;
      let config = this.configHeader();
      if (url != null && url != "") {
        axios.get(url, config).then(function (result) {
          self.first_page_url = result.data.first_page_url.replace('"');
          self.datos = result;
        });
      } else {
        axios
          .get(self.URL_API + "api/v1/matrizriesgo/" + 50, config)
          .then(function (result) {
            self.first_page_url = result.data.first_page_url.replace('"');
            self.datos = result;
          });
      }
    },
  },
};
</script>
<style scoped></style>

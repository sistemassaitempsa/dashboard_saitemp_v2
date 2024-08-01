<template>
  <div>
    <div class="container">
      <!-- <NotificacionesSocket /> -->
      <h2>Lista riesgos</h2>
      <Tabla
        :datos="datos"
        :tabla="tabla"
        :endpoint="endpoint"
        :endpointexport="endpointexport"
        />
        <!-- @filtrando="filtrando" -->
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
      endpoint: "matrizriesgo",
      endpointexport: "exportamatrizriesgo",
      datos: [],
      tabla: [
        { nombre: "#", orden: "DESC" },
        {
          nombre: "Radicado",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Tipo proceso",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Nombre proceso",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Nombre riesgo",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Oportunidad",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Causa",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Plan de acción",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Concecuencia",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Efecto",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Amenaza",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Oportunidad 2",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Amenaza Nivel de riesgo",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Amenaza Tratamiento",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Amenaza Impacto*probabilidad",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Oportunidad Nivel de riesgo",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Oportunidad Tratamiento",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Oportunidad Impacto*probabilidad",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Amenaza resultado control",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Oportunidad resultado control",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Responsable",
          orden: "DESC",
          tipo: "texto",
          calculado: "false",
        },
        {
          nombre: "Fecha radicado",
          orden: "DESC",
          tipo: "fecha",
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

<template>
  <div v-if="actualizacion">
    <span :style="estilo_span">{{ mensaje_navbar }}</span>
    <Countdown
      
      :deadline="deadline"
      :countdownSize="tamano_contador"
      mainColor="#cca900"
      secondFlipColor="#ffdc00"
      :labelColor="estilo_contador"
      :labelSize="tamano_texto_contador"
      :days-label="'Días'"
      :hours-label="'Horas'"
      :minutes-label="'Minutos'"
      :seconds-label="'Segundos'"
      :labels="labelscountdown"
      @timeElapsed="timeElapsedHandler"
      :showDays="showDays"
    ></Countdown>
  </div>
</template>
<script>
import axios from "axios";
import { Token } from "../Mixins/Token";
import { Alerts } from "@/Mixins/Alerts";
import { Socket } from "../Mixins/Socket.js";
import { Countdown } from "vue3-flip-countdown";

export default {
  components: {Countdown},
  mixins: [Token, Alerts, Socket],
  props: {},
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      labelscountdown: {
        days: "Días",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos",
      },
      actualizacion: false,
      deadline: "",
      mensaje_navbar: "",
      estilo_span: "",
      estilo_contador: "",
      tamano_contador: "",
      tamano_texto_contador: "",
      showDays:false,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    var self = this;
    this.actualizacionprogramada();
    window.Echo.channel("channel").listen("TiempoActualizacion", (e) => {
      self.llenarContador(e.message);
    });
  },
  methods: {
    actualizacionprogramada() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/actualizacionprogramada", config)
        .then(function (result) {
          self.llenarContador(result.data);
        });
    },
    llenarContador(result) {
      this.actualizacion = result.visible == "1" ? true : false;
      this.deadline = this.formatearFecha(result.fecha_hora);
      this.mensaje_navbar = result.mensaje_navbar;
      this.estilo_span = result.estilo_span;
      this.estilo_contador = result.estilo_contador;
      this.tamano_contador = result.tamano_contador;
      this.tamano_texto_contador = result.tamano_texto_contador;
    },
    formatearFecha(fechaOriginal) {
      if (fechaOriginal != null) {
        var fecha = new Date(fechaOriginal);
        var fecha_actual = new Date();
        var dia_actual = ("0" + fecha_actual.getDate()).slice(-2);

        var year = fecha.getFullYear();
        var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
        var day = ("0" + fecha.getDate()).slice(-2);
        var hour = ("0" + fecha.getHours()).slice(-2);
        var minute = ("0" + fecha.getMinutes()).slice(-2);
        var second = ("0" + fecha.getSeconds()).slice(-2);

        var formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        if(dia_actual != day){
            this.showDays = true;
        }
        return formattedDate;
      }
    },
    timeElapsedHandler() {
      var self = this;
      self.actualizacion = false;
      self.$emit("timeElapsed");
    },
  },
};
</script>
<style scoped></style>

<template>
  <div>
    <div
      v-for="(item, index) in pila_notificaciones"
      :key="index"
      @click="eliminarNotificacion(index)"
      :class="item.class"
      :style="'visibility:' + item.visible"
    >
      <span class="numero_notificaciones">{{
        pila_notificaciones.length <= 9
          ? "0" + pila_notificaciones.length
          : pila_notificaciones.length
      }}</span>
      <span>{{ item.message }}</span>
    </div>
  </div>
</template>
<script>
import { Socket } from "../Mixins/Socket.js";
export default {
  components: {},
  mixins: [Socket],
  props: {},
  data() {
    return {
      // mensaje_notificacion: '',
      animacion: false,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.socket("channel", "NotificacionSeiya");
  },
  created() {
    if (localStorage.getItem("pila") != "") {
      this.pila_notificaciones = JSON.parse(localStorage.getItem("pila"));
    }
  },
  methods: {
    eliminarNotificacion(index) {
      var self = this;
      self.pila_notificaciones[index].class =
        "notificacion animate__animated animate__fadeOutRight";
      if (self.pila_notificaciones.length > 1) {
        self.pila_notificaciones[self.pila_notificaciones.length - 2].visible =
          "visible";
        self.pila_notificaciones[self.pila_notificaciones.length - 2].class =
          "notificacion animate__animated animate__fadeInRight";
      }
      setTimeout(() => {
        self.pila_notificaciones.splice(index, 1);
        localStorage.setItem("pila", JSON.stringify(self.pila_notificaciones));
      }, 1000);
    },
  },
};
</script>
<style scoped>
.notificacion {
  position: absolute;
  top: 90px;
  padding: 15px;
  right: 20px;
  background-color: rgb(20, 118, 53);
  color: white;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: rgba(83, 80, 80, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.numero_notificaciones {
  background-color: white;
  border-radius: 50%;
  color: black;
  padding: 2px;
  margin-right: 10px;
  font-size: 0.7rem;
}
</style>

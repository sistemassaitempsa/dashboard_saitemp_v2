<template>
  <div>
    <div class="fondo">
      <video src="@/assets/LandingSEIYA1.mp4" loop autoplay></video>
      <h2 class="texto"></h2>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
video {
  object-fit: fill;
  /*   filter: brightness(1.3);
  filter: contrast(-1);
  filter: opacity(0.8); */
  filter: saturate(0.9);
  width: 100%;
}
.fondo {
  width: 100%;
  height: calc(100vh - 85px);
  overflow: hidden;
  background-position: center;
  margin: 0;
  padding: 0;
  margin: 0;
  padding: 0;
  position: relative; /* Asegúrate de que el contenedor sea relativo para que el texto se alinee correctamente */
}

h2.texto {
  color: white;
  font-size: 10rem;
  position: absolute; /* Usa absolute para posicionar el h2 dentro del contenedor */
  left: 70px; /* Ajusta el valor del margen izquierdo aquí */
  top: 25%; /* Puedes ajustar también el margen superior si es necesario */
  margin: 0; /* Elimina el margen predeterminado del h2 */
}
</style>

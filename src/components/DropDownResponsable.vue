<script setup>
import { defineProps } from 'vue';
import { ref, watchEffect } from "vue";

const props = defineProps({
  item: Object, // Objeto con el responsable actual
  permisos: Array, // Lista de permisos
  getEncargados: Function, // Función para obtener encargados
  actualizaResponsable: Function, // Función para actualizar responsable
});

const listaEncargados = ref([]);
let maxCaracteres = ref(20);

const cargarEncargados = () => {
  props.getEncargados(props.item.estado_ingreso_id);
  listaEncargados.value = []; // Limpiar la lista antes de actualizar
};

watchEffect(() => {
  listaEncargados.value = props.item.lista_encargados || [];
});

function truncateOwner(text, maxLength) {
    if (text != null && text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    } else {
        return text;
    }
}
</script>

<template>
  <div class="btn-group">
    <!-- Botón principal -->
    <button type="button" class="btn" :style="'color:black;background-color:' + item.color_estado">
        {{ truncateOwner(item.responsable, maxCaracteres) }}
    </button>

    <!-- Botón de dropdown si tiene permisos -->
    <button v-if="permisos[23]?.autorizado" type="button" class="btn dropdown-toggle dropdown-toggle-split"
      data-bs-toggle="dropdown" aria-expanded="false" :style="'color:black;background-color:' + item.color_estado"
      @click="cargarEncargados">
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>

    <!-- Lista de encargados -->
    <ul class="dropdown-menu">
      <li v-for="(encargado, index) in listaEncargados" :key="index" style="cursor: pointer">
        <a class="dropdown-item" @click="actualizaResponsable(item.id, encargado.id)">{{ encargado.nombre }}</a>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.btn-group a {
  color: black;
}

.btn-group {
  height: 80px;
  width: 135px;
}
</style>

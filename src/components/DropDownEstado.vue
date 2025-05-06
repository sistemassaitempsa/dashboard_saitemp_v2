<script setup>
import { defineProps, ref } from 'vue';
defineProps({
  item: Object, // Recibe el item con estado y color
  estados: Array, // Lista de estados disponibles
  permisos: Array, // Permisos para mostrar el dropdown
  actualizarEstado: Function, // Función para cambiar el estado
});

let maxCaracteres = ref(20);

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
      {{ truncateOwner(item.estado_ingreso, maxCaracteres) }}
    </button>

    <!-- Botón de dropdown si tiene permisos -->
    <button v-if="permisos[23]?.autorizado" type="button" class="btn dropdown-toggle dropdown-toggle-split"
      data-bs-toggle="dropdown" aria-expanded="false" :style="'color:black;background-color:' + item.color_estado">
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>

    <!-- Lista de estados -->
    <ul class="dropdown-menu">
      <li v-for="(estado, index) in estados" :key="index" style="cursor: pointer">
        <a class="dropdown-item" @click="actualizarEstado(item.id, estado.id)">{{ estado.nombre }}</a>
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

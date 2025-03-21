<script setup>
import { defineProps } from 'vue';
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  item: Object, // Objeto con los datos del estado de firma
  permisos: Array, // Lista de permisos
  estadosFirma: Array, // Lista de estados posibles
  actualizaEstadoDD: Function, // Función para actualizar el estado
  maxCaracteres: Number, // Máximo de caracteres a mostrar
});

const router = useRouter();

// Truncar texto si es muy largo
const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

// Computed para obtener el estado actual
const estadoFirma = computed(() =>
  truncateText(props.item.nombre_estado_firma || "", props.maxCaracteres)
);
</script>

<template>
  <div class="btn-group">
    <!-- Botón principal -->
    <button type="button" class="btn" :style="'color:black;background-color:' + item.color_estado_firma">
      {{ estadoFirma }}
    </button>

    <!-- Botón de dropdown si tiene permisos -->
    <button v-if="permisos[20]?.autorizado" type="button" class="btn dropdown-toggle dropdown-toggle-split"
      data-bs-toggle="dropdown" aria-expanded="false" :style="'color:black;background-color:' + item.color_estado_firma">
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>

    <!-- Lista de opciones -->
    <ul class="dropdown-menu">
      <li v-for="(estado, index) in estadosFirma" :key="index" style="cursor: pointer">
        <a class="dropdown-item" @click="actualizaEstadoDD(item.id, estado.id, estado.nombre)">{{ estado.nombre }}</a>
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <li>
        <a class="dropdown-item" @click="router.push('/navbar/timeLine/' + item.id)">Historial actualizaciones</a>
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

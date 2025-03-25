<script setup>
import { defineProps } from 'vue';
import { ref, computed, watch } from "vue";

const props = defineProps({
    item: Object, // Datos del estado de firma
    permisos: Array, // Lista de permisos
    colorFondo: String, // Color de fondo
    listaEncargados: Array, // Lista de encargados
    getEncargados: Function, // Función para obtener encargados
    actualizaResponsable: Function, // Función para actualizar responsable
    maxCaracteres: Number, // Máximo de caracteres a mostrar
});

const encargados = ref([...props.listaEncargados]);
// let maxCaracteres = ref(20);

// Verifica cambios en la lista de encargados y actualiza
watch(() => props.listaEncargados, (newValue) => {
    encargados.value = [...newValue];
});

// Truncar texto si es muy largo
const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
};

// Computed para obtener el responsable actual
const responsableActual = computed(() => truncateText(props.item.responsable || "", props.maxCaracteres));

// function truncateOwner(text, maxLength) {
//     if (text != null && text.length > maxLength) {
//         return text.substring(0, maxLength) + "...";
//     } else {
//         return text;
//     }
// }

</script>

<template>
    <div class="btn-group">
        <!-- Botón principal -->
        <button type="button" class="btn" :style="'color:black;background-color:' + colorFondo">
            {{ responsableActual }}
            <!-- {{ truncateOwner(responsableActual, maxCaracteres) }} -->
        </button>

        <!-- Botón de dropdown si tiene permisos -->
        <button v-if="permisos[20]?.autorizado" type="button" class="btn dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown" aria-expanded="false" :style="'color:black;background-color:' + colorFondo"
            @click="getEncargados(item.estado_firma_id)">
            <span class="visually-hidden">Toggle Dropdown</span>
        </button>

        <!-- Lista de opciones -->
        <ul class="dropdown-menu">
            <li v-for="(encargado, index) in encargados" :key="index" style="cursor: pointer">
                <a class="dropdown-item" @click="actualizaResponsable(item.id, index)">{{ encargado.nombre }}</a>
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

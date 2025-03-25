<template>
    <div class="container">
        <h2>Lista servicios</h2>
        <Tabla :datos="datos" :tabla="tabla" :endpoint="endpoint" :endpointexport="endpointexport" :acciones="acciones"
            @accion="accion" :filtro_visible="true" :checked="false" :label_accion="true" />
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";
import axios from "axios";
import { useConfig } from "../composables/token"; // Asegúrate de ajustar la ruta
import Tabla from "./Tabla.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { URL_API, configHeader } = useConfig();

const props = defineProps({
    userlogued: Object
});

let datos = ref([]);
let endpoint = ref('ordenservicio');
let endpointexport = ref('ordenservicio');
let tabla = ref([
    { nombre: "#", orden: "DESC" },
    {
        nombre: "Radicado",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
    {
        nombre: "Fecha radicado",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
    {
        nombre: "radicador",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
    {
        nombre: "fecha inicio",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
    {
        nombre: "fecha fin",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
    {
        nombre: "Linea servicio",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
    {
        nombre: "Ciudad prestación servicio",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
    {
        nombre: "Motivo servicio",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
    {
        nombre: "Cantidad contrataciones",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
    {
        nombre: "salario",
        orden: "DESC",
        tipo: "texto",
        calculado: "false",
    },
]);
const acciones = ref([
    {
        nombre: "ver registro",
        url: 'orden-servicio/',
        accion: '1'
    }
]);

onMounted(() => {
    getItems()
    botonCrearRadicado()
});

function botonCrearRadicado() {
    // Esta función agrega la opción para ver el botón de crear radicado solo para usuarios internos de saitemp con el permiso
    if (props.userlogued.tipo_usuario_id == 1) {
        acciones.value.push({
            nombre: "Crear radicado",
            url: 'gestion-ingresos',
            accion: "2"
        })
    }
}


function getItems() {
    axios.get(URL_API.value + 'api/v1/ordenservicio/10', configHeader()).then(function (result) {
        datos.value = result;
    });
}

function accion(item, opcion) {
    switch (opcion.accion) {
        case '1':
            // Redirije al componente con el id del registro en la url
            router.push(opcion.url + item.id);
            break;
        case '2':
            // Redirije al componente con el objeto del registro oculto
            router.push({
                path: opcion.url,
                state: item
            });
            break;
    }
}


</script>
<style scoped>
.card {
    margin: auto;
    padding: 20px;
    min-width: 350px;
    margin-bottom: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
        rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

h2 {
    font-family: "Montserrat", sans-serif;
    margin: 20px 0px 20px 0px;
}
</style>
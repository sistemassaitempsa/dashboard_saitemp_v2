<template>
    <div class="container">
        <Loading :loading="loading" />
        <div class="row">
            <div class="col">
                <span v-if="char2">Cantidad de radicados por cada mes del año.</span>
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="radicados_mes"
                    :datosS="cargos_mes" :index="1" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Token } from '../Mixins/Token.js';
import DoughnutChar from './DoughnutChar.vue';
import GraficoBarras from './GraficoBarras.vue';
import GraficoBarrasApiladas from './GraficoBarrasApiladas.vue';
import Loading from './Loading.vue'
export default {
    name: '',
    components: {
        DoughnutChar,
        GraficoBarras,
        GraficoBarrasApiladas,
        Loading,
    },
    mixins: [Token],
    props: {

    },
    data() {
        return {

        }
    },
    methods: {
        getDataByUser() {

        }
    }
}

</script>

<style scoped>
.row {
    background-color: rgba(216, 231, 233, 0.653);
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    padding: 15px;
}

span {
    float: left;
    display: block;
    padding: 15px;
    /* transition-duration: 500ms; */
}

/* span:hover {
    font-size: 1.5rem;
    cursor: pointer;
    transition-duration: 500ms;
    font-weight: 100;
} */
</style>
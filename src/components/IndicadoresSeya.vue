<template>
    <div class="container">
        <Loading :loading="loading" />
        <div class="row">
            <div class="col">
                <span v-if="char2">Cantidad de radicados por cada mes del año.</span>
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="radicados_mes"
                    :datosS="cargos_mes" :index="1" />
            </div>
            <div class="col">
                <span v-if="char2">Cantidad de radicados por tipo de servicio por cada mes del año.</span>
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="estados_cargo"
                    :datosS="cantidad_vacantes_tipo_servicio" :index="2" />
            </div>
        </div>
        <div class="row">
            <div :class="!expandido ? 'col-6' : 'col-12'">
                <span v-if="char3">Cantidad de contrataciones efectivas por cada mes del año.</span>
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="vacantes_ocupadas"
                    :datosS="cantidad_vacantes" :index="3" />
            </div>
            <div :class="!expandido ? 'col-6' : 'col-12'">
                <span v-if="char3">Cantidad de ingreso de empleados por cada mes del año. (Estimado)</span>
                <GraficoBarras @graficoCargado="graficoCargado" :labels_x="labels_x" :items="ingresos_empleados"
                    :datosS="cantidad_ingresos_empleados" :index="3" />
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <span v-if="char3">Cantidad de registros por estado y responsable.</span>
                <GraficoBarrasApiladas @graficoCargado="graficoCargado" :labels_x="responsable_estado"
                    :datosS="registros_estado" :index="3" />
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <span>Numero de radicados por estado.</span>
                <DoughnutChar @graficoCargado="graficoCargado" :datos="radicados_estados" :index="7" />
            </div>
            <div class="col-6">
                <span>Numero de radicados por responsable.</span>
                <DoughnutChar @graficoCargado="graficoCargado" :datos="radicados_responsable" :index="7" />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
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
            URL_API: process.env.VUE_APP_URL_API,
            label_dataset: ['Radicados por mes'],
            label2: ['Hojas de vida enviadas por mes'],
            label1: ['Cantidad de vacantes ocupadas por mes'],
            labels_x: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            estadosseya: [],
            radicados_estados: [],
            radicados_responsable: [],
            cargos: [],
            cargos_mes: '',
            hojas_vida: [],
            cantidad_vacantes: '',
            cantidad_estados: [],
            expandido: false,
            items: ['CARGOS', 'VACANTES', 'HOJAS DE VIDA ENV.'],
            items2: ['VACANTES OCUPADAS'],
            comparativa: [],
            vacantes_cargos_hojasVida: '',
            cantidad_vacantes_tipo_servicio: '',
            estados_cargo: [],
            vacantes_efectivas: [],
            char1: false,
            char2: false,
            char3: false,
            char4: false,
            char5: false,
            char6: false,
            char7: false,
            loading: true,
            anio_radicado: '',
            anio_tipo_servicio: '',
            vacantes_ocupadas: [],
            radicados_mes: [],
            estados: [],
            registros_estado: '',
            responsable_estado: [],
            tipo_servicio_apilado_labels: [],
            tipo_servicio_apilado: '',
            cantidad_ingresos_empleados: '',
            ingresos_empleados: [],
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        this.getResgistrosporestado()
        this.getRegistrosporresponsable()
        this.getEstadosApilados()
        this.getRadicadosMes()
        this.getHojasVidaMes()
        this.getCantidadVacantesOcupadasMes()
        this.getCantidadIngresoEmpleados()
        this.getCargos()
        this.getCargosVacantesHojasVida()
        this.getCantidadVacantesesTipoServicio()
        this.getVacantesOcupadasTipoServicio()
        this.vacantesEfectivas()
    },
    methods: {
        getRadicadosMes(anio = null) {
            const fechaActual = new Date();
            const anioactual = fechaActual.getFullYear();
            if (anio == null) {
                anio = anioactual
            }
            let self = this;
            var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/ordenserviciochar/" + anio, config)
                .then(function (result) {
                    // Object.values(result.data).forEach(function (item) {
                    //     self.cargos_mes.push(item)
                    // })
                    result.data.forEach(function (item, index) {
                        if (index == 0) {
                            self.radicados_mes = Object.values(item['nombres'])
                        } else {
                            array.push(Object.values(item))
                        }
                    })
                    self.cargos_mes = JSON.stringify(array)
                });
        },
        getHojasVidaMes() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/ordenserviciohojavidachar/" + '2023', config)
                .then(function (result) {
                    Object.values(result.data).forEach(function (item) {
                        self.hojas_vida.push(item)
                    })
                });
        },
        getCantidadVacantesOcupadasMes() {
            let self = this;
            var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/vacantesocupadas/" + '2024', config)
                .then(function (result) {
                    result.data.forEach(function (item, index) {
                        if (index == 0) {
                            self.vacantes_ocupadas = Object.values(item['nombres'])
                        } else {
                            array.push(Object.values(item))
                        }
                    })
                    self.cantidad_vacantes = JSON.stringify(array)
                });
        },
        getCantidadIngresoEmpleados() {
            let self = this;
            var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/ingresoempledosmes/" + '2024', config)
                .then(function (result) {
                    result.data.forEach(function (item, index) {
                        if (index == 0) {
                            self.ingresos_empleados = Object.values(item['nombres'])
                        } else {
                            array.push(Object.values(item))
                        }
                    })
                    self.cantidad_ingresos_empleados = JSON.stringify(array)
                });
        },
        getResgistrosporestado() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/resgistrosporestado", config)
                .then(function (result) {
                    self.radicados_estados.push(result.data)
                });
        },
        getRegistrosporresponsable() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/registrosporresponsable", config)
                .then(function (result) {
                    self.radicados_responsable.push(result.data)
                });
        },
        getEstadosApilados() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/estadosapilados", config)
                .then(function (result) {
                    self.responsable_estado = result.data.responsables
                    self.registros_estado = JSON.stringify(result.data.data)
                    // self.radicados_responsable.push(result.data)
                    // console.log(result.data)
                });
        },

        getCargos() {
            // let self = this;
            // let config = this.configHeader();
            // axios
            //     .get(self.URL_API + "api/v1/ordenserviciocargocantidadchar2/" + '2023', config)
            //     .then(function (result) {
            //         self.radicados_estados.push(result.data)
            //     });
        },
        getCargosVacantesHojasVida() {
            let self = this;
            var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/cargosVacantesHojasVida/" + '2023', config)
                .then(function (result) {
                    result.data.forEach(function (item) {
                        array.push(Object.values(item))
                    })
                    self.vacantes_cargos_hojasVida = JSON.stringify(array)
                });
        },
        vacantesEfectivas() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/vacantesEfectivas/" + '2023', config)
                .then(function (result) {
                    self.vacantes_efectivas = Object.values(result.data)
                });
        },
        getCantidadVacantesesTipoServicio(anio = null) {
            const fechaActual = new Date();
            const anioactual = fechaActual.getFullYear();
            if (anio == null) {
                anio = anioactual
            }
            let self = this;
            var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/cantidadvacantestiposervicio/" + anio, config)
                .then(function (result) {
                    result.data.forEach(function (item, index) {
                        if (index == 0) {
                            self.estados_cargo = Object.values(item['nombres'])
                        } else {
                            array.push(Object.values(item))
                        }
                    })
                    self.cantidad_vacantes_tipo_servicio = JSON.stringify(array)
                });
        },
        getVacantesOcupadasTipoServicio() {
            // const fechaActual = new Date();
            // const anioactual = fechaActual.getFullYear();
            // if (anio == null) {
            //     anio = anioactual
            // }
            let self = this;
            // var array = []
            let config = this.configHeader();
            axios
                .get(self.URL_API + "api/v1/vacantesOcupadasTipoServicio", config)
                .then(function (result) {
                    self.tipo_servicio_apilado_labels = result.data.labels
                    self.tipo_servicio_apilado = JSON.stringify(result.data.data)

                });
        },
        graficoCargado(cargado, index) {
            this.loading = false
            switch (index) {
                case 1:
                    this.char1 = cargado
                    break;
                case 2:
                    this.char2 = cargado
                    break;
                case 3:
                    this.char3 = cargado
                    break;
                case 4:
                    this.char4 = cargado
                    break;
                case 5:
                    this.char5 = cargado
                    break;
                case 6:
                    this.char6 = cargado
                    break;
                case 7:
                    this.char7 = cargado
                    break;

                default:
                    break;
            }
        },
        expandir() {

        }
    }
};
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
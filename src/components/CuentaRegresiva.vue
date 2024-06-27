<template>
    <div v-if="actualizacion">
        <span :style="estilo_span">{{ mensaje_navbar }}</span>
        <flip-countdown :style="estilo_contador" :deadline="deadline" :countdownSize="tamano_contador"
            :labelSize="tamano_texto_contador" :days-label="'Días'" :hours-label="'Horas'" :minutes-label="'Minutos'"
            :seconds-label="'Segundos'" :labels="labelscountdown" :showDays="false"
            @timeElapsed="timeElapsedHandler"></flip-countdown>
    </div>
</template>
<script>
import axios from "axios";
import { Token } from '../Mixins/Token'
import { Alerts } from "@/Mixins/Alerts";
import { Socket } from '../Mixins/Socket.js';

export default {
    name: '',
    components: {

    },
    mixins: [Token, Alerts, Socket],
    props: {

    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            labelscountdown: {
                days: 'Días',
                hours: 'Horas',
                minutes: 'Minutos',
                seconds: 'Segundos',
            },
            actualizacion: false,
            deadline: '',
            mensaje_navbar: '',
            estilo_span: '',
            estilo_contador: '',
            tamano_contador: '',
            tamano_texto_contador: '',
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        var self = this
        this.actualizacionprogramada()
        window.Echo.channel('channel')
            .listen('TiempoActualizacion', (e) => {
                self.llenarContador(e.message)
            });
    },
    methods: {
        actualizacionprogramada() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/actualizacionprogramada', config)
                .then(function (result) {
                    self.llenarContador(result.data)

                })
        },
        llenarContador(result) {
            this.actualizacion = result.visible == '1' ? true : false
            this.deadline = result.fecha_hora
            this.mensaje_navbar = result.mensaje_navbar
            this.estilo_span = result.estilo_span
            this.estilo_contador = result.estilo_contador
            this.tamano_contador = result.tamano_contador
            this.tamano_texto_contador = result.tamano_texto_contador
        },
        timeElapsedHandler() {
            var self = this
            self.actualizacion = false
            self.$emit('timeElapsed', false)
        },
    }
};
</script>
<style scoped></style>
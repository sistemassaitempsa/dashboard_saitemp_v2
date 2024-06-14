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

export default {
    name: '',
    components: {

    },
    mixins: [Token, Alerts],
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
            mensaje_navbar2: '',
            mensaje_popup: '',
            icono_popup: '',
            estilo_span: '',
            estilo_contador: '',
            tamano_contador: '',
            tamano_texto_contador: '',
            tiempo_espera:''
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        this.actualizacionprogramada()
    },
    methods: {
        actualizacionprogramada() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/actualizacionprogramada', config)
                .then(function (result) {
                    self.actualizacion = result.data.visible == '1' ? true : false
                    self.deadline = result.data.fecha_hora
                    self.mensaje_navbar = result.data.mensaje_navbar
                    self.mensaje_navbar2 = result.data.mensaje_navbar2
                    self.mensaje_popup = result.data.mensaje_popup
                    self.icono_popup = result.data.icono_popup
                    self.estilo_span = result.data.estilo_span
                    self.estilo_contador = result.data.estilo_contador
                    self.tamano_contador = result.data.tamano_contador
                    self.tamano_texto_contador = result.data.tamano_texto_contador
                    self.tiempo_espera = result.data.tiempo_espera

                })
        },
        timeElapsedHandler() {
            var self = this
            this.mensaje_navbar = this.mensaje_navbar2
            setTimeout(() => {
                self.actualizacion = false
                self.$emit('timeElapsed', false)
            }, parseInt(self.tiempo_espera)*1000);
            this.showAlertConfirm(self.mensaje_popup, self.icono_popup)
        },
    }
};
</script>
<style lang='' scoped>
</style>
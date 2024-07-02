<template>
    <div>
        <!-- Modal -->
        <div id="openModal" class="modalDialog">
            <div>
                <a href="#close" title="Close" class="close"></a>
                <h2>{{ titulo }}</h2>
                <p>{{ contenido }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Token } from '../Mixins/Token'
export default {
    name: '',
    components: {

    },
    mixins: [Token],
    props: {
        modal: Boolean
    },
    data() {
        return {
            URL_API: process.env.VUE_APP_URL_API,
            titulo: '',
            contenido: ''
        }
    },
    computed: {

    },
    watch: {
        modal: function () {
            if (this.modal == false) {
                this.actualizaVisibilidad()
            }
        }
    },
    mounted() {
        var self = this
        self.actualizacionprogramada()
        window.Echo.channel('channel')
            .listen('VentanaModalPrincipal', (e) => {
                self.llenarModal(e.message)
            });
    },
    methods: {
        llenarModal(message) {

            if (message.visible == 0) {
                const modalElement = document.getElementById('openModal');
                modalElement.style.opacity = '0';
                modalElement.style.pointerEvents = 'none';
                if (message.actualiza_pagina == 1) {
                    window.location.reload();
                }

            }
            else if (message.visible == 1) {
                this.showModal(message)
            }
        },
        actualizacionprogramada() {
            let self = this;
            let config = this.configHeader();
            axios
                .get(self.URL_API + 'api/v1/modalprincipal', config)
                .then(function (result) {
                    if (result.data.visible == 1) {
                        self.showModal(result.data)
                    }

                })
        },
        actualizaVisibilidad() {
            let self = this;
            let config = this.configHeader();
            axios
                .post(self.URL_API + 'api/v1/showmodalprincipal/1', config)
                .then(function (result) {
                    if (result.data.visible == 1) {
                        self.showModal(result.data)
                    }

                })
        },
        showModal(result) {
            console.log(result)
            this.titulo = result.titulo
            this.contenido = result.contenido
            const modalElement = document.getElementById('openModal');
            modalElement.style.opacity = '1';
            modalElement.style.pointerEvents = 'auto';
            this.$emit('actualizacion')
        }
    }
};
</script>
<style scoped>
.modalDialog {
    position: fixed;
    font-family: Arial, Helvetica, sans-serif;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99999;
    opacity: 0;
    -webkit-transition: opacity 400ms ease-in;
    -moz-transition: opacity 400ms ease-in;
    transition: opacity 400ms ease-in;
    pointer-events: none;
}

.modalDialog.show {
    opacity: 1;
    pointer-events: auto;
}

.modalDialog>div {
    width: 400px;
    position: relative;
    margin: 10% auto;
    padding: 5px 20px 13px 20px;
    border-radius: 10px;
    background: #fff;
    background: -moz-linear-gradient(#fff, #999);
    background: -webkit-linear-gradient(#fff, #999);
    background: -o-linear-gradient(#fff, #999);
    -webkit-transition: opacity 400ms ease-in;
    -moz-transition: opacity 400ms ease-in;
    transition: opacity 400ms ease-in;
}

.close {
    background: #606061;
    color: #FFFFFF;
    line-height: 25px;
    position: absolute;
    right: -12px;
    text-align: center;
    top: -10px;
    width: 24px;
    text-decoration: none;
    font-weight: bold;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    -moz-box-shadow: 1px 1px 3px #000;
    -webkit-box-shadow: 1px 1px 3px #000;
    box-shadow: 1px 1px 3px #000;
}

.close:hover {
    background: #00d9ff;
}
</style>
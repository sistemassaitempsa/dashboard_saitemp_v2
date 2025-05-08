<template>
  <div>
    <form class="was-validated" @submit.prevent="save()">
      <button
        type="button"
        class="btn btn-danger btn-sm"
        @click="openModal"
        :data-bs-target="modal_id"
      >
        {{ titulo_boton }}
      </button>

      <div class="modal" :id="modal_id">
        <div
          class="modal-dialog modal-dialog-centered modal-dialog-scrollable ancho-personalizado"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" style="color: black">
                {{ titulo_encabezado }}
              </h5>
              <button
                class="btn-close"
                type="button"
                @click="cancelModal"
              ></button>
            </div>

            <div class="modal-body">
              <div
                class="row p-3"
                v-if="motivos_cancelacion_servicio.length > 0"
              >
                <div class="col">
                  <SearchList
                    nombreCampo="Motivo de cancelación: *"
                    @getMotivosCancelacion="getMotivosCancelacion"
                    eventoCampo="getMotivosCancelacion"
                    nombreItem="nombre"
                    :registros="motivos_cancelacion_servicio"
                    placeholder="Seleccione una opción"
                  />
                </div>
              </div>
              <div class="row p-3">
                <div class="col">
                  <label class="form-label" style="color: black"
                    >Descripción:
                  </label>
                  <textarea
                    class="form-control"
                    v-model="motivo"
                    maxlength="2000"
                    rows="12"
                    @input="contarCaracteres"
                    id="floatingTextarea"
                    required
                  ></textarea>
                  <p class="char-count">
                    {{ motivo.length }} / 2000 caracteres
                  </p>
                </div>
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" @click="cancelModal">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import SearchList from "./SearchList.vue";
export default {
  components: {
    SearchList,
  },
  mixins: [],
  props: {
    motivos_cancelacion_servicio: {
      type: Array,
      default: () => [],
    },
    candidato: {
      type: Object,
      default: () => {},
    },
    motivo_cancelacion_id: {
      type: String,
      default: () => "",
    },
    titulo_encabezado: {
      type: String,
      default: () => "",
    },
    titulo_boton: {
      type: String,
      default: () => "",
    },
    index: {
      type: Number,
      default: () => 0,
    },
    tipo: {
      type: Number,
      default: () => 0,
    },
    modal_id: {
      type: String,
      default: () => "#mi-modal",
    },
  },
  data() {
    return {
      motivo: "",
      motivos_cancelacion: [],
      mensaje_error: "¡Este campo debe ser diligenciado!",
    };
  },
  computed: {},
  watch: {},
  mounted() {
    window.addEventListener("keydown", this.convinacionGuardado);
  },
  created() {},
  methods: {
    save() {
      this.$emit("motivoCancelacion", this.motivo, this.tipo, this.candidato);
    },

    openModal() {
      document.getElementById(this.modal_id).style.display = "block";
    },
    closeModal() {
      document.getElementById(this.modal_id).style.display = "none";
    },
    cancelModal() {
      this.closeModal();
      this.motivo = "";
    },
    getMotivosCancelacion(item) {
      this.$emit("getMotivosCancelacionServicio", item, this.index);
    },
  },
};
</script>
<style scoped>
.ancho-personalizado {
  max-width: 900px;
  width: 150%;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

label {
  float: left;
  margin: 20px 0px 5px 0px;
}

.char-count {
  font-size: 12px;
  color: #6c757d;
  margin-top: 10px;
  text-align: end;
}

textarea {
  resize: none;
}
</style>

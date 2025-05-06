<template>
  <div>
    <button
      type="button"
      class="btn btn-success"
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
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titulo_encabezado: String,
    titulo_boton: String,
    modal_id: String,
  },
  methods: {
    openModal() {
      document.getElementById(this.modal_id).style.display = "block";
    },
    closeModal() {
      document.getElementById(this.modal_id).style.display = "none";
    },
    cancelModal() {
      this.closeModal();
    },
    guardarFormulario() {
      this.$emit("save");
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

</style>

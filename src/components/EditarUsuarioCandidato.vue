<template>
  <div>
    <Loading :loading="loading" />
    <div class="container my-4">
      <h3 class="mb-5">Editar Datos de Usuario</h3>
      <div class="card mx-auto">
        <form @submit.prevent="guardarDatos">
          <div class="row mb-4">
            <div class="col-md-6 mb-3 mb-md-0">
              <label for="nombre" class="form-label">Nombres:</label>
              <input
                id="nombre"
                class="form-control"
                type="text"
                v-model="cliente.nombre"
                placeholder="Ingrese sus nombres"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="apellidos" class="form-label">Apellidos:</label>
              <input
                id="apellidos"
                class="form-control"
                type="text"
                v-model="cliente.apellidos"
                placeholder="Ingrese sus apellidos"
                required
              />
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-md-6 mb-3 mb-md-0">
              <label for="numero_documento" class="form-label"
                >N. Documento de Identidad:</label
              >
              <input
                id="numero_documento"
                class="form-control disabledLabel"
                type="text"
                :value="cliente.numero_documento"
                disabled
              />
            </div>
            <div class="col-md-6">
              <label for="tipo_documento" class="form-label"
                >Tipo de Documento:</label
              >
              <select
                id="tipo_documento"
                class="form-select"
                v-model="cliente.doc_tip_id"
                required
              >
                <option disabled value="">
                  Seleccione el tipo de documento
                </option>
                <option
                  v-for="(tipo, index) in tiposDocumentos"
                  :key="index"
                  :value="tipo.cod_tip"
                >
                  {{ tipo.des_tip }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-md-6 mb-3 mb-md-0">
              <label for="email" class="form-label">Correo Electrónico:</label>
              <input
                id="email"
                class="form-control"
                type="email"
                v-model="cliente.email"
                placeholder="Ingrese su correo electrónico"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="telefono" class="form-label">Teléfono celular:</label>
              <input
                id="telefono"
                class="form-control"
                type="text"
                v-model="cliente.celular"
                placeholder="Ingrese su teléfono"
                required
              />
            </div>
          </div>
          <div class="row mb-4" v-if="user_type == 1">
            <div class="col">
              <label class="form-label" for="">Estado</label
              ><select
                name=""
                id=""
                class="form-select"
                v-model="cliente.estado_id"
              >
                <option value="1">Activo</option>
                <option value="2">Inactivo</option>
              </select>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-md-6 mb-3 mb-md-0">
              <button
                type="button"
                class="btn btn-warning w-100"
                @click="toggleModalCambioHandle"
              >
                Cambiar Contraseña
              </button>
            </div>
            <div class="col-md-6">
              <button type="submit" class="btn btn-success w-100">
                Guardar
              </button>
            </div>
          </div>
        </form>
        <div v-if="toggleModalCambio">
          <ModalCambioContrasena
            @closeModalCambio="toggleModalCambioHandle"
            @cambioContrasena="cambioContrasena"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports
import { useAlerts } from "@/composables/useAlerts";
import axios from "axios";
import Loading from "./Loading.vue";
import { ref, reactive, onBeforeMount, defineProps } from "vue";
import { useValidation } from "../composables/useValidations";
import { useToken } from "@/composables/useToken";
import { useRouter, useRoute } from "vue-router";
import ModalCambioContrasena from "./ModalCambioContrasena";

// Variables
const { user_type } = defineProps(["user_type"]); //props
const route = useRoute();
const { showAlert } = useAlerts();
const router = useRouter();
const { configHeader } = useToken();
const loading = ref(false);
const tiposDocumentos = ref([]);
const { validateEmail, validateNumeroDocumento } = useValidation();
const URL_API = process.env.VUE_APP_URL_API;
const toggleModalCambio = ref(false);
const cliente = reactive({
  id: "",
  nombre: "",
  apellidos: "",
  numero_documento: "",
  email: "",
  celular: "",
  doc_tip_id: "",
  password: "",
  estado_id: "",
});

// Funciones

const cambioContrasena = (password) => {
  cliente.password = password;
  toggleModalCambioHandle();
  guardarDatos();
};
// Obtener tipos de documento
const getTiposDocumento = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `${URL_API}api/v1/tipoIdFormularioEmpleado`
    );
    tiposDocumentos.value = response.data;
  } catch (error) {
    console.error("Error al obtener tipos de documento:", error);
  } finally {
    loading.value = false;
  }
};

// Obtener datos del usuario logueado
const userLogued = async () => {
  const config = configHeader();
  loading.value = true;
  try {
    const response = await axios.get(
      `${URL_API}api/v1/userbyid/` + route.params.id,
      config
    );
    if (response.data) {
      cliente.id = response.data.id;
      cliente.numero_documento = response.data.num_doc;
      cliente.nombre = response.data.primer_nombre;
      cliente.apellidos = response.data.primer_apellido;
      cliente.email = response.data.email;
      cliente.celular = response.data.celular;
      cliente.doc_tip_id = response.data.tip_doc_id;
      cliente.estado_id = response.data.estado_id;
    } else {
      router.push("/");
    }
  } catch (error) {
    if (error.response && error.response.data === "Unauthorized.") {
      router.push("/");
      localStorage.removeItem("access_token");
    }
  } finally {
    loading.value = false;
  }
};

const toggleModalCambioHandle = () => {
  toggleModalCambio.value = !toggleModalCambio.value;
};

const guardarDatos = async () => {
  // Validaciones
  const isEmailValid = validateEmail(cliente.email);
  const isDocValid = validateNumeroDocumento(cliente.numero_documento);

  if (!isEmailValid || !isDocValid) {
    showAlert("correo o documento no válido", "error");
    return;
  }

  loading.value = true;
  try {
    const config = configHeader();
    const payload = {
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      email: cliente.email,
      celular: cliente.celular,
      tip_doc_id: cliente.doc_tip_id,
      password: cliente.password,
      estado_id: cliente.estado_id,
      // Agrega otros campos según sea necesario
    };
    const response = await axios.put(
      `${URL_API}api/v1/actualizarcandidatousuario/${cliente.id}`,
      payload,
      config
    );
    // Manejar la respuesta, mostrar notificación de éxito, etc.
    showAlert(response.data.message, response.data.status);
    console.log("Datos actualizados:", response.data);
  } catch (error) {
    showAlert(error.response.data.message, error.response.data.status);
    console.error("Error al actualizar datos:", error);
    // Manejar el error, mostrar notificación, etc.
  } finally {
    loading.value = false;
  }
};

// Ciclo de vida
onBeforeMount(() => {
  userLogued();
  getTiposDocumento();
});
</script>

<style scoped>
.card {
  padding: 1.5rem;
  background-color: rgba(239, 237, 237, 0.642);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  width: 70%;
}
h3 {
  margin: 20px;
}
label {
  float: left;
  font-weight: 500;
}

.form-control {
  background-color: white;
}
.disabledLabel {
  background-color: rgb(235, 234, 234);
}
button {
  padding: 0.75rem;
  font-size: 1rem;
}

@media (max-width: 576px) {
  .card {
    padding: 1rem;
    width: 80%;
    margin: auto;
  }
  button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>

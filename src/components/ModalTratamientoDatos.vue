<template>
  <div class="modal-overlay">
    <div class="modal-content" @click.stop>
      <Loading :loading="loading" />
      <div class="container">
        <h3>Política de tratamiento de datos</h3>

        <div class="row">
          <div class="col">
            <p>
              Certifico que he comprendido el propósito, los beneficios, la
              interpretación, las limitaciones y las necesidades de que SAITEMP
              S.A. y la Empresa Usuaria para la que estoy realizando proceso de
              contratación, conozcan todos los resultados de los exámenes
              médicos practicados (ingreso, periódico, y de retiro), con el fin
              de alimentar los diferentes sistemas de vigilancia
              epidemiológicos. A su vez autorizo de manera previa, expresa e
              informada a SAITEMP S.A. para que, directamente o a través de sus
              empleados, asesores y/o terceros encargados del tratamiento de
              datos: (1.) realizar cualquier operación que tenga una finalidad
              lícita, tales como la recolección, almacenamiento, uso,
              circulación, supresión, transferencia y transmisión, sobre mis
              datos personales, entendidos como cualquier información vinculada
              o que pueda asociarse al TRABAJADOR, para el cumplimiento de los
              fines de SAITEMP S.A que incluyen pero no se limitan a: la
              afiliación del empleado en las entidades del sistema general de
              seguridad social y parafiscales, archivo y procesamiento de
              nómina, archivos sobre antecedentes disciplinarios y
              contractuales, reporte ante autoridades administrativas,
              laborales, fiscales, financieras o judiciales, así como al
              cumplimiento de obligaciones legales o contractuales de SAITEMP
              S.A con terceros, la debida ejecución del Contrato de trabajo, el
              cumplimiento de las políticas internas del EMPLEADOR, la
              verificación del cumplimiento de las obligaciones del TRABAJADOR,
              la administración de sus sistemas de información y comunicaciones,
              la generación de copias y archivos de seguridad de la información
              en los equipos proporcionados por SAITEMP S.A. (2.) EL TRABAJADOR
              conoce el carácter facultativo de entregar o no a SAITEMP S.A sus
              datos sensibles. (3) el TRABAJADOR reconoce que la información
              suministrada corresponde a la actualmente cuenta en las diferentes
              entidades y autoriza a SAITEMP S.A. para que pueda hacer las
              respectivas consultas y verificaciones por los diferentes medios
              (páginas web, vía telefónica, entre otros), de sus datos
              personales y/o de mi grupo familiar, incluyendo los datos de
              menores de edad, con la finalidad de que dicha información pueda
              ser utilizada para hacer las afiliaciones y trámites de
              contratación a su vez EL TRABAJADOR reconoce y acepta que el
              Tratamiento de sus Datos Personales efectuado por fuera del
              territorio colombiano puede regirse para algunos efectos por leyes
              extranjeras. (4.) EL TRABAJADOR reconoce que ha sido informado de
              los derechos que le asisten en su calidad de titular de Datos
              Personales, entre los que se encuentran los siguientes: i)
              conocer, actualizar y rectificar sus Datos Personales frente a
              SAITEMP S.A o quienes por cuenta de éste realicen el Tratamiento
              de sus Datos Personales; ii) solicitar prueba de la autorización
              otorgada a SAITEMP S.A salvo cuando la ley no lo requiera; iii)
              previa solicitud, ser informado sobre el uso que se ha dado a sus
              Datos Personales, por SAITEMP S.A o quienes por cuenta de éste
              realicen el Tratamiento de sus Datos Personales; iv) presentar
              ante las autoridades competente quejas por violaciones al régimen
              legal colombiano de protección de datos personales; v) revocar la
              presente autorización y/o solicitar la supresión de sus Datos
              Personales cuando la autoridad competente determine que SAITEMP
              S.A incurrió en conductas contrarias a la ley y a la Constitución;
              y vi) acceder en forma gratuita a sus Datos Personales que hayan
              sido objeto de Tratamiento. (5.) Para los fines estipulados en la
              ley, SAITEMP S.A ha designado el correo misdatos@saitempsa.com
              para la atención al TRABAJADOR en relación con los asuntos
              relativos a sus Datos Personales. SAITEMP S.A podrá reemplazar o
              designar a esta persona notificándolo por escrito a EL TRABAJADOR.
              Así mismo declaro por medio de mi firma que estoy de acuerdo con
              el proceso por el cual recibiré mis resultados médicos. Fui
              informado de las medidas que se tomará para proteger la
              confiabilidad de los resultados Médicos e información suministrada
              y garantizo que la información que suministro es veraz y
              confiable; y asumo cualquier responsabilidad por omitir datos que
              pueda afectar los procesos que se adelanten con SAITEMP S.A.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button class="btn btn-danger btn-sm" @click="logout">
              {{ acciones ? "No acepto" : "Cerrar" }}
            </button>
          </div>
          <div class="col" v-if="acciones">
            <button @click="aceptoHandle" class="btn btn-success btn-sm">
              Si, Acepto
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { defineProps, defineEmits } from "vue";
import axios from "axios";

const emit = defineEmits(["logout", "submit"]);
const { id, acciones } = defineProps(["id", "acciones"]);

const URL_API = process.env.VUE_APP_URL_API;
const router = useRouter();
const logout = () => {
  localStorage.removeItem("access_token");
  emit("logout");
};
const aceptoHandle = async () => {
  const response = await axios.get(
    `${URL_API}api/v1/updatePoliticasTratamiento/${id}`
  );
  if (response.data.status == "success") {
    router.push({ name: "formularioinfocandidato" });
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* Cubre toda la altura visible */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 70%;
  max-height: 90vh; /* Altura máxima del 90% de la pantalla */
  width: 100%;
  overflow-y: auto; /* Habilita scroll vertical cuando sea necesario */
  animation: fadeIn 0.3s ease;
}

.container {
  height: auto; /* Elimina altura fija */
  font-size: 0.8em;
}

/* Opcional: Mejorar la legibilidad del texto */
.row .col p {
  line-height: 1.5;
  margin-bottom: 1rem;
}

/* Mantener botones visibles al final */
.row:last-child {
  position: sticky;
  bottom: 0;
  background: white;
  padding-top: 15px;
  margin-top: 15px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

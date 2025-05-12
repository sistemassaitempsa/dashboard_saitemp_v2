import { createRouter, createWebHashHistory } from "vue-router";
/* import InicioSesion from "../components/InicioSesion.vue"; */
import NavBar from "../components/NavBar.vue";
import Usuarios from "../components/Usuarios.vue";
import RolesUsuario from "../components/RolesUsuario.vue";
import MenuRoles from "../components/MenuRoles.vue";
import PermisoRoles from "../components/PermisoRoles.vue";
import Permisos from "../components/Permisos.vue";
import TipoDocumentoIdentidad from "../components/TipoDocumentoIdentidad.vue";
import IngresarUsuario from "../views/IngresarUsuario.vue";
import EditarUsuario from "../views/EditarUsuario.vue";
import EmpleadoTemporal from "../components/EmpleadoTemporal.vue";
import UsuariosDA from "../components/UsuariosDA.vue";
import Estadistica from "../components/Estadistica.vue";
import Empleados from "../components/Empleados.vue";
import Empleado from "../components/Empleado.vue";
import Reportes from "../components/Reportes.vue";
import Trump from "../components/Trump.vue";
import ProcesosEspeciales from "../components/ProcesosEspeciales.vue";
import PowerBi from "../components/PowerBi.vue";
import Ddashboard from "../components/Ddashboard.vue";
import DdClientes from "../components/DdClientes.vue";
import DdFormularioCliente from "../components/DdFormularioCliente.vue";
import FormularioRegistro from "../components/FormularioRegistro.vue";
import NovedadesNomina from "../components/NovedadesNomina.vue";
import SolicitudNovedadesNomina from "../components/SolicitudNovedadesNomina.vue";
import ConsultaNN from "../components/ConsultaNN.vue";
import GestionCliente from "../components/GestionCliente.vue";
import FormularioSupervision from "../components/FormularioSupervision.vue";
import MapaVue from "../components/MapaVue.vue";
import ClienteSupervision from "../components/ClienteSupervision.vue";
// import OrdenServicio from '../components/OrdenServicioantiguo.vue';
import OrdenServicio from "../components/OrdenServicio.vue";
import OrdenServicios from "../components/OrdenServicios.vue";
import ListaServicio from "../components/ListaServicio.vue";
import SolicitudesOrdenServicio from "../components/SolicitudesOrdenServicio.vue";
import PieChar from "../components/PieChar.vue";
import GraficosGerencia from "../components/GraficosGerencia.vue";
import UsuariosPermisos from "../components/UsuariosPermisos.vue";
import UsuariosMenu from "../components/UsuariosMenu.vue";
import AdministrarMenu from "../components/AdministrarMenu.vue";
import TimeLine from "../components/TimeLine.vue";
import GestionIngresos from "../components/GestionIngresos.vue";
import GestionIngresosl from "../components/GestionIngresosl.vue";
import GestionIngresosM from "../components/GestionIngresosM.vue";
import ChatWhatsapp from "../components/ChatWhatsapp.vue";
import TareasPendientesIngresos from "../components/TareasPendientesIngresos.vue";
import CrmCliente from "../components/CrmCliente.vue";
import CrmSeguimiento from "../components/CrmSeguimiento.vue";
import PendientesCrm from "../components/PendientesCrm.vue";
import IndicadoresSeya from "../components/IndicadoresSeya.vue";
import GestionRiesgos from "../components/GestionRiesgos.vue";
import ListaRiesgos from "../components/ListaRiesgos.vue";
import GuiaRiesgos from "../components/GuiaRiesgos.vue";
import Landing from "../components/Landing.vue";
import Configuraciones from "../components/Configuraciones.vue";
import EstadosDebidaDIligenciaAdmin from "../components/EstadosDebidaDiligenciaAdmin.vue";
import EditarCliente from "../components/EditarCliente.vue";
import InicioSesionCandidatos from "@/components/InicioSesionCandidatos.vue";
import RecoverPassword from "@/components/RecoverPassword.vue";
import Cliente from "../components/Cliente.vue";
import FormularioInfoCandidatos from "@/components/FormularioInfoCandidatos.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import ConsultaFormularioCandidatos from "@/components/ConsultaFormularioCandidatos.vue";
import TablaCentrosDeTrabajo from "@/components/TablaCentrosDeTrabajo.vue";
import SectorEconomico from "@/components/SectorEconomico.vue";
import SectorECiiu from "@/components/SectorECiiu.vue";
import ProfesionalSector from "@/components/ProfesionalSector.vue";
import AsignacionServicio from "@/components/AsignacionServicio.vue";
import CargosCliente from "@/components/CargosCliente.vue";
import ExportaSNCSeiya from "@/components/ExportaSNCSeiya.vue";
import EstadosCandidatoServicio from "@/components/EstadosCandidatoServicio.vue";
import EstadosSeiya from "@/components/EstadosSeiya.vue";
import EstadosResponsable from "@/components/EstadosResponsable.vue";
import EstadosSeiyaSolicitudServicio from "@/components/EstadosSeiyaSolicitudServicio.vue";
import LovePdf from "@/components/LovePdf.vue";
import LovePdfToJpg from "@/components/LovePdfToJpg.vue";
import TablaNoConformesDD from "@/components/TablaNoConformesDD.vue";

// Configuración de rutas
const routes = [
  {
    path: "/",
    name: "login",
    component: InicioSesionCandidatos,
  },
  {
    path: "/loginCandidatos",
    name: "loginCandidatos",
    component: InicioSesionCandidatos,
  },

  {
    path: "/recuperarcontrasena",
    name: "recuperarcontrasena",
    component: RecoverPassword,
  },
  {
    path: "/formularioregistro",
    name: "formularioregistro",
    component: FormularioRegistro,
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: ResetPasswordView,
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "catchAll",
  //   component: InicioSesion,
  // },
  {
    path: "/navbar",
    name: "navbar",
    component: NavBar,
    children: [
      {
        path: "exportarsncdd",
        name: "exportarsncdd",
        component: TablaNoConformesDD,
      },
      {
        path: "editarUsuario/:tipo?/:id",
        name: "editarUsuario",
        component: EditarUsuario,
      },
      {
        path: "lovePDFSeiya",
        name: "lovePdfSeiya",
        component: LovePdf,
      },
      {
        path: "lovePDFSeiyaJPG",
        name: "lovePDFSeiyaJPG",
        component: LovePdfToJpg,
      },
      {
        path: "ingresarUsuario",
        name: "ingresarUsuario",
        component: IngresarUsuario,
      },
      {
        path: "usuarios",
        name: "usuarios",
        component: Usuarios,
      },
      {
        path: "rolesUsuario",
        name: "rolesUsuario",
        component: RolesUsuario,
      },
      {
        path: "menuRoles",
        name: "menuRoles",
        component: MenuRoles,
      },
      {
        path: "permisoRoles",
        name: "permisoRoles",
        component: PermisoRoles,
      },
      {
        path: "permisos",
        name: "permisos",
        component: Permisos,
      },
      {
        path: "tipoDocumentoIdentidad",
        name: "tipoDocumentoIdentidad",
        component: TipoDocumentoIdentidad,
      },
      {
        path: "empleadoTemporal",
        name: "EmpleadoTemporal",
        component: EmpleadoTemporal,
      },
      {
        path: "usuariosDA",
        name: "usuariosDA",
        component: UsuariosDA,
      },
      {
        path: "estadistica",
        name: "estadistica",
        component: Estadistica,
      },
      {
        path: "empleados/:id?",
        name: "empleados",
        component: Empleados,
      },
      {
        path: "empleado/:id",
        name: "empleado",
        component: Empleado,
      },
      {
        path: "reportes",
        name: "reportes",
        component: Reportes,
      },
      {
        path: "trump",
        name: "trump",
        component: Trump,
      },
      {
        path: "procesosEspeciales",
        name: "procesosEspeciales",
        component: ProcesosEspeciales,
      },
      {
        path: "powerBi/:id",
        name: "powerBi",
        component: PowerBi,
      },
      {
        path: "debida-diligencia/dashboard",
        name: "debida-diligencia/dashboard",
        component: Ddashboard,
      },
      {
        path: "debida-diligencia/clientes",
        name: "debida-diligencia/clientes",
        component: DdClientes,
      },
      {
        path: "debida-diligencia/formulario-clientes/:id?",
        name: "debida-diligencia/formulario-clientes",
        component: DdFormularioCliente,
      },
      {
        path: "gestion-novedades-nomina",
        name: "gestion-novedades-nomina",
        component: NovedadesNomina,
      },
      {
        path: "solicitud-novedades-nomina",
        name: "solicitud-novedades-nomina",
        component: SolicitudNovedadesNomina,
      },
      {
        path: "correo-novedades-nomina",
        name: "correo-novedades-nomina",
        component: ConsultaNN,
      },
      {
        path: "estados-cliente/:?",
        name: "estados-cliente",
        component: GestionCliente,
      },
      {
        path: "formulario-supervision/:id?",
        name: "formulario-supervision",
        component: FormularioSupervision,
      },
      {
        path: "mapa",
        name: "mapa",
        component: MapaVue,
      },
      {
        path: "cliente-supervision",
        name: "cliente-supervision",
        component: ClienteSupervision,
      },
      {
        path: "orden-servicio/:id?",
        name: "orden-servicio",
        component: OrdenServicio,
      },
      {
        path: "lista-servicios/:id?",
        name: "lista-servicios",
        component: ListaServicio,
      },
      {
        path: "orden-servicios/:id?",
        name: "orden-servicios",
        component: OrdenServicios,
      },
      {
        path: "solicitudes-os",
        name: "solicitudes-os",
        component: SolicitudesOrdenServicio,
      },
      {
        path: "piechar",
        name: "piechar",
        component: PieChar,
      },
      {
        path: "graficos-gerencia",
        name: "graficos-gerencia",
        component: GraficosGerencia,
      },
      {
        path: "permiso-usuario",
        name: "permiso-usuario",
        component: UsuariosPermisos,
      },
      {
        path: "menus",
        name: "menus",
        component: AdministrarMenu,
      },
      {
        path: "menu-usuarios",
        name: "menu-usuarios",
        component: UsuariosMenu,
      },
      {
        path: "TimeLine/:id?",
        name: "TimeLine",
        component: TimeLine,
      },
      {
        path: "gestion-ingresos/:id?",
        name: "gestion-ingresos",
        component: GestionIngresos,
      },
      {
        path: "gestion-ingresosl",
        name: "gestion-ingresosl",
        component: GestionIngresosl,
      },
      {
        path: "estados-DDAdmin",
        name: "estados-DDAdmin",
        component: EstadosDebidaDIligenciaAdmin,
      },
      {
        path: "gestion-ingresosm",
        name: "gestion-ingresosm",
        component: GestionIngresosM,
      },
      {
        path: "chat",
        name: "chat",
        component: ChatWhatsapp,
      },
      {
        path: "ingresos-pendientes",
        name: "ingresos-pendientes",
        component: TareasPendientesIngresos,
      },
      {
        path: "crm-intreraccion/:id?",
        name: "crm-intreraccion",
        component: CrmCliente,
      },
      {
        path: "crm-seguimiento",
        name: "crm-seguimiento",
        component: CrmSeguimiento,
      },
      {
        path: "crm-pendientes",
        name: "crm-pendientes",
        component: PendientesCrm,
      },
      {
        path: "indicadores-seiya",
        name: "indicadores-seiya",
        component: IndicadoresSeya,
      },
      {
        path: "gestionriesgos/:id?",
        name: "gestionriesgos",
        component: GestionRiesgos,
      },
      {
        path: "lista-riesgos",
        name: "lista-riesgos",
        component: ListaRiesgos,
      },
      {
        path: "guia-riesgos",
        name: "guia-riesgos",
        component: GuiaRiesgos,
      },
      {
        path: "landing",
        name: "landing",
        component: Landing,
      },
      {
        path: "configuraciones",
        name: "configuraciones",
        component: Configuraciones,
      },
      {
        path: "editarCliente",
        name: "editarCliente",
        component: EditarCliente,
      },
      {
        path: "cliente/:id?",
        name: "cliente",
        component: Cliente,
      },
      {
        path: "sector-economico/:?",
        name: "sector-economico",
        component: SectorEconomico,
      },
      {
        path: "sectore-ciiu",
        name: "sectore-ciiu",
        component: SectorECiiu,
      },
      {
        path: "profesional-sector",
        name: "profesional-sector",
        component: ProfesionalSector,
      },
      {
        path: "asignacion-servicio",
        name: "asignacion-servicio",
        component: AsignacionServicio,
      },
      {
        path: "formularioinfocandidato/:id?",
        name: "formularioinfocandidato",
        component: FormularioInfoCandidatos,
      },
      {
        path: "formularioinfocandidatoTabla",
        name: "formularioinfocandidatoTabla",
        component: ConsultaFormularioCandidatos,
      },
      {
        path: "consultatodoscentrosdetrabajo",
        name: "consultatodoscentrosdetrabajo",
        component: TablaCentrosDeTrabajo,
      },
      {
        path: "cargos-cliente",
        name: "cargos-cliente",
        component: CargosCliente,
      },
      {
        path: "ordenserviciosnc",
        name: "ordenserviciosnc",
        component: ExportaSNCSeiya,
      },
      {
        path: "estadoscs",
        name: "estadoscs",
        component: EstadosCandidatoServicio,
      },
      {
        path: "estadoseiya",
        name: "estadoseiya",
        component: EstadosSeiya,
      },
      {
        path: "estadoresponsable",
        name: "estadoresponsable",
        component: EstadosResponsable,
      },
      {
        path: "estadosseiyaservicio",
        name: "estadosseiyaservicio",
        component: EstadosSeiyaSolicitudServicio,
      },
    ],
  },
];

// Crea el router
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

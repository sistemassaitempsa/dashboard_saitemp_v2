<template>
  <div class="container">
    <Loading :loading="loading" />

    <h2>Registro de datos personales</h2>
    <!-- barra para el pocrcentaje de llenado -->

    <!-- --------------------------- -->
    <div class="flexRow">
      <div class="progress-container">
        <div class="progress-bar" :style="{ height: progress + '%' }"></div>
        <span class="progress-text"
          >{{ Math.round(progress) }}% completado</span
        >
        <div class="textProgressContainer">
          <p
            @click="scrollToInformacionPersonal"
            class="progress-text horizontalText"
          >
            -Informacion <br />
            personal
          </p>
          <p class="progress-text horizontalText" @click="scrollToExperiencia">
            -Experiencia <br />
            laboral
          </p>
          <p
            class="progress-text horizontalText"
            @click="scrollToInformacionAcademica"
          >
            -Informacion <br />
            académica
          </p>
          <p
            class="progress-text horizontalText"
            @click="scrollToInMedioTrasnporte"
          >
            -Medio de <br />
            transporte
          </p>
          <p
            class="progress-text horizontalText"
            @click="scrollToInCondicionesSalud"
          >
            -Condiciones <br />
            de salud
          </p>
          <p
            class="progress-text horizontalText"
            @click="scrollToInReferenciasPersonales"
          >
            -Referencias <br />
            personales
          </p>
          <p class="progress-text horizontalText" @click="scrollToInHijos">
            -Hijos
          </p>
        </div>
      </div>
      <div id="seccion">
        <form @submit.prevent="submitForm" class="row g-3">
          <p>
            Ingrese la información requerida en cada sección, para desplegar una
            seccion debe hacer clic en ella.
          </p>
          <div class="row">
            <div class="col">
              <h5
                @click="informacion_personal = !informacion_personal"
                style="cursor: pointer"
                ref="informacionPersonalRef"
              >
                1. Información personal
                <i
                  v-if="informacion_personal"
                  class="bi bi-chevron-compact-up"
                ></i
                ><i v-if="!informacion_personal" class="bi bi-chevron-down"></i>
              </h5>
            </div>
          </div>

          <div class="info_container" v-if="informacion_personal">
            <!-- Primer Nombre y Segundo Nombre -->
            <div class="row mb-4">
              <div class="col-12 was-validated col-lg-6">
                <label class="form-label" for="nombre">Primer nombre:*</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="form.nom1_emp"
                  id="nombre"
                  required
                />
              </div>
              <div class="col-12 col-lg-6">
                <label class="form-label" for="nombre2">Segundo nombre:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="form.nom2_emp"
                  id="nombre2"
                />
              </div>
            </div>
            <!-- Primer Apellido y Segundo Apellido -->
            <div class="row mb-4">
              <div class="col-12 was-validated col-lg-6">
                <label class="form-label" for="apellido"
                  >Primer apellido:*</label
                >
                <input
                  class="form-control"
                  type="text"
                  v-model="form.ap1_emp"
                  id="apellido"
                  required
                />
              </div>
              <div class="col-12 was-validated col-lg-6">
                <label class="form-label" for="apellido2"
                  >Segundo Apellido:*</label
                >
                <input
                  class="form-control"
                  type="text"
                  v-model="form.ap2_emp"
                  id="apellido2"
                  required
                />
              </div>
            </div>
            <!-- Tipo de Documento y Número de Documento -->
            <div class="row">
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Tipo de documento:*"
                  @selectTipoId="selectTipoId"
                  eventoCampo="selectTipoId"
                  nombreItem="des_tip"
                  :consulta="nom_tip_doc"
                  :registros="consulta_tipo_id"
                  placeholder="Seleccione una opción"
                />
              </div>
              <div class="col-12 mt-2 was-validated p-2 col-lg-6">
                <div>
                  <label class="form-label" for="documento"
                    >Número de documento:*</label
                  >
                  <input
                    class="form-control"
                    type="number"
                    v-model="form.cod_emp"
                    id="documento"
                    :disabled="form.tip_ide === ''"
                    required
                  />
                  <div class="invalid-feedback errorCheck">
                    {{ "" }}
                  </div>
                </div>
              </div>
            </div>
            <!-- Pais de Expedicion y Departamento de Expedicion -->
            <div class="row">
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Pais de expedicion:*"
                  @getPaises="getPaises"
                  eventoCampo="getPaises"
                  nombreItem="nom_pai"
                  :consulta="pai_exp_name"
                  :registros="paises"
                  :index="1"
                  placeholder="Seleccione una opción"
                />
              </div>
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Departamento de expedicion:*"
                  @selectDepartamento="selectDepartamento"
                  eventoCampo="selectDepartamento"
                  nombreItem="nom_dep"
                  :consulta="consulta_departamentos[1]"
                  :registros="consulta_departamentos[1]"
                  :index="1"
                  :disabled="!form.pai_exp"
                  placeholder="Seleccione una opción"
                />
              </div>
            </div>
            <!-- Ciudad de Expedicion y Fecha de Expedicion -->
            <div class="row">
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Ciudad de expedicion:*"
                  @selectCiudad="selectCiudad"
                  eventoCampo="selectCiudad"
                  nombreItem="nom_ciu"
                  :consulta="consulta_ciudades[1]"
                  :registros="consulta_ciudades[1]"
                  :index="1"
                  :disabled="!form.dpt_exp"
                  placeholder="Seleccione una opción"
                />
              </div>
              <div class="col-12 col-lg-6">
                <label class="form-label" for="fecha_exp"
                  >Fecha expedicion:*</label
                >
                <input
                  class="form-control"
                  type="date"
                  v-model="form.fec_expdoc"
                  id="fecha_exp"
                  required
                />
              </div>
            </div>
            <!-- Pais de Nacimiento y Departamento de Nacimiento -->
            <div class="row">
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Pais de nacimiento:*"
                  @getPaises="getPaises"
                  eventoCampo="getPaises"
                  nombreItem="nom_pai"
                  :consulta="cod_pai_name"
                  :registros="paises"
                  :index="2"
                  placeholder="Seleccione una opción"
                />
              </div>
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Departamento de nacimiento:*"
                  @selectDepartamento="selectDepartamento"
                  eventoCampo="selectDepartamento"
                  nombreItem="nom_dep"
                  :consulta="consulta_departamentos[2]"
                  :registros="consulta_departamentos[2]"
                  :index="2"
                  :disabled="!form.cod_pai"
                  placeholder="Seleccione una opción"
                />
              </div>
            </div>
            <!-- Ciudad de Nacimiento y Dirección Residencia -->
            <div class="row mb-4">
              <div class="col-12 was-validated col-lg-6">
                <SearchList
                  nombreCampo="Ciudad de nacimiento:*"
                  @selectCiudad="selectCiudad"
                  eventoCampo="selectCiudad"
                  nombreItem="nom_ciu"
                  :consulta="consulta_ciudades[2]"
                  :registros="consulta_ciudades[2]"
                  :index="2"
                  :disabled="!form.cod_dep"
                  placeholder="Seleccione una opción"
                />
              </div>
              <div class="col-12 was-validated col-lg-6">
                <label class="form-label" for="direccion"
                  >Direccion residencia:*</label
                >
                <input
                  class="form-control"
                  type="text"
                  v-model="form.dir_res"
                  id="direccion"
                  required
                />
              </div>
            </div>
            <!-- Fecha de Nacimiento y Teléfonos -->
            <div class="row mb-4">
              <div class="col-12 was-validated col-lg-6">
                <label class="form-label" for="fecha_nac"
                  >Fecha de nacimiento:*</label
                >
                <input
                  class="form-control"
                  type="date"
                  v-model="form.fec_nac"
                  id="fecha_nac"
                  required
                />
              </div>
              <div class="col-12 col-lg-6">
                <label class="form-label" for="fijo">Teléfono fijo:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="form.tel_res"
                  id="fijo"
                  maxlength="7"
                />
              </div>
            </div>
            <!-- Teléfono Celular y Correo Electrónico -->
            <div class="row mb-4">
              <div class="col-12 was-validated col-lg-6">
                <label class="form-label" for="celular"
                  >Teléfono celular:*</label
                >
                <input
                  class="form-control"
                  type="text"
                  v-model="form.tel_cel"
                  id="celular"
                  required
                  maxlength="10"
                />
              </div>
              <div class="col-12 was-validated col-lg-6">
                <label class="form-label" for="email"
                  >Correo electronico:*</label
                >
                <input
                  class="form-control"
                  type="email"
                  v-model="form.e_mail"
                  id="email"
                  required
                />
              </div>
            </div>
            <!-- Pais de Residencia y Departamento de Residencia -->
            <div class="row">
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Pais de residencia:*"
                  @getPaises="getPaises"
                  eventoCampo="getPaises"
                  nombreItem="nom_pai"
                  :consulta="pai_res_name"
                  :registros="paises"
                  :index="3"
                  placeholder="Seleccione una opción"
                />
              </div>
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Departamento de residencia:*"
                  @selectDepartamento="selectDepartamento"
                  eventoCampo="selectDepartamento"
                  nombreItem="nom_dep"
                  :consulta="consulta_departamentos[3]"
                  :registros="consulta_departamentos[3]"
                  :index="3"
                  :disabled="!form.pai_res"
                  placeholder="Seleccione una opción"
                />
              </div>
            </div>
            <!-- Ciudad de Residencia y Banco -->
            <div class="row">
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Ciudad de residencia:*"
                  @selectCiudad="selectCiudad"
                  eventoCampo="selectCiudad"
                  nombreItem="nom_ciu"
                  :consulta="consulta_ciudades[3]"
                  :registros="consulta_ciudades[3]"
                  :index="3"
                  :disabled="!form.dpt_res"
                  placeholder="Seleccione una opción"
                />
              </div>
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Banco:*"
                  @selectBanco="selectBanco"
                  eventoCampo="selectBanco"
                  nombreItem="nom_ban"
                  :consulta="consulta_banco"
                  :registros="consulta_banco"
                  placeholder="Seleccione una opción"
                />
              </div>
            </div>
            <!-- Número de Cuenta y Barrio -->
            <div class="row mb-4">
              <div class="col-12 col-lg-6">
                <label class="form-label" for="cuenta">Número de cuenta:</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="form.cta_ban"
                  id="cuenta"
                  :disabled="form.cod_ban === '' || form.cod_ban === 0"
                  required
                />
              </div>
              <div class="col-12 was-validated col-lg-6">
                <label class="form-label" for="barrio">Barrio:*</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="form.barrio"
                  id="barrio"
                  required
                />
              </div>
            </div>
            <!-- Nivel Académico y Género -->
            <div class="row">
              <div class="col-12 mt-2 was-validated p-2 col-lg-6">
                <label class="form-label" for="genero"
                  >Identidad de género:*</label
                >
                <select
                  class="form-select"
                  id="genero"
                  v-model="form.sex_emp"
                  required
                >
                  <option value="1">Mujer</option>
                  <option value="2">Hombre</option>
                  <option value="0">Otro</option>
                </select>
                <div class="invalid-feedback errorCheck">
                  {{ "" }}
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Estado civil:*"
                  @selectEstadoCivil="selectEstadoCivil"
                  eventoCampo="selectEstadoCivil"
                  nombreItem="des_est"
                  :consulta="est_civ_name"
                  :registros="consulta_estado_civil"
                  placeholder="Seleccione una opción"
                />
              </div>
            </div>
            <!-- Personas a Cargo y Grupo Sanguíneo -->
            <div class="row mb-4">
              <div class="col-12 was-validated col-lg-6">
                <label class="form-label" for="personas_cargo"
                  >Personas a cargo(cantidad):*</label
                >
                <input
                  class="form-control"
                  type="number"
                  v-model="form.per_car"
                  id="personas_cargo"
                  required
                  min="0"
                />
              </div>
              <div class="col-12 was-validated col-lg-6">
                <label class="form-label" for="sangre">Grupo sanguíneo:*</label>
                <select
                  class="form-select"
                  id="sangre"
                  v-model="form.gru_san"
                  required
                >
                  <option value="A">A</option>
                  <option value="AB">AB</option>
                  <option value="B">B</option>
                  <option value="O">O</option>
                </select>
              </div>
            </div>
            <!-- Factor RH y Estado Civil -->
            <div class="row">
              <div class="col-12 mt-2 was-validated p-2 col-lg-6">
                <label class="form-label" for="rh">Factor RH:*</label>
                <select
                  class="form-select"
                  id="rh"
                  v-model="form.fac_rhh"
                  required
                >
                  <option value="+">+</option>
                  <option value="-">-</option>
                </select>
                <div class="invalid-feedback errorCheck">
                  {{ mensaje_error }}
                </div>
              </div>
              <div class="col-12 col-lg-6 mt-2 was-validated p-2">
                <label class="form-label" for="estrato"
                  >Estrato socioeconomico:*</label
                >
                <select
                  class="form-select"
                  id="estrato"
                  v-model="form.est_soc"
                  required
                >
                  <option :value="n" :key="n" v-for="n in 6">{{ n }}</option>
                </select>
                <div class="invalid-feedback errorCheck">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
            <!-- Grupo Étnico y Estrato Socioeconómico -->
            <div class="row">
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Grupo étnico:*"
                  @selectEtnia="selectEtnia"
                  eventoCampo="selectEtnia"
                  nombreItem="descripcion"
                  :consulta="form.raza"
                  :registros="consulta_etnia"
                  placeholder="Seleccione una opción"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h5
                @click="experiencia_laboral = !experiencia_laboral"
                style="cursor: pointer"
                ref="experienciaLaboralRef"
              >
                2. Experiencia laboral
                <i
                  v-if="experiencia_laboral"
                  class="bi bi-chevron-compact-up"
                ></i
                ><i v-if="!experiencia_laboral" class="bi bi-chevron-down"></i>
              </h5>
            </div>
          </div>
          <div class="info_container pt-0" v-if="experiencia_laboral">
            <div
              v-for="(experiencia, index) in form.experiencias_laborales"
              :key="index"
            >
              <div class="row mt-5">
                <div class="col">
                  <h6>Experiencia {{ index + 1 }}</h6>
                </div>
                <div class="col-sm-12 col-md-6 mb-3">
                  <div
                    class="d-flex justify-content-end align-items-end w-100 h-100"
                  >
                    <label
                      class="bi bi-trash-fill labelOption"
                      @click="deleteExperiencia(index)"
                    >
                      Eliminar</label
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="" class="form-label"> Cargo:* </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="experiencia.cargo"
                  />
                </div>
                <div class="col">
                  <label for="" class="form-label"> Empresa:* </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="experiencia.empresa"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <SearchList
                    nombreCampo="Sector:*"
                    @selectTipoId="selectTipoId"
                    eventoCampo="selectTipoId"
                    nombreItem="des_tip"
                    :consulta="nom_tip_doc"
                    :registros="consulta_tipo_id"
                    placeholder="Seleccione una opción"
                  />
                </div>
                <div class="col">
                  <label for="" class="form-label"> Motivo del retiro:* </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="experiencia.motivo_retiro"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="" class="form-label">Funciones:*</label>
                  <textarea
                    name=""
                    id=""
                    class="form-control"
                    v-model="experiencia.funciones"
                  ></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="" class="form-label">Fecha inicio:</label>
                  <input
                    type="month"
                    class="form-control"
                    v-model="experiencia.fecha_inicio"
                  />
                </div>
                <div class="col">
                  <label for="" class="form-label">Fecha fin:</label>
                  <input
                    type="month"
                    class="form-control"
                    v-model="experiencia.fecha_fin"
                  />
                </div>
              </div>
            </div>
            <div
              class="row mt-5 trash justify-content-center align-items-center padding-1"
            >
              <label
                id="clasificador"
                @click="addExperienciaLaboral()"
                style="cursor: pointer"
                ><i class="bi bi-plus-circle-fill"></i>
                Agregar experiencia laboral
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h5
                @click="info_academica = !info_academica"
                style="cursor: pointer"
                ref="informacionAcademicaRef"
              >
                3. Información académica
                <i v-if="info_academica" class="bi bi-chevron-compact-up"></i
                ><i v-if="!info_academica" class="bi bi-chevron-down"></i>
              </h5>
            </div>
          </div>
          <div class="info_container" v-if="info_academica">
            <div class="row mb-5">
              <div class="col-12 col-lg-6">
                <SearchList
                  nombreCampo="Nivel académico:*"
                  @selectAcademico="selectAcademico"
                  eventoCampo="selectAcademico"
                  nombreItem="des_est"
                  :consulta="consulta_estudio"
                  :registros="consulta_estudio"
                  placeholder="Seleccione una opción"
                />
              </div>
              <div class="col mt-0">
                <SearchList
                  nombreCampo="Sector académico:*"
                  @selectTipoId="selectTipoId"
                  eventoCampo="selectTipoId"
                  nombreItem="des_tip"
                  :consulta="nom_tip_doc"
                  :registros="consulta_tipo_id"
                  placeholder="Seleccione una opción"
                />
              </div>
            </div>
            <div
              v-for="(idioma, index) in form.idiomas"
              class="row"
              :key="index"
            >
              <div class="row">
                <div class="col"></div>
                <div class="col-sm-12 col-md-6 mb-3">
                  <div
                    class="d-flex justify-content-end align-items-end w-100 h-100"
                  >
                    <label
                      class="bi bi-trash-fill labelOption"
                      @click="deleteIdioma(index)"
                    >
                      Eliminar idioma</label
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <SearchList
                    nombreCampo="Idioma:*"
                    @selectTipoId="selectTipoId"
                    eventoCampo="selectTipoId"
                    nombreItem="des_tip"
                    :consulta="nom_tip_doc"
                    :registros="consulta_tipo_id"
                    placeholder="Seleccione una opción"
                  />
                </div>
                <div class="col">
                  <label for="" class="form-label">Nivel:</label>
                  <select
                    name=""
                    id=""
                    class="form-select"
                    v-model="idioma.nivel"
                  >
                    <option value="1">Básico</option>
                    <option value="2">Intermedio</option>
                    <option value="3">Avanzado</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              class="row mt-5 trash justify-content-center align-items-center padding-1"
            >
              <label
                id="clasificador"
                @click="addIdioma()"
                style="cursor: pointer"
                ><i class="bi bi-plus-circle-fill"></i>
                Agregar idioma
              </label>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <h5
                @click="medio_transporte = !medio_transporte"
                style="cursor: pointer"
                ref="medioTransporteRef"
              >
                4. Medio de transporte
                <i v-if="medio_transporte" class="bi bi-chevron-compact-up"></i
                ><i v-if="!medio_transporte" class="bi bi-chevron-down"></i>
              </h5>
            </div>
          </div>
          <div class="info_container" v-if="medio_transporte">
            <div class="row">
              <div class="col flex">
                <label for="" class="form-label">Tipo de transporte:</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="transporteOptions"
                      id="inlineRadio1"
                      value="1"
                      v-model="tipo_transporte"
                    />
                    <label class="form-check-label" for="inlineRadio1"
                      >Vehiculo propio</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="transporteOptions"
                      id="inlineRadio2"
                      value="2"
                      v-model="tipo_transporte"
                    />
                    <label class="form-check-label" for="inlineRadio2"
                      >Transporte publico</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="transporteOptions"
                      id="inlineRadio3"
                      value="3"
                      v-model="tipo_transporte"
                    />
                    <label class="form-check-label" for="inlineRadio3"
                      >Otro</label
                    >
                  </div>
                </div>
              </div>
              <div class="col">
                <label for="" class="form-label"> Cuál?</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="otro_transporte"
                  :disabled="tipo_transporte == 3 ? false : true"
                />
              </div>
            </div>
            <div class="row">
              <div class="col flex">
                <label for="" class="form-label">Licencia de conducción:</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="licenciaConduccion"
                      id="inlineRadioConduccion1"
                      value="1"
                      v-model="licencia_conduccion"
                    />
                    <label class="form-check-label" for="inlineRadio1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="licenciaConduccion"
                      id="inlineRadioConduccion2"
                      v-model="licencia_conduccion"
                      value="0"
                    />
                    <label class="form-check-label" for="inlineRadio2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
              <div class="col">
                <label for="" class="form-label">Categoría</label>
                <select
                  name=""
                  id=""
                  class="form-select"
                  v-model="form.categoria_licencia"
                >
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="B3">B3</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                  <option value="C3">C3</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h5
                @click="condiciones_salud = !condiciones_salud"
                style="cursor: pointer"
                ref="condicionesSaludRef"
              >
                5. Condiciones de salud
                <i v-if="condiciones_salud" class="bi bi-chevron-compact-up"></i
                ><i v-if="!condiciones_salud" class="bi bi-chevron-down"></i>
              </h5>
            </div>
          </div>
          <div class="info_container" v-if="condiciones_salud">
            <div class="row">
              <div class="col flex">
                <label for="" class="form-label">Accidentes laborales:</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="accidentesOptions"
                      id="accidentesOptions1"
                      v-model="form.acidente_laboral"
                      value="1"
                    />
                    <label class="form-check-label" for="accidentesOptions1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="accidentesOptions"
                      id="accidentesOptions2"
                      v-model="form.acidente_laboral"
                      value="0"
                    />
                    <label class="form-check-label" for="accidentesOptions2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
              <div class="col flex">
                <label for="" class="form-label">Enfermedades:</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="enfermedadesOptions"
                      id="enfermedadesOptions1"
                      v-model="form.enfermedad"
                      value="1"
                    />
                    <label class="form-check-label" for="enfermedadesOptions1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="enfermedadesOptions"
                      id="enfermedadesOptions2"
                      v-model="form.enfermedad"
                      value="0"
                    />
                    <label class="form-check-label" for="enfermedadesOptions2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
              <div class="col flex">
                <label for="" class="form-label">Tratamientos médicos:</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptionsTratamientoMedico"
                      id="TratamientoMedico1"
                      v-model="form.tratamiento_medico"
                      value="1"
                    />
                    <label class="form-check-label" for="TratamientoMedico1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptionsTratamientoMedico"
                      id="TratamientoMedico2"
                      v-model="form.tratamiento_medico"
                      value="0"
                    />
                    <label class="form-check-label" for="TratamientoMedico2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col flex">
                <label for="" class="form-label"
                  >Tratamientos psicológicos:</label
                >
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="tratamientoPsicologicoOptions"
                      id="tratamientoPsicologicoOptions1"
                      v-model="form.tratamiento_psicologico"
                      value="1"
                    />
                    <label
                      class="form-check-label"
                      for="tratamientoPsicologicoOptions1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="tratamientoPsicologicoOptions"
                      id="tratamientoPsicologicoOptions2"
                      v-model="form.tratamiento_psicologico"
                      value="0"
                    />
                    <label
                      class="form-check-label"
                      for="tratamientoPsicologicoOptions2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
              <div class="col flex">
                <label for="" class="form-label"
                  >Tratamientos psiquiatricos:</label
                >
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="tratamientoPsiquiatricoRadioOptions"
                      id="tratamientoPsiquiatricoRadioOptions1"
                      v-model="form.tratamiento_psiquiatrico"
                      value="1"
                    />
                    <label
                      class="form-check-label"
                      for="tratamientoPsiquiatricoRadioOptions1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="tratamientoPsiquiatricoRadioOptions"
                      v-model="form.tratamiento_psiquiatrico"
                      id="tratamientoPsiquiatricoRadioOptions2"
                      value="0"
                    />
                    <label
                      class="form-check-label"
                      for="tratamientoPsiquiatricoRadioOptions2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
              <div class="col flex">
                <label for="" class="form-label"
                  >Tratamientos odontológicos:</label
                >
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="tratamientoOdontologicoRadioOptions"
                      id="tratamientoOdontologicoRadioOptions1"
                      v-model="form.tratamiento_odontologico"
                      value="1"
                    />
                    <label
                      class="form-check-label"
                      for="tratamientoOdontologicoRadioOptions1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="tratamientoOdontologicoRadioOptions"
                      v-model="form.tratamiento_odontologico"
                      id="tratamientoOdontologicoRadioOptions2"
                      value="0"
                    />
                    <label
                      class="form-check-label"
                      for="tratamientoOdontologicoRadioOptions2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col flex">
                <label for="" class="form-label">Alergias:</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="AlergiasRadioOptions"
                      v-model="form.alerigia"
                      id="AlergiasRadioOptions1"
                      value="1"
                    />
                    <label class="form-check-label" for="AlergiasRadioOptions1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="AlergiasRadioOptions"
                      v-model="form.alerigia"
                      id="AlergiasRadioOptions2"
                      value="0"
                    />
                    <label class="form-check-label" for="AlergiasRadioOptions2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
              <div class="col flex">
                <label for="" class="form-label">Fracturas:</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      v-model="form.fractura"
                      name="fracturaRadioOptions"
                      id="fracturaRadioOptions1"
                      value="1"
                    />
                    <label class="form-check-label" for="fracturaRadioOptions1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="fracturaRadioOptions"
                      v-model="form.fractura"
                      id="fracturaRadioOptions2"
                      value="0"
                    />
                    <label class="form-check-label" for="fracturaRadioOptions2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
              <div class="col flex">
                <label for="" class="form-label">Cirugías:</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      v-model="form.cirugia"
                      name="cirugiaRadioOptions"
                      id="cirugiaRadioOptions1"
                      value="1"
                    />
                    <label class="form-check-label" for="cirugiaRadioOptions1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="cirugiaRadioOptions"
                      id="cirugiaRadioOptions2"
                      v-model="form.cirugia"
                      value="0"
                    />
                    <label class="form-check-label" for="cirugiaRadioOptions2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col flex">
                <label for="" class="form-label"
                  >Consume sustancias psicoactivas:</label
                >
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      v-model="form.sustencia_psicoactiva"
                      class="form-check-input"
                      type="radio"
                      name="sustenciaPsicoactivaRadioOptions"
                      id="sustenciaPsicoactivaRadioOptions1"
                      value="1"
                    />
                    <label
                      class="form-check-label"
                      for="sustenciaPsicoactivaRadioOptions1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      v-model="form.sustencia_psicoactiva"
                      class="form-check-input"
                      type="radio"
                      name="sustenciaPsicoactivaRadioOptions"
                      id="sustenciaPsicoactivaRadioOptions2"
                      value="0"
                    />
                    <label
                      class="form-check-label"
                      for="sustenciaPsicoactivaRadioOptions2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
              <div class="col flex">
                <label for="" class="form-label">Lentes:</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="lentesRadioOptions"
                      id="lentesRadioOptions1"
                      v-model="form.lentes"
                      value="1"
                    />
                    <label class="form-check-label" for="lentesRadioOptions1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="lentesRadioOptions"
                      id="lentesRadioOptions2"
                      v-model="form.lentes"
                      value="0"
                    />
                    <label class="form-check-label" for="lentesRadioOptions2"
                      >No</label
                    >
                  </div>
                </div>
              </div>
              <div class="col flex"></div>
            </div>
            <div class="row">
              <div class="col">
                <label for="" class="form-label">Estatura(cm):</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="form.estatura"
                />
              </div>
              <div class="col">
                <label for="" class="form-label">Peso(kg):</label>
                <input type="number" class="form-control" v-model="form.peso" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <SearchList nombreCampo="EPS:*" />
              </div>
              <div class="col">
                <SearchList
                  nombreCampo="AFP: *"
                  @getAFP="getAFP"
                  eventoCampo="getAFP"
                  nombreItem="nombre"
                  :consulta="consulta_afp"
                  :registros="lista_afp"
                  :ordenCampo="1"
                  :valida_campo="false"
                  placeholder="Seleccione una opción"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="" class="form-label"
                  >Ampliación de las condiciones de salud:</label
                >
                <textarea
                  class="form-control"
                  v-model="form.descripcion_salud"
                  maxlength="300"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h5
                @click="referencias_personales = !referencias_personales"
                style="cursor: pointer"
                ref="referenciasPersonalesRef"
              >
                6. Referencias personales
                <i
                  v-if="referencias_personales"
                  class="bi bi-chevron-compact-up"
                ></i
                ><i
                  v-if="!referencias_personales"
                  class="bi bi-chevron-down"
                ></i>
              </h5>
            </div>
          </div>
          <div class="info_container" v-if="referencias_personales">
            <div
              class="row"
              v-for="(referencia, index) in form.referencias"
              :key="index"
            >
              <div class="info_container">
                <div class="row">
                  <div class="col">
                    <h6>{{ "Referencia " + (index + 1) }}</h6>
                  </div>
                  <div class="col-sm-12 col-md-6 mb-3">
                    <div
                      v-if="form.referencias.length > 2"
                      class="d-flex justify-content-end align-items-end w-100 h-100"
                    >
                      <label
                        class="bi bi-trash-fill labelOption"
                        @click="deleteReferencia(index)"
                      >
                        Eliminar</label
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12 col-lg-3">
                    <label class="form-label" for="tipo_ref"
                      >Tipo de referencia:</label
                    >
                    <select
                      class="form-select"
                      id="tipo_ref"
                      v-model="referencia.tip_ref"
                      required
                    >
                      <option value="1">Personal</option>
                      <option value="2">Familiar</option>
                    </select>
                  </div>
                  <div class="col-12 col-lg-3">
                    <label class="form-label" for="parentesco"
                      >Parentesco:</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      v-model="referencia.parent"
                      id="parentesco"
                      required
                    />
                  </div>

                  <div class="col-12 col-lg-3">
                    <label class="form-label" for="fullName"
                      >Nombre completo:</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      v-model="referencia.nom_ref"
                      id="fullName"
                      required
                    />
                  </div>
                  <div class="col-12 col-lg-3">
                    <label class="form-label" for="celular_ref"
                      >Número celular:</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      v-model="referencia.cel_ref"
                      id="celular_ref"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row mt-5 trash justify-content-center align-items-center padding-1"
            >
              <label
                id="clasificador"
                @click="addReferencia()"
                style="cursor: pointer"
                ><i class="bi bi-plus-circle-fill"></i>
                Agregar referencia
              </label>
            </div>
          </div>

          <!-- Hijos -->
          <div class="row">
            <div class="col">
              <h5
                @click="hijos_info = !hijos_info"
                style="cursor: pointer"
                ref="hijosRef"
              >
                7. Hijos
                <i v-if="hijos_info" class="bi bi-chevron-compact-up"></i
                ><i v-if="!hijos_info" class="bi bi-chevron-down"></i>
              </h5>
            </div>
          </div>
          <div class="info_container" v-if="hijos_info">
            <div
              class="row"
              v-for="(familiar, index) in form.familiares"
              :key="index"
            >
              <div class="info_container">
                <div class="row">
                  <div class="col">
                    <h6>{{ "Hijo " + (index + 1) }}</h6>
                  </div>

                  <div class="col-sm-12 col-md-6 mb-3">
                    <div
                      class="d-flex justify-content-end align-items-end w-100 h-100"
                    >
                      <label
                        class="bi bi-trash-fill labelOption"
                        @click="deleteHijo(index)"
                      >
                        Eliminar</label
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12 col-lg-3">
                    <label class="form-label" for="primer_apellido_hijo"
                      >Primer apellido:</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      v-model="familiar.ap1_fam"
                      id="primer_apellido_hijo"
                    />
                  </div>
                  <div class="col-12 col-lg-3">
                    <label class="form-label" for="segundo_apellido_hijo"
                      >Segundo apellido:</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      v-model="familiar.ap2_fam"
                      id="segundo_apellido_hijo"
                    />
                  </div>
                  <div class="col-12 col-lg-3">
                    <label class="form-label" for="nombre_hijo">Nombre:</label>
                    <input
                      class="form-control"
                      type="text"
                      v-model="familiar.nom_fam"
                      id="nombre_hijo"
                    />
                  </div>
                  <div class="col-12 col-lg-3">
                    <label class="form-label" for="fecha_nac_hijo"
                      >Fecha de nacimiento:</label
                    >
                    <input
                      class="form-control"
                      type="date"
                      @input="updateFecha($event, familiar)"
                      :value="formattedDate(familiar.fec_nac)"
                      id="fecha_nac_hijo"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row mt-5 trash justify-content-center align-items-center padding-1"
            >
              <label
                id="clasificador"
                @click="addHijo()"
                style="cursor: pointer"
                ><i class="bi bi-plus-circle-fill"></i>
                Agregar hijo
              </label>
            </div>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importaciones
import SearchList from "./SearchList.vue";
import { useToken } from "../composables/useToken";
import Loading from "./Loading.vue";
import { ref, reactive, watch } from "vue";
import axios from "axios";

// Variables reactivas

const { configHeader } = useToken();
const loading = ref(false);
const mensaje_error = "¡Este campo debe ser diligenciado!";
const consulta_etnia = ref([]);
const est_civ_name = ref("");
const consulta_estado_civil = ref([]);
/* const niv_aca_name = ref(""); */
const consulta_estudio = ref([]);
/* const banco_name = ref(""); */
const consulta_banco = ref([]);
const consulta_tipo_id = ref([]);
const nom_tip_doc = ref("");
const dep_res_name = ref("");
const dep_exp_name = ref("");
const cod_dep_name = ref("");
const paises = ref([]);
const pai_exp_name = ref("");
const cod_pai_name = ref("");
const pai_res_name = ref("");
const consulta_departamentos = reactive({});
const consulta_ciudades = reactive({});
const ciu_exp_name = ref("");
const cod_ciu_name = ref("");
const ciu_res_name = ref("");
const URL_API = process.env.VUE_APP_URL_API;
const informacion_personal = ref(false);
const condiciones_salud = ref(false);
const medio_transporte = ref(false);
const referencias_personales = ref(false);
const hijos_info = ref(false);
const info_academica = ref(false);
const experiencia_laboral = ref(false);
const tipo_transporte = ref(2);
const otro_transporte = ref("");
const licencia_conduccion = ref(0);
const informacionPersonalRef = ref(null);
const experienciaLaboralRef = ref(null);
const informacionAcademicaRef = ref(null);
const medioTransporteRef = ref(null);
const condicionesSaludRef = ref(null);
const referenciasPersonalesRef = ref(null);
const hijosRef = ref(null);
// Formulario reactivo

const requiredFieldsToComplete = [
  "dir_res",
  "cod_ban",
  "barrio",
  "dir_res",
  "cta_ban",
  "per_car",
  "gru_san",
  "fac_rhh",
  "est_soc",
  "est_civ",
];
const requiredFieldsInfoPersonal = [
  "nom1_emp",
  "ap1_emp",
  "ap2_emp",
  "tip_ide",
  "cod_emp",
  "pai_exp",
  "dpt_exp",
  "ciu_exp",
  "fec_expdoc",
  "cod_pai",
  "cod_dep",
  "cod_ciu",
  "fec_nac",
  "tel_cel",
  "e_mail",
  "pai_res",
  "dpt_res",
  "ciu_res",
  "sex_emp",
  "cod_grupo",
];
const lista_afp = ref([]);
const consulta_afp = ref("");
const progress = ref(0);
const form = reactive({
  descripcion_salud: "",
  afp_id: "",
  peso: 0,
  estatura: 0,
  sustencia_psicoactiva: 0,
  enfermedad: 0,
  lentes: 0,
  cirugia: 0,
  alerigia: 0,
  fractura: 0,
  tratamiento_odontologico: 0,
  tratamiento_psiquiatrico: 0,
  tratamiento_psicologico: 0,
  tratamiento_medico: 0,
  acidente_laboral: 0,
  emp_id: "",
  nom1_emp: "",
  nom2_emp: "",
  cod_grupo: "",
  cod_emp: "",
  ap1_emp: "",
  ap2_emp: "",
  tip_ide: "",
  pai_exp: "",
  dpt_exp: "",
  ciu_exp: "",
  cod_pai: "",
  cod_dep: "",
  cod_ciu: "",
  fec_nac: "",
  dir_res: "",
  fec_expdoc: "",
  tel_res: "",
  tel_cel: "",
  e_mail: "",
  pai_res: "",
  dpt_res: "",
  ciu_res: "",
  cod_ban: "",
  cta_ban: "",
  barrio: "",
  Niv_aca: "",
  sex_emp: "",
  per_car: "",
  gru_san: "",
  fac_rhh: "",
  raza: "",
  est_civ: "",
  est_soc: "",
  experiencias_laborales: [],
  idiomas: [],
  categoria_licencia: "",
  sector_academico_id: "",
  familiaresConsulta: [],
  referencias: [
    { num_ref: 1, tip_ref: "", parent: "", cel_ref: "", nom_ref: "" },
    { num_ref: 2, tip_ref: "", parent: "", cel_ref: "", nom_ref: "" },
  ],
  familiares: [],
});
watch(
  form,
  () => {
    calculateProgress();
  },
  { deep: true }
);

const calculateProgress = () => {
  let completed = 0;

  requiredFieldsInfoPersonal.forEach((field) => {
    if (form[field] && form[field].toString().trim() !== "") {
      completed++;
    }
  });

  // Verificar campos especiales de componentes SearchList

  const totalFields =
    requiredFieldsInfoPersonal.length + requiredFieldsToComplete.length; // Campos adicionales

  progress.value = ((completed / totalFields) * 100) / 8;
};

// Función para enviar el formulario
const submitForm = async () => {
  loading.value = true; // Activar el estado de carga
  try {
    // Aquí puedes agregar validaciones adicionales si es necesario

    // Realizar la solicitud POST al servidor
    const response = await axios.post(
      `${URL_API}/api/v1/registroDatosPersonales`,
      form
    );

    // Manejar la respuesta exitosa
    console.log("Formulario enviado con éxito:", response.data);
    // Opcional: Mostrar una alerta de éxito, limpiar el formulario, redirigir al usuario, etc.
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    // Opcional: Mostrar una alerta de error al usuario
  } finally {
    loading.value = false; // Desactivar el estado de carga
  }
};
const deleteIdioma = (index) => {
  form.idiomas.splice(index, 1);
};
const deleteExperiencia = (index) => {
  form.experiencias_laborales.splice(index, 1);
};
const addExperienciaLaboral = () => {
  form.experiencias_laborales.push({
    empresa: "",
    cargo: "",
    sector_econimico_id: "",
    motivo_retiro: "",
    fecha_inicio: "",
    fecha_fin: "",
  });
};

// Función para agregar un hijo
const addHijo = () => {
  form.familiares.push({
    ap1_fam: "",
    ap2_fam: "",
    nom_fam: "",
    tip_fam: 2,
    fec_nac: "",
    ocu_fam: 7,
  });
};

// Formatear fecha
const formattedDate = (date) => {
  if (!date) return "";
  return date.split(" ")[0];
};

const deleteReferencia = (index) => {
  form.referencias.splice(index, 1);
};

const addReferencia = () => {
  form.referencias.push({
    num_ref: form.referencias.length + 1,
    tip_ref: "",
    parent: "",
    cel_ref: "",
    nom_ref: "",
  });
};
// Actualizar fecha de nacimiento
const updateFecha = (event, familiar) => {
  const fecha = event.target.value;
  familiar.fec_nac = fecha;
};

// Funciones para seleccionar opciones
const selectEtnia = (item) => {
  axios
    .get(`${URL_API}/api/v1/grupoEtnicoEmpleado`)
    .then((result) => {
      consulta_etnia.value = result.data;
      form.cod_grupo = item.cod_grupo;
    })
    .catch((error) => {
      console.error("Error al seleccionar etnia:", error);
    });
};

const deleteHijo = (index) => {
  form.familiares.splice(index, 1);
};
const selectEstadoCivil = (item) => {
  axios
    .get(`${URL_API}/api/v1/estadocivil`)
    .then((result) => {
      consulta_estado_civil.value = result.data;
      form.est_civ = item.cod_est;
    })
    .catch((error) => {
      console.error("Error al seleccionar estado civil:", error);
    });
};

const selectAcademico = (item) => {
  axios
    .get(`${URL_API}api/v1/nivelAcademicoFormEmpleado`)
    .then((result) => {
      consulta_estudio.value = result.data;
      form.Niv_aca = item.tip_est;
    })
    .catch((error) => {
      console.error("Error al seleccionar nivel académico:", error);
    });
};

const selectBanco = (item) => {
  axios
    .get(`${URL_API}api/v1/bancosFormularioEmpleado`)
    .then((result) => {
      consulta_banco.value = result.data;
      form.cod_ban = item.cod_ban;
    })
    .catch((error) => {
      console.error("Error al seleccionar banco:", error);
    });
};
const addIdioma = () => {
  form.idiomas.push({
    nombre: "",
    id: "",
    nivel: "",
  });
};
const getAFP = async (item = null) => {
  if (item != null) {
    consulta_afp.value = item.nombre;
    form.afp_id = item.id;
  }

  const response = await axios.get(URL_API + "api/v1/afp", configHeader());
  lista_afp.value = response.data;
};

/* const selectIdioma = (item) => {
  axios
    .get(`${URL_API}api/v1/getidiomas`)
    .then((result) => {
      form.idiomas.push({});
      form.value = result.data;
      form.tip_ide = item.cod_tip;
    })
    .catch((error) => {
      console.error("Error al seleccionar tipo de identificación:", error);
    });
}; */
const selectTipoId = (item) => {
  axios
    .get(`${URL_API}api/v1/tipoIdFormularioEmpleado`)
    .then((result) => {
      consulta_tipo_id.value = result.data;
      form.tip_ide = item.cod_tip;
    })
    .catch((error) => {
      console.error("Error al seleccionar tipo de identificación:", error);
    });
};

const selectCiudad = (item = null, index = null) => {
  if (item != null) {
    switch (index) {
      case 1:
        form.ciu_exp = item.cod_ciu;
        ciu_exp_name.value = item.nom_ciu;
        break;
      case 2:
        form.cod_ciu = item.cod_ciu;
        cod_ciu_name.value = item.nom_ciu;
        break;
      case 3:
        form.ciu_res = item.cod_ciu;
        ciu_res_name.value = item.nom_ciu;
        break;
      default:
        break;
    }
  }
};

const selectDepartamento = (item = null, index = null) => {
  if (item != null) {
    switch (index) {
      case 1:
        form.dpt_exp = item.cod_dep;
        dep_exp_name.value = item.nom_dep;
        getCiudades(item, index);
        break;
      case 2:
        form.cod_dep = item.cod_dep;
        cod_dep_name.value = item.nom_dep;
        getCiudades(item, index);
        break;
      case 3:
        form.dpt_res = item.cod_dep;
        dep_res_name.value = item.nom_dep;
        getCiudades(item, index);
        break;
      default:
        break;
    }
  }
};

const getCiudades = (item, index) => {
  axios
    .get(
      `${URL_API}api/v1/ciudadesFormularioEmpleado/${item.cod_pai}/${item.cod_dep}`
    )
    .then((result) => {
      consulta_ciudades[index] = result.data;
    })
    .catch((error) => {
      console.error("Error al obtener ciudades:", error);
    });
};

const getDepartamentos = (item, index) => {
  axios
    .get(`${URL_API}api/v1/departamentosFormularioEmpleado/${item.cod_pai}`)
    .then((result) => {
      consulta_departamentos[index] = result.data;
    })
    .catch((error) => {
      console.error("Error al obtener departamentos:", error);
    });
};
const scrollToInformacionPersonal = () => {
  if (informacionPersonalRef.value) {
    // Asegura que la sección esté expandida
    informacion_personal.value = true;

    // Usa scrollIntoView con comportamiento suave
    setTimeout(() => {
      informacionPersonalRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // Pequeño delay para permitir la renderización
  }
};

const scrollToExperiencia = () => {
  if (experienciaLaboralRef.value) {
    // Asegura que la sección esté expandida
    experiencia_laboral.value = true;

    // Usa scrollIntoView con comportamiento suave
    setTimeout(() => {
      experienciaLaboralRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // Pequeño delay para permitir la renderización
  }
};

const scrollToInformacionAcademica = () => {
  if (informacionAcademicaRef.value) {
    // Asegura que la sección esté expandida
    info_academica.value = true;

    // Usa scrollIntoView con comportamiento suave
    setTimeout(() => {
      informacionAcademicaRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // Pequeño delay para permitir la renderización
  }
};

const scrollToInMedioTrasnporte = () => {
  if (medioTransporteRef.value) {
    // Asegura que la sección esté expandida

    medio_transporte.value = true;

    // Usa scrollIntoView con comportamiento suave
    setTimeout(() => {
      medioTransporteRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // Pequeño delay para permitir la renderización
  }
};
const scrollToInCondicionesSalud = () => {
  if (condicionesSaludRef.value) {
    // Asegura que la sección esté expandida

    condiciones_salud.value = true;

    // Usa scrollIntoView con comportamiento suave
    setTimeout(() => {
      condicionesSaludRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // Pequeño delay para permitir la renderización
  }
};
const scrollToInReferenciasPersonales = () => {
  if (referenciasPersonalesRef.value) {
    // Asegura que la sección esté expandida

    referencias_personales.value = true;

    // Usa scrollIntoView con comportamiento suave
    setTimeout(() => {
      referenciasPersonalesRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // Pequeño delay para permitir la renderización
  }
};

const scrollToInHijos = () => {
  if (hijosRef.value) {
    // Asegura que la sección esté expandida

    hijos_info.value = true;

    // Usa scrollIntoView con comportamiento suave
    setTimeout(() => {
      hijosRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // Pequeño delay para permitir la renderización
  }
};

const getPaises = (item = null, index = null) => {
  if (item != null) {
    switch (index) {
      case 1:
        form.pai_exp = item.cod_pai;
        pai_exp_name.value = item.nom_pai;
        getDepartamentos(item, index);
        break;
      case 2:
        form.cod_pai = item.cod_pai;
        cod_pai_name.value = item.nom_pai;
        getDepartamentos(item, index);
        break;
      case 3:
        form.pai_res = item.cod_pai;
        pai_res_name.value = item.nom_pai;
        getDepartamentos(item, index);
        break;
      default:
        break;
    }
  }
  axios
    .get(`${URL_API}api/v1/paisesFormularioEmpleado`)
    .then((result) => {
      paises.value = result.data;
    })
    .catch((error) => {
      console.error("Error al obtener países:", error);
    });
};
</script>

<style scoped>
.textProgressContainer {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  align-items: left;
  height: 100%;
  width: 100%;
  margin-left: 1.5em;
}
.progress-container {
  width: 1em;
  height: 60vh; /* Altura del contenedor */
  background-color: #ffffff;
  border: #006b3f solid 1px;
  border-radius: 10px;
  margin: 20px auto;
  position: fixed;
  display: flex;
  align-items: flex-end; /* Para que la barra crezca desde abajo */
}

.progress-bar {
  width: 100%;
  background: linear-gradient(0deg, #006b3f 0%, #137294 51%, #1a9438 100%);
  border-radius: 10px;
  transition: height 0.5s ease-in-out;
  position: absolute;
  bottom: 0%;
}

.progress-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-90deg); /* Texto vertical */
  white-space: nowrap;
  color: rgb(156, 156, 156);
  font-weight: bold;
  font-size: 0.8rem;
}
.horizontalText {
  transform: translate(0%, 0%) rotate(0deg);
  position: relative;
  left: 0%;
  top: 0%;
  cursor: pointer;
}
.horizontalText:hover {
  text-decoration: underline;
  color: #006b3f;
}
h2 {
  text-align: center;
}

.col {
  margin-top: 1em;
}

.form-group {
  margin-bottom: 15px;
}

#seccion {
  border: solid #d5dbdb 0.5px;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #006b3f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
}

button:hover {
  background-color: #015734;
}

.info_container {
  border: solid rgba(214, 214, 214, 0.558) 1px;
  border-radius: 5px;
  padding: 2em;
}

h5 {
  color: #006b3f;
  text-align: left;
}

.errorCheck {
  height: 2em;
}

.btn_outline {
  background-color: #ffffff;
  border: #006b3f solid 2px;
  transition: all 0.5s ease-out;
}

.color_green {
  color: #006b3f;
}

.btn_outline:hover .color_green {
  color: #ffffff;
}

.btn_outline::after {
  content: "Agregar hijo";
  position: absolute;
  right: -160%;
  top: 50%;
  transform: translateY(-60%);
  white-space: nowrap;
  background-color: #006b3f;
  padding: 5px;
  border: 1px solid #ddd;
  opacity: 0;
  transition: all 0.5s ease-in-out;
  z-index: 10;
  height: 3em;
  border-radius: 5px;
  transform: scaleX(0%) translateY(-50%);
}
.form-check-input:checked {
  background-color: #006b3f;
}
.btn_outline:hover::after {
  opacity: 1;
  transform: scaleX(100%) translateY(-50%);
}
.form-label {
  float: left;
  margin: 20px 0px 5px 0px;
}
.flex {
  display: flex;
  flex-direction: column;
}
.flexRow {
  display: flex;
  flex-direction: row-reverse;
  gap: 2em;
}
</style>

<template>
  <div class="container">
    <Loading :loading="loading" />

    <h2>Registro de datos personales</h2>
    <!-- barra para el pocrcentaje de llenado -->

    <!-- --------------------------- -->
    <div class="todoProgressContainer">
      <div class="textProgressContainer">
        <i class="bi bi-passport"></i>
        <p
          @click="scrollToInformacionPersonal"
          :class="
            informacion_personal
              ? 'progress-text horizontalText activeLink'
              : 'progress-text horizontalText'
          "
        >
          -Información <br />
          personal
        </p>
        <p
          :class="
            experiencia_laboral
              ? 'progress-text horizontalText activeLink'
              : 'progress-text horizontalText'
          "
          @click="scrollToExperiencia"
        >
          -Experiencia <br />
          laboral
        </p>
        <p
          :class="
            info_academica
              ? 'progress-text horizontalText activeLink'
              : 'progress-text horizontalText'
          "
          @click="scrollToInformacionAcademica"
        >
          -Información <br />
          académica
        </p>
        <p
          :class="
            medio_transporte
              ? 'progress-text horizontalText activeLink'
              : 'progress-text horizontalText'
          "
          @click="scrollToInMedioTrasnporte"
        >
          -Medio de <br />
          transporte
        </p>
        <p
          :class="
            condiciones_salud
              ? 'progress-text horizontalText activeLink'
              : 'progress-text horizontalText'
          "
          @click="scrollToInCondicionesSalud"
        >
          -Condiciones <br />
          de salud
        </p>
        <p
          :class="
            referencias_personales
              ? 'progress-text horizontalText activeLink'
              : 'progress-text horizontalText'
          "
          @click="scrollToInReferenciasPersonales"
        >
          -Referencias <br />
          personales
        </p>
        <!--  <p
            :class="
              hijos_info
                ? 'progress-text horizontalText activeLink'
                : 'progress-text horizontalText '
            "
            @click="scrollToInHijos"
          >
            -Hijos
          </p> -->
      </div>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        <!--  <span
          :class="
            progress >= 60
              ? 'progress-text progress-text-half'
              : 'progress-text'
          "
          >{{ Math.ceil(progress) }}% completado</span
        > -->
      </div>
    </div>
    <div class="flexRow">
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
                  disabled
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
                    disabled
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
                  :consulta="dep_exp_name"
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
                  :consulta="ciu_exp_name"
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
                  :max="new Date().toISOString().split('T')[0]"
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
                  :consulta="cod_dep_name"
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
                  :consulta="cod_ciu_name"
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
                  :max="new Date().toISOString().split('T')[0]"
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
                  disabled
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
                  :consulta="dep_res_name"
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
                  :consulta="ciu_res_name"
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
                  :registros="lista_bancos"
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
                  :disabled="form.cod_ban === '' || form.cod_ban == '0 '"
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
                  :consulta="consulta_estado_civil"
                  :registros="lista_estado_civil"
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
                  :registros="lista_etnia"
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
                    @getSectorEconomico="getSectorEconomico"
                    eventoCampo="getSectorEconomico"
                    nombreItem="nombre"
                    :index="index"
                    :consulta="
                      form.experiencias_laborales[index]
                        .consulta_sector_economico
                    "
                    :registros="lista_sectores_economicos"
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
                    maxlength="1000"
                    v-model="experiencia.funciones"
                  ></textarea>
                  <div class="d-flex justify-content-end">
                    <small class="char-count"
                      >{{ remainingCharsExperiencia(index) }}/1000</small
                    >
                  </div>
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
                  :consulta="consulta_nivel_academico"
                  :registros="lista_nivel_academico"
                  placeholder="Seleccione una opción"
                />
              </div>
              <div class="col mt-0">
                <SearchList
                  nombreCampo="Sector académico:*"
                  @getSectorAcademico="getSectorAcademico"
                  eventoCampo="getSectorAcademico"
                  nombreItem="nombre"
                  :consulta="consulta_sector_academico"
                  :registros="lista_sector_academico"
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
                    @getIdioma="getIdioma"
                    eventoCampo="getIdioma"
                    nombreItem="nombre"
                    :index="index"
                    :consulta="form.idiomas[index].nombre"
                    :registros="lista_idiomas"
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
                      v-model="form.tipo_transporte"
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
                      v-model="form.tipo_transporte"
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
                      v-model="form.tipo_transporte"
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
                  :disabled="form.tipo_transporte == 3 ? false : true"
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
                      v-model="form.licencia_conduccion"
                    />
                    <label class="form-check-label" for="inlineRadioConduccion1"
                      >Si</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="licenciaConduccion"
                      id="inlineRadioConduccion2"
                      v-model="form.licencia_conduccion"
                      value="0"
                      @click="form.categoria_licencia = ''"
                    />
                    <label class="form-check-label" for="inlineRadioConduccion2"
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
                  :disabled="form.licencia_conduccion != 1"
                >
                  <option value=""></option>
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
                <SearchList
                  nombreCampo="EPS a la que se encuentra afiliado:*"
                  @selectEps="selectEps"
                  eventoCampo="selectEps"
                  nombreItem="nombre"
                  :consulta="consulta_eps"
                  :registros="lista_eps"
                  :ordenCampo="1"
                  :valida_campo="false"
                  placeholder="Seleccione una opción"
                />
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
                  maxlength="500"
                />
                <div class="d-flex justify-content-end">
                  <small class="char-count"
                    >{{ remainingCharsCondicionesSalud() }}/500</small
                  >
                </div>
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
          <!--   <div class="row">
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
          </div> -->
          <!--  <div class="info_container" v-if="hijos_info">
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
                        v-if="!familiar.cod_emp"
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
                      :max="new Date().toISOString().split('T')[0]"
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
          </div> -->
          <div class="row" v-if="userlogued.tipo_usuario_id == 1">
            <div class="col">
              <h5
                @click="concepto = !concepto"
                style="cursor: pointer"
                ref="conceptoRef"
              >
                7. Concepto
                <i v-if="concepto" class="bi bi-chevron-compact-up"></i
                ><i v-if="!concepto" class="bi bi-chevron-down"></i>
              </h5>
            </div>
          </div>
          <div class="row" v-if="concepto">
            <textarea
              rows="7"
              class="form-control textAreaRow"
              name=""
              id=""
              placeholder="concepto"
              v-model="form.concepto"
              maxlength="4000"
            ></textarea>
            <div class="d-flex justify-content-end">
              <small class="char-count"
                >{{ remainingCharsConcepto() }}/4000</small
              >
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
import { ref, reactive, watch, defineProps, onMounted } from "vue";
import axios from "axios";
import { useAlerts } from "@/composables/useAlerts";
import { useRoute } from "vue-router";

const { userlogued } = defineProps(["userlogued"]); //props

// Variables reactivas
const route = useRoute();
const { showAlert } = useAlerts();
const { configHeader } = useToken();
const loading = ref(false);
const mensaje_error = "¡Este campo debe ser diligenciado!";
const consulta_tipo_id = ref([]);
const nom_tip_doc = ref("");
const dep_res_name = ref("");
const dep_exp_name = ref("");
const cod_dep_name = ref("");
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
const concepto = ref(false);
const otro_transporte = ref("");
const informacionPersonalRef = ref(null);
const experienciaLaboralRef = ref(null);
const informacionAcademicaRef = ref(null);
const medioTransporteRef = ref(null);
const condicionesSaludRef = ref(null);
const referenciasPersonalesRef = ref(null);
/* const hijosRef = ref(null); */
// Formulario reactivo
const requieredExperienceFields = [
  "empresa",
  "cargo",
  "sector_econimico_id",
  "consulta_sector_economico",
  "motivo_retiro",
  "fecha_inicio",
  "fecha_fin",
];
const requieredFieldsReferencias = ["tip_ref", "parent", "cel_ref", "nom_ref"];
const requieredFieldsInfoAcademi = ["sector_academico_id", "Niv_aca"];
const requieredFieldsMedioTrans = ["tipo_transporte", "licencia_conduccion"];
const requieredFieldsSalud = [
  "lentes",
  "acidente_laboral",
  "enfermedad",
  "tratamiento_medico",
  "tratamiento_psicologico",
  "tratamiento_psiquiatrico",
  "tratamiento_odontologico",
  "alerigia",
  "fractura",
  "cirugia",
  "sustencia_psicoactiva",
  "estatura",
  "peso",
  "afp_id",
  "eps_id",
];
const requiredFieldsInfoPersonal = [
  "dir_res",
  "cod_ban",
  "barrio",
  "cta_ban",
  "per_car",
  "gru_san",
  "fac_rhh",
  "est_soc",
  "est_civ",
  "nom1_emp",
  "ap1_emp",
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
const paises = ref([]);
const lista_sectores_economicos = ref([]);
const lista_bancos = ref([]);
const lista_etnia = ref([]);
const lista_estado_civil = ref([]);
const lista_afp = ref([]);
const lista_eps = ref([]);
const lista_nivel_academico = ref([]);
const lista_sector_academico = ref([]);
const lista_idiomas = ref([]);
const consulta_sector_academico = ref("");
const consulta_nivel_academico = ref("");
const consulta_banco = ref("");
const consulta_estado_civil = ref("");
const consulta_afp = ref("");
const consulta_eps = ref("");
const progress = ref(0);
const form = reactive({
  concepto: "",
  tipo_transporte: "",
  licencia_conduccion: "",
  descripcion_salud: "",
  afp_id: "",
  eps_id: "",
  peso: "",
  estatura: "",
  sustencia_psicoactiva: "",
  enfermedad: "",
  lentes: "",
  cirugia: "",
  alerigia: "",
  fractura: "",
  tratamiento_odontologico: "",
  tratamiento_psiquiatrico: "",
  tratamiento_psicologico: "",
  tratamiento_medico: "",
  acidente_laboral: "",
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
    {
      num_ref: 1,
      tip_ref: 1,
      parent: "",
      cel_ref: "",
      nom_ref: "",
      fecha_nacimiento: "",
    },
    {
      num_ref: 2,
      tip_ref: 1,
      parent: "",
      cel_ref: "",
      nom_ref: "",
      fecha_nacimiento: "",
    },
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

//funciones para calcular el porcentaje de la progress bar
const calculateProgress = () => {
  let completedInfoPersonal = 0;
  let completedExperience = 0;
  let completedInfoAcademi = 0;
  let completedInfoTrans = 0;
  let completedInfoSalud = 0;
  let completedInfoReferencias = 0;

  requiredFieldsInfoPersonal.forEach((field) => {
    if (form[field] && form[field].toString().trim() !== "") {
      completedInfoPersonal++;
    }
  });
  if (form.experiencias_laborales.length > 0) {
    requieredExperienceFields.forEach((field) => {
      if (
        form.experiencias_laborales[0][field] &&
        form.experiencias_laborales[0][field].toString().trim() !== ""
      ) {
        completedExperience++;
      }
    });
  }
  requieredFieldsInfoAcademi.forEach((field) => {
    if (form[field] && form[field].toString().trim() !== "") {
      completedInfoAcademi++;
    }
  });
  requieredFieldsMedioTrans.forEach((field) => {
    if (form[field] && form[field].toString().trim() !== "") {
      completedInfoTrans++;
    }
  });
  requieredFieldsSalud.forEach((field) => {
    if (form[field] && form[field].toString().trim() !== "") {
      completedInfoSalud++;
    }
  });
  requieredFieldsReferencias.forEach((field) => {
    if (
      form.referencias[0][field] &&
      form.referencias[0][field].toString().trim() !== ""
    ) {
      completedInfoReferencias++;
    }
  });

  const totalFieldsInfoPersonal =
    (completedInfoPersonal / requiredFieldsInfoPersonal.length) * 100;
  const totalFieldsExperiencias =
    (completedExperience / requieredExperienceFields.length) * 100;
  const totalFieldsInfoAcademic =
    (completedInfoAcademi / requieredFieldsInfoAcademi.length) * 100;
  const totalFieldsInforTrans =
    (completedInfoTrans / requieredFieldsMedioTrans.length) * 100;
  const totalFieldsInfoSalud =
    (completedInfoSalud / requieredFieldsSalud.length) * 100;
  const totalFieldsInfoReferencias =
    (completedInfoReferencias / requieredFieldsReferencias.length) * 100;

  progress.value =
    (totalFieldsExperiencias +
      totalFieldsInfoPersonal +
      totalFieldsInfoAcademic +
      totalFieldsInforTrans +
      totalFieldsInfoSalud +
      totalFieldsInfoReferencias) /
    6;
};

const remainingCharsConcepto = () => {
  return 0 + (form.concepto != null ? form.concepto.length || 0 : 0);
};
const remainingCharsCondicionesSalud = () => {
  return (
    0 +
    (form.descripcion_salud != null ? form.descripcion_salud.length || 0 : 0)
  );
};
const remainingCharsExperiencia = (index) => {
  return 0 + (form.experiencias_laborales[index]?.funciones.length || 0);
};

const llenarFormulario = async () => {
  loading.value = true;
  console.log(route.params.id);
  const id =
    userlogued.tipo_usuario_id == 3
      ? userlogued.id
      : route.params.id
      ? Number(route.params.id)
      : null;
  const response = await axios.get(
    `${URL_API}api/v1/formulariocandidato/${id}`,
    configHeader()
  );
  form.licencia_conduccion = response.data.licencia_conduccion;
  form.descripcion_salud = response.data.descripcion_salud;
  form.afp_id = response.data.afp_id;
  form.eps_id = response.data.eps_id;
  form.peso = response.data.peso;
  form.estatura = response.data.estatura;
  form.sustencia_psicoactiva = response.data.sustencia_psicoactiva;
  form.enfermedad = response.data.enfermedad;
  form.lentes = response.data.lentes;
  form.cirugia = response.data.cirugia;
  form.alerigia = response.data.alerigia;
  form.fractura = response.data.fractura;
  form.tratamiento_odontologico = response.data.tratamiento_odontologico;
  form.tratamiento_psiquiatrico = response.data.tratamiento_psiquiatrico;
  form.tratamiento_psicologico = response.data.tratamiento_psicologico;
  form.tratamiento_medico = response.data.tratamiento_medico;
  form.acidente_laboral = response.data.acidente_laboral;
  form.nom1_emp = response.data.primer_nombre;
  form.nom2_emp = response.data.segundo_nombre;
  form.cod_grupo = response.data.grupo_etnico_id;
  form.cod_emp = response.data.num_doc;
  form.ap1_emp = response.data.primer_apellido;
  form.ap2_emp = response.data.segundo_apellido;
  form.tip_ide = response.data.tip_doc_id;
  form.pai_exp = response.data.novasoft ? response.data.novasoft.pai_exp : "";
  form.dpt_exp = response.data.novasoft ? response.data.novasoft.dpt_exp : "";
  form.ciu_exp = response.data.novasoft ? response.data.novasoft.ciu_exp : "";
  form.cod_pai = response.data.novasoft ? response.data.novasoft.cod_pai : "";
  form.cod_dep = response.data.novasoft ? response.data.novasoft.cod_dep : "";
  form.cod_ciu = response.data.novasoft ? response.data.novasoft.cod_ciu : "";
  form.fec_nac = response.data.fecha_nacimiento;
  form.dir_res = response.data.direccion_residencia;
  form.fec_expdoc = response.data.fecha_expedicion;
  form.tel_res = response.data.telefono;
  form.tel_cel = response.data.celular;
  form.e_mail =
    userlogued.tipo_usuario_id == 3
      ? userlogued.email
      : response.data.novasoft
      ? response.data.novasoft.e_mail
      : "";
  form.pai_res = response.data.novasoft ? response.data.novasoft.pai_res : "";
  form.dpt_res = response.data.novasoft ? response.data.novasoft.dpt_res : "";
  form.ciu_res = response.data.novasoft ? response.data.novasoft.ciu_res : "";
  form.cod_ban = response.data.gen_banco_id;
  form.cta_ban = response.data.cuenta_bancaria;
  form.barrio = response.data.novasoft ? response.data.novasoft.barrio : "";
  form.Niv_aca = response.data.nivel_academico_id;
  form.sex_emp = response.data.genero_id;
  form.per_car = response.data.personas_cargo;
  form.gru_san = response.data.grupo_sanguineo;
  form.fac_rhh = response.data.factor_rh;
  form.raza = response.data.novasoft ? response.data.novasoft.raza : "";
  form.est_civ = response.data.novasoft ? response.data.novasoft.est_civ : "";
  form.est_soc = response.data.estrato;
  form.experiencias_laborales = response.data.experiencias_laborales;
  form.concepto = response.data.concepto;
  if (form.experiencias_laborales.length > 0) {
    form.experiencias_laborales.forEach((element) => {
      element["consulta_sector_economico"] = element.nombre;
      element["fecha_inicio"] = new Date(element.fecha_inicio)
        .toISOString()
        .substring(0, 7);
      element["fecha_fin"] = new Date(element.fecha_fin)
        .toISOString()
        .substring(0, 7);
    });
  }
  form.idiomas = response.data.idiomas;
  form.categoria_licencia = response.data.categoria_licencia;
  form.sector_academico_id = response.data.sector_academico_id;

  if (response.data.novasoft) {
    form.familiaresConsulta = JSON.parse(
      JSON.stringify(response.data.novasoft.familiares)
    );
    form.familiares =
      response.data.novasoft.familiares.length > 0
        ? response.data.novasoft.familiares
        : form.familiares;

    form.referencias =
      response.data.novasoft.referencias.length > 0
        ? response.data.novasoft.referencias
        : form.referencias;
  }

  consulta_sector_academico.value = response.data.sector_academico_nombre;
  consulta_nivel_academico.value = response.data.des_est;
  consulta_banco.value = response.data.nom_ban;
  consulta_estado_civil.value = response.data.novasoft
    ? response.data.novasoft.des_est
    : "";
  consulta_afp.value = response.data.afp_nombre;
  consulta_eps.value = response.data.eps_nombre;
  nom_tip_doc.value = response.data.des_tip;
  dep_res_name.value = response.data.novasoft
    ? response.data.novasoft.dep_res_nombre
    : "";
  dep_exp_name.value = response.data.novasoft
    ? response.data.novasoft.dep_exp_nombre
    : "";
  cod_dep_name.value = response.data.novasoft
    ? response.data.novasoft.dep_nac_nombre
    : "";
  pai_exp_name.value = response.data.novasoft
    ? response.data.novasoft.pais_exp_nombre
    : "";
  cod_pai_name.value = response.data.novasoft
    ? response.data.novasoft.pais_nac_nombre
    : "";
  pai_res_name.value = response.data.novasoft
    ? response.data.novasoft.pais_res_nombre
    : "";
  ciu_exp_name.value = response.data.novasoft
    ? response.data.novasoft.ciudad_exp_nombre
    : "";
  cod_ciu_name.value = response.data.novasoft
    ? response.data.novasoft.ciudad_nac_nombre
    : "";
  ciu_res_name.value = response.data.novasoft
    ? response.data.novasoft.ciudad_res_nombre
    : "";
  if (response.data.vehiculo_propio == 1) {
    form.tipo_transporte = 1;
  }
  if (response.data.transporte_publico == 1) {
    form.tipo_transporte = 2;
  }
  if (
    response.data.vehiculo_propio == 0 &&
    response.data.transporte_publico == 0
  ) {
    form.tipo_transporte = 3;
  }
  if (form.pai_exp != "") {
    getDepartamentos({ cod_pai: form.pai_exp }, 1);
  }
  if (form.cod_pai) {
    getDepartamentos({ cod_pai: form.cod_pai }, 2);
  }
  if (form.pai_res) {
    getDepartamentos({ cod_pai: form.pai_res }, 3);
  }
  loading.value = false;
};
//funcion para  guardar el formulario
const submitForm = async () => {
  loading.value = true;
  const id =
    userlogued.tipo_usuario_id == 3
      ? userlogued.id
      : route.params.id
      ? Number(route.params.id)
      : null;

  if (!validateInfoPersonal()) {
    showAlert("Debe llenar como mínimo la información personal", "error");
    loading.value = false;
    return;
  }
  try {
    if (form.tipo_transporte == 1) {
      form.vehiculo_propio = 1;
      form.transporte_publico = 0;
    } else if (form.tipo_transporte == 2) {
      form.vehiculo_propio = 0;
      form.transporte_publico = 1;
    } else if (form.tipo_transporte == 3) {
      form.vehiculo_propio = 0;
      form.transporte_publico = 0;
    }
    const response = await axios.put(
      `${URL_API}api/v1/recepcionEmpleadoseiya/${id}`,
      form,
      configHeader()
    );
    showAlert(response.data.message, response.data.status);
    console.log("Formulario enviado con éxito:", response.data);
  } catch (error) {
    showAlert("Error al enviar el formulario: intente nuevamente", "error");
    console.error("Error al enviar el formulario:", error);
  } finally {
    loading.value = false;
  }
};

//funciones para poner el formulario de forma dinámica
const deleteIdioma = async (index) => {
  if (form.idiomas[index].id) {
    loading.value = true;
    const id = form.idiomas[index].id;
    const response = await axios.delete(
      `${URL_API}api/v1/idiomacandidato/${id}`
    );
    showAlert(response.data.message, response.data.status);
    loading.value = false;
  }
  form.idiomas.splice(index, 1);
};

const validateInfoPersonal = () => {
  let llenos = true;
  requiredFieldsInfoPersonal.forEach((element) => {
    if (form[element] == "") llenos = false;
  });
  return llenos;
};

const addIdioma = () => {
  form.idiomas.push({
    nombre: "",
    idioma_id: "",
    nivel: "",
  });
};

const deleteExperiencia = async (index) => {
  if (form.experiencias_laborales[index].id) {
    loading.value = true;
    const id = form.experiencias_laborales[index].id;
    const response = await axios.delete(
      `${URL_API}api/v1/experiencialaboralcanidato/${id}`
    );
    showAlert(response.data.message, response.data.status);
    loading.value = false;
  }
  form.experiencias_laborales.splice(index, 1);
};

const addExperienciaLaboral = () => {
  form.experiencias_laborales.push({
    funciones: "",
    empresa: "",
    cargo: "",
    sector_econimico_id: "",
    consulta_sector_economico: "",
    motivo_retiro: "",
    fecha_inicio: "",
    fecha_fin: "",
  });
};

/* const deleteHijo = (index) => {
  if (form.familiares[index].cod_emp) {
    return;
  }
  form.familiares.splice(index, 1);
}; */

/* const addHijo = () => {
  form.familiares.push({
    ap1_fam: "",
    ap2_fam: "",
    nom_fam: "",
    tip_fam: 2,
    fec_nac: "",
    ocu_fam: 7,
  });
}; */

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

//funciones para el formateo de la fecha
/* const formattedDate = (date) => {
  if (!date) return "";
  return date.split(" ")[0];
}; */

/* const updateFecha = (event, familiar) => {
  const fecha = event.target.value;
  familiar.fec_nac = fecha;
}; */

// Funciones para seleccionar opciones
const selectEps = async (item) => {
  if (item != null) {
    consulta_eps.value = item.nombre;
    form.eps_id = item.id;
  }
  const response = await axios.get(URL_API + "api/v1/eps", configHeader());
  lista_eps.value = response.data;
};

const selectEtnia = async (item) => {
  if (item != null) {
    form.raza = item.descripcion;
    form.cod_grupo = item.cod_grupo;
  }
  const response = await axios.get(`${URL_API}api/v1/grupoEtnicoEmpleado`);
  lista_etnia.value = response.data;
};

const selectEstadoCivil = async (item) => {
  if (item != null) {
    consulta_estado_civil.value = item.des_est;
    form.est_civ = item.cod_est;
  }
  const response = await axios.get(`${URL_API}api/v1/estadocivil`);
  lista_estado_civil.value = response.data;
};

const selectAcademico = async (item) => {
  if (item != null) {
    consulta_nivel_academico.value = item.des_est;
    form.Niv_aca = item.tip_est;
  }
  const response = await axios.get(
    `${URL_API}api/v1/nivelAcademicoFormEmpleado`
  );
  lista_nivel_academico.value = response.data;
};

const selectBanco = async (item) => {
  if (item != null) {
    consulta_banco.value = item.nom_ban;
    form.cod_ban = item.cod_ban;
  }
  const response = await axios.get(`${URL_API}api/v1/bancosFormularioEmpleado`);
  lista_bancos.value = response.data;
};

const getAFP = async (item = null) => {
  if (item != null) {
    consulta_afp.value = item.nombre;
    form.afp_id = item.id;
  }
  const response = await axios.get(URL_API + "api/v1/afp", configHeader());
  lista_afp.value = response.data;
};

const getSectorAcademico = async (item = null) => {
  if (item != null) {
    consulta_sector_academico.value = item.nombre;
    form.sector_academico_id = item.id;
  }
  const response = await axios.get(
    URL_API + "api/v1/sectoracademico",
    configHeader()
  );
  lista_sector_academico.value = response.data;
};

const getIdioma = async (item = null, index) => {
  if (item != null) {
    form.idiomas[index].nombre = item.nombre;
    form.idiomas[index].idioma_id = item.id;
  }
  const response = await axios.get(URL_API + "api/v1/idiomas", configHeader());
  lista_idiomas.value = response.data;
};

const getSectorEconomico = async (item = null, index) => {
  if (item != null) {
    form.experiencias_laborales[index].consulta_sector_economico = item.nombre;
    form.experiencias_laborales[index].sector_econimico_id = item.id;
  }
  const response = await axios.get(
    URL_API + "api/v1/sectoreconomicocandidato",
    configHeader()
  );
  lista_sectores_economicos.value = response.data;
};

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
        form.pai_exp = item.cod_pai;
        form.dpt_exp = item.cod_dep;
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
        form.ciu_exp = "";
        ciu_exp_name.value = "";
        getCiudades(item, index);
        break;
      case 2:
        form.cod_dep = item.cod_dep;
        cod_dep_name.value = item.nom_dep;
        form.cod_ciu = "";
        cod_ciu_name.value = "";
        getCiudades(item, index);
        break;
      case 3:
        form.dpt_res = item.cod_dep;
        dep_res_name.value = item.nom_dep;
        form.ciu_res = "";
        ciu_res_name.value = "";
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

const getDepartamentos = async (item, index) => {
  const response = await axios.get(
    `${URL_API}api/v1/departamentosFormularioEmpleado/${item.cod_pai}`
  );
  consulta_departamentos[index] = response.data;
};

const getPaises = (item = null, index = null) => {
  if (item != null) {
    switch (index) {
      case 1:
        form.pai_exp = item.cod_pai;
        pai_exp_name.value = item.nom_pai;
        form.dpt_exp = "";
        form.ciu_exp = "";
        dep_exp_name.value = "";
        ciu_exp_name.value = "";
        getDepartamentos(item, index);
        break;
      case 2:
        form.cod_pai = item.cod_pai;
        cod_pai_name.value = item.nom_pai;
        form.cod_dep = "";
        form.cod_ciu = "";
        cod_dep_name.value = "";
        cod_ciu_name.value = "";
        getDepartamentos(item, index);
        break;
      case 3:
        form.pai_res = item.cod_pai;
        pai_res_name.value = item.nom_pai;
        form.dpt_res = "";
        form.ciu_res = "";
        ciu_res_name.value = "";
        dep_res_name.value = "";
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

//funciones para el scroll desde el menu lateral
const scrollToInformacionPersonal = () => {
  if (informacionPersonalRef.value) {
    informacion_personal.value = true;
    ocultarSecciones("informacion_personal");
    setTimeout(() => {
      informacionPersonalRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
};

const scrollToExperiencia = () => {
  if (experienciaLaboralRef.value) {
    experiencia_laboral.value = true;
    ocultarSecciones("experiencia_laboral");
    setTimeout(() => {
      experienciaLaboralRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
};

const scrollToInformacionAcademica = () => {
  if (informacionAcademicaRef.value) {
    info_academica.value = true;
    ocultarSecciones("info_academica");
    setTimeout(() => {
      informacionAcademicaRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
};

const scrollToInMedioTrasnporte = () => {
  if (medioTransporteRef.value) {
    medio_transporte.value = true;
    ocultarSecciones("medio_transporte");
    setTimeout(() => {
      medioTransporteRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
};
const scrollToInCondicionesSalud = () => {
  if (condicionesSaludRef.value) {
    condiciones_salud.value = true;
    ocultarSecciones("condiciones_salud");
    setTimeout(() => {
      condicionesSaludRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
};
const scrollToInReferenciasPersonales = () => {
  if (referenciasPersonalesRef.value) {
    referencias_personales.value = true;
    ocultarSecciones("referencias_personales");
    setTimeout(() => {
      referenciasPersonalesRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
};

/* const scrollToInHijos = () => {
  if (hijosRef.value) {
    hijos_info.value = true;
    ocultarSecciones("hijos_info");
    setTimeout(() => {
      hijosRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
}; */
const ocultarSecciones = (seccion) => {
  seccion == "informacion_personal"
    ? (informacion_personal.value = true)
    : (informacion_personal.value = false);
  seccion == "condiciones_salud"
    ? (condiciones_salud.value = true)
    : (condiciones_salud.value = false);
  seccion == "medio_transporte"
    ? (medio_transporte.value = true)
    : (medio_transporte.value = false);
  seccion == "referencias_personales"
    ? (referencias_personales.value = true)
    : (referencias_personales.value = false);
  seccion == "hijos_info"
    ? (hijos_info.value = true)
    : (hijos_info.value = false);
  seccion == "info_academica"
    ? (info_academica.value = true)
    : (info_academica.value = false);
  seccion == "experiencia_laboral"
    ? (experiencia_laboral.value = true)
    : (experiencia_laboral.value = false);
};

//cliclo de vida
onMounted(() => {
  llenarFormulario();
});
</script>

<style scoped>
.todoProgressContainer {
  display: flex;
  flex-direction: column;
}
.textProgressContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
  height: 100%;
  width: 100%;
}
.progress-container {
  width: 100%;
  height: 0.5em; /* Altura del contenedor */
  background-color: #ffffff;
  border: #006b3f solid 1px;
  border-radius: 10px;
  margin: 20px auto;
  position: sticky;
  display: flex;
  /* Para que la barra crezca desde abajo */
}

.progress-bar {
  height: 0.5em;
  background: linear-gradient(0deg, #006b3f 0%, #137294 51%, #1a9438 100%);
  border-radius: 10px;
  transition: height 0.5s ease-in-out;
  position: absolute;
  top: 0; /* Cambiado de bottom: 0 */
  bottom: auto; /* Asegura que no quede fijo en la parte inferior */
}
.progress-text {
  position: absolute;
  left: 50%;
  top: 50%;
  white-space: nowrap;
  color: rgb(119, 119, 119);
  font-weight: bold;
  font-size: 0.8rem;
}
.progress-text-half {
  color: rgb(255, 255, 255);
}
.horizontalText {
  color: rgb(32, 32, 32);
  position: relative;
  left: 0%;
  top: 0%;
  cursor: pointer;
  font-size: 1rem;

  width: 7em;
  text-align: center;
  border-radius: 5px;
  padding: 0.2em;

  background-color: #ffffff;
  z-index: 100;
  font-weight: normal;
}
.activeLink {
  color: #006b3f;
  border: #006b3f 1px solid;
}
.horizontalText:hover {
  color: #006b3f;
  border: #006b3f 1px solid;
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
  width: 20%;
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
  color: #237db0;
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
  flex-direction: column;
  gap: 2em;
}
.textAreaRow {
  width: 100%;
}
</style>

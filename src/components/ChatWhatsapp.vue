<!-- <template>
   <div>
     <div class="header">
        <div class="titulo"></div>

     </div>
   </div>
</template>
<script>
export default {
   name: '',
   components: {
     
   },
   mixins: [],
   props: {
     
   },
   data() {
     return {
       
     }
   },
   computed: {
     
   },
   watch: {
     
   },
   mounted() {
     
   },
   methods: {
     
   }
};
</script>
<style lang='' scoped>
</style> -->
<template>
  <div class="container">
    <div class="row">
      <ul class="nav nav-tabs mb-2">
        <li class="nav-item">
          <a :class="['nav-link', { active: campos }]"
            :style="{ backgroundColor: campos ? '#148F77' : '', color: campos ? 'white' : 'black' }"
            @click="campos = true, atributos = false, prev = false">Campos</a>
        </li>
        <li class="nav-item">
          <a :class="['nav-link', { active: atributos }]"
            :style="{ backgroundColor: atributos ? '#148F77' : '', color: atributos ? 'white' : 'black' }"
            @click="campos = false, atributos = true, prev = false">Atributos</a>
        </li>
        <li class="nav-item">
          <a :class="['nav-link', { active: prev }]"
            :style="{ backgroundColor: prev ? '#148F77' : '', color: prev ? 'white' : 'black' }"
            @click="prev = true, campos = false, atributos = false">Previsualización</a>
        </li>
      </ul>
      <div class="col-2" v-if="campos">
        <div class="form-container column" style="text-align:left">
          <h4>Campos Arrastrables</h4>
          <div v-for="(item, index) in formItems" :key="index" class="form-item" draggable="true"
            @dragstart="dragStart(index)" style="width: 100%;">
            Campo tipo {{ item.label }}
            <!-- <button @click="removeItem(index)" type="button" class="btn btn-success btn-sm">Eliminar</button> -->
          </div>
        </div>
      </div>
      <div class="col-2" v-if="atributos">
        <div class="form-container column" style="text-align:left">
          <span>Nombre del campo</span>
          <input type="text" name="" id="">
          <div class="form-check form-switch mt-3">
            <input class="form-check-input" v-model="placeholder" type="checkbox" role="switch"
              id="flexSwitchCheckChecked">
            <label class="form-check-label" for="flexSwitchCheckChecked">Placeholder</label>
          </div>
          <span v-if="placeholder">Nombre del placeholder</span>
          <input type="text" name="" id="" v-if="placeholder">
          <div class="form-check form-switch mt-3">
            <input class="form-check-input" v-model="obligatorio" type="checkbox" role="switch"
              id="flexSwitchCheckChecked">
            <label class="form-check-label" for="flexSwitchCheckChecked">Campo obligatorio</label>
          </div>
          <div class="form-check form-switch mt-3">
            <input class="form-check-input" v-model="deshabilitado" type="checkbox" role="switch"
              id="flexSwitchCheckChecked">
            <label class="form-check-label" for="flexSwitchCheckChecked">Campo deshabilitado</label>
          </div>
        </div>
      </div>
      <div class="col-5" v-if="!prev">
        <div class="column" @dragover.prevent @drop="dropLeft">
          <h4>Arrastrar campo aquí</h4>
          <div v-for="(field, index) in formFields" :key="index" class="form-field" @click="editLabel(field, index)">
            <label :class="{ disabled: field.disabled }">{{ field.customLabel
              }}</label>
            <input v-if="field.editing && field.type !== 'select'" v-model="field.customLabel"
              @blur="field.editing = false" @keydown.enter.prevent="field.editing = false" required>
            <input
              v-else-if="field.type === 'text' || field.type === 'number' || field.type === 'email' || field.type === 'date' || field.type === 'datetime-local'"
              :type="field.type" :name="field.name" :placeholder="field.placeholder" :required="field.required"
              :disabled="field.disabled" readonly @click="enableEditing(field)">
            <select v-else :name="field.name" :required="field.required" :disabled="field.disabled"
              @focus="field.editing = true">
              <option v-for="(option, optionIndex) in field.options" :key="optionIndex">{{ option }}</option>
            </select>
            <!-- <input type="checkbox" v-model="field.required"> Obligatorio
            <input type="checkbox" v-model="field.disabled"> Deshabilitado -->
            <button @click="removeField(index)" class="btn"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>
      <div class="col-5" v-if="!prev">
        <div class="column" @dragover.prevent @drop="dropRight">
          <h4>Arrastrar campo aquí</h4>
          <div v-for="(field, index) in formFieldsRight" :key="index" class="form-field">
            <label @click="editLabel(field, index)" :class="{ disabled: field.disabled }">{{ field.customLabel
              }}</label>
            <input v-if="field.editing && field.type !== 'select'" v-model="field.customLabel"
              @blur="field.editing = false" @keydown.enter.prevent="field.editing = false" required>
            <input
              v-else-if="field.type === 'text' || field.type === 'number' || field.type === 'email' || field.type === 'date' || field.type === 'datetime-local'"
              :type="field.type" :name="field.name" :placeholder="field.placeholder" :required="field.required"
              :disabled="field.disabled" readonly @click="enableEditing(field)">
            <select v-else :name="field.name" :required="field.required" :disabled="field.disabled"
              @focus="field.editing = true">
              <option v-for="(option, optionIndex) in field.options" :key="optionIndex">{{ option }}</option>
            </select>
            <!-- <input type="checkbox" v-model="field.required"> Obligatorio
            <input type="checkbox" v-model="field.disabled"> Deshabilitado -->
            <button @click="removeFieldRight(index)" class="btn"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>
    </div>






    <form class="was-validated" v-if="prev" @submit.prevent="save()">
      <!-- <h6 class="tituloseccion">Información general</h6> -->
      <div id="seccion">
        <div class="row">
          <div class="col-6 mb-6" v-for="item, index in formFields" :key="index">
            <label for="exampleInputEmail1" style="float:left" class="form-label">{{ item.customLabel }}</label>
            <input type="text" class="form-control form-control-sm" autocomplete="off" id="exampleInputEmail2"
              aria-describedby="emailHelp" v-model="valores1[index]" :required="item.required"
              :disabled="item.disabled" />
          </div>
          <!-- </div>
        <div class="row"> -->
          <div class="col-6 mb-6" v-for="item, index2 in formFieldsRight" :key="index2">
            <label for="exampleInputEmail1" style="float:left" class="form-label">{{ item.customLabel }}</label>
            <input type="text" class="form-control form-control-sm" autocomplete="off" id="exampleInputEmail2"
              aria-describedby="emailHelp" v-model="valores2[index2]" :required="item.required"
              :disabled="item.disabled" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItems: [
        { label: 'Texto', type: 'text', name: 'text', placeholder: 'Ingrese texto' },
        { label: 'Número', type: 'number', name: 'number', placeholder: 'Ingrese número' },
        { label: 'Email', type: 'email', name: 'email', placeholder: 'Ingrese email' },
        { label: 'Fecha', type: 'date', name: 'date', placeholder: 'Seleccione fecha' },
        { label: 'Fecha y Hora', type: 'datetime-local', name: 'datetime', placeholder: 'Seleccione fecha y hora' },
        { label: 'Lista', type: 'select', name: 'select', options: ['Opción 1', 'Opción 2', 'Opción 3'] }
      ],
      formFields: [],
      formFieldsRight: [],
      columna1: [],
      columna2: [],
      valores1: [],
      valores2: [],
      editcolumna1: false,
      editcolumna2: false,
      placeholder: '',
      obligatorio: false,
      deshabilitado: false,
      campos: true,
      atributos: false,
      prev: false
    };
  },
  watch: {
    formFields(newFields) {
      this.columna1 = newFields;
      console.log(newFields)
    },
    formFieldsRight(newFieldsRight) {
      this.columna2 = newFieldsRight;
      console.log(newFieldsRight)
    }
  },
  methods: {
    dragStart(index) {
      this.draggedItem = this.formItems[index];
    },
    dragStartField(index) {
      this.draggedField = { ...this.formFields[index] };
    },
    dragStartFieldRight(index) {
      this.draggedField = { ...this.formFieldsRight[index] };
    },
    dropLeft() {
      if (this.draggedItem) {
        this.formFields.push({ ...this.draggedItem, customLabel: this.draggedItem.label, editing: false, required: false, disabled: false });
        this.draggedItem = null;
      }
      if (this.draggedField) {
        this.formFields.push(this.draggedField);
        this.draggedField = null;
      }
    },
    dropRight(event) {
      event.preventDefault();
      if (this.draggedItem) {
        this.formFieldsRight.push({ ...this.draggedItem, customLabel: this.draggedItem.label, editing: false, required: false, disabled: false });
        this.draggedItem = null;
      }
      if (this.draggedField) {
        this.formFieldsRight.push(this.draggedField);
        this.draggedField = null;
      }
    },
    removeItem(index) {
      this.formItems.splice(index, 1);
    },
    removeField(index) {
      this.formFields.splice(index, 1);
    },
    removeFieldRight(index) {
      this.formFieldsRight.splice(index, 1);
    },
    editLabel(field, index) {
      console.log(index)
      // Deshabilitar edición si el campo está deshabilitado
      if (!field.disabled) {
        // Habilitar edición del label y deshabilitar edición en otros campos
        this.formFields.forEach((item, i) => {
          if (i !== index) {
            item.editing = false;
          }
        });
        this.formFieldsRight.forEach((item, i) => {
          if (i !== index) {
            item.editing = false;
          }
        });
        field.editing = true;
      }
    },
    enableEditing(field) {
      // Habilitar edición del label al hacer clic en el campo de tipo texto o lista
      if ((field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'date' || field.type === 'datetime-local' || field.type === 'select') && !field.disabled) {
        field.editing = true;
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  margin-bottom: 20px;
}

.container {
  min-width: 90%;
  margin-top: 30px;
}

.form-item {
  padding: 10px;
  margin: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.form-field {
  padding: 10px;
  margin: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.column {
  width: 100%;
  float: left;
  padding: 20px;
  background-color: rgb(216, 223, 217);
}

.column h4 {
  margin-bottom: 10px;
}

.disabled {
  color: #b8b3b3;
}

.nav-item {
  cursor: pointer;
}

.nav-link {
  color: black;
}
</style>
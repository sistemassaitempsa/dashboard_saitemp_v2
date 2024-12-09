<template>
  <div v-if="editor" class="tiptap">
    <div class="control-group">
      <div
        class="btn-group btn-group-lg"
        role="group"
        aria-label="Basic example"
      >
        <div class="dropdown btn-group-lg">
          <button
            class="btn dropdown-toggle drop"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Tamaño texto
          </button>
          <ul class="dropdown-menu">
            <li v-for="(item, index) in tamano_texto" :key="item">
              <a class="dropdown-item" @click="ejecutarFuncion(item.funcion)"
                ><span
                  :style="'font-size:' + item.tamano + 'px'"
                  v-if="index > 0"
                  >h{{ index }}</span
                ><span :style="'font-size:' + item.tamano + 'px'" v-else
                  >Tamaño por defecto</span
                >
              </a>
            </li>
          </ul>
        </div>
        <button
          type="button"
          class="btn"
          v-for="(item, index) in botones"
          :key="index"
          @click="ejecutarFuncion(item.funcion)"
        >
          <span v-html="item.icono"></span>
        </button>
        <button class="color-picker-icon" type="button" @click="triggerColorPicker">
          <i style="color: white; font-size: 1.2rem" class="bi bi-pencil"></i>
        </button>
        <input
          ref="colorPicker"
          type="color"
          v-model="color"
          @input="setColor"
          class="hidden-color-picker"
        />
      </div>
      <!-- <div class="button-group">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <i class="bi bi-type-bold"></i>
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <i class="bi bi-type-italic"></i>
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <i class="bi bi-type-strikethrough"></i>
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          <i class="bi bi-textarea-t"></i>
        </button>
        <button @click="editor.chain().focus().unsetAllMarks().run()">
          Clear marks
        </button>
        <button @click="editor.chain().focus().clearNodes().run()">
          Clear nodes
        </button>
        <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          Paragraph
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          H3
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
          H4
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
          H5
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        >
          H6
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <i class="bi bi-list-ul"></i>
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <i class="bi bi-list-ol"></i>
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          Code block
        </button>
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          Blockquote
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
          <i class="bi bi-arrow-bar-down"></i>
        </button>
        <button @click="editor.chain().focus().setHardBreak().run()">
          Hard break
        </button>
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
        >
          <i class="bi bi-arrow-counterclockwise"></i>
        </button>
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
        >
          <i class="bi bi-arrow-clockwise"></i>
        </button>
        <button @click="editor.chain().focus().setTextAlign('left').run()">
          Left
        </button>
        <button @click="editor.chain().focus().setTextAlign('center').run()">
          Center
        </button>
        <button @click="editor.chain().focus().setTextAlign('right').run()">
          Right
        </button>
        <button @click="editor.chain().focus().setTextAlign('justify').run()">
          Justify
        </button>
        <button @click="editor.chain().focus().unsetTextAlign().run()">
          Unset text align
        </button>
      </div> -->
    </div>
    <editor-content :editor="editor" class="editor" />
  </div>
</template>

<script>
// import StarterKit from "@tiptap/starter-kit";
// import { Editor, EditorContent } from "@tiptap/vue-3";
// import TextAlign from "@tiptap/extension-text-align";
// import Document from "@tiptap/extension-document";
// import Heading from "@tiptap/extension-heading";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// import { Color } from "@tiptap/extension-color";
// import TextStyle from "@tiptap/extension-text-style";
// import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import TextAlign from "@tiptap/extension-text-align"; // Personalizada
import { Color } from "@tiptap/extension-color"; // Personalizada
import TextStyle from "@tiptap/extension-text-style"; // Personalizada
import Highlight from "@tiptap/extension-highlight"; // Personalizada

export default {
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: [String, null],
      required: true,
    },
  },

  data() {
    return {
      editor: null,
      color: "#000000",
      tamano_texto: [
        {
          tamano: "12",
          funcion: () =>
            this.editor.chain().focus().toggleHeading({ level: 6 }).run(),
        },
        {
          tamano: "32",
          funcion: () =>
            this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
          tamano: "24",
          funcion: () =>
            this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
          tamano: "20.8",
          funcion: () =>
            this.editor.chain().focus().toggleHeading({ level: 3 }).run(),
        },
        {
          tamano: "16",
          funcion: () =>
            this.editor.chain().focus().toggleHeading({ level: 4 }).run(),
        },
        {
          tamano: "13.28",
          funcion: () =>
            this.editor.chain().focus().toggleHeading({ level: 5 }).run(),
        },
        {
          tamano: "10.72",
          funcion: () =>
            this.editor.chain().focus().toggleHeading({ level: 6 }).run(),
        },
      ],
      botones: [
        {
          icono: '<i class="bi bi-arrow-repeat"></i>',
          funcion: () => this.editor.chain().focus().clearNodes().run(),
        },
        {
          icono: ' <i class="bi bi-type-bold"></i>',
          funcion: () => this.editor.chain().focus().toggleBold().run(),
        },
        {
          icono: '  <i class="bi bi-type-italic"></i>',
          funcion: () => this.editor.chain().focus().toggleItalic().run(),
        },
        {
          icono: '  <i class="bi bi-type-strikethrough"></i>',
          funcion: () => this.editor.chain().focus().toggleStrike().run(),
        },
        {
          icono: '    <i class="bi bi-textarea-t"></i>',
          funcion: () => this.editor.chain().focus().toggleCode().run(),
        },
        {
          icono: '  <i class="bi bi-list-ul"></i>',
          funcion: () => this.editor.chain().focus().toggleBulletList().run(),
        },
        {
          icono: ' <i class="bi bi-list-ol"></i>',
          funcion: () => this.editor.chain().focus().toggleOrderedList().run(),
        },
        {
          icono: '  <i class="bi bi-arrow-bar-down"></i>',
          funcion: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          icono: '  <i class="bi bi-arrow-return-right"></i>',
          funcion: () => this.editor.chain().focus().setHardBreak().run(),
        },
        {
          icono: '   <i class="bi bi-arrow-counterclockwise"></i>',
          funcion: () => this.editor.chain().focus().undo().run(),
        },
        {
          icono: '   <i class="bi bi-arrow-clockwise"></i>',
          funcion: () => this.editor.chain().focus().redo().run(),
        },
        {
          icono: '  <i class="bi bi-justify-left"></i>',
          funcion: () => this.editor.chain().focus().setTextAlign("left").run(),
        },
        {
          icono: '   <i class="bi bi-text-center"></i>',
          funcion: () =>
            this.editor.chain().focus().setTextAlign("center").run(),
        },
        {
          icono: '   <i class="bi bi-justify"></i>',
          funcion: () =>
            this.editor.chain().focus().setTextAlign("justify").run(),
        },
      ],
    };
  },

  // mounted() {
  //   this.editor = new Editor({
  //     extensions: [
  //       StarterKit,
  //       Document,
  //       Paragraph,
  //       Text,
  //       Heading,
  //       Color,
  //       TextStyle,
  //       Highlight,
  //       TextAlign.configure({
  //         types: ["heading", "paragraph"],
  //         defaultAlignment: "left",
  //       }),
  //     ],
  //     content: this.modelValue,
  //     onUpdate: ({ editor }) => {
  //       this.$emit("update:modelValue", editor.getHTML());
  //     },
  //   });
  // },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit, // Esto incluye Document, Paragraph, Text, Heading
        Color, // Extensión personalizada
        TextStyle, // Extensión personalizada
        Highlight, // Extensión personalizada
        TextAlign.configure({
          types: ["heading", "paragraph"],
          defaultAlignment: "left",
        }),
      ],
      content: this.modelValue,
      onUpdate: ({ editor }) => {
        this.$emit("update:modelValue", editor.getHTML());
      },
    });
  },

  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  },

  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        if (this.editor && newValue !== this.editor.getHTML()) {
          this.editor.commands.setContent(newValue); // Sincroniza el contenido del editor
        }
      },
    },
    editor: {
      handler(newValue) {
        if (newValue) {
          this.color =
            this.editor.getAttributes("textStyle").color || "#000000";
        }
      },
      immediate: true,
    },
  },

  methods: {
    ejecutarFuncion(funcion) {
      if (typeof funcion === "function") {
        funcion();
      } else {
        console.error("La función proporcionada no es válida.");
      }
    },
    setColor(event) {
      const newColor = event.target.value;
      this.editor.chain().focus().setColor(newColor).run();
    },
    triggerColorPicker() {
      this.$refs.colorPicker.click(); // Activa el input de color oculto
    },
  },
};
</script>

<style scoped>
/* Basic editor styles */
/*  */
.tiptap .control-group {
  /* background-color: red; */
  /* padding: 10px; */
  border: 1px solid gray;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0px;
  margin: 0px;
  background-color: #074c6a;
  /* overflow-x: auto; */
  width: 100%;
}

.tiptap .control-group {
  border-bottom: none;
}

.editor :deep(.ProseMirror){
  border: 1px solid gray;
  height: 300px;
  margin-bottom: 30px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  outline: none;
  width: 100%;
  overflow: hidden;
}

.control-group {
  padding: 10px;
}

.drop {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.btn {
  outline: none;
  color: white;
}

.btn:hover {
  color: #22c260;
}

a {
  cursor: pointer;
}

/* Estilo para el botón del dropdown */
.dropdown-toggle:active,
.dropdown-toggle:focus {
  background-color: transparent; /* O el color que prefieras */
  color: white; /* Mantén el color del texto */
  box-shadow: none; /* Elimina sombras */
  outline: none; /* Elimina el contorno */
  border: none; /* Si aún hay bordes */
}

/* Oculta el input de color */
.hidden-color-picker {
  display: none;
}

/* Estiliza el botón con el icono */
.color-picker-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;
}

.color-picker-icon:hover {
  color: #007bff; /* Cambia el color al pasar el mouse */
}
</style>

<template>
  <div v-if="editor" class="tiptap">
    <div class="control-group">
      <div class="btn-group" role="group" aria-label="Formatting tools">
        <div class="dropdown">
          <button
            class="btn dropdown-toggle drop"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="d-none d-sm-inline">Tamaño texto</span>
            <span class="d-sm-none">Tamaño</span>
          </button>
          <ul class="dropdown-menu">
            <!-- ... mismo contenido del dropdown ... -->
          </ul>
        </div>
        <div class="toolbar-buttons">
          <button
            type="button"
            class="btn"
            v-for="(item, index) in botones"
            :key="index"
            @click="ejecutarFuncion(item.funcion)"
          >
            <span v-html="item.icono"></span>
          </button>
          <button
            class="color-picker-icon btn"
            type="button"
            @click="triggerColorPicker"
          >
            <i class="bi bi-pencil"></i>
          </button>
          <input
            ref="colorPicker"
            type="color"
            v-model="color"
            @input="setColor"
            class="hidden-color-picker"
          />
        </div>
      </div>
    </div>
    <editor-content :editor="editor" class="editor" />
  </div>
</template>

<script>
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
      required: false,
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
.tiptap {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.control-group {
  padding: 0.5rem;
  background-color: #074c6a;
  border: 1px solid gray;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}

.dropdown-toggle {
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  white-space: nowrap;
}

.toolbar-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.btn {
  padding: 0.5rem;
  min-width: 2.5rem;
  font-size: 1rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor :deep(.ProseMirror) {
  min-height: 200px;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.5;
}

.color-picker-icon i {
  font-size: 1rem;
}

.dropdown-menu {
  max-height: 300px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .btn {
    padding: 0.4rem;
    min-width: 2.2rem;
    font-size: 0.9rem;
  }

  .dropdown-toggle {
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
  }

  .editor :deep(.ProseMirror) {
    min-height: 150px;
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .btn {
    padding: 0.3rem;
    min-width: 2rem;
    font-size: 0.8rem;
  }

  .dropdown-menu li a {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }

  .editor :deep(.ProseMirror) {
    font-size: 0.9rem;
  }

  .color-picker-icon i {
    font-size: 0.9rem;
  }
}

/* Mantener otros estilos anteriores */
.hidden-color-picker {
  display: none;
}

.btn:hover {
  color: #22c260;
}

.dropdown-toggle:focus {
  box-shadow: none;
}
</style>

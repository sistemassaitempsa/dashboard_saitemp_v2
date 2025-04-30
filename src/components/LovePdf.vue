<template>
  <div class="pdf-reorder-container">
    <input
      type="file"
      @change="handleFileUpload"
      accept="application/pdf"
      multiple
    />

    <div v-if="loading" class="loading">Cargando PDF...</div>

    <div v-if="pages.length" class="controls">
      <button @click="saveOrder">Guardar nuevo orden</button>
    </div>

    <div class="pages-container">
      <draggable
        v-model="pages"
        item-key="index"
        @start="dragging = true"
        @end="dragging = false"
        class="drag-container"
      >
        <template #item="{ element, index }">
          <div class="page-item" :class="{ dragging: dragging }">
            <div class="page-number">{{ index + 1 }}</div>
            <img
              :src="element.thumbnail"
              :alt="`Página ${index + 1}`"
              class="page-thumbnail"
            />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PDFDocument } from "pdf-lib";
import draggable from "vuedraggable";
import * as pdfjs from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const loading = ref(false);
const pages = ref([]);
const dragging = ref(false);
const originalPdf = ref(null);
const files = ref([]);

const handleFileUpload = async (event) => {
  /* const file = event.target.files[0]; */
  files.value = event.target.files;
  if (files.value.length < 1) return;
  loading.value = true;
  pages.value = [];
  const thumbnails = [];
  try {
    let pageControl = 0;
    for (let j = 1; j <= files.value.length; j++) {
      const file = files.value[j - 1];
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      originalPdf.value = arrayBuffer;
      for (let i = 1; i <= pdf.numPages; i++) {
        pageControl++;
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;
        thumbnails.push({
          thumbnail: canvas.toDataURL(),
          pageNumber: pageControl,
        });
      }
    }

    pages.value = thumbnails;
    console.log(pages.value);
  } catch (error) {
    console.error("Error al procesar PDF:", error);
  } finally {
    loading.value = false;
  }
};

const saveOrder = async () => {
  try {
    const pdfDoc = await PDFDocument.load(originalPdf.value);
    const newPdfDoc = await PDFDocument.create();

    // Reordenar páginas según el orden actual
    const newOrder = pages.value.map((_, index) => index);
    const copiedPages = await newPdfDoc.copyPages(pdfDoc, newOrder);
    copiedPages.forEach((page) => newPdfDoc.addPage(page));

    const modifiedPdf = await newPdfDoc.save();

    // Enviar al backend (ejemplo con fetch)
    const formData = new FormData();
    const blob = new Blob([modifiedPdf], { type: "application/pdf" });
    formData.append("pdf", blob, "reordered.pdf");
    formData.append("pageOrder", JSON.stringify(newOrder));

    const response = await fetch("/api/reorder-pdf", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al guardar");

    alert("Orden guardado exitosamente!");
  } catch (error) {
    console.error("Error al guardar el orden:", error);
    alert("Error al guardar el orden");
  }
};
</script>

<style scoped>
.pdf-reorder-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

input[type="file"] {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.drag-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1em;
}
.pages-container {
  gap: 3em;
  margin-top: 20px;
  justify-content: space-evenly;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
}

.page-item {
  position: relative;
  /*   border: 2px solid #a3a3a3; */
  box-shadow: 0 4px 8px rgba(192, 192, 192, 0.5);
  border-radius: 4px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: move;
  margin: 0;
  width: 200px;
  min-width: 200px;
  display: inline-block;

  padding: 1em;
}

.page-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.page-item.dragging {
  opacity: 0.5;
}

.page-thumbnail {
  max-width: 200px;
  height: auto;
  box-shadow: 0 4px 8px rgba(192, 192, 192, 0.5);
  border-radius: 5px;
}

.page-number {
  position: absolute;
  top: 5px;
  left: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 12px;
}

.loading {
  padding: 20px;
  text-align: center;
  font-size: 1.2em;
  color: #666;
}

.controls {
  margin: 20px 0;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #0056b3;
}
</style>

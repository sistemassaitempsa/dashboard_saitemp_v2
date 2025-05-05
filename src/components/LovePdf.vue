<template>
  <div class="pdf-reorder-container">
    <div class="pdfs-container">
      <div class="view-files">
        <div class="title-container">
          <h3>Ordenar PDF</h3>
        </div>
        <div class="input-container">
          <input
            type="file"
            @change="handleFileUpload"
            accept="application/pdf"
            multiple
            class="input-files"
          />
        </div>
        <div class="files-container">
          <!--  -->
          <draggable
            v-model="multipleFiles"
            item-key="index"
            @start="draggingFiles = true"
            @end="reOrderFilesHandle"
            class="drag-container-list"
          >
            <template #item="{ element, index }">
              <div class="file-name-container">
                <input
                  type="text"
                  name=""
                  id=""
                  :value="element.name"
                  disabled
                  class="input-name"
                />
                <button
                  @click="deleteDocumentHandle(index)"
                  class="page-delete"
                >
                  X
                </button>
              </div>
            </template>
          </draggable>
        </div>
        <div v-if="pages.length" class="controls">
          <button @click="saveOrder">Guardar nuevo orden</button>
        </div>
      </div>
      <div class="pages-container">
        <div v-if="loading" class="loading">Cargando PDF...</div>
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
              <div class="optionsContainer">
                <div class="page-rotate" @click="rotatePageHandle(index)">
                  <i class="bi bi-arrow-clockwise"></i>
                </div>
                <div class="page-delete" @click="deletePageHandle(index)">
                  X
                </div>
              </div>
              <div class="img-container">
                <img
                  :src="element.thumbnail"
                  :alt="`Página ${index + 1}`"
                  class="page-thumbnail"
                  :class="`rotate${element.rotate}`"
                />
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PDFDocument, degrees } from "pdf-lib";
import draggable from "vuedraggable";
import * as pdfjs from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const loading = ref(false);
const pages = ref([]);
const dragging = ref(false);
const draggingFiles = ref(false);
const originalPdf = ref(null);
const files = ref([]);
const multipleFiles = ref([]);
const numberPagesByFiles = ref([]);

const deletePageHandle = (index) => {
  const fileIndex = pages.value[index].documentFileIndex;
  console.log(fileIndex);
  numberPagesByFiles.value[fileIndex] = numberPagesByFiles.value[fileIndex] - 1;
  pages.value.splice(index, 1);
  if (numberPagesByFiles.value[fileIndex] == 0) {
    multipleFiles.value.splice(fileIndex, 1);
    numberPagesByFiles.value.splice(fileIndex, 1);
    pages.value.forEach((element) => {
      if (element.documentFileIndex >= fileIndex) {
        element.documentFileIndex = element.documentFileIndex - 1;
      }
    });
  }
};

const reOrderFilesHandle = async () => {
  pages.value = [];
  loading.value = true;
  let pageControl = 0;
  const thumbnails = [];
  numberPagesByFiles.value = [];
  for (let j = 1; j <= multipleFiles.value.length; j++) {
    const arrayBuffer = await multipleFiles.value[j - 1].arrayBuffer();
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    originalPdf.value = arrayBuffer;
    numberPagesByFiles.value.push(pdf.numPages);
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
        rotate: 0,
        documentFileIndex: j - 1,
      });
    }
  }

  pages.value = thumbnails;
  loading.value = false;
};

const deleteDocumentHandle = (indexFile) => {
  pages.value = pages.value.filter(
    (page) => page.documentFileIndex !== indexFile
  );
  pages.value = pages.value.map((page) => {
    if (page.documentFileIndex > indexFile) {
      return {
        ...page,
        documentFileIndex: page.documentFileIndex - 1,
      };
    }
    return page;
  });

  multipleFiles.value.splice(indexFile, 1);
  numberPagesByFiles.value.splice(indexFile, 1);
};

const rotatePageHandle = async (index) => {
  if (pages.value[index].rotate < 270) {
    pages.value[index].rotate = pages.value[index].rotate + 90;
  } else {
    pages.value[index].rotate = 0;
  }
};

const handleFileUpload = async (event) => {
  /* const file = event.target.files[0]; */
  files.value = event.target.files;
  if (files.value.length < 1) return;
  loading.value = true;
  pages.value = [];
  const thumbnails = [];
  numberPagesByFiles.value = [];
  try {
    let pageControl = 0;
    for (let j = 1; j <= files.value.length; j++) {
      const file = files.value[j - 1];
      multipleFiles.value.push(file);
    }
    for (let j = 1; j <= multipleFiles.value.length; j++) {
      const arrayBuffer = await multipleFiles.value[j - 1].arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      originalPdf.value = arrayBuffer;
      numberPagesByFiles.value.push(pdf.numPages);
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
          rotate: 0,
          documentFileIndex: j - 1,
        });
      }
    }

    pages.value = thumbnails;
  } catch (error) {
    console.error("Error al procesar PDF:", error);
  } finally {
    loading.value = false;
  }
};
const saveOrder = async () => {
  try {
    const newPdfDoc = await PDFDocument.create();
    const combinedPdfDoc = await PDFDocument.create();
    for (const file of multipleFiles.value) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = await combinedPdfDoc.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      pages.forEach((page) => combinedPdfDoc.addPage(page));
    }
    const pageIndices = pages.value.map((page) => page.pageNumber - 1);
    const copiedPages = await newPdfDoc.copyPages(combinedPdfDoc, pageIndices);

    copiedPages.forEach((page, index) => {
      const newPage = newPdfDoc.addPage(page);
      newPage.setRotation(degrees(pages.value[index].rotate));
    });
    const pdfBytes = await newPdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `documento_reordenado_${Date.now()}.pdf`;
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    alert("Error al generar el PDF");
  }
};
</script>

<style scoped>
.pdf-reorder-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
}

input[type="file"] {
  margin: auto;
  padding: 10px;
  border: 0px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

input[type="file"]::file-selector-button {
  border-radius: 4px;
  padding: 0 16px;
  height: 40px;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 0.16);
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  margin-right: 16px;
  transition: background-color 200ms;
}
input[type="file"]::file-selector-button:hover {
  background-color: #f3f4f6;
}
.drag-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 1em;
}

.drag-container-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  width: 100%;
}
.pages-container {
  margin-top: 20px;
  justify-content: space-evenly;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
  height: 80vh;
  align-items: flex-start;
  overflow-y: scroll;
}

.pages-container:hover::-webkit-scrollbar-thumb {
  visibility: visible;
  transition: width 1s;
}

/* width */
.pages-container::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.pages-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(119, 119, 119);
  border-radius: 10px;
}

/* Handle */
.pages-container::-webkit-scrollbar-thumb {
  background: rgba(22, 119, 115, 0.5);
  border-radius: 10px;
}

/* Handle on hover */
.pages-container::-webkit-scrollbar-thumb:hover {
  background: rgba(22, 119, 115, 1);
}

.pages-container::-webkit-scrollbar-thumb {
  visibility: hidden;
}

.img-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 168px;
  width: 168px;
  margin: auto;
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
  height: 200px;
  min-width: 200px;
  display: inline-block;
  padding: 1em;
}

.page-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
/* .files-container :hover::-webkit-scrollbar-thumb {
  visibility: visible;
  transition: width 1s;
} */

.page-item.dragging {
  opacity: 0.5;
}

.page-thumbnail {
  margin: auto;
  max-width: 200px;
  max-height: 168px;
  box-shadow: 0 4px 8px rgba(192, 192, 192, 0.5);
  border-radius: 5px;
  object-fit: cover;
}

.page-number {
  position: absolute;
  top: 5px;
  left: 5px;
  background: rgb(255, 255, 255) 0%;
  color: rgb(53, 53, 53) 0%;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 12px;
}
.optionsContainer {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 900;
  display: flex;
  gap: 0.5em;
  align-items: center;
}
.page-delete {
  background: rgb(204, 95, 95) 0%;
  color: white;
  padding: 3px;
  border-radius: 3px;
  font-size: 12px;
  width: 1.5em;
  cursor: pointer;
  transition: 0.5s;
}
.page-delete:hover {
  background: rgb(150, 59, 59) 0%;
}
.page-rotate {
  background: rgba(22, 119, 115, 1) 0%;
  color: white;
  padding: 3px;
  border-radius: 3px;
  font-size: 12px;
  width: 1.5em;

  cursor: pointer;
}
.page-rotate:hover {
  background-color: rgb(26, 100, 98);
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
  background: rgba(22, 119, 115, 1) 0%;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  transition: 0.5s;
}

button:hover {
  background-color: rgb(26, 100, 98);
}
.pdfs-container {
  display: flex;
  flex-direction: row-reverse;
}
.view-files {
  width: 40%;
  border: #d3d3d3 solid 1px;
  box-shadow: 0 4px 8px rgba(192, 192, 192, 0.5);
  border-radius: 5px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.input-container {
  border-top: #d3d3d3 solid 1px;
  border-bottom: #d3d3d3 solid 1px;
}
.title-container {
  padding: 1em;
}

.input-name {
  font-size: 16px;
  border: none;
  width: 98%;
  color: #000000;
  background-color: transparent;
}
.files-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.file-name-container {
  display: flex;
  background-color: rgba(177, 223, 220, 0.349);
  width: 95%;
  min-height: 3.5em; /* Altura mínima */
  height: auto; /* Altura flexible */
  overflow: hidden;
  border: rgb(53, 138, 132) solid 1px;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 1em;
  flex-shrink: 0; /* Evita que se encojan los items */
}
.files-container::-webkit-scrollbar {
  width: 8px;
}

.files-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.files-container::-webkit-scrollbar-thumb {
  background: rgba(22, 119, 115, 0.5);
  border-radius: 4px;
}

.files-container::-webkit-scrollbar-thumb:hover {
  background: rgba(22, 119, 115, 0.8);
}
.rotate90 {
  transform: rotate(90deg);
}
.rotate180 {
  transform: rotate(180deg);
}

.rotate270 {
  transform: rotate(270deg);
}
.rotate0 {
  transform: rotate(0deg);
}
</style>

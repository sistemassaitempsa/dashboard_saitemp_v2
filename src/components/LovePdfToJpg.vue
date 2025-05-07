<template>
  <div class="pdf-reorder-container">
    <div class="pdfs-container">
      <div class="view-files">
        <div class="title-container">
          <h3>Imágenes a PDF</h3>
        </div>
        <div class="input-container">
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            multiple
            class="input-files"
          />
        </div>
        <div class="optionsContainerOrientation">
          <div
            @click="orientationPage = 'horizontal'"
            class="orientation_option"
            :class="orientationPage == 'horizontal' ? 'active' : null"
          >
            <div class="horizontal">
              <i class="bi bi-aspect-ratio"></i>
            </div>
            <label for="">Horizontal</label>
          </div>
          <div
            @click="orientationPage = 'vertical'"
            class="orientation_option"
            :class="orientationPage == 'vertical' ? 'active' : null"
          >
            <div class="vertical">
              <i class="bi bi-aspect-ratio"></i>
            </div>

            <label for="">Vertical</label>
          </div>
        </div>
        <div class="files-container">
          <div
            class="legend_drop_container files"
            v-if="multipleFiles.length == 0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-filetype-jpg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zm-4.34 8.132q.114.23.14.492h-.776a.8.8 0 0 0-.097-.249.7.7 0 0 0-.17-.19.7.7 0 0 0-.237-.126 1 1 0 0 0-.299-.044q-.428 0-.665.302-.234.301-.234.85v.498q0 .351.097.615a.9.9 0 0 0 .304.413.87.87 0 0 0 .519.146 1 1 0 0 0 .457-.096.67.67 0 0 0 .272-.264q.09-.164.091-.363v-.255H8.24v-.59h1.576v.798q0 .29-.097.55a1.3 1.3 0 0 1-.293.458 1.4 1.4 0 0 1-.495.313q-.296.111-.697.111a2 2 0 0 1-.753-.132 1.45 1.45 0 0 1-.533-.377 1.6 1.6 0 0 1-.32-.58 2.5 2.5 0 0 1-.105-.745v-.506q0-.543.2-.95.201-.406.582-.633.384-.228.926-.228.357 0 .636.1.28.1.48.275t.314.407ZM0 14.786q0 .246.082.465.083.22.243.39.165.17.407.267.246.093.569.093.63 0 .984-.345.357-.346.358-1.005v-2.725h-.791v2.745q0 .303-.138.466t-.422.164a.5.5 0 0 1-.454-.246.6.6 0 0 1-.073-.27H0Zm4.92-2.86H3.322v4h.791v-1.343h.803q.43 0 .732-.172.305-.177.463-.475.162-.302.161-.677 0-.374-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179Zm.546 1.333a.8.8 0 0 1-.085.381.57.57 0 0 1-.238.24.8.8 0 0 1-.375.082H4.11v-1.406h.66q.327 0 .512.182.185.181.185.521Z"
              />
            </svg>
            <label>Ningún archivo seleccionado</label>
          </div>
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
          <button @click="downloadImagesAsPdf">Guardar nuevo orden</button>
        </div>
      </div>
      <div class="pages-container">
        <div v-if="loading" class="loading">Cargando PDF...</div>
        <div class="input_drop_container" v-if="multipleFiles.length == 0">
          <div class="legend_drop_container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-filetype-jpg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zm-4.34 8.132q.114.23.14.492h-.776a.8.8 0 0 0-.097-.249.7.7 0 0 0-.17-.19.7.7 0 0 0-.237-.126 1 1 0 0 0-.299-.044q-.428 0-.665.302-.234.301-.234.85v.498q0 .351.097.615a.9.9 0 0 0 .304.413.87.87 0 0 0 .519.146 1 1 0 0 0 .457-.096.67.67 0 0 0 .272-.264q.09-.164.091-.363v-.255H8.24v-.59h1.576v.798q0 .29-.097.55a1.3 1.3 0 0 1-.293.458 1.4 1.4 0 0 1-.495.313q-.296.111-.697.111a2 2 0 0 1-.753-.132 1.45 1.45 0 0 1-.533-.377 1.6 1.6 0 0 1-.32-.58 2.5 2.5 0 0 1-.105-.745v-.506q0-.543.2-.95.201-.406.582-.633.384-.228.926-.228.357 0 .636.1.28.1.48.275t.314.407ZM0 14.786q0 .246.082.465.083.22.243.39.165.17.407.267.246.093.569.093.63 0 .984-.345.357-.346.358-1.005v-2.725h-.791v2.745q0 .303-.138.466t-.422.164a.5.5 0 0 1-.454-.246.6.6 0 0 1-.073-.27H0Zm4.92-2.86H3.322v4h.791v-1.343h.803q.43 0 .732-.172.305-.177.463-.475.162-.302.161-.677 0-.374-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179Zm.546 1.333a.8.8 0 0 1-.085.381.57.57 0 0 1-.238.24.8.8 0 0 1-.375.082H4.11v-1.406h.66q.327 0 .512.182.185.181.185.521Z"
              />
            </svg>
            <label>Seleccione o arrastre los archivos a editar</label>
          </div>
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            multiple
            class="input_files_drop"
          />
        </div>
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
const files = ref([]);
const multipleFiles = ref([]);
const numberPagesByFiles = ref([]);

const thumbnails = ref([]);
const orientationPage = ref("horizontal");

const downloadImagesAsPdf = async () => {
  if (!pages.value?.length) return;

  const pdfDoc = await PDFDocument.create();
  const A4_PORTRAIT = [595.28, 841.89];
  const A4_LANDSCAPE = [841.89, 595.28];

  for (let i = 0; i < pages.value.length; i++) {
    const pageInfo = pages.value[i];
    const fileIndex = pageInfo.documentFileIndex;
    const file = multipleFiles.value[fileIndex];
    if (!file) continue;

    const bytes = await file.arrayBuffer();
    let image;
    if (file.type.startsWith("image/jpeg")) {
      image = await pdfDoc.embedJpg(bytes);
    } else if (file.type.startsWith("image/png")) {
      image = await pdfDoc.embedPng(bytes);
    } else {
      console.warn(`Tipo no soportado: ${file.type}`);
      continue;
    }
    const { width: w0, height: h0 } = image.size();
    const pageSize =
      orientationPage.value === "horizontal" ? A4_LANDSCAPE : A4_PORTRAIT;
    const [PW, PH] = pageSize;
    const scale = Math.min(PW / w0, PH / h0);
    const w = w0 * scale;
    const h = h0 * scale;
    const x = (PW - w) / 2;
    const y = (PH - h) / 2;
    const page = pdfDoc.addPage(pageSize);
    page.drawImage(image, { x, y, width: w, height: h });

    const rot = pageInfo.rotate || 0;
    if (rot !== 0) {
      page.setRotation(degrees(rot));
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `imagenes_ordenadas_${Date.now()}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
};

const deletePageHandle = (index) => {
  const fileIndex = pages.value[index].documentFileIndex;
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
  const thumbnails = [];
  numberPagesByFiles.value = [];
  for (let j = 1; j <= multipleFiles.value.length; j++) {
    const file = multipleFiles.value[j - 1];
    numberPagesByFiles.value.push(1);
    if (!file.type.startsWith("image/")) continue;

    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = imageUrl;

    await new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const scale = 0.5;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        context?.drawImage(img, 0, 0, canvas.width, canvas.height);

        thumbnails.push({
          thumbnail: canvas.toDataURL(),
          pageNumber: thumbnails.length + 1,
          rotate: 0,
          documentFileIndex: j - 1,
        });

        URL.revokeObjectURL(imageUrl);
        resolve(true);
      };
    });
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

const handleImageUpload = async (event) => {
  const input = event.target;
  if (!input.files || input.files.length === 0) return;
  pages.value = [];
  thumbnails.value = [];
  loading.value = true;
  numberPagesByFiles.value = [];
  files.value = event.target.files;
  try {
    for (let j = 1; j <= files.value.length; j++) {
      const file = files.value[j - 1];
      multipleFiles.value.push(file);
    }
    for (let i = 0; i < multipleFiles.value.length; i++) {
      const file = multipleFiles.value[i];
      numberPagesByFiles.value.push(1);
      if (!file.type.startsWith("image/")) continue;

      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imageUrl;

      await new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          const scale = 0.5;
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          context?.drawImage(img, 0, 0, canvas.width, canvas.height);

          thumbnails.value.push({
            thumbnail: canvas.toDataURL(),
            pageNumber: thumbnails.value.length + 1,
            rotate: 0,
            documentFileIndex: i,
          });

          URL.revokeObjectURL(imageUrl);
          resolve(true);
        };
      });
    }
    pages.value = thumbnails.value;
  } catch (error) {
    console.error("Error al procesar imágenes:", error);
  } finally {
    loading.value = false;
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
  /* margin-top: 20px; */
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

.pages-container::-webkit-scrollbar {
  width: 5px;
}

.pages-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(255, 255, 255);
  border-radius: 10px;
}

.pages-container::-webkit-scrollbar-thumb {
  background: rgba(22, 119, 115, 0.5);
  border-radius: 10px;
}

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
  padding: 0.5em;
}

.file-name-container {
  display: flex;
  background-color: rgba(177, 223, 220, 0.349);
  width: 95%;
  min-height: 3.5em; /* Altura mínima */
  height: auto; /* Altura flexible */
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 1em;
  flex-shrink: 0;
  cursor: pointer;
}
.file-name-container:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transform: translateY(-2px);
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
.optionsContainerOrientation {
  display: flex;
  height: auto;
  border-bottom: #b8b8b8 solid 1px;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 4em;
  color: #666;
  padding: 1em;
}
.vertical {
  transform: rotate(90deg);
  font-size: 2em;
}
.horizontal {
  font-size: 2em;
}
.orientation_option {
  flex-direction: column;
  display: flex;
  padding: 0.5em;
  border: transparent solid 1px;
  width: 8em;
  transition: 0.3s;
}
.orientation_option:hover {
  color: #2c7081;
  border: #2c7081 solid 1px;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.active {
  color: #2c7081;
  border: #2c7081 solid 1px;
  border-radius: 5px;
}
.input_drop_container {
  width: 95%;
  height: 100%;
  border: #d3d3d3 solid 1px;
  box-shadow: 0 4px 8px rgba(192, 192, 192, 0.5);
  border-radius: 5px;
  position: relative;
  transition: 0.5s;
  color: rgba(192, 192, 192, 0.637);
  margin: auto;
}

.input_drop_container:hover {
  /*  transform: translateY(-5px); */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  color: #666;
  /*  height: 98%; */
}
.input_files_drop {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  cursor: pointer;
}
.legend_drop_container {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  flex-direction: column;
}
.files {
  height: 76%;
  margin-top: 0;
  color: rgba(192, 192, 192, 0.637);
}
</style>

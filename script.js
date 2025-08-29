// Elementos principales
const subtitleEl = document.getElementById('subtitle');
const cardsEl = document.getElementById('cards');
const siteTitleEl = document.getElementById('site-title');

const btnToggleLayout = document.getElementById('btn-toggle-layout');
const btnChangeTitle = document.getElementById('btn-change-title');
const btnToggleColors = document.getElementById('btn-toggle-colors');
const btnAddImage = document.getElementById('btn-add-image');

const imageForm = document.getElementById('image-form');
const imageUrlInput = document.getElementById('image-url');
const imageFileInput = document.getElementById('image-file');
const imageInsertBtn = document.getElementById('image-insert');
const imageCancelBtn = document.getElementById('image-cancel');
const footerImageArea = document.getElementById('footer-image-area');

// actualizar el subtítulo con el ancho de la ventana (Es una 'función' extra)
function updateSubtitleWithWidth() {
    const w = window.innerWidth;
    subtitleEl.textContent = `Resize this responsive page! — width: ${w}px`;
}
updateSubtitleWithWidth();
window.addEventListener('resize', updateSubtitleWithWidth);

// cambiar la fila de tarjetas a columna y viceversa
btnToggleLayout.addEventListener('click', () => {
    cardsEl.classList.toggle('stacked');

    // Esto cambia el texto del botón segun el estado actual
    const isStacked = cardsEl.classList.contains('stacked');
    btnToggleLayout.textContent = isStacked ? 'Mostrar en columnas' : 'Alternar columnas/filas';
});

// cambiar el título del header
btnChangeTitle.addEventListener('click', () => {
    siteTitleEl.textContent = 'HTML & CSS: Curso práctico avanzado';
    btnChangeTitle.textContent = 'Título cambiado';
    // Volver a texto original después de 2.5s para mejorar la UX ;)
    setTimeout(() => btnChangeTitle.textContent = 'Cambiar título header', 2500);
});

// Cambiar colores de las secciones (cards o tarjetas)
btnToggleColors.addEventListener('click', () => {
    cardsEl.classList.toggle('alt-color');
    const active = cardsEl.classList.contains('alt-color');
    btnToggleColors.textContent = active ? 'Restablecer color secciones' : 'Cambiar color secciones';
});

// Agregar la imagen deseada al footer
btnAddImage.addEventListener('click', () => {
    // muestra y oculta el formulario de imagen
    imageForm.classList.toggle('hidden');
    // 'enfocar' el input de URL si se muestra el formulario
    if (!imageForm.classList.contains('hidden')) {
        imageUrlInput.focus();
    }
});

// Boton para cancelar la inserción de imagen
imageCancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // limpiar y ocultar de nuevo el formulario
    imageUrlInput.value = '';
    imageFileInput.value = '';
    imageForm.classList.add('hidden');
});

// Insertar imagemos la imagen, si hay archivo local, caso contrario se usa la URL
imageInsertBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Si hay un archivo seleccionado
    const file = imageFileInput.files && imageFileInput.files[0];
    const url = imageUrlInput.value && imageUrlInput.value.trim();

    if (file) {
        // Leer con FileReader y convertir a data URL
        const reader = new FileReader();
        reader.onload = function (ev) {
            const src = ev.target.result;
            insertImageToFooter(src);
            // limpiar formulario
            imageUrlInput.value = '';
            imageFileInput.value = '';
            imageForm.classList.add('hidden');
        };
        reader.onerror = function () {
            alert('Error al leer el archivo. Intenta nuevamente.');
        };
        reader.readAsDataURL(file);
        return;
    }

    if (url) {
        // Validar que parezca una URL de imagen (extensiones comunes)
        if (!isProbablyImageUrl(url)) {
            if (!confirm('La URL no parece una imagen directa. ¿Deseas intentar insertarla de todos modos?')) {
                return;
            }
        }
        insertImageToFooter(url);
        imageUrlInput.value = '';
        imageForm.classList.add('hidden');
        return;
    }

    alert('Por favor, pega una URL válida o selecciona un archivo local antes de insertar.');
});

// Helper: insertar la imagen en el área del footer con estilo
function insertImageToFooter(src) {
    // Crear un contenedor de imagen
    const figure = document.createElement('figure');
    figure.className = 'footer-figure';

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Imagen agregada al footer';
    img.loading = 'lazy';

    // extra: caption con botón para eliminar
    const figcap = document.createElement('figcaption');
    figcap.style.display = 'flex';
    figcap.style.gap = '8px';
    figcap.style.alignItems = 'center';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn small';
    removeBtn.textContent = 'Eliminar';
    removeBtn.addEventListener('click', () => {
        figure.remove();
    });

    figcap.appendChild(removeBtn);

    figure.appendChild(img);
    figure.appendChild(figcap);

    // Añadimos a la zona del footer
    footerImageArea.appendChild(figure);
}

// Pequeña heurística para detectar si la URL apunta a una imagen
function isProbablyImageUrl(url) {
    return /\.(jpeg|jpg|gif|png|webp|svg|bmp)(\?.*)?$/i.test(url);
}

// Manejo de click en títulos de ciudad (funcioncita extra)
document.querySelector('.cards').addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('card-title')) {
        const city = target.textContent.trim();
        alert(`Has hecho clic en: ${city}`);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    
    let currentIndex = 0;
    let carouselInterval;
    const intervalTime = 5000; // Tiempo de cambio automático (5 segundos)

    // Función principal para cambiar de Slide
    function changeSlide(index) {
        // Remover clases activas de todos
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        // Asegurar que el índice se mantenga dentro de los límites válidos
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        // Activar el nuevo elemento
        slides[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
    }

    // Funciones para botones Siguiente y Anterior
    function nextSlide() {
        changeSlide(currentIndex + 1);
    }

    function prevSlide() {
        changeSlide(currentIndex - 1);
    }

    // Iniciar el temporizador automático
    function startInterval() {
        carouselInterval = setInterval(nextSlide, intervalTime);
    }

    // Detener y reiniciar el temporizador (evita saltos bruscos cuando el usuario hace clic)
    function resetInterval() {
        clearInterval(carouselInterval);
        startInterval();
    }

    // --- Listeners de Eventos ---

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetInterval();
    });

    // Permitir navegación haciendo clic directo en las barras/puntos inferiores
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            changeSlide(index);
            resetInterval();
        });
    });

    // Arrancar el carrusel automáticamente al cargar la página
    startInterval();
});

// ═══════════════════════════════════════════//

// ID obtenido de tu Google Sheet (Reemplázalo por el tuyo real)
const SHEET_ID = '1XGZAH3Y0o774VSlr8JQ-Ww7rFXak5et4OxQkoPAkZZM'; 
const SHEET_TITLE = 'Hoja 1'; // Nombre de la pestaña abajo en tu Excel

// URL de la API nativa de Google en formato JSON CSV
const FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_TITLE}`;

// Función que se ejecuta al darle clic a una card de categoría
function abrirCatalogo(categoriaSeleccionada) {
    console.log("Cargando inventario de: " + categoriaSeleccionada);
    
    // Almacenamos la categoría en la memoria local del navegador
    localStorage.setItem('categoriaDestino', categoriaSeleccionada);
    
    // Redireccionamos a tu página de ventas/catálogo
    window.location.href = 'productos.html'; 
}

// --- LÓGICA QUE IRÍA EN TU NUEVO ARCHIVO "productos.html" ---
async function consultarInventarioGamer() {
    try {
        const respuesta = await fetch(FULL_URL);
        const texto = await respuesta.text();
        
        // Limpiar el formato JSON extraño que devuelve Google
        const jsonClasificado = JSON.parse(texto.substr(47).slice(0, -2));
        const filas = jsonClasificado.table.rows;
        
        // Obtenemos la categoría que el usuario clickeó en la página anterior
        const filtro = localStorage.getItem('categoriaDestino') || 'computadoras';
        
        // Aquí puedes mapear los datos estructuralmente
        const productos = filas.map(fila => {
            return {
                categoria: fila.c[0] ? fila.c[0].v : '',
                nombre: fila.c[1] ? fila.c[1].v : 'Producto sin nombre',
                precio: fila.c[2] ? fila.c[2].v : 0,
                imagen: fila.c[3] ? fila.c[3].v : 'placeholder.jpg',
                stock: fila.c[4] ? fila.c[4].v : 0
            };
        }).filter(p => p.categoria.toLowerCase() === filtro.toLowerCase());

        console.log("Productos filtrados listos para renderizar:", productos);
        // Aquí usarías un bucle (forEach) para pintar las sub-cards en tu sección de compras
        
    } catch (error) {
        console.error("Fallo crítico en la matriz de datos:", error);
    }
}
//----------------------------------------------------------------------------------------------//



// --- CONFIGURACIÓN BASE DE DATOS MATRIZ (GOOGLE SHEETS) ---
const SHEET_ID = '1XGZAH3Y0o774VSlr8JQ-Ww7rFXak5et4OxQkoPAkZZM'; // <- REEMPLAZA CON TU ID REAL DE HOJA
const SHEET_TITLE = 'Hoja 1';
const DATA_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_TITLE}`;

// Memoria volátil del Carrito
let carrito = JSON.parse(localStorage.getItem('cartBackup')) || [];

document.addEventListener("DOMContentLoaded", () => {
    
    // Identificar en qué página nos encontramos
    const productsGrid = document.getElementById("productsGrid");
    
    if (productsGrid) {
        // --- CÓDIGO EXCLUSIVO DE LA PÁGINA DE PRODUCTOS ---
        inicializarComponentesCatalogo();
        cargarInventarioDesdeSheets();
    } else {
        // --- CÓDIGO EXCLUSIVO DEL INDEX (BANNER / CARRUSEL) ---
        inicializarCarruselBanner();
    }
    
    // Inicializar contadores visuales globales
    actualizarInterfazCarrito();
});

/* ==========================================================================
2. MÓDULO: NAVEGACIÓN INTER-PÁGINAS
   ========================================================================== */
function abrirCatalogo(categoriaSeleccionada) {
    localStorage.setItem('categoriaDestino', categoriaSeleccionada.trim().toLowerCase());
    window.location.href = 'productos.html'; 
}

/* ==========================================================================
3. MÓDULO: CATÁLOGO DINÁMICO & RENDERING
   ========================================================================== */
function inicializarComponentesCatalogo() {
    const openCartBtn = document.getElementById("openCartBtn");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const cartSidebar = document.getElementById("cartSidebar");
    const catalogTitle = document.getElementById("catalogTitle");
    
    // Setear título según la categoría elegida en la landing
    const categoriaActual = localStorage.getItem('categoriaDestino') || 'computadoras';
    catalogTitle.innerText = categoriaActual.toUpperCase();

    // Eventos para abrir y cerrar barra del carrito
    openCartBtn.addEventListener("click", () => cartSidebar.classList.add("open"));
    closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("open"));
}

async function cargarInventarioDesdeSheets() {
    const productsGrid = document.getElementById("productsGrid");
    const categoriaFiltro = localStorage.getItem('categoriaDestino') || 'computadoras';

    try {
        const respuesta = await fetch(DATA_URL);
        const texto = await respuesta.text();
        const jsonClasificado = JSON.parse(texto.substr(47).slice(0, -2));
        const filas = jsonClasificado.table.rows;

        // Limpieza y mapeo estructurado
        const listadoProductos = filas.map(fila => ({
            categoria: fila.c[0] ? String(fila.c[0].v).trim().toLowerCase() : '',
            nombre: fila.c[1] ? String(fila.c[1].v) : 'Armamento Desconocido',
            precio: fila.c[2] ? Number(fila.c[2].v) : 0,
            imagen: fila.c[3] ? String(fila.c[3].v) : 'https://via.placeholder.com/300',
            stock: fila.c[4] ? Number(fila.c[4].v) : 0
        })).filter(p => p.categoria === categoriaFiltro.toLowerCase());

        productsGrid.innerHTML = ""; // Limpiar mensaje de carga

        if(listadoProductos.length === 0) {
            productsGrid.innerHTML = `<div class="loading-pulse" style="color:var(--neon-magenta)">0 PRODUCTOS ENCONTRADOS EN ESTA DIVISIÓN.</div>`;
            return;
        }

        // Renderizar Cards de productos de forma masiva
        listadoProductos.forEach((prod, index) => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
                <div class="product-img-box">
                    <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='https://via.placeholder.com/300'">
                </div>
                <div class="product-info">
                    <h4>${prod.nombre}</h4>
                    <p class="product-stock">DISPONIBLE: <span>${prod.stock} UNID</span></p>
                    <div class="product-price-box">
                        <span class="product-price">$${prod.precio.toLocaleString()}</span>
                        <button class="btn-add-cart" onclick="agregarAlCarrito('${btoa(prod.nombre)}', '${prod.nombre}', ${prod.precio})">AGREGAR</button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(card);
        });

    } catch (error) {
        console.error("Error cargando inventario:", error);
        productsGrid.innerHTML = `<div class="loading-pulse" style="color:red">FALLO CRÍTICO EN EL ENLACE DE DATOS.</div>`;
    }
}

// ==========================================
// MÓDULO: LÓGICA MATEMÁTICA DEL CARRITO
// ==========================================
function agregarAlCarrito(idEncriptado, nombre, precio) {
    // Comprobar si el item ya existe para incrementar su cantidad
    const itemExistente = carrito.find(item => item.id === idEncriptado);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: idEncriptado,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    actualizarInterfazCarrito();
    // Abrir automáticamente el carrito para dar feedback visual
    document.getElementById("cartSidebar").classList.add("open");
}

function eliminarDelCarrito(idEncriptado) {
    // Filtrar removiendo el elemento seleccionado
    carrito = carrito.filter(item => item.id !== idEncriptado);
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    localStorage.setItem('cartBackup', JSON.stringify(carrito));

    // Actualizar contadores numéricos de la burbuja flotante del menú
    const cartBadge = document.getElementById("cartCount");
    const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    if(cartBadge) cartBadge.innerText = totalUnidades;

    const cartItemsContainer = document.getElementById("cartItems");
    if (!cartItemsContainer) return; // Terminar ejecución si estamos en el index.html

    cartItemsContainer.innerHTML = "";

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-text">El carrito está vacío. Configura tu arsenal.</p>`;
        actualizarCalculosMonetarios(0);
        return;
    }

    // Dibujar elementos dentro del carrito desplegable
    carrito.forEach(item => {
        const itemRow = document.createElement("div");
        itemRow.classList.add("cart-item");
        itemRow.innerHTML = `
            <div class="cart-item-details">
                <h5>${item.nombre} (x${item.cantidad})</h5>
                <p>$${(item.precio * item.cantidad).toLocaleString()}</p>
            </div>
            <button class="btn-remove-item" onclick="eliminarDelCarrito('${item.id}')">🗑️</button>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    // Ejecutar operaciones matemáticas
    const subtotal = carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
    actualizarCalculosMonetarios(subtotal);
}

function actualizarCalculosMonetarios(subtotal) {
    // Algoritmos matemáticos de facturación (Ejemplo basado en IVA estándar del 19%)
    const factorIva = 0.19;
    const iva = subtotal * factorIva;
    const totalNeto = subtotal + iva;

    // Inyectar resultados matemáticos formateados con separadores de miles
    document.getElementById("subtotalPrice").innerText = `$${subtotal.toLocaleString()}`;
    document.getElementById("ivaPrice").innerText = `$${Math.round(iva).toLocaleString()}`;
    document.getElementById("totalPrice").innerText = `$${Math.round(totalNeto).toLocaleString()}`;
}

// ==========================================
// MÓDULO: BANNER INTERACTIVO (LANDING PAGE)
// ==========================================
function inicializarCarruselBanner() {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    if(!nextBtn) return; // Evitar errores si no estamos en la landing
    
    let currentIndex = 0;
    let carouselInterval;

    function changeSlide(index) {
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;
        slides[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
    }

    nextBtn.addEventListener("click", () => { changeSlide(currentIndex + 1); resetInterval(); });
    prevBtn.addEventListener("click", () => { changeSlide(currentIndex - 1); resetInterval(); });
    dots.forEach((d, i) => d.addEventListener("click", () => { changeSlide(i); resetInterval(); }));
    
    function startInterval() { carouselInterval = setInterval(() => changeSlide(currentIndex + 1), 5000); }
    function resetInterval() { clearInterval(carouselInterval); startInterval(); }
    startInterval();
}
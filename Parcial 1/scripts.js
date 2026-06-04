const productos = [
  {
    id: 1,
    nombre: "Laptop Gamer RTX",
    descripcion: "Procesador Intel Core i9, 32GB RAM, RTX 4080, SSD 2TB NVMe. Pantalla 165Hz.",
    precio: 8500000,
    badge: "Top ventas",
    img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&q=80"
  },
  {
    id: 2,
    nombre: "Monitor 4K 144Hz",
    descripcion: "Panel IPS 27\", resolución 3840×2160, 1ms respuesta. Compatible HDR600.",
    precio: 2800000,
    badge: "Nuevo",
    img: "https://images.unsplash.com/photo-1527443224154-c4a573d5de6e?w=300&q=80"
  },
  {
    id: 3,
    nombre: "Teclado Mecánico RGB",
    descripcion: "Switches Cherry MX Red, retroiluminación RGB per-key, diseño TKL compacto.",
    precio: 650000,
    badge: null,
    img: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&q=80"
  },
  {
    id: 4,
    nombre: "Mouse Gaming Pro",
    descripcion: "Sensor óptico 25.600 DPI, 6 botones programables, peso ajustable, RGB.",
    precio: 420000,
    badge: "Oferta",
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=80"
  },
  {
    id: 5,
    nombre: "Auriculares Inalámbricos",
    descripcion: "Cancelación activa de ruido, 35h batería, drivers 40mm, Bluetooth 5.3.",
    precio: 980000,
    badge: null,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
  },
  {
    id: 6,
    nombre: "SSD NVMe 2TB",
    descripcion: "Velocidad lectura 7.400 MB/s, escritura 6.500 MB/s, PCIe Gen 4, 5 años garantía.",
    precio: 560000,
    badge: null,
    img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=300&q=80"
  },
  {
    id: 7,
    nombre: "Webcam 4K Streaming",
    descripcion: "Resolución 4K@30fps, enfoque automático, micrófono estéreo integrado.",
    precio: 390000,
    badge: "Nuevo",
    img: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=300&q=80"
  },
  {
    id: 8,
    nombre: "Silla Ergonómica Pro",
    descripcion: "Malla transpirable, soporte lumbar ajustable, reposabrazos 4D, hasta 150 kg.",
    precio: 1750000,
    badge: null,
    img: "https://images.unsplash.com/photo-1586158291800-2665f07bba79?w=300&q=80"
  }
];

/* ═══════════════════════════════════════════
   ESTADO DEL CARRITO (arreglo)
═══════════════════════════════════════════ */
let carrito = [];   // { id, nombre, precio, img, cantidad }

/* ═══════════════════════════════════════════
   UTILIDADES
═══════════════════════════════════════════ */
const formatPrice = n =>
  '$' + n.toLocaleString('es-CO');

/* ═══════════════════════════════════════════
   RENDERIZAR PRODUCTOS
═══════════════════════════════════════════ */
function renderProductos() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  productos.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-xl-3 col-lg-4 col-md-6 col-12';

    col.innerHTML = `
      <div class="product-card">
        <div class="product-img-wrap">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <img src="${p.img}" alt="${p.nombre}" loading="lazy"/>
        </div>
        <div class="product-body">
          <div class="product-name">${p.nombre}</div>
          <div class="product-desc">${p.descripcion}</div>
          <div class="product-price">${formatPrice(p.precio)}</div>
          <button class="btn-add-cart" onclick="agregarProducto(${p.id})">
            <i class="bi bi-cart-plus"></i> Agregar al carrito
          </button>
        </div>
      </div>`;

    grid.appendChild(col);
  });
}

/* ═══════════════════════════════════════════
   agregarProducto()
═══════════════════════════════════════════ */
function agregarProducto(id) {
  const prod = productos.find(p => p.id === id);
  if (!prod) return;

  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }

  renderCarrito();
  actualizarNavBadge();

  Swal.fire({
    icon: 'success',
    title: '¡Agregado!',
    html: `<b>${prod.nombre}</b> fue agregado al carrito correctamente.`,
    timer: 1800,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
    background: '#16161f',
    color: '#e8e8f0'
  });
}

/* ═══════════════════════════════════════════
   eliminarProducto()
═══════════════════════════════════════════ */
function eliminarProducto(id) {
  carrito = carrito.filter(item => item.id !== id);
  renderCarrito();
  actualizarNavBadge();
}

/* ═══════════════════════════════════════════
   vaciarCarrito()
═══════════════════════════════════════════ */
function vaciarCarrito() {
  if (carrito.length === 0) return;

  Swal.fire({
    title: '¿Vaciar carrito?',
    text: '¿Desea eliminar todos los productos del carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, vaciar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true
  }).then(result => {
    if (result.isConfirmed) {
      carrito = [];
      renderCarrito();
      actualizarNavBadge();
      Swal.fire({
        icon: 'success',
        title: 'Carrito vaciado',
        timer: 1400,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        background: '#16161f',
        color: '#e8e8f0'
      });
    }
  });
}

/* ═══════════════════════════════════════════
   calcularTotal()
═══════════════════════════════════════════ */
function calcularTotal() {
  return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

/* ═══════════════════════════════════════════
   RENDERIZAR CARRITO
═══════════════════════════════════════════ */
function renderCarrito() {
  const emptyMsg    = document.getElementById('cart-empty-msg');
  const itemsWrap   = document.getElementById('cart-items');
  const footer      = document.getElementById('cart-footer');
  const countLabel  = document.getElementById('cart-count-label');
  const subtotalEl  = document.getElementById('cart-subtotal');
  const totalEl     = document.getElementById('cart-total');

  itemsWrap.innerHTML = '';

  if (carrito.length === 0) {
    emptyMsg.style.display = 'block';
    footer.style.display   = 'none';
    return;
  }

  emptyMsg.style.display = 'none';
  footer.style.display   = 'block';

  carrito.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.id = `ci-${item.id}`;
    div.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.nombre}" />
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nombre}</div>
        <div class="cart-item-price">${formatPrice(item.precio)}</div>
        <div class="cart-item-qty">Cantidad: <b>${item.cantidad}</b> · Subtotal: <b>${formatPrice(item.precio * item.cantidad)}</b></div>
      </div>
      <button class="cart-item-remove" onclick="eliminarProducto(${item.id})" title="Eliminar">
        <i class="bi bi-trash"></i>
      </button>`;
    itemsWrap.appendChild(div);
  });

  const total = calcularTotal();
  const totalItems = carrito.reduce((acc, i) => acc + i.cantidad, 0);

  countLabel.textContent = totalItems;
  subtotalEl.textContent = formatPrice(total);
  totalEl.textContent    = formatPrice(total);
}

/* ═══════════════════════════════════════════
   BADGE NAV
═══════════════════════════════════════════ */
function actualizarNavBadge() {
  const total = carrito.reduce((acc, i) => acc + i.cantidad, 0);
  document.getElementById('nav-cart-count').textContent = total;
}

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
renderProductos();
renderCarrito();
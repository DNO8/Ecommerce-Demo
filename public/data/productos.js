import '/src/Views/Shop/components/grid-shop.js';
let _productos = null; // cache simple

export async function obtenerProductos() {
  if (_productos) return _productos;

  const response = await fetch('/public/data/productos.json');
  const data = await response.json();

  _productos = data;
  return data;
}

export async function obtenerProductosBasicos() {
  const productos = await obtenerProductos();
  return productos.map(({ id, nombre, imagen, precio, stock }) => ({
    id,
    nombre,
    imagen,
    precio,
    stock,
  }));
}

export async function obtenerProductoPorId(id) {
  const productos = await obtenerProductos();
  return productos.find(p => p.id === id);
}
export function mostrarVistaProducto(ctx) {
  const productId = ctx.params.id;

  const detalle = document.createElement('producto-detalle');
  detalle.productId = productId; // <-- esta línea es clave

  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(detalle);
}
export function mostrarVistaGrid() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  const grid = document.createElement('grid-shop');
  app.appendChild(grid);
}
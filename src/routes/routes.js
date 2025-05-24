import page from 'https://esm.sh/page';
import {mostrarVistaProducto} from '/public/data/productos.js'
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
// Rutas asociadas a las secciones
page('/', () => scrollToSection('Home-layer'));
page('/productos', () => {scrollToSection('Shop-layer') });
page('/productos/:id', (ctx) => mostrarVistaProducto(ctx));
page('/sobre', () => scrollToSection('About-layer'));
page('/comprar', () => scrollToSection('Buy-layer'));


const sectionRoutes = [
  { id: 'Home-layer', path: '/' },
  { id: 'Shop-layer', path: '/productos' },
  { id: 'About-layer', path: '/sobre' },
  { id: 'Buy-layer', path: '/comprar' },
];

// Observar cambios de scroll usando IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (visible) {
    const sectionId = visible.target.id;
    const matched = sectionRoutes.find(s => s.id === sectionId);
    if (matched && location.pathname !== matched.path) {
      history.replaceState(null, '', matched.path); // Actualiza sin recargar
    }
  }
}, {
  threshold: 0.3, // Sección visible al menos 60%
});

// Observar todas las secciones
sectionRoutes.forEach(({ id }) => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// Inicializar
page();

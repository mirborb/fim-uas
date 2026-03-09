/* ============================================================
   FIM UAS v2 — app.js
   · Navbar scroll
   · Burger menu
   · Acordeón de programas
   · Tabs Licenciatura / Posgrado
   · Smooth scroll
   · Formulario feedback
   ============================================================ */

// ---- Navbar: borde + sombra al hacer scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 55);
});

// ---- Burger: menú móvil ----
const burger = document.getElementById('burger');
const menu   = document.getElementById('menu');
burger.addEventListener('click', () => {
  menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', menu.classList.contains('open'));
});
// Cerrar al hacer clic en cualquier enlace del menú
menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => menu.classList.remove('open'))
);

// ---- Acordeón ----
const accItems = document.querySelectorAll('.acc-item');
accItems.forEach(item => {
  item.querySelector('.acc-hd').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    accItems.forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ---- Tabs: Licenciatura / Posgrado ----
const atabs = document.querySelectorAll('.atab');
// Ocultar posgrado al cargar
accItems.forEach(i => {
  if (i.dataset.type !== 'lic') i.classList.add('hidden');
});
atabs.forEach(tab => {
  tab.addEventListener('click', () => {
    atabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const type = tab.dataset.type;
    accItems.forEach(i => {
      i.classList.remove('open');
      i.classList.toggle('hidden', i.dataset.type !== type);
    });
  });
});

// ---- Smooth scroll para anclas ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      menu.classList.remove('open');
    }
  });
});

// ---- Formulario: feedback visual ----
const cform = document.getElementById('cform');
if (cform) {
  cform.addEventListener('submit', e => {
    e.preventDefault();
    const btn = cform.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
    btn.style.background = '#10b981';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = 'Enviar mensaje <i class="fas fa-paper-plane"></i>';
      btn.style.background = '';
      btn.disabled = false;
      cform.reset();
    }, 3500);
  });
}

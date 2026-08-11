// =========================================================
// Bridge English Studio — Interactividad del sitio
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Año dinámico en el footer ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Navbar: sombra al hacer scroll ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 12) {
      navbar.classList.add('shadow-sm', 'border-line');
    } else {
      navbar.classList.remove('shadow-sm', 'border-line');
    }
  });

  // ---- Menú móvil ----
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const bar1 = document.getElementById('bar1');
  const bar2 = document.getElementById('bar2');
  const bar3 = document.getElementById('bar3');
  let menuOpen = false;

  function toggleMenu(force) {
    menuOpen = force !== undefined ? force : !menuOpen;
    menuBtn.setAttribute('aria-expanded', String(menuOpen));
    if (menuOpen) {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      bar1.style.transform = 'translateY(6.5px) rotate(45deg)';
      bar2.style.opacity = '0';
      bar3.style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      mobileMenu.style.maxHeight = '0px';
      bar1.style.transform = 'none';
      bar2.style.opacity = '1';
      bar3.style.transform = 'none';
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu());
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // ---- Animación al hacer scroll (reveal) ----
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ---- FAQ acordeón ----
  document.querySelectorAll('.faq-item').forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    const icon = item.querySelector('.faq-icon');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Cierra los demás (acordeón exclusivo)
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
          other.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-panel').style.gridTemplateRows = '0fr';
          other.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.gridTemplateRows = isOpen ? '0fr' : '1fr';
      icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });

  // ---- Validación básica del formulario de contacto ----
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      [name, email, message].forEach(field => {
        const errorEl = field.closest('div').querySelector('.field-error');
        let fieldValid = field.value.trim().length > 0;

        if (field === email && fieldValid) {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        }

        if (!fieldValid) {
          valid = false;
          field.classList.add('border-red-400');
          errorEl.classList.remove('hidden');
        } else {
          field.classList.remove('border-red-400');
          errorEl.classList.add('hidden');
        }
      });

      if (!valid) return;

      // Aquí se integrará el envío real (API propia, EmailJS, Formspree, etc.)
      // Por ahora se simula un envío exitoso:
      successMsg.classList.remove('hidden');
      form.reset();
      setTimeout(() => successMsg.classList.add('hidden'), 6000);
    });
  }

});
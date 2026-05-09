(function () {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const navClose = document.querySelector('.nav-close');

  function openNav() {
    if (!nav) return;
    nav.dataset.open = 'true';
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    if (!nav) return;
    nav.dataset.open = 'false';
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle) navToggle.addEventListener('click', openNav);
  if (navClose) navClose.addEventListener('click', closeNav);

  // Modal
  const modal = document.getElementById('consultation-modal');
  const modalPanel = modal ? modal.querySelector('.modal__panel') : null;
  const modalClose = modal ? modal.querySelector('.modal__close') : null;
  const modalTriggers = document.querySelectorAll('[data-modal-open="consultation"]');

  let lastFocus = null;

  function openModal() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  modalTriggers.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (modal && modal.getAttribute('aria-hidden') === 'false') closeModal();
      else if (nav && nav.dataset.open === 'true') closeNav();
    }
  });

  // Before/after compare slider
  document.querySelectorAll('[data-compare]').forEach(function (root) {
    const viewport = root.querySelector('.compare__viewport');
    const after = root.querySelector('.compare__after');
    const afterImg = after ? after.querySelector('img') : null;
    const handle = root.querySelector('.compare__handle');
    if (!viewport || !after || !handle) return;

    let dragging = false;

    function setPosition(percent) {
      const clamped = Math.max(0, Math.min(100, percent));
      after.style.width = clamped + '%';
      handle.style.left = clamped + '%';
      if (afterImg) {
        const w = viewport.clientWidth;
        afterImg.style.width = w + 'px';
        afterImg.style.maxWidth = 'none';
      }
      handle.setAttribute('aria-valuenow', String(Math.round(clamped)));
    }

    function pointToPercent(clientX) {
      const rect = viewport.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    function onMove(e) {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(pointToPercent(x));
      if (e.cancelable) e.preventDefault();
    }

    function onUp() { dragging = false; }

    function onDown(e) {
      dragging = true;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(pointToPercent(x));
    }

    viewport.addEventListener('mousedown', onDown);
    viewport.addEventListener('touchstart', onDown, { passive: true });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);

    handle.addEventListener('keydown', function (e) {
      const current = parseFloat(handle.getAttribute('aria-valuenow') || '50');
      if (e.key === 'ArrowLeft') { setPosition(current - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPosition(current + 5); e.preventDefault(); }
      if (e.key === 'Home') { setPosition(0); e.preventDefault(); }
      if (e.key === 'End') { setPosition(100); e.preventDefault(); }
    });

    window.addEventListener('resize', function () {
      const current = parseFloat(handle.getAttribute('aria-valuenow') || '50');
      setPosition(current);
    });

    setPosition(50);
  });
})();

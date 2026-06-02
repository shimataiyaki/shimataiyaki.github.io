(function() {
  'use strict';

  function closeMenu(toggleBtn, navMenu) {
    navMenu.classList.remove('show');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navMenu.style.zIndex = '999';
  }

  function initMenu() {
    const toggleBtn = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('show');
      toggleBtn.classList.toggle('active', isOpen);
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      navMenu.style.zIndex = isOpen ? '1200' : '999';
    });

    document.addEventListener('click', function(e) {
      if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
        closeMenu(toggleBtn, navMenu);
      }
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeMenu(toggleBtn, navMenu));
    });
  }

  function scrollToTarget(targetId, headerOffset) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  function initSmoothScroll() {
    document
      .querySelectorAll('.product-links a[href^="#"], .hero a[href^="#"], .nav-menu a[href^="#"]')
      .forEach((link) => {
        link.addEventListener('click', (e) => {
          const targetId = link.getAttribute('href');
          if (!targetId || targetId === '#') return;

          e.preventDefault();
          const headerOffset = link.closest('.product-links') ? 60 : 80;
          scrollToTarget(targetId, headerOffset);
        });
      });
  }

  function initProductNav() {
    const productNav = document.querySelector('.product-nav');
    if (!productNav) return;

    function updateProductNav() {
      productNav.classList.toggle('visible', window.scrollY > 60);
    }

    updateProductNav();
    window.addEventListener('scroll', updateProductNav, { passive: true });
  }

  function initFadeIn() {
    const fadeEls = document.querySelectorAll('.fade-in');
    if (!fadeEls.length) return;

    if (!('IntersectionObserver' in window)) {
      fadeEls.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach((el) => observer.observe(el));
  }

  initMenu();
  initSmoothScroll();
  initProductNav();
  initFadeIn();
})();

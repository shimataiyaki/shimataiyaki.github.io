(function() {
  'use strict';

  const toggleBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('show');
      toggleBtn.classList.toggle('active');
      navMenu.style.zIndex = isOpen ? '1200' : '999';
    });

    document.addEventListener('click', function(e) {
      if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
        toggleBtn.classList.remove('active');
        navMenu.style.zIndex = '999';
      }
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        toggleBtn.classList.remove('active');
        navMenu.style.zIndex = '999';
      });
    });
  }
})();

// ---------- プロダクトナビ スクロール表示 ----------
const productNav = document.querySelector('.product-nav');
if (productNav) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 60) {
            productNav.classList.add('visible');
        } else {
            productNav.classList.remove('visible');
        }
    });
}

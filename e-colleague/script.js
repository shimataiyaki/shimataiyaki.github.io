(function() {
    'use strict';

    // ---------- ハンバーガーメニュー ----------
    const toggleBtn = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const productNav = document.querySelector('.product-nav');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('show');
            toggleBtn.classList.toggle('active');

            // メニュー表示時にproduct-navより前面に
            if (isOpen) {
                navMenu.style.zIndex = '1200';
            } else {
                navMenu.style.zIndex = '999';
            }
        });

        document.addEventListener('click', function(e) {
            if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
                toggleBtn.classList.remove('active');
                navMenu.style.zIndex = '999';
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                toggleBtn.classList.remove('active');
                navMenu.style.zIndex = '999';
            });
        });
    }

    // ---------- プロダクトナビ スムーススクロール ----------
    document.querySelectorAll('.product-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerOffset = 60;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- ヒーローボタンもスムーススクロール ----------
    document.querySelectorAll('.hero a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerOffset = 60;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- フェードイン ----------
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
})();

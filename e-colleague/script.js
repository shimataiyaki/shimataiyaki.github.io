(function() {
    'use strict';

    // ---------- プロダクトナビ スクロール表示 ----------
    const productNav = document.querySelector('.product-nav');
    if (productNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                productNav.classList.add('visible');
            } else {
                productNav.classList.remove('visible');
            }
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

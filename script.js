/* ============================================
   script.js - ポートフォリオサイト共通機能
   ============================================ */

(function() {
    'use strict';

    // ---------- スムーススクロール（目次リンク用） ----------
    const setupSmoothScroll = () => {
        const tocLinks = document.querySelectorAll('.toc a');
        tocLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    };

    // ---------- ハンバーガーメニュー制御 ----------
    const setupMobileMenu = () => {
        const toggleBtn = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (!toggleBtn || !navMenu) return;

        toggleBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const expanded = navMenu.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
        });

        document.addEventListener('click', function(e) {
            if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 600) {
                navMenu.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    };

    // ---------- メールアドレス表示・コピー機能（プライバシーポリシー用） ----------
    const setupEmailReveal = () => {
        const emailDisplay = document.getElementById('emailDisplay');
        const showBtn = document.getElementById('showEmailBtn');
        if (!emailDisplay || !showBtn) return;

        // ★★★ 実際のメールアドレスに変更してください ★★★
        const user = 'shimataiyaki.dev';
        const domain = 'gmail.com';
        const fullEmail = user + '@' + domain;

        let revealed = false;

        showBtn.addEventListener('click', function() {
            if (!revealed) {
                emailDisplay.innerHTML = `<a href="mailto:${fullEmail}" style="color: var(--primary-color); text-decoration: none;">${fullEmail}</a>`;
                showBtn.textContent = 'コピー';
                revealed = true;
            } else {
                navigator.clipboard.writeText(fullEmail).then(() => {
                    const original = showBtn.textContent;
                    showBtn.textContent = 'コピー完了';
                    setTimeout(() => { showBtn.textContent = original; }, 1500);
                }).catch(() => {
                    const range = document.createRange();
                    range.selectNodeContents(emailDisplay);
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                    alert('コピーに失敗しました。手動でコピーしてください。');
                });
            }
        });
    };

    // ---------- 初期化 ----------
    const init = () => {
        setupSmoothScroll();
        setupMobileMenu();
        setupEmailReveal();  // 追加
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
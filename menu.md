# ハンバーガーメニューフォーマット

## 概要

- **特徴**：デスクトップ／モバイルを問わず、常にハンバーガーアイコンでメニューを開閉する。
- **表示**：クリックでヘッダー下部に**全幅**のメニューが出現。内部リンクはコンテンツ幅に揃えて配置される。
- **アニメーション**：アイコンが「≡」から「×」に変化する。
- **閉じる動作**：
  - アイコン再クリック
  - メニュー外の領域をクリック
  - メニュー内のリンクをクリック

---

## HTML 構造

```html
<header class="site-header">
    <div class="header-container">
        <!-- サイトタイトル（ロゴ） -->
        <a href="#" class="site-title">テキストを入力</a>
        
        <!-- ハンバーガーボタン（常時表示） -->
        <button class="menu-toggle" id="menuToggle" aria-label="メニュー">
            <span></span><span></span><span></span>
        </button>
        
        <!-- メニュー本体（全幅） -->
        <ul class="nav-menu" id="navMenu">
            <div class="nav-menu-inner">
                <li><a href="#">テキストを入力</a></li>
                <li><a href="#s">テキストを入力</a></li>
                <li><a href="#">テキストを入力</a></li>
            </div>
        </ul>
    </div>
</header>
```

### ポイント

- `.header-container` は `max-width` でコンテンツ幅を制限し、`margin: 0 auto` で中央寄せ。
- `.nav-menu` は `position: absolute` でヘッダーの直下に配置。`width: 100%` で全幅を取る。
- `.nav-menu-inner` を内部に置くことで、メニュー項目の幅をメインコンテンツと同じ `max-width: 880px` に揃えている。

---

## CSS 主要部分

### ハンバーガーボタン

```css
.menu-toggle {
    display: flex;            /* 常時表示 */
    flex-direction: column;
    justify-content: space-around;
    width: 32px;
    height: 28px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
}

.menu-toggle span {
    width: 100%;
    height: 3px;
    background: var(--accent-color);
    transition: all 0.3s;
}
```

### ボタンの「×」アニメーション

```css
.menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}
.menu-toggle.active span:nth-child(2) {
    opacity: 0;
}
.menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -7px);
}
```

### メニューパネル（全幅）

```css
.nav-menu {
    display: none;
    position: absolute;
    top: 100%;              /* ヘッダーの下端から表示 */
    left: 0;
    width: 100%;            /* 全幅 */
    background: var(--container-bg);
    border-bottom: 1px solid var(--border-color);
    padding: 1.5rem 0;
    margin: 0;
    list-style: none;
    z-index: 10;
}

.nav-menu.show {
    display: block;
}

/* 内部コンテンツを中央幅に制限 */
.nav-menu-inner {
    max-width: 880px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
```

### リンクスタイル

```css
.nav-menu a {
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    font-size: 1.1rem;
    padding: 0.2rem 0;
    display: inline-block;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s, color 0.2s;
}

.nav-menu a:hover {
    color: var(--accent-color);
    border-bottom-color: var(--accent-color);
}
```

---

## JavaScript 制御

```javascript
(function() {
    'use strict';

    const toggleBtn = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!toggleBtn || !navMenu) return;

    // 1. ボタンクリックで開閉＆アニメーション
    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('show');
        toggleBtn.classList.toggle('active');
    });

    // 2. メニュー外クリックで閉じる
    document.addEventListener('click', function(e) {
        if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('show');
            toggleBtn.classList.remove('active');
        }
    });

    // 3. メニュー内のリンククリックでも閉じる（スムーズスクロールとの併用可）
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            toggleBtn.classList.remove('active');
        });
    });
})();
```

---

## レスポンシブ対応

モバイル時（`max-width: 600px`）は、`.nav-menu-inner` の左右 `padding` を狭めるだけで対応。  
全幅表示のため、デスクトップ／モバイルで大きなレイアウト変更は不要。

```css
@media (max-width: 600px) {
    .nav-menu-inner {
        padding: 0 1.2rem;
    }
}
```

---

## カスタマイズのポイント

- **アクセントカラー**：`--accent-color`（CSS変数）を変更すれば、ボタン色・ホバー時下線色が一括で変わる。
- **メニュー項目の追加**：`.nav-menu-inner` 内に `<li><a href="...">...</a></li>` を追記するだけ。
- **全幅ではなく右寄せに戻したい場合**：`.nav-menu` の `width: 100%; left: 0;` を削除し、`right: 1rem; min-width: 220px;` などに変更する。

---

## このひな形の使用シーン

- ポートフォリオサイト
- ミニマルなブログ
- ドキュメントサイト
- 「引き算」デザインを志向するすべてのWebページ

---
©2026 Shimataiyaki
```

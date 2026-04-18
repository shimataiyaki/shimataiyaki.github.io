# Webサイト用 デザイン系譜

「デジタルとアナログの接点に、直線と引き算で秩序を与える」をコンセプトとした、ポートフォリオサイト用のデザイン言語。

---

## 📐 基本原則

| 項目 | ルール |
| :--- | :--- |
| **フォント** | 日本語：`M PLUS 1p`（本文 `400`、見出し `500`）<br>英数字：システムデフォルト（`-apple-system` 等） |
| **形状** | 角丸ゼロ（`border-radius: 0`）<br>影は使わず、境界はすべて直線 |
| **色彩** | 背景：`#ffffff`<br>テキスト：`#1f2937`<br>境界線：`#e2e8f0`<br>アクセント：`#4a4a4a`（墨色） |
| **識別子** | ヘッダー下部に `3px solid` のアクセントライン。サイト種別ごとに色を変更 |

---

## 🧱 全体レイアウト

```
┌────────────────────────────────────────────┐
│  固定ヘッダー（全幅）                       │
│  [サイトタイトル]            [≡]           │
│  （下部に 3px アクセントライン）            │
├────────────────────────────────────────────┤
│ ┌──────────┬─────────────────────────────┐ │
│ │ 左サイド │   メインコンテンツ            │ │
│ │ バー     │   （スクロール）              │ │
│ │ （固定） │                              │ │
│ │          │                              │ │
│ │ ・目次   │                              │ │
│ │ ・リンク │                              │ │
│ │          │                              │ │
│ └──────────┴─────────────────────────────┘ │
└────────────────────────────────────────────┘
```

- **ヘッダー**：`position: fixed` で上部に固定。全幅ハンバーガーメニューを内包。
- **左サイドバー**：`position: sticky` で常時表示（モバイルでは非表示）。右端に `1px` の区切り線。
- **メインコンテンツ**：枠線なし。背景は白でサイドバーと一体化。

---

## 🎯 ヘッダー & ナビゲーション

### 構造

```html
<header class="site-header">
  <div class="header-container">
    <a href="#" class="site-title">サイト名</a>
    <button class="menu-toggle" id="menuToggle">≡</button>
    <ul class="nav-menu" id="navMenu">
      <div class="nav-menu-inner">
        <!-- ナビリンク -->
      </div>
    </ul>
  </div>
</header>
```

### 特徴

- **ハンバーガーボタン**：常時表示。クリックで `active` クラスが付与され「×」に変化。
- **ナビメニュー**：全幅で展開。内部は `.nav-menu-inner` で最大幅 `1200px` に制限。
- **閉じる動作**：ボタン再クリック / メニュー外クリック / リンククリック。

---

## 📑 左サイドバー（目次）

### 構造

```html
<aside class="sidebar-toc">
  <div class="toc-title">目次</div>
  <ul class="toc-nav">
    <li><a href="#section1" class="toc-link">セクション1</a></li>
    <li><a href="#section2" class="toc-link">セクション2</a></li>
  </ul>
</aside>
```

### 特徴

| 項目 | 値 |
| :--- | :--- |
| **幅** | `240px`（CSS変数 `--sidebar-width`） |
| **位置** | `sticky`（`top: 5rem`） |
| **背景** | `#ffffff` |
| **境界** | 右側のみ `1px solid var(--border-color)` |
| **フォントサイズ** | タイトル `1rem` / リンク `1.1rem` |
| **アクティブ表示** | 左ボーダー `3px solid var(--accent-color)` |

### 機能（JavaScript）

- **Intersection Observer** でスクロール位置を監視し、対応する目次リンクをハイライト。
- クリックでスムーススクロール（ヘッダー高さ `80px` をオフセット）。

---

## 📄 メインコンテンツ構成

### セクション構造

1. **About**（自己紹介）
2. **ものがたり**（タイムライン）
3. **制作物**（レコードリスト）
4. **受賞実績**（レコードリスト）
5. **活動実績**（レコードリスト）
6. **Contact**（お問い合わせ）

### タイムライン（ものがたり）

```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-year">2023</div>
    <p>本文</p>
  </div>
</div>
```

- 左側に `2px` の縦線、各項目に四角いマーカー（`::before`）。
- 年号はアクセントカラーで大きく表示（`1.8rem`）。

### レコードリスト（制作物・受賞・活動）

```html
<article class="record-item">
  <div class="record-header">
    <span class="record-title">タイトル</span>
    <span class="record-meta">メタ情報</span>
    <span class="status-badge">運用終了</span>
  </div>
  <p>説明文</p>
  <div class="record-footer">
    <a href="#" class="github-link">GitHub</a>
    <span class="award-badge">最優秀賞</span>
  </div>
</article>
```

- 各項目は `border-bottom: 1px dashed` で区切る。
- **バッジ**：
  - `.status-badge`：細枠・グレー文字（運用終了表示用）
  - `.award-badge`：左ボーダー＋アクセントカラー（受賞表示用）

---

## 🎨 CSS変数（カスタマイズポイント）

```css
:root {
    --bg-color: #ffffff;          /* 背景色 */
    --text-color: #1f2937;        /* 本文テキスト */
    --border-color: #e2e8f0;      /* 境界線 */
    --muted-text: #64748b;        /* 補足テキスト */
    --accent-color: #4a4a4a;      /* ★ アクセントカラー（サイト固有） */
    --sidebar-width: 240px;       /* サイドバー幅 */
}
```

**派生サイト作成時は `--accent-color` のみ変更すれば一貫性を保てる。**

---

## 📱 レスポンシブ

| 画面幅 | 挙動 |
| :--- | :--- |
| `> 768px` | 左サイドバー表示。メインコンテンツは `padding: 2rem 2.5rem` |
| `≤ 768px` | 左サイドバー非表示。ハンバーガーメニューのみでナビゲーション。メインコンテンツの左右パディング縮小 |

---

## 📁 ファイル構成

```
.
├── index.html
├── style.css
└── script.js
```

- `index.html`：コンテンツ構造のみ。CSS/JSは外部ファイル参照。
- `style.css`：全スタイル定義。変数で一元管理。
- `script.js`：ハンバーガーメニュー制御、目次ハイライト、スムーススクロール。

---

## 🚀 新規サイトへの展開手順

1. 上記3ファイルをコピー。
2. `index.html` 内のコンテンツ（タイトル、テキスト、リンク）を書き換え。
3. `:root` の `--accent-color` をサイトのテーマカラーに変更。
4. 必要に応じて `--sidebar-width` やフォントサイズを微調整。

これで「Webサイト用」のデザイン言語を継承したサイトが完成する。

---

©2026 Shimataiyaki
```

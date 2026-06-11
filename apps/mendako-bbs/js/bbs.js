// ===== 設定 =====
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwXthMihT2LwhUXBD3IawKn2XuQh-VsfVm6F-9_3pgsMJ6dncAoxMi0ooDNVJ8raZ1vfA/exec'; // ★ここを変更
const KEY_PART1 = 'UUDDL';
const KEY_PART2 = 'RLRBA';
const ENCRYPTION_KEY = KEY_PART1 + KEY_PART2;
const POSTS_PER_PAGE = 20; // 1ページあたりの表示件数

// ===== セッションID =====
const sessionId = sessionStorage.getItem('mendang_id') || crypto.randomUUID().slice(0, 8);
sessionStorage.setItem('mendang_id', sessionId);
const DISPLAY_NAME = `名無しさん@${sessionId}`;

// ===== アプリ状態 =====
let allPosts = [];
let currentPage = 1;

// ===== ヘルプモーダル =====
const modal = document.getElementById('help-modal');
const helpBtn = document.getElementById('help-btn');
const closeBtn = document.getElementById('close-help');

helpBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

// ===== 緊急脱出 =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.style.display === 'flex') {
      modal.style.display = 'none';
    } else {
      window.location.href = 'https://classroom.google.com/';
    }
  }
});

// ===== 送信 =====
document.getElementById('submit').addEventListener('click', () => {
  const msg = document.getElementById('message').value.trim();
  if (!msg) return;

  const encrypted = CryptoJS.AES.encrypt(msg, ENCRYPTION_KEY).toString();

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = GAS_URL;
  form.target = 'hidden_iframe';

  const msgInput = document.createElement('input');
  msgInput.type = 'hidden';
  msgInput.name = 'message';
  msgInput.value = encrypted;
  form.appendChild(msgInput);

  const nameInput = document.createElement('input');
  nameInput.type = 'hidden';
  nameInput.name = 'name';
  nameInput.value = DISPLAY_NAME;
  form.appendChild(nameInput);

  document.body.appendChild(form);
  form.submit();
  form.remove();

  document.getElementById('message').value = '';
  setTimeout(() => fetchPosts(true), 1500);
});

// ===== データ取得とページ表示 =====
function fetchPosts(resetToFirstPage = false) {
  const cb = 'cb_' + Date.now();
  window[cb] = (data) => {
    if (!Array.isArray(data)) return;

    allPosts = data;

    if (resetToFirstPage) {
      currentPage = 1;
    }

    renderPage(currentPage);
    delete window[cb];
  };

  const script = document.createElement('script');
  script.src = `${GAS_URL}?callback=${cb}`;
  document.body.appendChild(script);
  script.onload = () => script.remove();
}

// ===== ページ描画 =====
function renderPage(page) {
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE) || 1;

  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;
  currentPage = page;

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = Math.min(start + POSTS_PER_PAGE, totalPosts);
  const pagePosts = allPosts.slice(start, end);

  const container = document.getElementById('posts');
  container.innerHTML = '';

  pagePosts.forEach((item, indexInPage) => {
    try {
      const bytes = CryptoJS.AES.decrypt(item.message, ENCRYPTION_KEY);
      const plain = bytes.toString(CryptoJS.enc.Utf8);
      if (!plain) return;

      const globalIndex = totalPosts - (start + indexInPage);
      const name = item.name || DISPLAY_NAME;

      const div = document.createElement('div');
      div.className = 'post';
      div.innerHTML = `
        <span class="post-number">${globalIndex}.</span>
        <span class="post-name">${escapeHtml(name)}</span>
        <span class="post-time">${new Date(item.timestamp).toLocaleString()}</span>
        <div class="post-body">${escapeHtml(plain)}</div>
      `;
      container.appendChild(div);
    } catch (e) {}
  });

  const paginationDiv = document.getElementById('pagination');
  if (totalPages <= 1) {
    paginationDiv.style.display = 'none';
  } else {
    paginationDiv.style.display = 'flex';
    paginationDiv.innerHTML = `
      <button id="prev-page" ${currentPage === 1 ? 'disabled' : ''}>← 前へ</button>
      <span class="page-info">${currentPage} / ${totalPages}</span>
      <button id="next-page" ${currentPage === totalPages ? 'disabled' : ''}>次へ →</button>
    `;

    document.getElementById('prev-page').addEventListener('click', () => {
      if (currentPage > 1) {
        renderPage(currentPage - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    document.getElementById('next-page').addEventListener('click', () => {
      if (currentPage < totalPages) {
        renderPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// ===== 簡易XSS対策 =====
function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, c => map[c]);
}

// ===== 初回読み込み =====
fetchPosts();

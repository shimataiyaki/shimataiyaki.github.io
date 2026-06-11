// Shinkai LIFF - 認証 + プロジェクト一覧
const LIFF_ID = 'https://liff.line.me/2010370545-5zIqsJh2';
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbxdbu1Jbuj_yA8qNrSBl9j_qi4PCv6s5dZcNIAF6KeSxXyueozrXogWxC7IyxRpp3K5bA/exec';

document.addEventListener('DOMContentLoaded', async function() {
  const loadingView = document.getElementById('loading-view');
  const homeView = document.getElementById('home-view');
  const errorView = document.getElementById('error-view');

  try {
    // 1. LIFF 初期化
    await liff.init({ liffId: LIFF_ID });
    
    // 2. ログイン確認
    if (!liff.isLoggedIn()) {
      liff.login();
      return;
    }

    // 3. プロフィール取得
    const profile = await liff.getProfile();
    document.getElementById('current-user-display').textContent = profile.displayName;

    // 4. プロジェクト一覧取得
    const projects = await fetchProjects(profile.userId);
    renderProjectTiles(projects);

    // 5. 新規プロジェクト作成リンク
    document.getElementById('new-project-link').addEventListener('click', function(e) {
      e.preventDefault();
      liff.openWindow({
        url: `https://liff.line.me/${LIFF_ID}/new/`,
        external: false
      });
    });

    // 表示切替
    loadingView.style.display = 'none';
    homeView.style.display = 'block';

  } catch (error) {
    console.error('LIFF init error:', error);
    loadingView.style.display = 'none';
    errorView.style.display = 'block';
    document.getElementById('error-message').textContent = error.message || '認証に失敗しました。';
  }
});

// ==========================================
// API 通信
// ==========================================
async function fetchProjects(userId) {
  try {
    const response = await fetch(`${GAS_API_URL}?action=getProjects&userId=${encodeURIComponent(userId)}`);
    const data = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

// ==========================================
// UI 描画
// ==========================================
function renderProjectTiles(projects) {
  const grid = document.getElementById('project-tiles');
  
  if (!projects || projects.length === 0) {
    grid.innerHTML = '<p style="color:var(--pico-muted-color);">プロジェクトがありません。「New Project」から作成してください。</p>';
    return;
  }
  
  grid.innerHTML = projects.map(proj => `
    <a href="#" class="tile" data-proj-id="${proj.projId}">
      <span class="tile-icon">${proj.projType || 'other'}</span>
      <span class="tile-title">${escapeHtml(proj.projName)}</span>
      <span class="tile-desc">${proj.projId}</span>
    </a>
  `).join('');
  
  // タイルクリック → ダッシュボードへ
  document.querySelectorAll('.tile[data-proj-id]').forEach(tile => {
    tile.addEventListener('click', function(e) {
      e.preventDefault();
      const projId = this.dataset.projId;
      liff.openWindow({
        url: `https://liff.line.me/${LIFF_ID}/dashboard/?id=${encodeURIComponent(projId)}`,
        external: false
      });
    });
  });
}

// 簡易エスケープ
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

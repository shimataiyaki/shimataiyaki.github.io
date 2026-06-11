// Shinkai Dashboard - LIFF 認証 + GAS API 連携
const LIFF_ID = 'https://liff.line.me/2010370545-5zIqsJh2';
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbxdbu1Jbuj_yA8qNrSBl9j_qi4PCv6s5dZcNIAF6KeSxXyueozrXogWxC7IyxRpp3K5bA/exec';

document.addEventListener('DOMContentLoaded', async function() {
  const loadingView = document.getElementById('loading-view');
  const dashboardView = document.getElementById('dashboard-view');
  const errorView = document.getElementById('error-view');

  try {
    // LIFF 初期化
    await liff.init({ liffId: LIFF_ID });
    if (!liff.isLoggedIn()) { liff.login(); return; }

    // URL から projId を取得
    const params = new URLSearchParams(window.location.search);
    const projId = params.get('id');
    if (!projId) throw new Error('プロジェクトIDが指定されていません。');

    // プロジェクト情報取得
    const project = await fetchProject(projId);
    if (!project) throw new Error('プロジェクトが見つかりません。');

    // タスク一覧取得
    const tasks = await fetchTasks(projId);

    // UI 描画
    renderProjectSummary(project);
    renderTasks(tasks);
    updateProgress(tasks);

    loadingView.style.display = 'none';
    dashboardView.style.display = 'block';

  } catch (error) {
    console.error('Dashboard error:', error);
    loadingView.style.display = 'none';
    errorView.style.display = 'block';
    document.getElementById('error-message').textContent = error.message;
  }
});

async function fetchProject(projId) {
  const res = await fetch(`${GAS_API_URL}?action=getProject&projId=${encodeURIComponent(projId)}`);
  const data = await res.json();
  return data.project;
}

async function fetchTasks(projId) {
  const res = await fetch(`${GAS_API_URL}?action=getTasks&projId=${encodeURIComponent(projId)}`);
  const data = await res.json();
  return data.tasks || [];
}

function renderProjectSummary(project) {
  document.getElementById('proj-name').textContent = project.projName;
  document.getElementById('proj-id-display').textContent = project.projId;
  document.getElementById('proj-vision').textContent = project.minSuccess || project.vision || '';
}

function renderTasks(tasks) {
  const list = document.getElementById('task-list');
  if (!tasks.length) {
    list.innerHTML = '<p>タスクがありません。</p>';
    return;
  }

  const statusClass = { '未着手': 'todo', '進行中': 'in-progress', '完了': 'done', 'overdue': 'overdue' };
  const statusLabel = { '未着手': 'Todo', '進行中': 'In Progress', '完了': 'Done', 'overdue': 'Overdue' };

  list.innerHTML = tasks.map(task => `
    <div class="task-item task-item--${statusClass[task.status] || 'todo'}">
      <div class="task-body">
        <span class="task-title">${escapeHtml(task.description)}</span>
        <span class="task-meta">担当: ${escapeHtml(task.assignee || '--')} / 期限: ${task.dueDate || '--'}</span>
      </div>
      <span class="task-status task-status--${statusClass[task.status] || 'todo'}">${statusLabel[task.status] || task.status}</span>
    </div>
  `).join('');
}

function updateProgress(tasks) {
  if (!tasks.length) return;
  const done = tasks.filter(t => t.status === '完了').length;
  const percent = Math.round((done / tasks.length) * 100);
  document.getElementById('progress-bar').value = percent;
  document.getElementById('progress-text').textContent = `${percent}% (${done}/${tasks.length})`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

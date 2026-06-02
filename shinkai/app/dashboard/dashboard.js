// Shinkai Dashboard - ダミーデータ版（GAS接続なし・フロントエンド確認用）

// ===== ダミーデータ =====
const DUMMY_PROJECT = {
  projId: 'proj-2026-sch-001',
  projName: '文化祭模擬店',
  vision: '来場者が気軽に交流できる場が少ない課題を、飲食ブースの出店で解決する。',
  minSuccess: '黒字を達成し、来場者アンケートの満足度が80%以上。',
  outOfScope: '集客のためのSNS広告は行わない。当日の人員追加はしない。'
};

const DUMMY_TASKS = [
  { id: 1, description: 'ポスター発注', assignee: '田中', dueDate: '2026-05-20', status: 'overdue' },
  { id: 2, description: '予算案の作成', assignee: '佐藤', dueDate: '2026-05-25', status: 'in_progress' },
  { id: 3, description: '会場レイアウト確定', assignee: '鈴木', dueDate: '2026-05-30', status: 'done' },
  { id: 4, description: '材料の仕入れ', assignee: '田中', dueDate: '2026-06-05', status: 'todo' },
  { id: 5, description: '当日シフト表作成', assignee: '佐藤', dueDate: '2026-06-10', status: 'todo' }
];

// ===== ログイン処理 =====
function login() {
  const inputId = document.getElementById('shinkaiId').value.trim();
  const errorEl = document.getElementById('error');
  
  if (!inputId) {
    errorEl.textContent = 'Shinkai ID を入力してください。';
    return;
  }
  
  // ダミーデータでは任意のIDで通過（本番はGASで検証）
  const encodedId = encodeURIComponent(inputId);
  window.location.href = `dashboard.html?id=${encodedId}`;
}

// ===== ダッシュボード表示 =====
function loadDashboard() {
  const params = new URLSearchParams(window.location.search);
  const projId = params.get('id');
  
  if (!projId) {
    window.location.href = 'index.html';
    return;
  }
  
  // パンくずとプロジェクト情報を表示
  document.getElementById('breadcrumb-proj-id').textContent = projId;
  document.getElementById('proj-id-display').textContent = projId;
  document.getElementById('proj-name').textContent = DUMMY_PROJECT.projName;
  document.getElementById('proj-vision').textContent = DUMMY_PROJECT.vision;
  document.getElementById('proj-min-success').textContent = DUMMY_PROJECT.minSuccess;
  
  // タスク一覧
  renderTasks(DUMMY_TASKS);
  
  // 進捗
  updateProgress(DUMMY_TASKS);
  
  // 担当者分布
  updateAssigneeGrid(DUMMY_TASKS);
}

function renderTasks(tasks) {
  const tbody = document.getElementById('task-list');
  
  if (tasks.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">タスクがありません</td></tr>';
    return;
  }
  
  const statusLabels = {
    todo: '🟡 未着手',
    in_progress: '🔵 進行中',
    done: '🟢 完了',
    overdue: '🔴 期限切れ'
  };
  
  tbody.innerHTML = tasks.map(task => `
    <tr class="task-row task-row--${task.status}">
      <td>${task.description}</td>
      <td>${task.assignee}</td>
      <td>${task.dueDate}</td>
      <td><span class="status-badge status-badge--${task.status}">${statusLabels[task.status]}</span></td>
    </tr>
  `).join('');
  
  // アラート
  renderAlerts(tasks);
}

function renderAlerts(tasks) {
  const overdueTasks = tasks.filter(t => t.status === 'overdue');
  const alertSection = document.getElementById('alert-section');
  const alertList = document.getElementById('alert-list');
  
  if (overdueTasks.length === 0) {
    alertSection.style.display = 'none';
    return;
  }
  
  alertSection.style.display = 'block';
  alertList.innerHTML = overdueTasks.map(task => 
    `<li>🔴 <strong>${task.description}</strong>（担当: ${task.assignee}、期限: ${task.dueDate}）</li>`
  ).join('');
}

function updateProgress(tasks) {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  
  document.getElementById('progress-bar').style.width = `${percent}%`;
  document.getElementById('progress-text').textContent = `${percent}% 完了（${done}/${total}）`;
  
  const remaining = total - done;
  if (remaining > 0) {
    document.getElementById('progress-next').textContent = `及第点まであと ${remaining} タスク`;
  } else {
    document.getElementById('progress-next').textContent = '✅ 及第点到達！';
  }
}

function updateAssigneeGrid(tasks) {
  const grid = document.getElementById('assignee-grid');
  
  if (tasks.length === 0) {
    grid.innerHTML = '<p>データがありません</p>';
    return;
  }
  
  const countMap = {};
  tasks.forEach(task => {
    countMap[task.assignee] = (countMap[task.assignee] || 0) + 1;
  });
  
  grid.innerHTML = Object.entries(countMap).map(([name, count]) => `
    <div class="assignee-card">
      <span class="assignee-name">${name}</span>
      <span class="assignee-count">${count}件</span>
    </div>
  `).join('');
}

// ページ読み込み時に判定
if (window.location.pathname.includes('dashboard.html')) {
  loadDashboard();
}

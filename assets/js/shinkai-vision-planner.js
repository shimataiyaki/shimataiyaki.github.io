// Shinkai Vision Planner - 簡易/詳細 両対応
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbzmJ-Z4yz2VHpotiSijbjFuaBzRl8ZbQQPn17SiyHcDDWf0sfzMKpmsY8vgAIvHG0v5/exec';

// ==============================================
// タブ切り替え
// ==============================================
document.getElementById('tab-simple').addEventListener('click', function() {
  document.getElementById('simple-form').style.display = 'block';
  document.getElementById('detail-form').style.display = 'none';
  this.classList.add('active');
  document.getElementById('tab-detail').classList.remove('active');
  updateTabStyle();
});

document.getElementById('tab-detail').addEventListener('click', function() {
  document.getElementById('simple-form').style.display = 'none';
  document.getElementById('detail-form').style.display = 'block';
  this.classList.add('active');
  document.getElementById('tab-simple').classList.remove('active');
  updateTabStyle();
});

function updateTabStyle() {
  const active = document.querySelector('.tab-btn.active');
  const inactive = document.querySelector('.tab-btn:not(.active)');
  active.style.background = 'var(--shinkai-accent)';
  active.style.color = '#0b192c';
  inactive.style.background = 'transparent';
  inactive.style.color = 'var(--shinkai-text-muted)';
}

// ==============================================
// 共通：結果表示・エラー表示
// ==============================================
function showResult(projId) {
  document.getElementById('shinkai-id-display').textContent = projId;
  document.getElementById('result-section').style.display = 'block';
  document.getElementById('error-section').style.display = 'none';
  document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });
}

function showError(message) {
  document.getElementById('error-message').textContent = message;
  document.getElementById('error-section').style.display = 'block';
  document.getElementById('result-section').style.display = 'none';
  document.getElementById('error-section').scrollIntoView({ behavior: 'smooth' });
}

function setLoading(btn, isLoading) {
  btn.disabled = isLoading;
  btn.textContent = isLoading ? '作成中...' : 'Shinkai ID を発行する';
}

// ==============================================
// 共通：GAS API 呼び出し
// ==============================================
async function callApi(formData, btn) {
  setLoading(btn, true);
  document.getElementById('result-section').style.display = 'none';
  document.getElementById('error-section').style.display = 'none';

  try {
    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const result = await response.json();

    if (result.success) {
      showResult(result.projId);
    } else {
      showError(result.message || '不明なエラーが発生しました。');
    }
  } catch (error) {
    console.error('Error:', error);
    showError('サーバーとの通信に失敗しました。');
  } finally {
    setLoading(btn, false);
  }
}

// ==============================================
// 簡易作成フォーム
// ==============================================
document.getElementById('simple-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const projType = document.getElementById('simple-proj-type').value;
  if (!projType) {
    showError('プロジェクトタイプを選択してください。');
    return;
  }

  const formData = {
    projType: projType,
    projName: document.getElementById('simple-proj-name').value.trim() || '（未設定）',
    vision: '',
    minSuccess: '',
    outOfScope: '',
    mode: 'simple'
  };

  callApi(formData, document.getElementById('simple-submit-btn'));
});

// ==============================================
// 詳細作成フォーム
// ==============================================
document.getElementById('detail-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const projType = document.getElementById('proj-type').value;
  const projName = document.getElementById('proj-name').value.trim();
  const vision = document.getElementById('vision').value.trim();
  const minSuccess = document.getElementById('min-success').value.trim();

  if (!projType || !projName || !vision || !minSuccess) {
    showError('必須項目（*印）をすべて入力してください。');
    return;
  }

  const formData = {
    projType: projType,
    projName: projName,
    vision: vision,
    minSuccess: minSuccess,
    outOfScope: document.getElementById('out-of-scope').value.trim() || '',
    mode: 'detail'
  };

  callApi(formData, document.getElementById('detail-submit-btn'));
});

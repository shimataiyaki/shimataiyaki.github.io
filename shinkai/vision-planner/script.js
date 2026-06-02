// Shinkai Vision Planner - GAS API 連携
const GAS_API_URL = 'https://script.google.com/macros/s/xxxxxxxxx/exec'; // デプロイ後に差し替え

document.getElementById('vision-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submit-btn');
  const resultCard = document.getElementById('result-card');
  const errorCard = document.getElementById('error-card');
  
  // ボタン無効化・ローディング表示
  submitBtn.disabled = true;
  submitBtn.textContent = '作成中...';
  resultCard.style.display = 'none';
  errorCard.style.display = 'none';
  
  const formData = {
    team: document.getElementById('team').value.trim(),
    projName: document.getElementById('proj-name').value.trim(),
    vision: document.getElementById('vision').value.trim(),
    minSuccess: document.getElementById('min-success').value.trim(),
    outOfScope: document.getElementById('out-of-scope').value.trim()
  };
  
  try {
    const response = await fetch(GAS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      document.getElementById('shinkai-id-display').textContent = result.projId;
      resultCard.style.display = 'block';
      resultCard.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('vision-form').reset();
    } else {
      document.getElementById('error-message').textContent = result.message || '不明なエラーが発生しました。';
      errorCard.style.display = 'block';
    }
  } catch (error) {
    document.getElementById('error-message').textContent = 'サーバーとの通信に失敗しました。しばらく経ってからお試しください。';
    errorCard.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'プロジェクトを作成する';
  }
});
